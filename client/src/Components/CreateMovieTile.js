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
    <div className="card" style={{ width: "14rem" }}>
      <Link to={to}>
        <img src={props.src} className="card-img-top" alt={props.alt} />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>

        {user === null && (
          <Link to="/login" className="btn btn-dark">
            <i className="far fa-heart" /> Add to Favourites
          </Link>
        )}
        {user !== null && (!isAddedToFavourite) && (
          <button className="btn btn-dark" onClick={handleClickToAdd}>
               <i className="far fa-heart" /> Add to Favourites
          </button>
        )}
        {user !== null && (isAddedToFavourite) && (
           <button className="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
           <i className="fas fa-heart" />  Added 
      </button>
        )}
      </div>
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        To remove, go to favourite movie page
      </div>
      <div className="modal-footer">
        <Link type="button" classNameName="btn btn-primary" data-dismiss="modal">Movies can be removed from Favourites Tab</Link>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
export default CreateMovieTile;

