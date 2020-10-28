import React from "react";

function SuggestedMovie(props){
    return <div className="col-lg-6">
        <img className="suggestedmovies-tile" src={props.src}
        alt={props.alt}/>
    </div>
}
export default SuggestedMovie;