import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base.js";
import { AuthContext } from "../Auth.js";
import firebase from 'firebase/app'
import {
    fabric
} from 'fabric';


const Login = ({ history }) => {
 
React.useEffect(async() => {

var canvas = new fabric.Canvas('canvas');
        canvas.setHeight(400);
        canvas.setWidth(400);


         app.database().ref('dibujo').on("value", (snapshot) => {
       
       var allObjects = JSON.parse(snapshot.val().dibu);

        canvas.loadFromJSON(allObjects, canvas.renderAll.bind(canvas), function(o, object) {
                fabric.log(o, object);
            }); 

        canvas.renderAll(); 


     })



})
  

  const { currentUser } = useContext(AuthContext);


  if (currentUser) {
    history.push("/canvas");
  }

  function handleRegister(){
     history.push("/signup");
  }

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {

         
await app.auth().setPersistence('session').then(async()=>{
         await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);

       })
        
          
          await app.database().ref('users').child(`${app.auth().currentUser.uid}`).update({
                loggedin: true,
                activity: Date.now().toLocaleString("en-US", {timeZone: "America/New_York"}),
             });

       await history.push("/login");
       //window.location.reload(false);

      } catch (error) {
        alert(error);
      }
    },
    [history]
  );





      
   


  return (


    <div className="container" style={{paddingTop:"40px"}}>
    <div className="row">
   <div className="col-md-6" style={{minWidth:"400px"}}>

<canvas  id="canvas"/>

          </div> 

   <div className="col-md-6  ">
              <div style={{textAlign:"left"}}>
     <h1>Dibu</h1>
      <form style={{textAlign:"left"}} onSubmit={handleLogin}>
        <label>
         
          <input name="email" type="email" placeholder="Email" />
        </label><br/><br/>
        <label>
         
          <input name="password" type="password" placeholder="Password" />
        </label><br/><br/>
        <button type="submit">Entrar</button><br/><br/>
        <button onClick={handleRegister}>Regístrate</button>


      </form>
    </div>

          </div>
          </div></div>





  );
};

export default withRouter(Login);
