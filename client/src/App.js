import './css/index.css'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import NavBar from './obj/navbar';
import Error from './obj/Error';
import User from './obj/user';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar></NavBar>
            <div class='row col-12'>
              <div class="col-10">
                  ads
              </div>
              <div className="col-2">
                <User></User>
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
