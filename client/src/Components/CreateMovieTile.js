import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link} from "react-router-dom";
import { addToFavourite} from "./Auth";

function CreateMovieTile(props) {
  const { user } = useContext(UserContext);
  const [isAddedToFavourite, setIsAddedToFavourite] = useState(false);


  async function handleClickToAdd() {  
    await addToFavourite(props.imdbID);
    setIsAddedToFavourite(true);
  }
  const to = "/info/" + props.imdbID; 

  useEffect(() => {
       if(user !== null){
           if(user.favouriteMovies.includes(props.imdbID)){
               setIsAddedToFavourite(true);
           }
       }
  },[user, props.imdbID]);

  
  return (
    <div class="card" style={{ width: "14rem" }}>
      <Link to={to}>
        <img src={props.src} class="card-img-top" alt={props.alt} />
      </Link>
      <div class="card-body">
        <h5 class="card-title">{props.title}</h5>

        {user === null && (
          <Link to="/login" class="btn btn-dark">
            <i class="far fa-heart" /> Add to Favourites
          </Link>
        )}
        {user !== null && (!isAddedToFavourite) && (
          <button class="btn btn-dark" onClick={handleClickToAdd}>
               <i class="far fa-heart" /> Add to Favourites
          </button>
        )}
        {user !== null && (isAddedToFavourite) && (
           <button class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
           <i class="fas fa-heart" />  Added 
      </button>
        )}
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        To remove, go to favourite movie page
      </div>
      <div class="modal-footer">
        <Link type="button" class="btn btn-primary" data-dismiss="modal">Movies can be removed from Favourites Tab</Link>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
export default CreateMovieTile;

