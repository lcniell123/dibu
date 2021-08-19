import React, { useEffect, useState,createContext } from "react";
import app from "./base.js";
//export const test = "currentUser";

export const AuthContext = createContext();
//var test=789
export const AuthProvider = ({ children }) => {
 

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  //const userEmail = "bien";

  useEffect(async() => {
   await app.auth().onAuthStateChanged(setCurrentUser);

   await app.auth().onAuthStateChanged(  function(user) {
   // app.database().ref('users').child(`${app.auth().currentUser.uid}`).onDisconnect().update({loggedin:false});

  var timer = setTimeout(async() => {

        await app.database().ref('users').child(`${app.auth().currentUser.uid}`).update({
                loggedin: "false",
             });
        await app.auth().signOut();
    }, 300000);

  document.addEventListener('mousemove', (e) => {
    clearTimeout(timer);
       timer = setTimeout(async() => {
        await app.database().ref('users').child(`${app.auth().currentUser.uid}`).update({
                loggedin: "false",
             });
        await app.auth().signOut();
     }, 300000);

   });

       window.addEventListener('beforeunload', async function (e) { 
            e.preventDefault(); 

        app.database().ref('users').child(`${app.auth().currentUser.uid}`).update({
                loggedin: "false",
             });

            
        });



});

 

  })


  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>

  );

};
