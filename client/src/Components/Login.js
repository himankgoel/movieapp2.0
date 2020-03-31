import React, { useState, useContext } from "react";
import { loginUserWithEmailAndPassword, toVerifyToken } from "./Auth";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router";

function Login(props) {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState({
    msg: "",
    style: { color: "red" },
    iconClass: "fas fa-lock"
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  async function tokenVerify() {
    const resp = await toVerifyToken();
    setUser(resp.data.user1);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setUserLogin(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setUserLogin({
      email: "",
      password: ""
    });
    const { email, password } = userLogin;
    const status = await loginUserWithEmailAndPassword(email, password);
    if (status === 200) {
      setMessage({
        msg: "Login Successful !",
        style: { color: "green" },
        iconClass: "fas fa-lock-open"
      });
      tokenVerify();
      setTimeout(() => {
        props.history.push("/");
      }, 1000);
    } else if (status === 404) {
      setMessage({ msg: "User not found.", style: { color: "red" } });
    } else {
      setMessage({ msg: "Invalid Credentials.", style: { color: "red" } });
    }
  }
  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="login-dark">
      <form onSubmit={handleSubmit}>
        <h2 class="sr-only">Login Form</h2>

        <div class="illustration">
          <i class={message.iconClass}></i>
        </div>

        <div class="form-group">
          <input
            type="email"
            name="email"
            class="form-control"
            placeholder="Enter email"
            value={userLogin.email}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="Password"
            value={userLogin.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          Login
        </button>
      </form>
      <p style={message.style}>{message.msg}</p>
    </div>
  );
}
export default Login;
