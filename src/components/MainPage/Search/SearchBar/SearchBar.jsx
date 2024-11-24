import { useState, useCallback, useRef } from 'react';
import OfferedResults from './OfferedResults/OfferedResults';
import search from '/src/assets/searchLoader.svg';
import Spinner from '/src/components/ReusableComponents/Spinner/Spinner';
import './searchBar.scss';
import ErrorMessage from '../../../ReusableComponents/ErrorMessage/ErrorMessage';
import SearchIcon from './SearchIcon/SearchIcon';

const SearchBar = ({
  setResultsFromSearch,
  setSpinner,
  scrollToElementRef,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [cityID, setCityID] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [searchSpinner, setSearchSpinner] = useState(false);
  const debounceTimer = useRef();
  const handleSearchButton = useCallback(() => {
    if (!searchInput) return;
    setSearchError(false);
    setResultsFromSearch([]);
    setSpinner(true);

    async function getApartments() {
      try {
        const response = await fetch(
          `https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByPlace?id=${cityID}&totalRecords=40`,
          {
            headers: {
              'x-rapidapi-key':
                '1f7f07205emshcdc2654c5e66794p1f59ecjsn768b62a3e37d',
              'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
            },
          }
        );
        const result = await response.json();
        scrollToElementRef.current.scrollIntoView({ behavior: 'smooth' });
        setSpinner(false);
        setResultsFromSearch(result.data);
        setSearchResults([]);
        setSearchInput('');
        setCityID('');
      } catch (e) {
        console.error(e);
      }
    }
    getApartments();
  }, [
    searchInput,
    cityID,
    setResultsFromSearch,
    setSpinner,
    scrollToElementRef,
  ]);

  const getOfferedCities = useCallback(
    (input) => {
      // for search button
      if (cityID) {
        setCityID('');
      }
      if (!input) {
        setSearchResults([]);
        setSearchError('');
        return;
      }
      setSearchSpinner(true);
      async function fetchCities() {
        try {
          const response = await fetch(
            `https://airbnb19.p.rapidapi.com/api/v1/searchDestination?query=${input}`,
            {
              headers: {
                'x-rapidapi-key':
                  '1f7f07205emshcdc2654c5e66794p1f59ecjsn768b62a3e37d',
                'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
              },
            }
          );
          const result = await response.json();
          if (!result.data) {
            setSearchError('Invalid input, please try again');
            setSearchResults([]);
            setSearchSpinner(false);
            return;
          }
          if (result.data.length === 0) {
            setSearchError('Please enter a valid destination');
            setSearchResults([]);
            setSearchSpinner(false);
            return;
          }
          setSearchSpinner(false);
          setSearchResults(result.data);
        } catch (e) {
          console.error(e);
        }
      }
      fetchCities();
    },
    [cityID]
  );

  const handleSearchInput = useCallback(
    (e) => {
      setSearchInput(e.target.value);

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        getOfferedCities(e.target.value);
      }, 500);
    },
    [getOfferedCities]
  );

  return (
    <>
      <section className="search-bar">
        {searchSpinner ? (
          <Spinner spinnerImage={search} searchClass="search-spinner" />
        ) : (
          ''
        )}
        <input
          type="text"
          onChange={handleSearchInput}
          required
          className="search-bar__input"
          placeholder="Enter a destination"
          value={searchInput}
        />

        <SearchIcon onClick={handleSearchButton} cityID={cityID} />
        {searchError ? (
          <ErrorMessage messageStyle="search-error-message">
            {searchError}
          </ErrorMessage>
        ) : (
          ''
        )}
        {searchResults.length > 0 ? (
          <OfferedResults
            results={searchResults}
            setResults={setSearchResults}
            setSearch={setSearchInput}
            setID={setCityID}
          />
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default SearchBar;
