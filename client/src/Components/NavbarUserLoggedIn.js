import React from "react";
import { Link } from "react-router-dom";
function NavbarUserLoggedIn(props) {

  function handleClick() {
    localStorage.setItem("token", null);
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          MovieInfo
        </Link>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/favourite-movies">
                <i className="far fa-heart" /> Favourites
              </Link>
            </li>
            </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" data-toggle="modal" data-target="#myModal" to="/">
                Logout
              </Link>

              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Confirmation</h4>
                      <button type="button" className="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>Do you want to Logout?.</p>
                    </div>
                    <div className="modal-footer">
                      <Link
                        type="button"
                        data-dismiss="modal"
                        onClick={handleClick}
                        to="/"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default NavbarUserLoggedIn;
