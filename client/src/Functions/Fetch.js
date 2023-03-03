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
      .then((Response) =>Response.json())
      .then(callback);
}




module.exports = {FetchReq,FetchData}