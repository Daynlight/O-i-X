const express = require('express');
const cors = require('cors');
const app = express();
const {GetDataFromMysqlServer,PostDataToMysqlServer} = require('./Components/DataBaseFunctions');

app.set("view engine","ejs");
app.use(cors());
app.use(express.json());

app.post("/Login",(req,res) =>
{
   var { UserNick, UserPass } = req.body;

   if(UserNick!==undefined && UserPass!==undefined)
   { 
      var sql = 'SELECT ID FROM Users where Nick="'+UserNick+'" and Password="'+UserPass+'";';
      GetDataFromMysqlServer(sql,(data)=>res.json(data));
   }
})

app.post("/Register",(req,res) =>
{
   var {UserNick, UserPass, Email} = req.body;

   if(UserNick!==undefined && UserPass!==undefined && Email!==undefined)
   {
      var sql = 'SELECT EXISTS(SELECT id FROM Users WHERE Nick="'+UserNick+'") as "check";';
      GetDataFromMysqlServer(sql,
      (data)=>
      { 
         if(data[0].check==0)
         {
            var sql='INSERT INTO Users(`Nick`,`Password`,`Email`) Value("'+UserNick+'","'+UserPass+'","'+Email+'");';
            PostDataToMysqlServer(sql);
            res.json([{"err": "User Added"}]);
         }
         else res.json([{"err": "UserExist"}]);
      });
   } 
})

app.post("/Data",(req,res) =>
{
   var { UserNick, UserPass } = req.body;

   if(UserNick != undefined && UserPass != undefined)
   {
      var sql = 'SELECT (year(now())*365*24*60*60+day(now())*24*60*60+hour(now())*60*60+minute(now())*60+second(now())) as now,Users.nick,Users.points FROM Users where md5(Users.Nick)="'+UserNick+'" and Users.Password="'+UserPass+'";';
      GetDataFromMysqlServer(sql,(data)=>res.json(data));
   }

})

app.post("/Friends",(req,res) =>
{
   var { UserNick, UserPass} = req.body;

   if(UserNick != undefined && UserPass != undefined)
   {
      var sql = 'SELECT Friends.id as ind, FriendData.ID,FriendData.Nick,FriendData.Points,(year(FriendData.active)*365*24*60*60+day(FriendData.active)*24*60*60+hour(FriendData.active)*60*60+minute(FriendData.active)*60+second(FriendData.active)) as active FROM Users join Friends on Friends.ID1=Users.ID join Users as FriendData on FriendData.ID=Friends.ID2 where Friends.active=true and md5(Users.Nick)="'+UserNick+'" and Users.Password="'+UserPass+'";';
      GetDataFromMysqlServer(sql,
         (data)=>res.json(data))
   }
})

app.post("/FirendAdd",(req,res) =>
{
   var { UserNick , UserPass, FriendNick} = req.body;

   if(UserNick != undefined && UserPass != undefined && FriendNick != undefined)
   {
      var sql = 'SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+UserNick+'" and Users.Password="'+UserPass+'";';
      GetDataFromMysqlServer(sql,
         (data)=>
         {
            var UserID = data[0].ID;
            var sql ='SELECT Exists (SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+FriendNick+'") as "check";';
            GetDataFromMysqlServer(sql,
               (data)=>{
                  if(data[0].check) 
                  {
                     var sql = 'SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+FriendNick+'";';
                     GetDataFromMysqlServer(sql,(data)=>
                     {
                        var FriendID = data[0].ID;
                        var sql = 'SELECT EXISTS (SELECT Friends.ID FROM Friends WHERE Friends.ID1='+UserID+' and Friends.ID2='+FriendID+') as "check";';
                        GetDataFromMysqlServer(sql, (data)=>
                        {
                           if(!data[0].check)
                           {
                              var sql = 'INSERT INTO Friends(ID1,ID2) VALUES('+UserID+','+FriendID+');';
                              PostDataToMysqlServer(sql);
                              res.json([{"status": "Friend Aded"}]);
                           }
                           else
                           {
                              var sql ='Select Friends.active from Friends WHERE ID1='+UserID+' and ID2='+FriendID+';';
                              GetDataFromMysqlServer(sql,(data)=>
                              {
                                 if(data[0].active===1) res.json([{"status": "Alredy Aded"}]);
                                 else
                                 {
                                    var sql = 'UPDATE Friends Set Friends.active=true WHERE ID1='+UserID+' and ID2='+FriendID+';';
                                    PostDataToMysqlServer(sql);
                                    res.json([{"status": "Friend Aded"}]);
                                 }
                              })
                           }
                        })
                     })
                  }
                  else res.json([{"status": "User Do Not Exist"}]);
               })
         })
   }
})

app.post("/FriendRemove",(req,res) =>
{
   var { UserNick,UserPass,FriendID} = req.body;

   if(UserNick != undefined && UserPass != undefined && FriendID!=undefined)
   {
      var sql = 'SELECT EXISTS(SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+UserNick+'" and Users.Password="'+UserPass+'") as "check";';
      GetDataFromMysqlServer(sql,(data)=>
      {
         if(data[0].check)
         {
            var sql = 'UPDATE Friends SET Friends.active=false WHERE ID = '+FriendID+';';
            PostDataToMysqlServer(sql);
            res.json([{"status": "Removed"}]);
         }
         else res.json([{"status": "No Permision"}]);
      })
   }
})

app.post("/Active",(req,res) =>
{
   var { UserNick, UserPass } = req.body;

   if(UserNick != undefined && UserPass != undefined)
   {
      var sql = 'UPDATE Users SET Users.active = CURRENT_TIMESTAMP() WHERE md5(Nick)="'+UserNick+'" and Password="'+UserPass+'";';
      PostDataToMysqlServer((sql));
      res.end();
   }
})

app.get("*",(req,res) =>
{
   res.render("Error");
})

app.listen(8080,() => {console.log("Server is runing")});