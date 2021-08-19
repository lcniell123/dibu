
import "./Comp.css";
import React from "react";
import { withRouter, Redirect } from "react-router";
import  Logbtn from './Logbtn';
import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firebase-firestore'



export const Sidebar = ({ width, height, children }) => {
  const [xPosition, setX] = React.useState(-width);
      const [usercolor, setUserColor] = React.useState('');
        const [groupcolor, setGroupColor] = React.useState('');
  const [name, setName] = React.useState('');
  const [loggedin, setLoggedin]= React.useState('');
  const [activity, setActivity]= React.useState('');
  const [result, setResult] = React.useState('')




  React.useEffect(async() => {
    app.auth().onAuthStateChanged(async function(user) {
  if (user) {
 var dbase =    app.firestore().collection('users').doc(`${app.auth().currentUser.uid}`);
   dbase.get().then(async function(doc){
//alert(doc.data().color)
 await setUserColor(doc.data().color);
 await setName(doc.data().name);  
  })} else {
  }
});


    setX(100);

await app.database().ref('users').on("value", async (snapshot) => {
  // console.log("this is a snapshot= "+snapshot.val().id);
  
  var foo = snapshot.val();
  const result2 = Object.values(foo).filter(obj=>obj.loggedin === true)
  //const result3 =   return array.map(function(item) { return item[key]; });
  
  ///var filtered = Object.values(result2).filter(obj=>obj.logge)
  var loggedname = await result2.map( function(item) {    
      return item.name;

  });

  var loggedcolor = await result2.map( function(item) {    
      return item.color; 
  });

  var loggedactivity = await result2.map(function(item) { 
    var orig = item.activity;
    var act = orig.replace(/,/g, '');  
    var act = parseInt(act);
      return act; 
  })



   
   setGroupColor(loggedcolor)
   setResult(loggedname)
   setActivity(loggedactivity)



        });
  }, []);


  return (
    <React.Fragment>
      <div
       
      >


        <div className="content">
<h1 style={{color: usercolor}} >{name}</h1>


 <div>

      {Object.values(result).map(function(d, idx){

  


  if (d===name){
    //d="";

    return ("")
  }


  else{
   
    return (<li style={{color: groupcolor[idx],fontWeight:'bold'}}  key={idx}>{d}</li>

      )
  }
 
         
       })}
      </div>



        {children}</div>
      <div className="side">
        <Logbtn />
        </div>
      </div>
    </React.Fragment>
  );
};


export default withRouter(Sidebar);
