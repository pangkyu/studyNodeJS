var mysql = require('mysql');
var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password  : 'onlyroot',
    database : 'opentutorials'
  });
  
  db.connect();
  module.exports = db;