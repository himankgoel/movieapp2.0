import React, { useState , useContext } from "react";
import {registerUserWithNameEmailAndPass , toVerifyToken} from "./Auth";
import {UserContext} from "../UserContext"; 
import { Redirect } from "react-router";

function Register(props){
    const { user , setUser} = useContext(UserContext);
    const [userRegister , setUserRegister] = useState({ 
      name : "",
      email: "",
      password : ""
    });
    const [message, setMessage] = useState({
      msg: "",
      style: { }
    });

    async function tokenVerify(){
      const resp = await toVerifyToken();
      setUser(resp.data.user1);
    }

    function handleChange(event){
      const { name, value } = event.target;
      setUserRegister(prevValue => {
        return {
          ...prevValue,
          [name]: value
        }
      });
    }
    async function handleSubmit(){ 
      setUserRegister({
        name : "",
        email : "",
        password : ""
      });
      const {name , email , password} = userRegister;
      const status = await registerUserWithNameEmailAndPass(name,email,password);
      if(status === 200){
        setMessage({ msg: "Register Successful !", style: { color: "green" } });
        tokenVerify();
      setTimeout(() => {
        props.history.push("/");
      }, 1000);
      }else if(status === 400){
        setMessage({msg:"Email ID already registered.Login instead.",style:{color:"red"}});
      }else if(status === 204){
        setMessage({msg:"Enter all details and try again.",style:{color:"red"}});
      }else{
        setMessage({msg:"Unexpected error",style:{color:"red"}});
      }
    }



    return ( user ? <Redirect to="/"/> :
    <div>
        <div class="form-group">
      <label for="exampleInputEmail1">Name</label>
      <input type="text" name="name" class="form-control form-control-width" aria-describedby="emailHelp" placeholder="Enter name" onChange={handleChange} value={userRegister.name} />
    </div>

    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control form-control-width" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} value={userRegister.email}/>
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control form-control-width" name="password" id="exampleInputPassword1" placeholder="Password" onChange={handleChange}value={userRegister.password} />
    </div>
    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
  <p style={message.style}>{message.msg}</p>
  </div>)
}
export default Register;
