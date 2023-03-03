import './css/index.css'
import { useState } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Cookies from 'universal-cookie';

// --------------- Components ------------//

import NavBar from './obj/navbar';
import Error from './obj/Error';
import User from './obj/user';
import BotGame from './obj/botgame';
import LocalGame from './obj/localgame';
import Login from './obj/Login';


function App() {
  const {DataURL,FriendURL,ActiveURL} = require('./BackendLinks');
  const cookies = new Cookies();

  const [Name,SetName] = useState('Annonim');
  const [Stars, SetStars] = useState(0);
  const [Friends,SetFriends] = useState([]);
  const [ActualTime, SetActualTime] = useState(0);



  async function CheckIfActive()
  {
    if(cookies.get('UserID')!==undefined)
    {
      document.body.onmouseup = function() { 
        fetch(ActiveURL,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')})
          });
      }
      document.body.onkeyup = function() { 
        fetch(ActiveURL,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')})
          });
      }
    }
  }

  async function GetDataFromServer()
  { 
    await fetch(DataURL,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')})
      })
    .then((res) =>res.json())
    .then((r) =>
    {
      SetStars(r[0].points);
      SetName(r[0].nick);
      SetActualTime(r[0].now);
    })

    await fetch(FriendURL,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')})
      })
    .then((res) =>res.json())
    .then((r) =>
    {
      SetFriends(r);
    })
  }


  GetDataFromServer();
  CheckIfActive();



  return (
    <div class="App">
      <html></html>
      <head></head>
      <body></body>
      
      <Router>
        {cookies.get('UserID')!==undefined && cookies.get('UserNick') && cookies.get('UserPass') &&
          <Switch>
            
          <Route exact path="/">
              <NavBar  Name={Name}></NavBar>
              <div class="row col-12">
                <div class="col-4"></div>
                <div class="col-4">
                    <User Name={Name} ADD={true} ActualTime={ActualTime} Stars={Stars} Friends={Friends}></User>
                  <div class="col-4"></div>
                </div>
              </div>
            </Route>
            <Route exact path="/Bot">
              <NavBar  Name={Name}></NavBar>
              <div class='row col-12'>
                <div class="col-9">
                    <BotGame></BotGame>
                </div>
                <div class="col-3">
                  <User Name={Name} ActualTime={ActualTime} Stars={Stars} Friends={Friends}></User>
                </div>
              </div>
            </Route>
            <Route exact path="/Local">
              <NavBar  Name={Name}></NavBar>
              <div class='row col-12'>
                <div class="col-9">
                    <LocalGame></LocalGame>
                </div>
                <div class="col-3">
                  <User Name={Name} ActualTime={ActualTime} Stars={Stars} Friends={Friends}></User>
                </div>
              </div>
            </Route>
            <Route exact path="/User">
              <NavBar  Name={Name}></NavBar>
              <div class="row col-12">
                <div class="col-4"></div>
                <div class="col-4">
                    <User Name={Name} ADD={true} ActualTime={ActualTime} Stars={Stars} Friends={Friends}></User>
                  <div class="col-4"></div>
                </div>
              </div>
            </Route>
            <Route exact path="*">
              <Error></Error>
            </Route>
            
          </Switch>
        }
        {cookies.get('UserID')===undefined &&
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route exact path="*">
                <Error></Error>
              </Route>
          </Switch>
        }
      </Router>
      
    </div>
  );
}

export default App;
