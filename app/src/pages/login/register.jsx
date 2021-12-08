import React from "react";
import loginImg from "../../login.svg";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";


export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      username : "", 
      password : "",
    }
    //  this.myregister = this.myregister.bind(this);

  }
  myregister = () => {

    axios.post("http://localhost:8080/users/register", {name : this.state.username, email : this.state.email, password : this.state.password})
       .then((response) => {
         if (response.data.message == 'registered') {
           alert("Inscription Reussie, veuillez vous login")
         }
         if (response.data.message == 'utilisateur déjà existant') {
          alert("Vous avez déjà un compte")
        }
         console.log(response.data.message)
       })
       .catch(e => {
         console.log(e)
       })
}
  

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username"
               onChange={(e)=> {this.setState({username: e.target.value})}}  />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" 
               onChange={(e)=> {this.setState({email: e.target.value})}} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password"
               onChange={(e)=> {
                 this.setState({password: e.target.value});
                }
               } />
              
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn"
          onClick={() => {
            console.log(this.state.username, this.state.password, this.state.email)
            this.myregister();
          }}>
            Register
          </button>
        </div>
      </div>
    );
  }
}