import './css/index.css'
import { useState } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Cookies from 'universal-cookie';


// --------------- Components ------------//
import Navbar from './obj/Navbar';
import Error from './obj/Error';
import User from './obj/User';
import BotGame from './obj/BotGame';
import LocalGame from './obj/LocalGame';
import Login from './obj/Login';


function App() {
  const cookies = new Cookies();
  const CheckIFLogin = cookies.get('UserID')!==undefined && cookies.get('UserNick') !==undefined && cookies.get('UserPass') !==undefined;

  const {DataURL,FriendURL,ActiveURL} = require('./BackendLinks');
  const {FetchReq,FetchData} = require('./Functions/Fetch');
  
  const [Name,SetName] = useState('Annonim');
  const [Stars, SetStars] = useState(0);
  const [Friends,SetFriends] = useState([]);
  const [ActualTime, SetActualTime] = useState(0);


  async function CheckIfActive()
  {
    if(CheckIFLogin)
    {
      document.body.onmouseup = function() {FetchReq(ActiveURL,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')})};
      document.body.onkeyup = function() {FetchReq(ActiveURL,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')})};
    }
  }

  async function GetDataFromServer()
  { 
    FetchData(DataURL,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')},(Resoult)=>
    {
      SetStars(Resoult[0].points);
      SetName(Resoult[0].nick);
      SetActualTime(Resoult[0].now);
    })

    FetchData(FriendURL,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')},(Resoult)=>SetFriends(Resoult))
  }

  GetDataFromServer();
  CheckIfActive();

  return (
    <div class="App">  
      <Router>
        {CheckIFLogin &&
          <Switch>
            
          <Route exact path="/">
              <Navbar  Name={Name}></Navbar>
              <div class="row col-12">
                <div class="col-4"></div>
                <div class="col-4">
                    <User Name={Name} ADD={true} ActualTime={ActualTime} Stars={Stars} Friends={Friends}></User>
                  <div class="col-4"></div>
                </div>
              </div>
            </Route>
            <Route exact path="/Bot">
              <Navbar  Name={Name}></Navbar>
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
              <Navbar  Name={Name}></Navbar>
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
              <Navbar  Name={Name}></Navbar>
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
