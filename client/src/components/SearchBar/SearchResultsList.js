import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = ({results}) => {
    return (
        <div>
             {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
        </div>
    );
};

export default SearchResultsList;