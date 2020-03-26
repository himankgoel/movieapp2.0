import React, { useState, useContext } from "react";
import { loginUserWithEmailAndPassword } from "./Auth";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router";

function Login(props) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState({
    msg: "",
    style: { color: "red" } ,
    iconClass : "fas fa-lock fa-9x"
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUserLogin(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  async function handleSubmit() {
    setUserLogin({
      email: "",
      password: ""
    });
    const { email, password } = userLogin;
    const status = await loginUserWithEmailAndPassword(email, password);
    if (status === 200) {
      setMessage({ msg: "Login Successful !", style: { color: "green" } , iconClass : "fas fa-lock-open fa-9x" });
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
    <div className="form-class">
      <i class={message.iconClass} style={{marginLeft : "50%"}}></i>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          name="email"
          class="form-control form-control-width"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={userLogin.email}
          onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          name="password"
          class="form-control form-control-width"
          id="exampleInputPassword1"
          placeholder="Password"
          value={userLogin.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
      <p style={message.style}>{message.msg}</p>
    </div>
  );
}
export default Login;
