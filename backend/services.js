const express = require('express');
const app = express.Router();
const cors = require('cors');
const axios = require('axios');
var fahrenheitToCelsius = require('fahrenheit-to-celsius');
const githubRepositories = require('github-repositories');
const { response } = require('express');
const { replicationStart } = require('pg-protocol/dist/messages');
require("dotenv").config();
var SpotifyWebApi = require('spotify-web-api-node');

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];

app.post('/UV' , (req, res) => {
    let apiKey = process.env.API_WEATHER_KEY;
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    axios.get(url)
        .catch(error => {
            console.log("Error weather request")
        })
        .then(response => {
            if (response.data.main == undefined){
                return res.send({
                    status:400,
                    message:"City not found"
                })
            }
            else {
                let long = `${response.data.coord.lon}`;
                let lat = `${response.data.coord.lat}`;
                let urluv = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${long}`;
                axios.get(urluv)
                    .catch(error => {
                        console.log("error")
                    })
                    .then(response => {
                        let uvmessage = `${response.data.value}UV`;
                        return res.send ({
                            message: uvmessage
                        })
                    })
            }
        });
});

app.post('/weather', (req, res) => {
    let apiKey = process.env.API_WEATHER_KEY;
    let city = req.body.city;
    //const city = "Paris";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    axios.get(url)
        .catch(error => {
            console.log("Error: weather map request")
        })
        .then(response => {
            if (response.data.main == undefined){
                return res.send({
                    status:400,
                    message:"City not found"
                })
            }
            else {
                let celsius = fahrenheitToCelsius(response.data.main.temp);
                let celsiusMin = fahrenheitToCelsius(response.data.main.temp_min);
                let celsiusMax = fahrenheitToCelsius(response.data.main.temp_max);
                celsiusMin = celsiusMin.toFixed(0);
                celsiusMax = celsiusMax.toFixed(0);
                let weatherText = `${celsius.toFixed(0)}°C`;
                let weatherInfo = `The minimum is ${celsiusMin} degrees and the maximum is ${celsiusMax} degrees`;
                return res.send ({
                    message: weatherText,
                    message1: weatherInfo,
                    status:200
                })
            }
        });
});

function getuser(items) {
    var users = new Array(items.length);

    for (var i = 0; i < users.length; i++) {
        users[i] = new Array(2);
        users[i][0] = items[i].login;
        items[i].avatar_url ? users[i][1] = items[i].avatar_url : users[i][1] = "";
    }
    return users;
};

app.post('/SearchGitUser', (req, res) => {
    let user = req.body.user;
    axios.get(`https://api.github.com/search/users?q=${user}&sort:followers&per_page=20`)
        .catch(error => {
            console.log("error when axio.get");
        })
        .then(response => {
            console.log(response.data)
            //const users = getuser(response.data.items);
            return res.send({
                messsage: response.data,
                status:200
            })
        });
});

app.post('/GitUser', (req, res) => {
    let user = req.body.user;
    axios.get(`https://api.github.com/users/${user}`)
        .catch(error => {
            console.log("Error in GitUser request axios");
        })
        .then(response => {
            const name = response.data.name;
            const img = response.data.avatar_url;
            const repo = response.data.public_repos;
            const followers = response.data.followers;
            const bio = response.data.bio;
            const userinfo = [name, img, followers, bio, repo];
            return res.send ({
                message: userinfo,
                status:200
            })
        })
})

function getTopics(items) {
    var topics = new Array(items.length);

    for (var i = 0; i < topics.length; i++) {
        topics[i] = new Array(4);
        topics[i][0] = items[i].name;
        items[i].short_description ? topics[i][1] = items[i].short_description : topics[i][1] = "";
        items[i].description ? topics[i][2] = items[i].description : topics[i][2] = "";
        items[i].created_by ? topics[i][3] = items[i].created_by : topics[i][3] = "";
    }
    return topics;
};

app.post('/SearchGitTopics', (req, res) => {
    let trends = req.body.search;
    axios.get(`https://api.github.com/search/topics?q=${trends}&per_page=20`)
        .catch(error => {
            console.log("error when axio.get");
        })
        .then(response => {
            console.log(response.data);
            //const gettrends = getTopics(response.data.items);
            return res.send({
                message: response.data,
                status:200
            })
        })
});

app.post('/SearchYoutubeVideo', (req, res) => {
    let video = req.body.video;
    console.log(video);
    let key = process.env.GOOGLE_API_KEY;
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${video}&type=video&maxResults=10`)
        .then(response => {
            console.log(response.data.items);
            console.log(response.data.items.map((item) => item.id.videoId));
            return res.send({
                // message: response.data.items.map((item) => item.id.videoId),
                //info intéressante : response.data.items.id.videoId et response.data.items.snippet.title et response.data.items.snippet.description
                //aussi, utilise iframe avec comme argument response.data.items.id.video pour pouvoir lire la vidéo (dans le front)
                message: response.data.items[0].id.videoId,
                status:200
            })
        })
        .catch(error => {
            console.log(error);
            return res.send({
                status:400
            })
        })
})


app.post('/getyoutubecomments', (req, res) => {
    let video = req.body.video;
    let key = process.env.GOOGLE_API_KEY;
    axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${key}&videoId=${video}&maxResults=5`)
        .then(response => {
            console.log(response.data.items[0].snippet.topLevelComment.snippet.textDisplay);
            return res.send({
                //Infos dont t'auras besoin : (dis moi si tu veux je te fasse un tableau)
                //response.data.items[index].snippet.topLevelComment.snippet.authorProfileImageUrl et 
                //response.data.items[index].snippet.topLevelComment.snippet.authorDisplayName et 
                //response.data.items[index].snippet.topLevelComment.snippet.textDisplay
                message: response.data,
                status:200
            })
        })
        .catch(error => {
            console.log(error);
            return res.send({
                message:"error youtube : get videos",
                status:400
            })
        })
})

function getchannel(item) {
    var channels = new Array(3);

    channels[0] = item.statistics.viewCount;
    channels[1] = item.statistics.subscriberCount;
    channels[2] = item.statistics.videoCount;
    return channels;
}

app.post('/getYoutubechannel', (req, res) => {
    let channel = req.body.channel;
    let key = process.env.GOOGLE_API_KEY;
    var channels;
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${channel}&type=channel&maxResults=10`)
        .then(response => {
            axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&key=${key}&id=${response.data.items[0].id.channelId}`)
            .then(response => {
                channels = getchannel(response.data.items[0]);
            })
            .catch(error => {
                console.log(error);
                return res.send({
                    status:400
                })
            })
            axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&key=${key}&id=${response.data.items[0].id.channelId}`)
            .then(response => {
                const final_channel = new Array(2);
                final_channel[0] = response.data.items[0].snippet.thumbnails.default.url;
                final_channel[1] = channels;
                return res.send({
                    message: final_channel,
                    status:200
                })                
            })
            .catch(error => {
                console.log(error);
                return res.send({
                    status:400
                })
            })
        })
        .catch(e => {
            console.log(e);
            return res.send({
                status:400
            })
        })
})

function getRepo(items) {
    var topics = new Array(items.length);

    for (var i = 0; i < topics.length; i++) {
        topics[i] = new Array(2);
        topics[i][0] = items[i].name;
        topics[i][1] = items[i].html_url;
        topics[i][2] = items[i].description;
    }
    return topics;
};

app.post('/SearchGitrepo', (req, res) => {
    let user = req.body.user;
    axios.get(`https://api.github.com/users/${user}/repos?&per_page=5`)
        .catch(error => {
            console.log("error when axio.get");
        })
        .then(response => {
            console.log(response.data);
            var repos = getRepo(response.data);
            return res.send({
                message: repos,
                status:200
            })
        })
});

app.post('/SubscribeYoutube', (req, res) => {
    let channel = req.body.channel;
    let key = process.env.GOOGLE_API_KEY;
    let accesstoken = req.body.accesstoken;
   // const channel = "aMOODIEsqueezie";
    //const accesstoken = "ya29.a0ARrdaM_uBidGbSX67hO8NMnjEBlA8opjSzneUD4jcy88LMAKWZnxVDJY8bmi-Nweo_oF7fYq30wolV53JZcbFdGo_Z7TxF976o7J_ab2-HAp2LPHvYLZ0-UKfG2nBfg_V03PmG_uVgFiJZpBsjsK8irQp8NKcA";
    const headers = {
        'Authorization': `Bearer ${accesstoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    // const snippet = {
    //     "snippet": {
    //         "resourceId": {
    //             "kind":"youtube#channel", "channelId":`${channel}`
    //         }
    //     }
    // }
    axios.post(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&key=${key}`, {
        snippet: {"ressourceId": {"kind":"youtube#channel", "channelId":`${channel}`}}}, {headers : headers})
        .then(response => {
            return res.send({
                message: response.data,
                status:200
            })
        })
        .catch(e => {
            console.log(e)
        })
})


var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:8080/services/callback'
});

