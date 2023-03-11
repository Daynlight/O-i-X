function FetchReq(url,data)
{
    fetch(url,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
}

function FetchData(url,data,callback)
{
    
    fetch(url,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
      .then((Response) =>{
        if(Response.ok) Response.json().then((Data)=>{callback(Data);});
        else {console.log("Can not Fetch Data")};
      })
      
}




module.exports = {FetchReq,FetchData}