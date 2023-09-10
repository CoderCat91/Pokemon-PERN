import { useState } from "react"
import Header from "../Header/Header"
import SearchBar from "../SearchBar/SearchBar"
import SearchResultsList from "../SearchBar/SearchResultsList";
const Home = () => {
  const [results, setResults] = useState();
  return (
    <div>
        <Header/>
        <SearchBar setResults={setResults}/>
        {results && results.length > 0 && <SearchResultsList results={results} />}
        Home
    </div>

  )
}

export default Home
