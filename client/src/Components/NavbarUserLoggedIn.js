import React , {useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../UserContext";
function NavbarUserLoggedIn(props){


    const { user  } = useContext(UserContext);

    function handleClick(){
        localStorage.setItem("token",null);
    }
    return (<div>


        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link class="navbar-brand" to="/"> {user.name}'s muviesbox</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">

    <ul class="navbar-nav ml-auto">

      <li class="nav-item">
        <Link class="nav-link" to="/favourite-movies"><i class="far fa-heart"/>  Favourites</Link>
      </li>

      <li class="nav-item">
      <Link class="nav-link" data-toggle="modal" data-target="#myModal">Logout</Link>

<div class="modal fade" id="myModal" role="dialog">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Confirmation</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Do you want to Logout?.</p>
      </div>
      <div class="modal-footer">
        <Link type="button" data-dismiss="modal"onClick={handleClick} >Logout</Link>
      </div>
    </div>
  </div>
</div>
      </li>
    </ul>

    
  </div>
</nav>
</div>);
}
export default NavbarUserLoggedIn;

