import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link 
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddProfileSearch from "./components/AddProfileSearch";
import ProfileSearch from "./components/ProfileSearch";
import ProfileSearchList from "./components/ProfileSearchList";
import Home from "./components/Home";


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            MisConnect
          </a>
          <div className= "navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/searches"} className="nav-link">
                Active Searches
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add New Search
              </Link>
            </li>

          </div>
        </nav>

        <div className="container mt-3">

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/searches" component={ProfileSearchList} />
            <Route exact path="/add" component={AddProfileSearch} />

            <Route path="/profilesearch/:id" component={ProfileSearch} />
          </Switch>
        </div>
        
      </div>
    </Router>
  )
}


export default App;
