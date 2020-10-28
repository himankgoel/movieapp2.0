import React, { useState} from "react";
import CreateMovieTile from "./CreateMovieTile";
import NoResult from "./NoResult";
import { retrieveMovies } from "./Auth";
function Home() {
  const [query, setQuery] = useState(""); //TEXT ENTERED IN SEARCH BAR
  const [searchResults, setSearchResults] = useState([]); //SEARCH RESULTS BASED ON QUERY
  async function handleChange(event) {
    setQuery(event.target.value);
      try{
      const searchResults = await retrieveMovies(event.target.value);
      setSearchResults(searchResults);
      }
      catch(err){
          setSearchResults([]);
      }
  }

  return (
    <div>
      <div className="row ">
          <div className="col-lg-6 container mt-5 col-sm-10">
        <input
        style={{borderColor : "black"}}
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Search for movie,series.."
          onChange={handleChange}
          autoFocus={true}
        />
        </div>
      </div>
      <div className="row custom-row">
        {searchResults.length !== 0 && searchResults.map(movie => {
          return <CreateMovieTile title={movie.Title} src={movie.Poster} key={movie.imdbID} imdbID={movie.imdbID}  />;
        })}
        {searchResults.length === 0 && query !=="" && <NoResult/>}
      </div>
    </div>
  );
}
export default Home;
