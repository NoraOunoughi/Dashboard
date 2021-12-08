require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const path = require('path');
const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

passport.serializeUser(function(user, done) {
    done(null, user);
    });
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/users/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        //use profile info (mainly profile id) to check if user registered in database
        console.log(accessToken);
        return done(null, profile);
        //for db : return done(null, user)
    }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/users/github-oauth-callback"
    },
    function(accessToken, refreshToken, profile, done) {
        //use profile info (mainly profile id) to check if user registered in database
        console.log(accessToken);
        return done(null, profile);
        //for db : return done(null, user)
    }
));
