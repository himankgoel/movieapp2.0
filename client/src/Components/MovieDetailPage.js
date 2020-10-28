import React , {useState, useEffect} from "react";

import axios from "axios";

function MovieDetailPage(props){

  


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
        axios.get("http://www.omdbapi.com/?apikey=b0168903&i=" + props.match.params.movieid + "&plot=full") 
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
            console.log(res.data);
            setMovie({Title,Year,Rated,Released,Runtime,Genre, Director , Plot, Poster, Ratings,type});
    });
    },[props.match.params.movieid]);
    return <div className="row second-row">
        <div className="col-lg-4">
            <img src={Movie.Poster}
             alt={Movie.Title}/>
        </div>

        <div className="col-lg-4">
            <div><h1>{Movie.Title}</h1></div>
            <h5>{Movie.Year}</h5>
            <h5>{Movie.Genre} </h5>
            <h6>Plot : {Movie.Plot} </h6>
            <img src="https://yts.mx/assets/images/website/logo-imdb.svg" alt="IMDb Rating"></img>
            <div style={{marginBottom : "5em"}}>
            <h6>{Movie.Ratings.Value}</h6>
        </div>
        </div>
     </div>
} 
export default MovieDetailPage;