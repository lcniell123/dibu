
import React, { useState, useCallback, useContext } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, HashRouter,Switch} from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import {AuthContext} from '../Auth';
import Nav from "../Component/Nav";
import Sidebar from "../Component/Sidebar";
import Canv from "../Component/Canv";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "../Auth";
import PrivateRoute from "../PrivateRoute";
import "firebase/storage";
import  app from '../base';


const Canvas = ({history}) => {

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
    <div className="container" style={{paddingTop:"40px"}}>
    <div className="row">
   <div className="col-md-6" style={{minWidth:"400px"}}>

<Canv/>
          </div> 
   <div className="col-md-6 desktop">
          <Sidebar/></div>
          </div></div>
      
   
    </>
  );
};

export default withRouter(Canvas);
