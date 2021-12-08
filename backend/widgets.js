const express = require("express");
const { pool } = require("./dbConfig");
const app = express();


app.post("/setWidgetsgoogle", (req, res) => {
    const name = req.body.name;
    const token = req.body.accesstoken;
    pool.query(
        `SELECT * FROM widgets
          WHERE name = $1`,
        [name],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results.rows);

          if (results.rows.length > 0) {
            return res.send({
                message:"already in",
                status:200
            });
          } else {
            pool.query(
              `INSERT INTO widgets (name, tokengoogle, cityweather, cityuv)
                  VALUES ($1, $2, $3, $4)`,
              [name, token, city, city],
              (err, results) => {
                if (err) {
                  //throw err;
                  res.send({
                    success:false,
                    status:400,
                    message: 'Error du server'
                  });
                }
                return res.send({
                    message:"done",
                    status:200
                });
                console.log(results.rows);
              }
            );
          }
        }
      );
})

app.post("/")

module.exports = app;