app.get('/loginSpotify', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

var accesstoken;

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
  
    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
        
        accesstoken = access_token;
        console.log("accestoken:", accesstoken);
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
  
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
  
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.redirect("http://localhost:3000/home");
  
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
    });
});

app.post('/searchSpotify',  (req, res) => {
    const artists = req.body.song;
    const infos = [];
    //const artists = "pnl";
    // const acc = "BQCjOSr_5bLgBsQUtjkSDv511l915IDQOI_0YPNc_KiSzx_NMrQepcg9niD_rBo0dP7wmBoM6itYOciiMoUien-nIRDYgNyuNpoinpjIlPClYjRxY0x1UukuNZCbuTf3u_BGWILe7jGv1I6H4lQLQeWP0NR42dpno7ea8-hj-yXaBvIhptsqdZ6ICzATC-8JB5xChWQwBuR3H5ogcm538zPjKfPEHVXfw0V5FWM_k3o4ADTznm42pQgiHBXoyad4twBwYMDKAW-HnoarSzPMHOdagvFtz3W7mOjjypP7UeZ6K2anoFHO";
    // const spotifyApi = new SpotifyWebApi();
    // spotifyApi.setAccessToken(acc);
    //console.log(accesstoken)
    spotifyApi.searchArtists(artists)
        .then(function(data) {
            infos.push(data.body.artists.items[0].name);
            infos.push(data.body.artists.items[0].followers.total);
            infos.push(data.body.artists.items[0].genres);
            infos.push(data.body.artists.items[0].external_urls.spotify);
            return res.send({
                message:infos,
                status:200
            })
        }, function(err) {
            console.error(err);
        });
})

