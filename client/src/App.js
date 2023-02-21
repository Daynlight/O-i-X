import './css/index.css'
import { useState } from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import NavBar from './obj/navbar';
import Error from './obj/Error';
import User from './obj/user';

function App() {
  const [Name,SetName] = useState('Annonim');
  const [Stars, SetStars] = useState(0);
  const [Photo,SetPhoto] = useState(require('./img/1.png'));
  const [Friends,SetFriends] = useState([{id:1, name: 'asd',active: true},{id:2,name:'asdasda',active: false}]);
  

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar Name={Name}></NavBar>
            <div class='row col-12'>
              <div class="col-9">
                  ads
              </div>
              <div className="col-3">
                <User Name={Name} Stars={Stars} Photo={Photo} Friends={Friends}></User>
              </div>

            </div>
          </Route>
          <Route exact path="*">
            <Error></Error>
          </Route>
        </Switch>

      </Router>
      
    </div>
  );
}

export default App;
