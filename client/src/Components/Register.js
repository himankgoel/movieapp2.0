import React, { useState, useContext } from "react";
import { registerUserWithNameEmailAndPass, toVerifyToken } from "./Auth";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router";

function Register(props) {
  const { user, setUser } = useContext(UserContext);
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState({
    msg: "",
    style: { color: "red" },
    iconClass: "fas fa-user-edit"
  });

  async function tokenVerify() {
    const resp = await toVerifyToken();
    setUser(resp.data.user1);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUserRegister(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  function handleSubmit(e) {
    
    const { name, email, password } = userRegister;
    const status = registerUserWithNameEmailAndPass(
      name,
      email,
      password
    );
    if (status === 200) {
      setMessage({msg: "Register Successful !", style: { color: "green" } , iconClass:"fas fa-user-check"});
      tokenVerify();
      setTimeout(() => {
        props.history.push("/");
      }, 1000);
    } else if (status === 400) {
      setMessage({
        msg: "Email ID already registered.Login instead.",
        style: { color: "red" },
        iconClass: "fas fa-user-edit"
      });
    } else if (status === 204) {
      setMessage({
        msg: "Enter all details and try again.",
        style: { color: "red" },
        iconClass: "fas fa-user-edit"
      });
    } else {
      setMessage({ msg: "Unexpected error", style: { color: "red" } , iconClass: "fas fa-user-edit" });
    }
    setUserRegister({
      name: "",
      email: "",
      password: ""
    });
    e.preventDefault();
  }

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="login-dark">
      
      <form onSubmit={handleSubmit}>
      <h2 className="sr-only">Register Form</h2>
      <div className="illustration">
          <i className={message.iconClass}></i>
        </div>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter name"
          onChange={handleChange}
          value={userRegister.name}
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          value={userRegister.email}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control form-control-width"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={userRegister.password}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block" >
        Register
      </button>
      </form>
      <p style={message.style}>{message.msg}</p>
    </div>
  );
}
export default Register;
