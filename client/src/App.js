import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import MovieDetailPage from "./Components/MovieDetailPage";
import { UserContext } from "./UserContext";
import { toVerifyToken } from "./Components/Auth";
import FavouriteMovies from "./Components/FavouriteMovies";
import NavbarUserLoggedIn from "./Components/NavbarUserLoggedIn";

function App() {
  const [user, setUser] = useState(null);

  async function tokenVerify () {
    if (localStorage.getItem("token") != null) {
      const resp = await toVerifyToken();
      if (resp.status === 200) setUser(resp.data.user1);
      else setUser(null);
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    tokenVerify();
  }, [user]);
  return (
    <BrowserRouter>
      <Switch>
        <div>
          <UserContext.Provider value={{ user, setUser }}>
            {user ? <NavbarUserLoggedIn /> : <Navbar />}
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/info/:movieid" component={MovieDetailPage} />
            <Route exact path="/favourite-movies" component={FavouriteMovies} />
          </UserContext.Provider>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
