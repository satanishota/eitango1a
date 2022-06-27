const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('todo1a.db')
/* GET home page. */
router.get('/', function(req, res, next) {

  db.all("select * from todo1b",(error,results) => {
    if (error) {
      console.log(error);
      res.status(500).send("error");
      return;
    }
    console.log(results);
    res.json(results);
  });
});


router.post("/", (req, res, next) => {
  console.log(req.body);

    const status = req.body.status
    const task = req.body.task
  
  console.log(status);

  db.exec(`INSERT INTO todo1b (status,task) values ("${status}","${task}")`,  (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("error");
      return;
    }
    res.send("ok");
  });
});

module.exports = router;



// app.get("/todo", (req, res) => {
//   connection.query("SELECT * FROM todo", (error, results) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("error");
//       return;
//     }
//     console.log(results);
//     res.json(results);
//   });
// });
