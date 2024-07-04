import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore from '@/store';
import './index.css';

const RepositoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const getRepoById = useStore((state) => state.getRepoById);
  const repository = getRepoById(id || '');

  if (!repository) {
    return <p>Loading...</p>;
  }

  const { name, stargazerCount, updatedAt, owner, url, languages, description } = repository;

  return (
    <div className="repository-card">
      <h2 className="owner-name">{name}</h2>
      <div className="items-wrapper">
        <p className="stars"> &#9733; {stargazerCount}</p>
        <p className="updated">Updated on: {new Date(updatedAt).toLocaleDateString()}</p>
      </div>
      <div className="owner-info">
        {owner.avatarUrl && <img src={owner.avatarUrl} alt={`${owner.login}'s avatar`} />}
        <p>
          <Link to={`${url}`}>{owner.login}</Link>
        </p>
      </div>
      <p className="languages">
        Languages:
        <span>
          {languages.edges.map(({ node }, index) => (
            <React.Fragment key={node.name}>
              <span style={{ color: node.color }}>{node.name}</span>
              {index < languages.edges.length - 1 && ', '}
            </React.Fragment>
          ))}
        </span>
      </p>
      <p className="description">{description}</p>
    </div>
  );
};

export default RepositoryDetail;
