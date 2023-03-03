const mysql = require('mysql');
const mysqlconf = require('../MySqlConnectConf');

function GetDataFromMysqlServer(sql,callback)
{
   var con = mysql.createConnection(mysqlconf);  
   con.connect(function(err) {
      if (err) throw err;
      con.query(sql, function (err, result, fields) {
      if (err) throw err;
         con.end();
         return callback(result);
      });
   });
}

function PosTDataToMysqlServer(sql)
{
   var con = mysql.createConnection(mysqlconf);  
   con.connect(function(err) {
      if (err) throw err;
      con.query(sql, function (err, result) {
      if (err) throw err;
         con.end();
      });
   });
}

module.exports = {GetDataFromMysqlServer,PosTDataToMysqlServer};