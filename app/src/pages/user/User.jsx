import {
  MailOutline,
  PermIdentity
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import "./user.scss";
import axios from "axios";

import { GoogleLogin, GoogleLogout } from "react-google-login";

export default function User() {

  var navigate = useNavigate();


  const OauthSpotify = async () => {
    axios.get("http://localhost:8080/services/loginSpotify")
        .then((response) => {

        })
        .catch(e => {
          console.log(e)
        })
  }


 const responseGoogle = (response) => {
    //localStorage.setItem("email", response.profileObj.email)
    // localStorage.setItem("firstname", response.profileObj.givenName)
    // localStorage.setItem("famname", response.profileObj.familyName)
    // localStorage.setItem("profilePic", response.profileObj.imageUrl)


    //console.log(response)
    if (response) {
        localStorage.setItem("email", response.profileObj.email)
        localStorage.setItem("firstname", response.profileObj.givenName)
        localStorage.setItem("famname", response.profileObj.familyName)
        localStorage.setItem("profilePic", response.profileObj.imageUrl)
        //var msg = `Vous êtes desormais connecté, bienvenue ${response.profileObj.givenName}`
        //localStorage.setItem("nameUserGoogle", response.profileObj.givenName)
        localStorage.setItem("isGoogleLogged", "true")
        //alert(msg)

        console.log(response)
        //localStorage.setItem("isLogged", "true")
        //this.setState({isLoginGoogle:"true"});
    }
}

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Profil</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={localStorage.getItem("profilePic")}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{localStorage.getItem("firstname")}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{localStorage.getItem("famname")}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{localStorage.getItem("email")}</span>
            </div>
          </div>
          <GoogleLogin
                clientId="112281650463-at5auctp2pr5aa2u091dqh194jbeenpt.apps.googleusercontent.com"
                buttonText="Change Account"
                onSuccess={responseGoogle}
                onFailure={console.log("err")}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'
              }/>
              <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={response => {

              var msg = `Aurevoir ${localStorage.getItem("nameUserGoogle")}`
              alert(msg);
              localStorage.removeItem("email")
              localStorage.removeItem("firstname")
              localStorage.removeItem("famname")
              localStorage.removeItem("profilePic")
              localStorage.removeItem("nameUserGoogle")
              localStorage.removeItem("isGoogleLogged")
              localStorage.removeItem("isLogged");
              navigate("/");
              window.location.reload();
            }}
          />
          <button>
          <a href="http://localhost:8080/services/loginSpotify">Login Spotify</a>
          </button>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={
                    localStorage.getItem("isGoogleLogged") ? localStorage.getItem("famname") : localStorage.getItem("dbfirstname")}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={localStorage.getItem("isGoogleLogged") ? localStorage.getItem("email") : localStorage.getItem("dbemail")}
                  className="userUpdateInput"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
