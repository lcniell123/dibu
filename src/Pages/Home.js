
import React, { useState, useCallback, useContext } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, HashRouter,Switch} from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import {AuthContext} from '../Auth';
import Sidebar from "../Component/Sidebar";
import Canv from "../Component/Canv";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "../Auth";
import PrivateRoute from "../PrivateRoute";
import "firebase/storage";
import  app from '../base';


const Home = ({history}) => {

// app.auth().onAuthStateChanged(function(user){
//       if(user){
//       }else{
//           history.push("/home");
//       }
//   })


function onClickHandler(){
	app.auth().signOut();
}

  return (
    <>
      
      <Canv/>
   <Sidebar width={30} height={"100vh"}/> 
    </>
  );
};

export default withRouter(Home);
