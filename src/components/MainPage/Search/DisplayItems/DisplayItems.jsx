import Card from '../Card/Card';
import Spinner from '/src/components/ReusableComponents/Spinner/Spinner';
import infinity from '/src/assets/infinity.svg';
import './displayItems.scss';
import SearchPagination from '../SearchPagination/SearchPagination';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../../ReusableComponents/ErrorMessage/ErrorMessage';

const DisplayItems = ({
  resultsFromSearch,
  spinner,
  scrollToElementRef,
  displayError,
  currentPage,
  setCurrentPage,
}) => {
  const postsPerPage = 12;

  const [modifiedPosts, setModifiedPosts] = useState([]);
  useEffect(() => {
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const allPostperPage = resultsFromSearch.slice(
      firstPostIndex,
      lastPostIndex
    );
    setModifiedPosts(allPostperPage);
  }, [resultsFromSearch, currentPage]);

  return (
    <>
      <section className="all-cards" ref={scrollToElementRef}>
        {resultsFromSearch.length === 0 && !spinner ? (
          <ErrorMessage messageStyle="display-error">
            {displayError}
          </ErrorMessage>
        ) : (
          ''
        )}
        {spinner ? <Spinner spinnerImage={infinity} /> : ''}
        {modifiedPosts.map((result) => {
          return <Card key={result.id} resultData={result} />;
        })}
      </section>
      {resultsFromSearch.length > 0 ? (
        <SearchPagination
          setCurrentPage={setCurrentPage}
          resultsFromSearch={resultsFromSearch}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default DisplayItems;
