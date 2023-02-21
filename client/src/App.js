import './css/index.css'
import { useState } from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Cookies from 'universal-cookie';

// --------------- Components ------------//
import NavBar from './obj/navbar';
import Error from './obj/Error';
import User from './obj/user';
import BotGame from './obj/botgame';
import LocalGame from './obj/localgame';
import Login from './obj/Login';


function App() {
  const [Name,SetName] = useState('Annonim');
  const [Stars, SetStars] = useState(0);
  const [Photo,SetPhoto] = useState(require('./img/1.png'));
  const [Friends,SetFriends] = useState([{id:1, name: 'asd',active: true},{id:2,name:'asdasda',active: false}]);
  const cookies = new Cookies();

  return (
    <div class="App">
      <body></body>
      
      <Router>
        {cookies.get('UserID')!=undefined &&
          <Switch>
          <Route exact path="/">
              <NavBar Name={Name}></NavBar>
              <div class="row col-12">
                <div class="col-4"></div>
                <div class="col-4">
                    <User Name={Name} Stars={Stars} Photo={Photo} Friends={Friends}></User>
                  <div class="col-4"></div>
                </div>
              </div>
            </Route>
            <Route exact path="/Bot">
              <NavBar Name={Name}></NavBar>
              <div class='row col-12'>
                <div class="col-9">
                    <BotGame></BotGame>
                </div>
                <div class="col-3">
                  <User Name={Name} Stars={Stars} Photo={Photo} Friends={Friends}></User>
                </div>
              </div>
            </Route>
            <Route exact path="/Local">
              <NavBar Name={Name}></NavBar>
              <div class='row col-12'>
                <div class="col-9">
                    <LocalGame></LocalGame>
                </div>
                <div class="col-3">
                  <User Name={Name} Stars={Stars} Photo={Photo} Friends={Friends}></User>
                </div>
              </div>
            </Route>
            <Route exact path="/User">
              <NavBar Name={Name}></NavBar>
              <div class="row col-12">
                <div class="col-4"></div>
                <div class="col-4">
                    <User Name={Name} Stars={Stars} Photo={Photo} Friends={Friends}></User>
                  <div class="col-4"></div>
                </div>
              </div>
            </Route>
            <Route exact path="*">
              <Error></Error>
            </Route>
            
          </Switch>
        }
        {cookies.get('UserID')==undefined &&
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
