import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, HashRouter,
  Switch} from "react-router-dom";
 // import PrivateRoute from "./PrivateRoute";
//import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Canvas from "./Pages/Canvas";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import { AuthProvider } from "./Auth";
import "firebase/storage";
import  firebase from './base';

// import NavBar from './NavBar';

const App =() => {
  return (
    <AuthProvider>
      <Router>
      
      
        <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/canvas" component={Canvas} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          </Switch>
       </div>
     
      </Router>
      </AuthProvider>
  );
};

export default App;
