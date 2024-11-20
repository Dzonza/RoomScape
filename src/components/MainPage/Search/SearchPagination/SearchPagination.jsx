import { useCallback } from 'react';
import './searchPagination.scss';
import ArrowLeft from './ArrowLeft/ArrowLeft';
import ArrowRight from './ArrowRight/ArrowRight';
import { Link } from 'react-scroll';

const SearchPagination = ({
  setCurrentPage,
  resultsFromSearch,
  postsPerPage,
  currentPage,
}) => {
  let pages = [];
  const totalPages = Math.ceil(resultsFromSearch.length / postsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleMouseEnter = useCallback(
    (page, e) => {
      if (currentPage === e) {
        page.target.classList.remove('hovered-page');
      }
      if (currentPage !== e && parseInt(page.target.innerHTML) === e) {
        page.target.classList.add('hovered-page');
      }
    },
    [currentPage]
  );

  const handleMouseLeave = useCallback((page) => {
    page.target.classList.remove('hovered-page');
  }, []);
  const handleArrow = useCallback(
    (value) => {
      if (value === 'left') {
        setCurrentPage((prevValue) => prevValue - 1);
      } else {
        setCurrentPage((prevValue) => prevValue + 1);
      }
    },
    [setCurrentPage]
  );

  return (
    <div className="pagination-container">
      <ArrowLeft currentPage={currentPage} onClick={handleArrow} />
      {pages.length === 1
        ? ''
        : pages.map((page, index) => {
            return (
              <Link
                to="filter-buttons"
                smooth={true}
                duration={500}
                key={index}
                onClick={() => setCurrentPage(page)}
                onMouseEnter={(e) => handleMouseEnter(e, page)}
                onMouseLeave={(page) => handleMouseLeave(page)}
                className={`pagination-container__page ${
                  currentPage === page ? 'current-page' : ''
                } `}
              >
                {page}
              </Link>
            );
          })}
      <ArrowRight
        currentPage={currentPage}
        pages={pages}
        onClick={handleArrow}
      />
    </div>
  );
};

export default SearchPagination;
