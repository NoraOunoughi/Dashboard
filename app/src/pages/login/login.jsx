import React from "react";
import loginImg from "../../login.svg";
import GoogleButton from "react-google-button";
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";

export class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email : "",
        password : "",
        isLoginGoogle: false,
      }
      this.responseGoogle = this.responseGoogle.bind(this);
      this.NotResponse = this.NotResponse.bind(this);
  }

  mylogin = () => {

    axios.post("http://localhost:8080/users/login", {email : this.state.email, password : this.state.password})
       .then((response) => {
         if (response.data.message == 'authentificated') {
           console.log("CONNECTÉ")
            localStorage.setItem("dbemail", this.state.email)
            localStorage.setItem("dbfirstname", this.state.password)
            localStorage.setItem("isLogged", "true");
            window.location.reload();
         }
         if (response.data.message == 'Password is incorrect') {
          console.log("MAUVAIS MDP")
          alert("Mauvais mot de passe")
        }
        if (response.data.message == 'No user with that email address') {
          console.log("MAUVAIS PWD")
          alert("Veuillez mettre une adresse mail valide")
        }
         console.log(response.data.message)
       })
       .catch(e => {
         console.log(e)
       })
}

  NotResponse = (response, err) => {
    console.log("err");
  }
  responseGoogle = (response) => {

      localStorage.setItem("email", response.profileObj.email)
      localStorage.setItem("firstname", response.profileObj.givenName)
      localStorage.setItem("famname", response.profileObj.familyName)
      localStorage.setItem("profilePic", response.profileObj.imageUrl)


      console.log(response)
      if (response) {
          localStorage.setItem("isLogged", "true")
          this.setState({isLoginGoogle:"true"});
          window.location.reload();
      }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="text" name="username" placeholder="email"
              onChange={(e)=> {this.setState({email: e.target.value})}}  />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" 
              onChange={(e)=> {this.setState({password: e.target.value});
              }}  />
            </div>
          </div>
        </div>
        <div className="footer">
        <button type="button"
        onClick={() => {
          this.mylogin();
        }}
        className="btn">
          <Link to="/home" className="link">
            Login
          </Link>
          </button>
        </div>
        <div class="text">
            Or
        </div>
        <GoogleLogin
          clientId="112281650463-at5auctp2pr5aa2u091dqh194jbeenpt.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.NotResponse}
          cookiePolicy={'single_host_origin'
        }
      />
      </div>
    );
  }
}