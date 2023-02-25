const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();


app.set("view engine","ejs");
app.use(cors());


app.get("/Login/:nick/:password",(req,res) =>
{
   

   if(req.params.nick!==undefined && req.params.password!==undefined)
   {

      var con = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "",
         database: "O and X"
      });

      con.connect(function(err) {
         if (err) throw err;
         con.query('SELECT id FROM Users where md5(Nick)="'+req.params.nick+'" and Password="'+req.params.password+'"', function (err, result, fields) {
         if (err) throw err;
            res.json(result)
            
         });
      });
   }
      
})


app.get("*",(req,res) =>
{
   res.render("Error");
})



app.listen(8080,() => {console.log("Server is runing")});