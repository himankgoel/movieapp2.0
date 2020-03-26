import React, { useState} from "react";
import CreateMovieTile from "./CreateMovieTile";
import NoResult from "./NoResult";
import { retrieveMovies } from "./Auth";
function Home() {
  const [query, setQuery] = useState(""); //TEXT ENTERED IN SEARCH BAR
  const [searchResults, setSearchResults] = useState([]); //SEARCH RESULTS BASED ON QUERY
  async function handleChange(event) {
    setQuery(event.target.value);
    if (query.length > 1) {
      const searchResults = await retrieveMovies(query);
      setSearchResults(searchResults);
    }
  }
  //DEFAULT HOME PAGE
  const movieArray = [
    {
      src:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      imdbID: "tt0848228",
      Title : "The Avengers"
    },
    {
      src:
        "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
      imdbID: "tt4154756",
      Title : "Avengers : Infinity War"
    },
    {
      src:
        "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
      imdbID: "tt2395427",
      Title : "Avengers : Age of Ultron"
    }
  ];

  return (
    <div>
      <div class="row custom-row">
          <div class="col-lg-6">
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Search for movie,series.."
          onChange={handleChange}
          autoFocus="true"
        />
        </div>
      </div>
      <div class="row custom-row">
        {query === "" &&
          movieArray.map(movie => {
            return <CreateMovieTile title={movie.Title} key={movie.imdbID} src={movie.src} imdbID={movie.imdbID}/>;
          })}
        {searchResults.length !== 0 && searchResults.map(movie => {
          return <CreateMovieTile title={movie.Title} src={movie.Poster} key={movie.imdbID} imdbID={movie.imdbID}  />;
        })}
        {searchResults.length === 0 && query !=="" && <NoResult/>}
      </div>
    </div>
  );
}
export default Home;
