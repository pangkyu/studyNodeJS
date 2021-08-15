var mysql = require('mysql');
var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'onlyroot',
    database : 'opentutorials'
});

con.connect();

con.query('select 1 + 1 as solution', function (error, results, fields){
    if(error) throw error;
    console.log(results);
});
con.end();