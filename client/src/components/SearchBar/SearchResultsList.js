import "./SearchResultsList.scss";
import { SearchResult } from "./SearchResult";

const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results?.map((result, id) => {
        return <SearchResult result={result.name} 
        result_id={result.id}
        key={id} />;
      })}
    </div>
  );
};


export default SearchResultsList;