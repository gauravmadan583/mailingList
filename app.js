const express = require('express')
const mysql = require('mysql')
const bodyparser=require('body-parser')
const app = express()
const port = 3000

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mailinglist'
});

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
  // res.send('Hello world')
  var count = 0;
  connection.query('SELECT COUNT(*) AS count FROM users', function(error, results){
    if(error) throw error;
    count=results[0].count;
    res.render('index', {data: count})
  })
  
})
app.post('/register', function(req, res){
  var person = {email: req.body.email};
  connection.query('INSERT INTO users SET ?', person, function(err, results){
    res.redirect('/');
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})