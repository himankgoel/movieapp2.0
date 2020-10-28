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


    return <div className="card mb-3" style={{maxWidth: "540px"}}>
    <div className="row no-gutters"> 
      <div className="col-md-4">
        <img src={Movie.Poster} className="card-img" alt={Movie.Title}/>
      </div>
      <div className="col-md-8 bg-light">
        <div className="card-body">
          <h5 className="card-title">{Movie.Title}</h5>
          <p className="card-text">{Movie.Plot}</p>
          <button className="btn btn-dark" onClick={handleClick}>
           <i className="fas fa-heart"/>  Added 
      </button>
        </div>
      </div>
    </div>
  </div>
}
export default HorizontalCard;