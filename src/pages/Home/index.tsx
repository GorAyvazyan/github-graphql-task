import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import useStore from '@/store';
import { GET_REPOSITORIES } from '@/graphql/queries';
import { Edge, SearchData } from '@/types';
import SearchInput from '@/components/input';
import Pagination from '@/components/pagination';
import Spinner from '@/assets/spinner.gif';
import './index.css';

const Home: React.FC = () => {
  const {
    startCursor,
    currentPage,
    endCursor,
    totalPages,
    searchQuery,
    repositories,
    setRepositories,
    setCurrentPage,
    setTotalPages,
    setPagination,
    setEndCursor,
    setStartCursor,
  } = useStore();

  const { data, loading, fetchMore } = useQuery<SearchData>(GET_REPOSITORIES, {
    variables: { query: searchQuery || 'user:GorAyvazyan', first: 10 },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const processRepositoryData = (data: SearchData) => {
    const repos = data.search.edges.map((edge: Edge) => ({
      id: edge.node.id,
      name: edge.node.name,
      owner: edge.node.owner,
      stargazerCount: edge.node.stargazerCount,
      updatedAt: edge.node.updatedAt,
      url: edge.node.url,
      description: edge.node.description,
      languages: edge.node.languages,
    }));
    setRepositories(repos);
    setTotalPages(Math.ceil(data.search.repositoryCount / 10));
    setPagination(data.search.pageInfo.endCursor, data.search.pageInfo.hasNextPage);
    setEndCursor(data.search.pageInfo.endCursor);
    setStartCursor(data.search.pageInfo.startCursor);
  };

  useEffect(() => {
    console.log(222, data);
    if (data) {
      processRepositoryData(data);
    } else {
      setCurrentPage(1);
    }
  }, [data]);

  const handlePageChange = async (page: number) => {
    if (page > 0 && page <= totalPages) {
      let cursor = null;
      if (page > currentPage) {
        cursor = endCursor;
      } else if (page < currentPage) {
        cursor = startCursor;
      }

      try {
        const fetchMoreResult = await fetchMore({
          variables: {
            after: page > currentPage ? cursor : null,
            before: page < currentPage ? cursor : null,
            last: page < currentPage ? 10 : null,
            first: page > currentPage ? 10 : null,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;
            return {
              search: {
                ...fetchMoreResult.search,
                edges: fetchMoreResult.search.edges,
                pageInfo: fetchMoreResult.search.pageInfo,
              },
            };
          },
        });

        if (fetchMoreResult?.data) {
          processRepositoryData(fetchMoreResult.data);
          setCurrentPage(page);
        }
      } catch (error) {
        console.error('Error fetching more data:', error);
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="centered-data">
          <img src={Spinner} width={30} height={30} alt="" />
        </div>
      );
    }
    if (!data?.search.edges.length) {
      return <h3 className="centered-data">Your search did not match any repositories</h3>;
    }
    return (
      repositories.length > 0 && (
        <>
          <ul className="repository-list">
            {repositories.map((repo) => (
              <li key={repo.id} className="repository-item">
                <Link
                  to={`repository/${repo.id}`}
                  className="repository-name"
                  rel="noopener noreferrer"
                >
                  {repo.owner?.login}/{repo.name}
                </Link>
                <div className="repository-info">
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    &#9733; {repo.stargazerCount}
                  </span>
                  <span className="updated-date">
                    Updated on: {new Date(repo.updatedAt).toLocaleDateString()}
                  </span>
                  <Link to={repo.url} className="repository-link" rel="noopener noreferrer">
                    🔗
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <Pagination handlePageChange={handlePageChange} />
        </>
      )
    );
  };

  return (
    <div className="main-page">
      <h3 className="repository-heading">Search by keyword</h3>
      <SearchInput />
      {renderContent()}
    </div>
  );
};

export default Home;
