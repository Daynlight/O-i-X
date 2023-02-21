import './css/index.css'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import NavBar from './obj/navbar';
import Error from './obj/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar></NavBar>
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
