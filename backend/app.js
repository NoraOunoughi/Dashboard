const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
var port = 8080;
var moment = require('moment');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
var requestIp = require('request-ip');
//const { Mongoose } = require('mongoose');
//import Mongoose from "mongoose";
//import { connect } from 'mongoose';
var mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://lucasnora:lucasnoradashboard@cluster0.fl8qw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',() => {
    console.log("Connexion to db is done");
});

const usersRouter = require('./user_connection');
const userService = require('./services');
const usersWidgets = require('./widgets');
app.use('/users', usersRouter); //use du fichier
app.use('/services', userService);
app.use('/widgets', usersWidgets);

app.get('/about.json', (req, res) => {
    var clientIp = requestIp.getClientIp(req)
    //const ip = (req.ip.substr(0,7) == "::ffff:" ? req.ip.substr(7) : req.ip);
    //clientIp.substr(0,7) == "::ffff:" ? clientIp.substr(7) : clientIp;
    res.json({
        "client": {
            "host": clientIp
        },
        "server": {
            "current_time": moment().unix(),
            "services": [{
                    "name": "Youtube",
                    "widgets": [{
                            "name": "search_youtube_video",
                            "description": "Display searched Youtube video",
                            "params": [{
                                    "name": "video",
                                    "type": "string"
                                },
                                {
                                    "name": "refresh_time",
                                    "type": "integer"
                                }
                            ]
                        },
                        {
                            "name": "youtube_subscribers_count",
                            "description": "Display youtube channel number of subscribers.",
                            "params": [{
                                    "name": "channel",
                                    "type": "string"
                                },
                                {
                                    "name": "refresh_time",
                                    "type": "integer"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Spotify",
                    "widgets": [{
                            "name": "spotify_search_artist",
                            "description": "Display artist's account.",
                            "params": [{
                                    "name": "artists",
                                    "type": "string"
                                },
                                {
                                    "name": "refresh_time",
                                    "type": "integer"
                                }
                            ]
                        },
                        {
                            "name": "spotify_create_playlist",
                            "description": "Display Spotify user public playlists.",
                            "params": [{
                                    "name": "playlist",
                                    "type": "string"
                                },
                                {
                                    "name": "description",
                                    "type": "string"
                                },
                                {
                                    "name": "public",
                                    "type": "string"
                                },
                                {
                                    "name": "refresh_time",
                                    "type": "integer"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Gihtub",
                    "widgets": [{
                            "name": "github_search_user",
                            "description": "Display Github repository last 30 commits.",
                            "params": [{
                                    "name": "user",
                                    "type": "string"
                                },
                                {
                                    "name": "refresh_time",
                                    "type": "integer"
                                }
                            ]
                        },
                        {
                            "name": "github_user_public_repos",
                            "description": "Display Github user public last five repositories.",
                            "params": [{
                                    "name": "user",
                                    "type": "string"
                                },
                                {
                                    "name": "refresh_time",
                                    "type": "integer"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Weather",
                    "widgets": [{
                            "name": "city_temperature",
                            "description": "Display temperature and weather information for a city.",
                            "params": [{
                                    "name": "city",
                                    "type": "string"
                                },
                                {
                                    "name": "refresh_time",
                                    "type": "integer"
                                }
                            ]
                        },
                        {
                            "name": "city_uv",
                            "description": "Display UV index of a city.",
                            "params": [{
                                    "name": "city",
                                    "type": "string"
                                },
                                {
                                    "name": "refresh_time",
                                    "type": "integer"
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    })
})

app.listen(port, () => { //deploiement en server local
    console.log('server se co à :',port);
});
