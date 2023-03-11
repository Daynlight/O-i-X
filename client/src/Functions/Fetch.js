function FetchReq(url,data)
{
  try{
    fetch(url,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
      }
      catch(err)
      {
        console.log("Error:",err)
      }
}

function FetchData(url,data,callback)
{
    try{
        var Response = fetch(url,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
      }
      catch(err)
      {
        console.log("Error: ",err)
      }
  
    if(Response.ok) Response.json().then((Data)=>{callback(Data);});
      
}




module.exports = {FetchReq,FetchData}