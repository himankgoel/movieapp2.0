import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router";
import HorizontalCard from "./HorizontalCard";


function FavouriteMovies() {
  const { user } = useContext(UserContext);

  

  if (user === null) return <Redirect to="/login" />;
  else
    return (
        <div>
      <div className="row custom-row">
        <div className="col-lg-5"> 
        </div>
      </div>
      <div className="row">
            { user.favouriteMovies.length === 0 && <h1>No movies here.</h1>}
            { user.favouriteMovies.length !== 0 && user.favouriteMovies.map(id => {
          return <HorizontalCard key={id} imdbID={id}/>;
        }) }
        </div>
      </div>
    );
}
export default FavouriteMovies;
