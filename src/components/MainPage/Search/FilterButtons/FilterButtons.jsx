import { useCallback } from 'react';
import './filterButtons.scss';
import { useSelector } from 'react-redux';
import BookmarkIcon from './BookmarkIcon/BookmarkIcon';
import SortHighestIcon from './SortHighestIcon/SortHighestIcon';
import SortLowestIcon from './SortLowestIcon/SortLowestIcon';

const FilterButtons = ({
  setResultsFromSearch,
  setSpinner,
  setDisplayError,
  resultsFromSearch,
  setCurrentPage,
}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleBookmarkBtn = useCallback(() => {
    if (!isLoggedIn) {
      setResultsFromSearch([]);
      setDisplayError('Please login first to use bookmarks.');
      return;
    }
    setSpinner(true);
    async function getBookmarkedApartments() {
      try {
        const response = await fetch(
          `http://localhost:3000/bookmarks?userId=${sessionStorage.getItem(
            'currentUserId'
          )}`
        );
        const result = await response.json();
        if (result.length === 0) {
          setSpinner(false);
          setResultsFromSearch([]);
          setDisplayError(
            'No bookmarked apartments found, time to start exploring! 😀'
          );
          return;
        }

        let bookedApartments = [];
        result.forEach((res) => {
          bookedApartments.push(res.apartment);
        });
        setSpinner(false);
        setCurrentPage(1);
        setResultsFromSearch(bookedApartments);
      } catch (e) {
        console.error(e);
        setSpinner(false);
      }
    }
    getBookmarkedApartments();
  }, [
    setResultsFromSearch,
    setSpinner,
    isLoggedIn,
    setDisplayError,
    setCurrentPage,
  ]);

  const handleSortBtn = useCallback(
    (type) => {
      if (resultsFromSearch.length === 0) {
        setDisplayError('No items to sort, please use the search first.');
        return;
      }
      const newArray = resultsFromSearch.map((result) => {
        let newPrice = result.price;
        if (typeof result.price === 'string') {
          newPrice = result.price.slice(1);

          if (newPrice.includes(',')) {
            newPrice = newPrice.replace(',', '');
          }
        }
        return {
          ...result,
          price: parseInt(newPrice),
        };
      });

      if (type === 'highest') {
        newArray.sort((a, b) => b.price - a.price);
        setResultsFromSearch(newArray);
      } else {
        newArray.sort((a, b) => a.price - b.price);
        setResultsFromSearch(newArray);
      }
    },
    [resultsFromSearch, setResultsFromSearch, setDisplayError]
  );

  return (
    <section className="filter-buttons">
      <BookmarkIcon onClick={handleBookmarkBtn} />
      <SortHighestIcon onClick={handleSortBtn} />
      <SortLowestIcon onClick={handleSortBtn} />
    </section>
  );
};

export default FilterButtons;