app.post('/createPlaylist', (req, res) => {
    const playlist = req.body.playlist;
    console.log(playlist);
    const description = req.body.description;
    console.log(description);
    //const ispublic = req.body.public;

    // const playlist = "teddedeedst";
    // const description = "j'espère ça fonctionne";
    const ispublic = false;
    // const acc = "BQCjOSr_5bLgBsQUtjkSDv511l915IDQOI_0YPNc_KiSzx_NMrQepcg9niD_rBo0dP7wmBoM6itYOciiMoUien-nIRDYgNyuNpoinpjIlPClYjRxY0x1UukuNZCbuTf3u_BGWILe7jGv1I6H4lQLQeWP0NR42dpno7ea8-hj-yXaBvIhptsqdZ6ICzATC-8JB5xChWQwBuR3H5ogcm538zPjKfPEHVXfw0V5FWM_k3o4ADTznm42pQgiHBXoyad4twBwYMDKAW-HnoarSzPMHOdagvFtz3W7mOjjypP7UeZ6K2anoFHO";
    // const spotifyApi = new SpotifyWebApi();
    // spotifyApi.setAccessToken(acc);

    spotifyApi.createPlaylist(playlist, {'description' : description, 'public': ispublic})
        .then(response => {
            return res.send({
                message: "playlist created",
                status:200
            })
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = app;