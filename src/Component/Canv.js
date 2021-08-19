import React, {
    useRef,
    useCallback,
    useEffect,
    useContext,
    useState,
} from "react";
import {
    BrowserRouter as Router,
    Route,
    HashRouter,
    Switch
} from "react-router-dom";
import {
    withRouter,
    Redirect
} from "react-router";
import Sidebar from "../Component/Sidebar";
import "firebase/database";
import firebase from '../base';
import app from 'firebase/app';
import {
    fabric
} from 'fabric';
import Hammer from "react-hammerjs";
import  Logbtn from './Logbtn';
import  Nav from './Nav';




const Canv = ({history}) => {





     const [canv, setCanv] = useState('');
     const [data, setData] = useState('');
     const [color, setColor] = useState('');
     const [email, setEmail] = useState('');
          // const [zoom, setZoom] = useState('');







useEffect(async() => {
         app.auth().onAuthStateChanged(async function(user) {
  if (user) {
 var dbase =  await app.firestore().collection('users').doc(`${app.auth().currentUser.uid}`);
   dbase.get().then(async function(doc){
 await setColor(doc.data().color);
    
  })} else {
    // No user is signed in.
  }
});

      //alert("test1:"+canv);



if(color){

await getData1();
  //alert(color)
}
  //await setCanv(initCanvas());
}
, [color]);
//const canvas = useRef();


    function getData1() {



        var canvas = new fabric.Canvas('canvas');
        canvas.setHeight(400);
        canvas.setWidth(400);



        app.database().ref('dibujo').on("value", (snapshot) => {
       
       var allObjects = JSON.parse(snapshot.val().dibu)

   //Make only objects with color selectable
for(var i=0;i<allObjects.objects.length;i++){
   allObjects.objects[i].strokeUniform=true;
   allObjects.objects[i].strokeWidth=20;
  console.log(allObjects.objects[i])
  if(allObjects.objects[i].stroke != color){
    allObjects.objects[i].selectable=false;
  }
  else if(allObjects.objects[i].stroke === color){
    allObjects.objects[i].selectable=true;
  }

}
 var newObjects = JSON.stringify(allObjects)




             canvas.loadFromJSON(newObjects, canvas.renderAll.bind(canvas), function(o, object) {
                fabric.log(o, object);
            }); 




        })


        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = 1;
        canvas.freeDrawingBrush.strokeuniform = true;
        canvas.renderAll(); 
 

canvas.on('mouse:up', function(opt) {
             var json = JSON.stringify(canvas.toJSON());
             app.database().ref('dibujo').  update({
               dibu: json
            });
        });

canvas.on('object:scaling', (e) => {
  var o = e.target;
  if (!o.strokeWidthUnscaled && o.strokeWidth) {
    o.strokeWidthUnscaled = o.strokeWidth;
  }
  if (o.strokeWidthUnscaled) {
    o.strokeWidth = o.strokeWidthUnscaled / o.scaleX;
  }
})






    console.log("touch gesters off")


canvas.on('touch:up', function(opt) {
            alert('')
        });








//Set Canvas
setCanv(canvas)

    }


const dataCanv = canvas => {
alert(canvas);
 //let allObjects = canvas.getObjects();

 function getObjectsBy (fn) {
  return canvas.getObjects().filter(fn)
}




console.log("this is the object"+canvas.getObjects().filter((obj) => obj.stroke === color).length);


}






const drawMode = canvas => {
 //   canvas.strokeuniform = true;
   canvas.isDrawingMode = true;
}

const editMode = canvas => {
   canvas.isDrawingMode = false;
}

const remSel = canvas => {

 let activeObjects = canvas.getActiveObjects();

 activeObjects.forEach(function (object) {
                canvas.remove(object);
            });



  canvas.renderAll();
}




const  zoomPlus = canvas => {
      canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), 1.0);

    canvas.setZoom(canvas.getZoom()*2);       
}

const  zoomMinus = canvas => {
  canvas.setZoom(canvas.getZoom()*0.5);


 // alert("work!");
  // canvas.isDrawingMode = false;
}





//canvas.renderAll();

// const  zoomPlus = canvas => {
//       canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), 1.0);

//     canvas.setZoom(canvas.getZoom()*2);       
// }

// const  zoomMinus = canvas => {
//   canvas.setZoom(canvas.getZoom()*0.5);


//  // alert("work!");
//   // canvas.isDrawingMode = false;
// }


const loadData = canvas =>{
}


const canvLoad = canvas =>{
}

       



  return (
     <div>





<canvas onLoad={() => canvLoad(canv)} id="canvas"/>
<br/>
  
<div>
  <div  className="nav">
  <button onClick={() => drawMode(canv)}>Dibujar</button> 
  <button onClick={() => editMode(canv)}>Editar </button>
  <button onClick={() => remSel(canv)}> Delete </button>
    <div  className="mobile"><Logbtn/> </div>



</div>




        </div>
 
   

        </div>
  ); 
   
}


export default withRouter(Canv);