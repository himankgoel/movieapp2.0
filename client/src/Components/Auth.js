import axios from "axios";



export const loginUserWithEmailAndPassword = async (email , password) => {
   return axios.post("/api/user/login",{email , password})
    .then(res => {
        const resp = res;
        localStorage.setItem("token" , resp.data.token);
        return resp.status;
    })
    .catch(err => {
        return err.response.status;
    }); 
}

export const toVerifyToken = async() => {
    const token = localStorage.getItem("token");
    return axios.post("/api/tokenverify" , {token})
    .then(res => {
        const resp = res;
        return resp;
    })
    .catch(err => {
        return err;
    });
}

export const registerUserWithNameEmailAndPass = async(name , email , password) => {
    return axios.post("api/user/register" ,{name , email , password})
    .then(res => {
        const resp = res;
        console.log(resp);
        localStorage.setItem("token" , resp.data.token);
        return resp.status;
    })
    .catch(err => {
        return err.response.status;
    })
}
export const retrieveMovies = async (query) =>{
    return axios.get("http://www.omdbapi.com/?apikey=b0168903&s=" + query)
    .then(res => {
        if(res.data.Response === "True"){
            const searchResults = res.data.Search;
            return searchResults;
        }else{
            return [];
        }
    });
}

export const addToFavourite = async (imdbID) => {
    const token = localStorage.getItem("token");
    return axios.post("/api/user/addmovie",{token , imdbID});
}
export const removeFromFavourite = async (imdbID) => {
    const token = localStorage.getItem("token");
    return axios.post("/api/user/deletemovie",{token,imdbID});
}