const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const mysqlcon = require('./mysqlconnection');


app.set("view engine","ejs");
app.use(cors());


app.get("/Login/:nick/:password",(req,res) =>
{
   

   if(req.params.nick!==undefined && req.params.password!==undefined)
   {

      var con = mysql.createConnection(mysqlcon);

      con.connect(function(err) {
         if (err) throw err;
         con.query('SELECT ID FROM Users where md5(Nick)="'+req.params.nick+'" and Password="'+req.params.password+'"', function (err, result, fields) {
         if (err) throw err;
            res.json(result)
            
         });
      });
   }
      
})

app.get("/Register/:nick/:password/:email",(req,res) =>
{
   

   if(req.params.nick!==undefined && req.params.password!==undefined && req.params.email!==undefined)
   {

      var con = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "",
         database: "O and X"
      });

      con.connect(function(err) {
         if (err) throw err;
         con.query('SELECT EXISTS(SELECT id FROM Users WHERE Nick="'+req.params.nick+'") as "check";', function (err, result, fields) {
         if (err) throw err;
            if(result[0].check==0)
            {
               var con1 = mysql.createConnection(mysqlcon);

               con1.connect(function(err) {
                  if (err) throw err;
                  con1.query('INSERT INTO Users(`Nick`,`Password`,`Email`) Value("'+req.params.nick+'","'+req.params.password+'","'+req.params.email+'");', function (err, fields) {
                  if (err) throw err;
                     res.json([{"err": "User Added"}]);
                  });
               });
            }
            else
               res.json([{"err": "UserExist"}])
            
         });
      });
   }
      
})

app.get("/Data/:id/:nick/:password",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined)
   {
      var con = mysql.createConnection(mysqlcon);

      con.connect(function(err) {
         if (err) throw err;
         con.query('SELECT (year(now())*365*24*60*60+day(now())*24*60*60+hour(now())*60*60+minute(now())*60+second(now())) as now,Users.nick,Users.points FROM Users where md5(Users.Nick)="'+req.params.nick+'" and Users.Password="'+req.params.password+'";', function (err, result, fields) {
         if (err) throw err;
            res.json(result);
            con.end();
         });
      });
      
   }

})

app.get("/Friends/:id/:nick/:password",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined)
   {
      var con = mysql.createConnection(mysqlcon);

      con.connect(function(err) {
         if (err) throw err;
         con.query('SELECT FriendData.ID,FriendData.Nick,FriendData.Points,(year(FriendData.active)*365*24*60*60+day(FriendData.active)*24*60*60+hour(FriendData.active)*60*60+minute(FriendData.active)*60+second(FriendData.active)) as active FROM Users join Friends on Friends.ID1=Users.ID join Users as FriendData on FriendData.ID=Friends.ID2 where Friends.active=true and md5(Users.Nick)="'+req.params.nick+'" and Users.Password="'+req.params.password+'";', function (err, result, fields) {
         if (err) throw err;
            res.json(result);
            con.end();
         });
      });
      
   }

})

app.get("/FirendAdd/:id/:nick/:password/:FriendNick",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined && req.params.FriendNick != undefined)
   {
      var con = mysql.createConnection(mysqlcon);

      con.connect(function(err) {
         if (err) throw err;
         con.query('SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+req.params.nick+'" and Users.Password="'+req.params.password+'";', function (err, result, fields) {
         if (err) throw err;
            con.end();
            var UserID = result[0].ID;

            var con1 = mysql.createConnection(mysqlcon);
            con1.connect(function(err) {
               if (err) throw err;
               con1.query('SELECT Exists (SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+req.params.FriendNick+'") as "check";', function (err, result, fields) {
               if (err) throw err;
                  con1.end();
                  if(result[0].check) 
                  {
                     var con2 = mysql.createConnection(mysqlcon);
                     con2.connect(function(err) {
                        if (err) throw err;
                        con2.query('SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+req.params.FriendNick+'";', function (err, result, fields) {
                        if (err) throw err;
                           con2.end();
                           var FriendID = result[0].ID;

                           var con3 = mysql.createConnection(mysqlcon);
                           con3.connect(function(err) {
                              if (err) throw err;
                              con3.query('SELECT EXISTS (SELECT Friends.ID FROM Friends WHERE Friends.ID1='+UserID+' and Friends.ID2='+FriendID+') as "check";', function (err, result, fields) {
                              if (err) throw err;
                                 con3.end();
                                 if(!result[0].check)
                                 {
                                    var con4 = mysql.createConnection(mysqlcon);
                                    con4.connect(function(err) {
                                       if (err) throw err;
                                       con4.query('INSERT INTO Friends(ID1,ID2) VALUES('+UserID+','+FriendID+');', function (err, result) {
                                       if (err) throw err;
                                          con4.end();
                                          res.json([{"status": "Friend Aded"}]);
                                       });
                                    });
                                 }
                                 else res.json([{"status": "Alredy Aded"}]);
                              });
                           });
                        });
                     });
                  }
                  else res.json([{"status": "User Do Not Exist"}]);
               });
            });
         });
      });     
   }
})

app.get("/Active/:id/:nick/:password",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined)
   {
      var con = mysql.createConnection(mysqlcon);

      con.connect(function(err) {
         if (err) throw err;
         con.query('UPDATE Users SET Users.active = CURRENT_TIMESTAMP() WHERE md5(Nick)="'+req.params.nick+'" and Password="'+req.params.password+'";', function (err, result) {
         if (err) throw err;
            con.end();
            res.end();
         });
      });
   }
})



app.get("*",(req,res) =>
{
   res.render("Error");
})

app.listen(8080,() => {console.log("Server is runing")});