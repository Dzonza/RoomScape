import DisplayItems from './DisplayItems/DisplayItems';
import FilterButtons from './FilterButtons/FilterButtons';
import SearchBar from './SearchBar/SearchBar';
import './search.scss';
import { useEffect, useRef, useState } from 'react';
const randomDestinations = [
  'ChIJ13DMKmvoAGARbVkfgUj_maM',
  'ChIJOwg_06VPwokRYv534QaPC8g',
  'ChIJXSModoWLGGARILWiCfeu2M0',
  'ChIJBeB5Twbb_3sRKIbMdNKCd0s',
  'ChIJIyaYpQC4h0gRJxfnfHsU8mQ',
  'ChIJG8CuwJzfAFQRNduKqSde27w',
];
const Search = () => {
  const [resultsFromSearch, setResultsFromSearch] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const scrollToElementRef = useRef(null);

  useEffect(() => {
    const getRandomNumber = Math.floor(Math.random() * 5) + 1;

    async function getTopTierStays() {
      try {
        const response = await fetch(
          `https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByPlace?id=${randomDestinations[getRandomNumber]}`,
          {
            headers: {
              'x-rapidapi-key':
                '1f7f07205emshcdc2654c5e66794p1f59ecjsn768b62a3e37d',
              'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
            },
          }
        );
        const result = await response.json();
        if (result.data.length === 0) return;
        setResultsFromSearch(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    getTopTierStays();
  }, []);

  return (
    <>
      <section id="search">
        <h3 className="search-container__title">Search</h3>
        <SearchBar
          setResultsFromSearch={setResultsFromSearch}
          setSpinner={setSpinner}
          scrollToElementRef={scrollToElementRef}
        />
        <FilterButtons
          setResultsFromSearch={setResultsFromSearch}
          setCurrentPage={setCurrentPage}
          setSpinner={setSpinner}
          setDisplayError={setDisplayErrorMessage}
          resultsFromSearch={resultsFromSearch}
        />
        <DisplayItems
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          displayError={displayErrorMessage}
          resultsFromSearch={resultsFromSearch}
          spinner={spinner}
          scrollToElementRef={scrollToElementRef}
        />
      </section>
    </>
  );
};

export default Search;
