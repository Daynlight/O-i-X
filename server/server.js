const express = require('express');
const app = express();


app.set("view engine","ejs");





app.get("*",(req,res) =>
{
   res.render("Error");
})



app.listen(81,() => {console.log("Server is runing")});