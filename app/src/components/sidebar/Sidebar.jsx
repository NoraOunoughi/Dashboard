import "./sidebar.scss";
import {
  LineStyle,
  PermIdentity,
  WbSunny,
  YouTube,
  GitHub,
  ExitToApp
  
} from "@material-ui/icons";


import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {

  var navigate = useNavigate();



  const mylogout = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("IsGoogleLogged")
    localStorage.removeItem("email")
    localStorage.removeItem("firstname")
    localStorage.removeItem("famname")
    localStorage.removeItem("profilePic")
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/home" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/profil" className="link">
            <li className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Profil
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Widgets</h3>
          <ul className="sidebarList">
            <Link to="/weather" className="link">
              <li className="sidebarListItem">
                <WbSunny className="sidebarIcon" />
                Weather
              </li>
            </Link>
            <Link to="/youtube" className="link">
              <li className="sidebarListItem">
                <YouTube className="sidebarIcon" />
                Youtube
              </li>
            </Link>
            <Link to="/github" className="link">
            <li className="sidebarListItem">
              <GitHub className="sidebarIcon" />
              Github
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Settings</h3>
          <ul className="sidebarList">
          <Link to="/" className="link">
            <button className="sidebarListItem2"
            onClick = {() => {
              mylogout();
            }}>
              <ExitToApp className="sidebarIcon" />
              Logout
            </button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
