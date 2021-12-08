// const express = require('express');
// const path = require('path');
// const app = express();
// var cors = require('cors');

// var port = process.env.PORT || 8080;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// const usersRouter = require('./backend/google');//route pour le user/ le fichier qui nous permettra de stocker les element
// app.use('/users', usersRouter); //use du fichier
// //app.use('/services', services);

// app.listen(port, () => { //deploiement en server local
//     console.log('server se co à :',port);
// });

const express = require("express");
const { pool } = require("./backend/dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const cors = require('cors');
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8080;

const initializePassport = require("./backend/passportConfig");

initializePassport(passport);

// Middleware

// Parses details from a form
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(flash());

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/users/register", checkAuthenticated, (req, res) => {
//   res.render("register.ejs");
// });

// app.get("/users/login", checkAuthenticated, (req, res) => {
//   // flash sets a messages variable. passport sets the error message
//   console.log(req.session.flash.error);
//   res.render("login.ejs");
// });

// app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
//   console.log(req.isAuthenticated());
//   res.render("dashboard", { user: req.user.name });
// });

// app.get("/users/logout", (req, res) => {
//   req.logout();
//   res.render("index", { message: "You have logged out successfully" });
// });

app.post("/users/register", async (req, res) => {
  //let { name, email, password, password2 } = req.body;
  const name = req.body.name;
  const email = req.body.name;
  const password = req.body.password;
  let errors = [];

  console.log({
    name,
    email,
    password,
  });

  if (!name || !email || !password) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (errors.length > 0) {
    return res.send({
      sucess:false,
    })
    //res.render("register", { errors, name, email, password, password2 });
  } else {
    email = email.toLowerCase();
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          return res.send({
            sucess:false,
            status:400,
            message:"utilisateur déjà existant"
          });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
                // res.send({
                //   success:false,
                //   status:400,
                //   message: 'Error du server'
                // });
              }
              console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              //res.redirect("/users/login");
              res.send({
                sucess:true,
                status:200,
                message:'enregistré'
              })
            }
          );
        }
      }
    );
  }
});

app.post("/users/login",
  passport.authenticate("local", {failureRedirect: "http://localhost:3000/",failureFlash: true}),
  function (req, res) {
    //res.send("http://localhost:3000/Dashboard");
    return res.send({
      success:true,
      status:200,
      message:"log in"
    })
  }
);

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     //return res.redirect("/users/dashboard");
//     return res.redirect("http://localhost:3000/Dashboard");
//   }
//   next();
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   //res.redirect("/users/login");
//   res.redirect("http://localhost:3000/")
// }

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});