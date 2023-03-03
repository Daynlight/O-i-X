const express = require('express');
const cors = require('cors');
const app = express();
const {GetDataFromMysqlServer,PosTDataToMysqlServer} = require('./Components/DataBaseFunctions');

app.set("view engine","ejs");
app.use(cors());

app.get("/Login/:nick/:password",(req,res) =>
{
   if(req.params.nick!==undefined && req.params.password!==undefined)
   { 
      var sql = 'SELECT ID FROM Users where md5(Nick)="'+req.params.nick+'" and Password="'+req.params.password+'";';
      GetDataFromMysqlServer(sql,(data)=>res.json(data));
   }
})

app.get("/Register/:nick/:password/:email",(req,res) =>
{
   if(req.params.nick!==undefined && req.params.password!==undefined && req.params.email!==undefined)
   {
      var sql = 'SELECT EXISTS(SELECT id FROM Users WHERE Nick="'+req.params.nick+'") as "check";';
      GetDataFromMysqlServer(sql,
      (data)=>
      { 
         if(data[0].check==0)
         {
            var sql='INSERT INTO Users(`Nick`,`Password`,`Email`) Value("'+req.params.nick+'","'+req.params.password+'","'+req.params.email+'");';
            PosTDataToMysqlServer(sql);
            res.json([{"err": "User Added"}]);
         }
         else res.json([{"err": "UserExist"}]);
      });
   } 
})

app.get("/Data/:id/:nick/:password",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined)
   {
      var sql = 'SELECT (year(now())*365*24*60*60+day(now())*24*60*60+hour(now())*60*60+minute(now())*60+second(now())) as now,Users.nick,Users.points FROM Users where md5(Users.Nick)="'+req.params.nick+'" and Users.Password="'+req.params.password+'";';
      GetDataFromMysqlServer(sql,(data)=>res.json(data));
   }

})

app.get("/Friends/:id/:nick/:password",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined)
   {
      var sql = 'SELECT Friends.id as ind, FriendData.ID,FriendData.Nick,FriendData.Points,(year(FriendData.active)*365*24*60*60+day(FriendData.active)*24*60*60+hour(FriendData.active)*60*60+minute(FriendData.active)*60+second(FriendData.active)) as active FROM Users join Friends on Friends.ID1=Users.ID join Users as FriendData on FriendData.ID=Friends.ID2 where Friends.active=true and md5(Users.Nick)="'+req.params.nick+'" and Users.Password="'+req.params.password+'";';
      GetDataFromMysqlServer(sql,
         (data)=>res.json(data))
   }
})

app.get("/FirendAdd/:id/:nick/:password/:FriendNick",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined && req.params.FriendNick != undefined)
   {
      var sql = 'SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+req.params.nick+'" and Users.Password="'+req.params.password+'";';
      GetDataFromMysqlServer(sql,
         (data)=>
         {
            var UserID = data[0].ID;
            var sql ='SELECT Exists (SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+req.params.FriendNick+'") as "check";';
            GetDataFromMysqlServer(sql,
               (data)=>{
                  if(data[0].check) 
                  {
                     var sql = 'SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+req.params.FriendNick+'";';
                     GetDataFromMysqlServer(sql,(data)=>
                     {
                        var FriendID = data[0].ID;
                        var sql = 'SELECT EXISTS (SELECT Friends.ID FROM Friends WHERE Friends.ID1='+UserID+' and Friends.ID2='+FriendID+') as "check";';
                        GetDataFromMysqlServer(sql, (data)=>
                        {
                           if(!data[0].check)
                           {
                              var sql = 'INSERT INTO Friends(ID1,ID2) VALUES('+UserID+','+FriendID+');';
                              PosTDataToMysqlServer(sql);
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
                                    PosTDataToMysqlServer(sql);
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

app.get("/FriendRemove/:id/:nick/:password/:FriendID",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined && req.params.FriendID!=undefined)
   {
      var sql = 'SELECT EXISTS(SELECT Users.ID FROM Users WHERE md5(Users.Nick)="'+req.params.nick+'" and Users.Password="'+req.params.password+'") as "check";';
      GetDataFromMysqlServer(sql,(data)=>
      {
         if(data[0].check)
         {
            var sql = 'UPDATE Friends SET Friends.active=false WHERE ID = '+req.params.FriendID+';';
            PosTDataToMysqlServer(sql);
            res.json([{"status": "Removed"}]);
         }
         else res.json([{"status": "No Permision"}]);
      })
   }
})

app.get("/Active/:id/:nick/:password",(req,res) =>
{
   if(req.params.id != undefined && req.params.nick != undefined && req.params.password != undefined)
   {
      var sql = 'UPDATE Users SET Users.active = CURRENT_TIMESTAMP() WHERE md5(Nick)="'+req.params.nick+'" and Password="'+req.params.password+'";';
      PosTDataToMysqlServer((sql));
      res.end();
   }
})

app.get("*",(req,res) =>
{
   res.render("Error");
})

app.listen(8080,() => {console.log("Server is runing")});