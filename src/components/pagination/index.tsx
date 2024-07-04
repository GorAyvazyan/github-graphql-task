import useStore from '@/store';
import './index.css';

interface Props {
  handlePageChange: (page: number) => void;
}

const Pagination = ({ handlePageChange }: Props) => {
  const { searchQuery, hasNextPage, currentPage, totalPages } = useStore();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    const totalPageButtons = Math.ceil(totalPages);

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPageButtons, currentPage + Math.floor(maxPagesToShow / 2));

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPageButtons) {
      if (endPage < totalPageButtons - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPageButtons);
    }

    return pageNumbers.map((page, index) => (
      <button
        key={index}
        className={currentPage === page ? 'active' : ''}
        disabled={typeof page !== 'number'}
      >
        {page}
      </button>
    ));
  };

  return (
    <>
      {searchQuery && (
        <div className="paginator">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? 'disabled' : ''}
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage || currentPage === totalPages}
            className={!hasNextPage ? 'disabled' : ''}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
