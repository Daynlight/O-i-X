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

function PostDataToMysqlServer(sql)
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

function UserLog(Description, UID)
{
   var con = mysql.createConnection(mysqlconf);  
   con.connect(function(err) {
      if (err) throw err;
      con.query('INSERT INTO UserLogs(`UID`,`Description`) VALUES('+UID+',"'+Description+'");', function (err, result) {
      if (err) throw err;
         con.end();
      });
   });
}

function UserLogPass(Nick,Pass,Description)
{
   var sql = 'SELECT ID FROM Users where md5(Nick)="'+Nick+'" and Password="'+Pass+'";';
      GetDataFromMysqlServer(sql,(data)=>
      {
         if(data[0].ID!==undefined) {UserLog(Description,data[0].ID)};
      });
}
function UserLogPassNoMD5(Nick,Pass,Description)
{
   var sql = 'SELECT ID FROM Users where Nick="'+Nick+'" and Password="'+Pass+'";';
      GetDataFromMysqlServer(sql,(data)=>
      {
         if(data[0].ID!==undefined) {UserLog(Description,data[0].ID)};
      });
}


module.exports = {GetDataFromMysqlServer,PostDataToMysqlServer,UserLog,UserLogPass,UserLogPassNoMD5};