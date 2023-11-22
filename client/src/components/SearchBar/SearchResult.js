import { useNavigate } from "react-router-dom";


export const SearchResult = ({ result, result_id }) => {
  const navigate = useNavigate()

  const navigateTo = (e) => {
    navigate(`/details/${result_id}`)
  }
  return (
    <div
      className="search-result"
      onClick={(e) => navigateTo()}
    >
      {result}
      {result_id}
    </div>
  );
};
