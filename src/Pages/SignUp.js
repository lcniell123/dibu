import React, { useState, useCallback } from "react";
import firebase from 'firebase/app';
import 'firebase/firestore'
import { withRouter } from "react-router";
import app from "../base";


const SignUp = ({ history }) => {


  const [color, setColor] = useState('')
  const [email, setEmail] = useState('')
  const [name,setName]= useState('')


   function handleLogin(){
     history.push("/login");
  }


  const handleSignUp = useCallback(async event => {
    event.preventDefault();


    const { name, email, password, color } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
.createUser({
    uid: 'some-uid',
    email: email.value,
    phoneNumber: '+11234567890',
  })
  
              history.replace('/')

  app.database().ref('users').child(`${app.auth().currentUser.uid}`).update({
                activity: Date.now().toLocaleString("en-US", {timeZone: "America/New_York"})
             });


await firebase.firestore().collection('users').doc(`${app.auth().currentUser.uid}`).set({name: name.value, email: email.value, color: color.value});
//const res2 = await firebase.firestore().collection('users').doc(`${app.auth().currentUser.uid}`).set({email: email.value});

//await firebase.database().ref(`${app.auth().currentUser.uid}`).set({ email: `${app.auth().currentUser.email}`, loggedin: true });
//await firebase.database().ref('users').set({`${app.auth().currentUser.uid}`:[{ email: `${app.auth().currentUser.email}`, loggedin: true }]});
//await firebase.database().ref.child('users').set({[ `${app.auth().currentUser.uid}`]:{email: `${app.auth().currentUser.email}`, loggedin: true}});


    } catch (error) {
      alert(error); 
    }
  }, [history]);

  return (
    <div style={{textAlign:"center"}}>
      <img  src="logo.png" style={{textAlign:"center", padding:"20px"}}/>
      <h1 style={{textAlign:"center"}}>Regístrate</h1>
      <form style={{textAlign:"center"}} onSubmit={handleSignUp}>
        
        <label>
         
          <input name="name" type="text" placeholder="Iniciales: 3 letras" /><br/><br/>
        </label>


        <label>
         
          <input name="email" type="email" placeholder="Email" /><br/><br/>
        </label>
        
        <label>
         
          <input name="password" type="password" placeholder="Password" /><br/><br/>
        </label>
        
         <label>
          Color Favorito<br/><br/>
          <input type="color" id="head" name="color"
           onChange={e => setColor(e.target.value)}  /><br/><br/>
          
        </label>
       <br/>
       
        <button type="submit" >Regístrate</button><br/><br/>
        
     
      </form>
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default withRouter(SignUp);
