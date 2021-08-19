import "./Comp.css";
import React, { useRef,useCallback, useEffect,useContext, useState} from "react";
import {AuthContext} from '../Auth';
import { withRouter, Redirect } from "react-router";
import "firebase/auth";
import  firebase from '../base';
import app from 'firebase/app';
import "firebase/storage";
import "firebase/database";





export const Logbtn = ({history}) => {
const [color, setColor] = React.useState('');
  const [name, setName] = React.useState('');






app.auth().onAuthStateChanged(async(user)=>{

      if(user){

//alert(`${app.auth().currentUser.uid}`);
var dbase =  await  app.firestore().collection('users').doc(`${app.auth().currentUser.uid}`);
   dbase.get().then( async function(doc){
 
  await setColor(doc.data().color);
  await setName(doc.data().name);  
  })

          app.database().ref('users').child(`${app.auth().currentUser.uid}`).update({
                id : `${app.auth().currentUser.uid}`,
             //loggedin: true,
                color:color,
                name:name
             });
      }else{
         // await app.database().ref('users').child(`${app.auth().currentUser.uid}`).update({
         //        loggedin: "false",
         //     });
                    await history.push("/login");
      }
  })


 async function onClickHandler(){
 await app.database().ref('users').child(`${app.auth().currentUser.uid}`).update({
                loggedin: "false",
             });
 await app.auth().signOut();
}





 return (
    <> 

      <button onClick={onClickHandler}>Salir</button>
    </>
  );


  
};


export default withRouter(Logbtn);
