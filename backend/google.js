const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport-setup')
var Gmail = require('node-gmail-api')

router.unsubscribe(cors())
router.use(bodyParser.urlencoded({extended: false}))

router.use(cookieSession({
    name: 'dashboard-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    }else {
        res.sendStatus(401);
    }
}

router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed'}),
  function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect("/users/");
    console.log(req.body.accesstoken);
    res.redirect('https://youtube.com');
  });

router.get('/github', passport.authenticate('github'));

router.get('/github-oauth-callback',
  passport.authenticate('github', { failureRedirect: '/failed'}),
  function (req, res) {
    console.log(req.body.accesstoken);
    res.redirect('http://localhost:3000');
  });


router.get('/failed', (req, res) => res.send('You have failed to log in!'))

router.get("/", (req, res) => {
  res.send("Helllo WOlrd");
});

router.get("/getuser", (req, res) => {
  res.send(req.user);
});

router.get('/getmail', (req, res) => {
  //let accesstoken = req.body.accesstoken;
  //const accesstoken = "ya29.a0ARrdaM_uBidGbSX67hO8NMnjEBlA8opjSzneUD4jcy88LMAKWZnxVDJY8bmi-Nweo_oF7fYq30wolV53JZcbFdGo_Z7TxF976o7J_ab2-HAp2LPHvYLZ0-UKfG2nBfg_V03PmG_uVgFiJZpBsjsK8irQp8NKcA";
  //const accessToken ="ya29.a0ARrdaM-TApiNk5C3jZfZVnfIGtDcvDzykTGWcPy840qZ8YwcxYuybDnyWfVAURSkK2DYD0ZH0C6n_a68hwLlXuMB6DCg-Djfg55hW6IXteTkkDByv2xKIi8d63fI7J4JXDAyYHw5w11lpNkqR0G41aVya4rrvA";
  let accesstoken = "ya29.a0ARrdaM8p7g9VC5_v1eL44avUuSPxYOHzUph2wFKmxmYa77S6815ldz4gC49NqEaQVN2_VkhzkfCy4l_dyrzH7p3qqATqA6TiQgHfWTXCnvJREFVKs9XsveHRbUXXpLEm3wpbC-lrLZY9JtTLwk6yn5l6FMZc";
  var gmail = new Gmail(accesstoken);
  var s = gmail.messages('label:inbox', {max: 10});
  s.on('data', function (d) {
      console.log(d.snippet)
  })
});

router.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
});

module.exports = router