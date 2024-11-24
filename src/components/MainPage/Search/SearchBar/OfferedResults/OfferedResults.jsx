import { useCallback } from 'react';
import './offeredResults.scss';

const OfferedResults = ({ results, setSearch, setID, setResults }) => {
  const handleResultsClick = useCallback(
    (id, location) => {
      setID(id);
      setSearch(location);
      setResults([]);
    },
    [setID, setSearch, setResults]
  );

  return (
    <section className="results-container">
      {results.map((result) => {
        return (
          <p
            onClick={() => {
              handleResultsClick(result.id, result.location_name);
            }}
            className="results-container__title"
            key={result.id}
          >
            {result.location_name}
          </p>
        );
      })}
    </section>
  );
};

export default OfferedResults;
