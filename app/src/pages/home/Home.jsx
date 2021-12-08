import "./home.scss";
import { useState } from "react";
import axios from "axios";
import ReactPlayer from 'react-player'
import { Widget } from "../../components/widget/Widget";
import { Link } from "react-router-dom";


import {
  WbSunny,
  YouTube,
  GitHub,
  MusicNote,
  AccessTime
} from "@material-ui/icons";

export default function Home() {

  const [widgetsArray, setWidgetsArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weatherSubmenu, setWeatherSubmenu] = useState(false);
  const [youtubeSubmenu, setYoutubeSubmenu] = useState(false);
  const [githubSubmenu, setGithubSubmenu] = useState(false);
  const [googleSubmenu, setGoogleSubmenu] = useState(false);
  const [timeSubmenu, setTimeSubmenu] = useState(false);

  const [myresponse, setMyresponse] = useState(false);
  const [myresponse2, setMyresponse2] = useState(false);
  const [myresponse3, setMyresponse3] = useState(false);
  const [myresponse4, setMyresponse4] = useState(false);
  const [myresponse5, setMyresponse5] = useState(false);
  const [myresponse6, setMyresponse6] = useState(false);
  const [myresponse7, setMyresponse7] = useState(false);


  const [mytimeyt, setTimerYt] = useState(120);
  const [mytimegithub, setTimerGithub] = useState(120);
  const [mytimeSp, setTimerSp] = useState(120);
  const [mytime, setTimer] = useState(120);



  const [mycity, setCity] = useState("");
  const [mysong, setSong] = useState("");

  const [mycity2, setCity2] = useState("");
  const [myuser, setUser] = useState("");
  const [myuser2, setUser2] = useState("");

  const [youtube, setYoutube] = useState("");
  const [searchyt, setSearchyt] = useState("");
  const [responseChanel, setResponseChanel] = useState("");
  const [searchSpotify, setSearchSpotify] = useState("");
  const [mysearchanel, setSearchanel] = useState("");

  const [responseSearchWeather, setResponseSearchWeather] = useState("");
  const [responseGithubUser, setResponseGitUser] = useState("");
  const [responseGithubRepo, setResponseGitRepo] = useState("");
  const [responseSearchUV, setResponseSearchUV] = useState("");
  const [responseArt, setResponseArt] = useState("");
  const [responsePlaylist, setResponsePlaylist] = useState("");
  const [mydescription, setDName] = useState("");
  const [myplaylist, setPName] = useState("");




  const [id, setId] = useState(0)


  const deleteWidget = (id) => {
    const newArray = widgetsArray.filter(widget => widget.id !==  id)
    setWidgetsArray(newArray)
  }


  const fctSearchUV = async () => {
    axios.post("http://localhost:8080/services/UV", {city : mycity2})
        .then((response) => {
          console.log("WIDGET UV")
          setResponseSearchUV(response.data.message)
          setMyresponse2(true);

        })
        .catch(e => {
          setMyresponse2(false)
          console.log(e)
        })
  }

  const searchUv = async () => {
    fctSearchUV();
    setInterval((function() {
      fctSearchUV();
      }),mytime * 1000)
      
      if (myresponse2 === true) {
          setIsModalOpen(false);
            setWidgetsArray([
              ...widgetsArray,
              {
                id: id,
                widget: <Widget
                children={
                  <div className="weather-card2">
                    <div className="sun" />
                    <h1>{responseSearchUV}</h1>
                    <p>{mycity2}</p>
                    <button onClick={() => deleteWidget(id)}>X</button>
                  </div>
                }
              />,
              } 
            ]);}       
        setId(id + 1)

  };

  
  const fctGituser = async () => {
    axios.post("http://localhost:8080/services/Gituser", {user : myuser})
        .then((response) => {
          console.log("USER GITHUB")

          setResponseGitUser(response.data.message)
          setMyresponse3(true);

        })
        .catch(e => {
          setMyresponse3(false)
          console.log(e)
        })
  }

  const searchGituser = async () => {
  
    fctGituser();
    setInterval((function() {
      fctGituser();
      }),mytimegithub * 1000)
      
      if (myresponse3 === true) {
          setIsModalOpen(false);
            setWidgetsArray([
              ...widgetsArray,
            {
              id: id,
              widget : <Widget
                children={
                  <div className="weather-card4">
                    <div className="sun" />
                    <h1><img src={responseGithubUser[1]}
                    width="280"
                    height="270"/></h1>
                    <p>
                      <pre>Followers: {responseGithubUser[2]}</pre>
                      <pre>Public repos: {responseGithubUser[4]}</pre>
                      <pre />

                      {myuser}</p>
                      <button onClick={() => deleteWidget(id)}>X</button>
                  </div>
                }
              />,
              }
            ]);}
        setId(id + 1)

  };



  const fctSpotifyPlaylist= async () => {
    console.log(myplaylist)
    console.log(mydescription)
    axios.post("http://localhost:8080/services/createPlaylist", {playlist : localStorage.getItem("namePlaylist"), description : localStorage.getItem("nameDescription")})
        .then((response) => {
          console.log(response.data.message)
        })
        .catch(e => {
          console.log(e)
        })
  }


  const searchPlaylist = async () => {
          setIsModalOpen(false);
            setWidgetsArray([
              ...widgetsArray,
            {
              id: id,
              widget : <Widget
                children={
                  <div className="weather-card6">
                    <div className="sun" />
                    <h1><img src="https://i.pinimg.com/originals/3c/d4/53/3cd453f0a81c4c04d2f38c6e04219ea6.png"
                    width="280"
                    height="270"/></h1>
                    <p>
                    <input type="text" placeholder="Playlist Name" onChange={(e) => {localStorage.setItem("namePlaylist",e.target.value)}} />
                    <pre></pre>
                    <input type="text" placeholder="Description" onChange={(e) => {localStorage.setItem("nameDescription",e.target.value)}} />
                    <pre></pre>
                    <button className="homeSubmenu"
                          onClick={() => {
                            fctSpotifyPlaylist();
                          }
                      }>Create</button>
                      </p>
                      <button onClick={() => deleteWidget(id)}>X</button>
                  </div>
                }
              />,
              }
            ]);
        setId(id + 1)

  };



  const fctSpotifyArt= async () => {
    axios.post("http://localhost:8080/services/searchSpotify", {song : mysong})
        .then((response) => {
          console.log("Spotify ART")
          console.log(response.data.message)
          setResponseArt(response.data.message)
          setMyresponse6(true);

        })
        .catch(e => {
          setMyresponse6(false)
          console.log(e)
        })
  }


  const searchArt = async () => {
  
    fctSpotifyArt();
    setInterval((function() {
      fctSpotifyArt();
      }),mytimeSp * 1000)
      
      if (myresponse6 === true) {
          setIsModalOpen(false);
            setWidgetsArray([
              ...widgetsArray,
            {
              id: id,
              widget : <Widget
                children={
                  <div className="weather-card6">
                    <div className="sun" />
                    <h1><img src="https://i.pinimg.com/originals/3c/d4/53/3cd453f0a81c4c04d2f38c6e04219ea6.png"
                    width="280"
                    height="270"/></h1>
                    <p>
                      <pre>Name: {responseArt[0]}</pre>
                      <pre>Followers: {responseArt[1]}</pre>

                      <pre />

                      </p>
                      <button onClick={() => deleteWidget(id)}>X</button>
                  </div>
                }
              />,
              }
            ]);}
        setId(id + 1)

  };


  const fctGitrepo = async () => {
    axios.post("http://localhost:8080/services/SearchGitrepo", {user : myuser2})
        .then((response) => {
          console.log("REPO GITHUB")
          setResponseGitRepo(response.data.message)
          setMyresponse4(true);

        })
        .catch(e => {
          setMyresponse4(false)
          console.log(e)
        })
  }

  const searchGitRepo = async () => {
  
   
    fctGitrepo();
    setInterval((function() {
      fctGitrepo();
    }),mytimegithub * 1000)
    
    if (myresponse4 === true) {
        setIsModalOpen(false);
          setWidgetsArray([
            ...widgetsArray,
          {
            id: id,
            widget : <Widget
              children={
                <div className="weather-card5">
                  <div className="sun" />
                  <h1><img src={"https://cdn.neow.in/news/images/uploaded/2021/04/1619644762_github-desktop_story.jpg"}
                  width="500"
                  opacity="0.2"
                  height="300"/></h1>
                  <p>
                  <a href={responseGithubRepo[0][1]} target="_blank"><pre>{responseGithubRepo[0][0]}</pre></a>
                  <a href={responseGithubRepo[1][1]} target="_blank"><pre>{responseGithubRepo[1][0]}</pre></a>
                  <a href={responseGithubRepo[2][1]} target="_blank"><pre>{responseGithubRepo[2][0]}</pre></a>
                  <a href={responseGithubRepo[3][1]} target="_blank"><pre>{responseGithubRepo[3][0]}</pre></a>
                  <a href={responseGithubRepo[4][1]} target="_blank"><pre>{responseGithubRepo[4][0]}</pre></a>
                    <pre />


                    {myuser2}</p>
                    <button onClick={() => deleteWidget(id)}>X</button>
                </div>
              }
            />,
            }
          ]);}
      setId(id + 1)

  };

  const fctSearchWeather = async () => {
    axios.post("http://localhost:8080/services/Weather", {city : mycity})
        .then((response) => {
          console.log("WIDGET WEATHER")
          setResponseSearchWeather(response.data.message)
          setMyresponse(true);

        })
        .catch(e => {
          setMyresponse(false)
          console.log(e)
        })
  }

  const searchWeather = async () => {

    fctSearchWeather()
    setInterval((function() {
      fctSearchWeather()
      }),mytime * 1000)
      
      if (myresponse === true) {
      setIsModalOpen(false);
      setWidgetsArray([
        ...widgetsArray, 
      {
        id: id,
        widget : <Widget
          children={
            <div className="weather-card">
              <div className="sun" />
              <h1>{responseSearchWeather}</h1>
              <p>{mycity}</p>
              <button onClick={() => deleteWidget(id)}>X</button>
            </div>
          }
        />,
      }
    ]);}       
    setId(id + 1)
  };
  
  const fctSearchChanel = async () => {
    axios.post("http://localhost:8080/services/getYoutubechannel", {channel : mysearchanel})
        .then((response) => {
          console.log("WIDGET CHAN YT")
          setResponseChanel(response.data.message)
          setMyresponse5(true);

        })
        .catch(e => {
          setMyresponse5(false)
          console.log(e)
        })
  }

  const searchChanel = async () => {
    fctSearchChanel();
    setInterval((function() {
      fctSearchChanel();
      }),mytimeyt * 1000)

      if (myresponse5 === true) {
      setIsModalOpen(false);
      setWidgetsArray([
        ...widgetsArray, 
      {
        id: id,
        widget : <Widget
        children={
          <div className="weather-card4">
            <div className="sun" />
            <h1><img src={responseChanel[0]}
            width="280"
            height="270"/></h1>
            <p>
              <pre>Subs: {responseChanel[1][1]}</pre>
              <pre />

              {mysearchanel}</p>
              <button onClick={() => deleteWidget(id)}>X</button>
          </div>
        }
        />,
      }
      ]);}
    setId(id + 1)
  };

  
  const searchYoutube = async () => {

    axios.post("http://localhost:8080/services/SearchYoutubeVideo", {video : searchyt})
        .then((response) => {
          var myurl = `https://www.youtube.com/watch?v=${response.data.message}`;

          setIsModalOpen(false);
          setWidgetsArray([
            ...widgetsArray,
          {
            id: id,
            widget : <Widget
              children={
                <div className="weather-card3">
                  <ReactPlayer
                      url={myurl}
                      controls
                      playbackRate = {1}
                      width = "500px"
                      height = "290px"
                      />
                  <button onClick={() => deleteWidget(id)}>X</button>
                </div>
              }
            />,
          }
          ]);
        })
        .catch(e => {
          console.log(e)
          setYoutube("Youtube doesn't work")
        })
        setId(id + 1)
  };

  return (
    <div className="home">
      <div className="homeTitleContainer">
        <h1 className="homeTitle">home</h1>
          <button className="homeAddButton" onClick={() => setIsModalOpen(true)}>Create</button>
            {isModalOpen && (
            <div className="hide-content">
              <div className="modal-box">
                <h1><center>Widgets</center></h1>
                  <div className="divbutton">
                    <div className="weather-button">
                      <button className="homeAddButton2" onClick={() => weatherSubmenu ? setWeatherSubmenu(false) : setWeatherSubmenu(true)}><WbSunny/>Weather</button>
                      {weatherSubmenu &&
                        <div className="submenu-container">
                          <input type="text" placeholder="Enter your Weather city" onChange={(e) => {setCity(e.target.value)}} />
                          <input type="text" placeholder="Enter your UV city" onChange={(e) => {setCity2(e.target.value)}} />
                          <input type="text" placeholder="Timer secondes" onChange={(e) => {setTimer(e.target.value)}} />
                          <button className="homeSubmenu" onClick={() => {
                                searchWeather();
                          }}>Temperature by City</button>

                          <button className="homeSubmenu" 
                          onClick={() => {
                            searchUv();
                          }
                            }>UV By City</button>
                        </div>
                      }
                    </div>  
                    <div className="github-button">
                      <button className="homeAddButton2" onClick={() => githubSubmenu ? setGithubSubmenu(false) : setGithubSubmenu(true)}><GitHub/>Github</button>
                      {githubSubmenu &&
                        <div className="submenu-container">
                            <input type="text" placeholder="User" onChange={(e) => {setUser(e.target.value)}} />
                            <input type="text" placeholder="Repo User" onChange={(e) => {setUser2(e.target.value)}} />
                            <input type="text" placeholder="Timer secondes" onChange={(e) => {setTimerGithub(e.target.value)}} />

                          <button className="homeSubmenu"
                          onClick={() => {
                            searchGituser();

                          }
                          }>View User</button>
                          <button className="homeSubmenu"
                           onClick={() => {
                            searchGitRepo();

                          }
                          }>Git Repo</button>
                        </div>
                      }
                    </div>
                    <div className="youtube-button">
                      <button className="homeAddButton2" onClick={() => youtubeSubmenu ? setYoutubeSubmenu(false) : setYoutubeSubmenu(true)}><YouTube/>Youtube</button>
                      {youtubeSubmenu &&
                        <div className="submenu-container">
                          <input type="text" placeholder="Video name" onChange={(e) => {setSearchyt(e.target.value)}} />
                          <input type="text" placeholder="Chanel name" onChange={(e) => {setSearchanel(e.target.value)}} />
                          <input type="text" placeholder="Timer secondes" onChange={(e) => {setTimerYt(e.target.value)}} />


                          <button className="homeSubmenu"
                          onClick={() => {
                            searchYoutube();

                          }
                          }>Search Video</button>
                          <button className="homeSubmenu"
                          onClick={() => {
                            searchChanel();

                          }
                          }>Search Chanel </button>
                        </div>
                      }
                    </div>
                    <div className="google-button">
                      <button className="homeAddButton2" onClick={() => googleSubmenu ? setGoogleSubmenu(false) : setGoogleSubmenu(true)}><MusicNote/>Spotify</button>
                      {googleSubmenu &&
                        <div className="submenu-container">
                          <input type="text" placeholder="Artist Name" onChange={(e) => {setSong(e.target.value)}} />
                          <input type="text" placeholder="Timer secondes" onChange={(e) => {setTimerSp(e.target.value)}} />

                          <button className="homeSubmenu"
                          onClick={() => {
                            searchArt();
                          }
                          }>Search Artist</button>
                          <button className="homeSubmenu"
                          onClick={() => {
                            searchPlaylist();
                          }
                          }>Create Playlist</button>
                        </div>
                      }
                    </div> 
                    <button className="homeAddButton3"
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                      >
                      Close
                    </button>
                  </div>
              </div>
            </div>
          )}
        </div>

        <div className="widgets-container">
          {widgetsArray.map((widget) => {
              return widget.widget;
            })}
        </div>
      </div>
  );
}