import React , {useState, useEffect} from "react";
import axios from "axios";
import {removeFromFavourite} from "./Auth";

function HorizontalCard(props){


    async function handleClick(){
        await removeFromFavourite(props.imdbID);
        }
    const [Movie , setMovie] = useState(
        {       Title : "", 
                Year : "",
                Rated : "",
                Released :"",
                Runtime :"",
                Genre :"" ,
                Director :"" ,
                Plot:"" ,
                Poster:"" ,
                Ratings : [] ,
                type:""}
    );
    //DATA RETRIEVED FROM OMDAPI
    useEffect(() => {
        axios.get("http://www.omdbapi.com/?apikey=b0168903&i=" + props.imdbID) 
        .then(res => {
            const Title = res.data.Title;
            const Year = res.data.Year;
            const Rated = res.data.Rated;
            const Released = res.data.Released;
            const Runtime = res.data.Runtime;
            const Genre = res.data.Genre;
            const Director = res.data.Director;
            const Plot = res.data.Plot;
            const Poster = res.data.Poster;
            const Ratings = res.data.Ratings[0];
            const type = res.data.type;
            setMovie({Title,Year,Rated,Released,Runtime,Genre, Director , Plot, Poster, Ratings,type});
    });
    });


    return <div class="card mb-3" style={{maxWidth: "540px"}}>
    <div class="row no-gutters"> 
      <div class="col-md-4">
        <img src={Movie.Poster} class="card-img" alt={Movie.Title}/>
      </div>
      <div class="col-md-8 bg-light">
        <div class="card-body">
          <h5 class="card-title">{Movie.Title}</h5>
          <p class="card-text">{Movie.Plot}</p>
          <button class="btn btn-dark" onClick={handleClick}>
           <i class="fas fa-heart"/>  Added 
      </button>
        </div>
      </div>
    </div>
  </div>
}
export default HorizontalCard;