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



const Nav = ({history}) => {





     const [canv, setCanv] = useState('');
         const [data, setData] = useState('');
          const [color, setColor] = useState('');
           const [email, setEmail] = useState('');
          // const [zoom, setZoom] = useState('');










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






       


  return (
<div>
  <div  className="desktop">
  <div  className="nav">
  <button onClick={() => drawMode(canv)}>Dibujar</button> 
  <button onClick={() => editMode(canv)}>Editar </button>
  <button onClick={() => remSel(canv)}> Delete </button>
  </div>

</div>

<div  className="mobile">
  <div  className="nav">
    <button onClick={() => drawMode(canv)}>Dibujar</button> 
    <button onClick={() => editMode(canv)}>Editar </button>
    <button onClick={() => remSel(canv)}> Delete </button><br/>
    <button  onClick={() => zoomPlus(canv)} >+ZoomIn</button> 
    <button onClick={() => zoomMinus(canv)}>-ZoomOut </button>
    <Logbtn theClass={"mobile"} />
  </div>

</div>


        </div>
  ); 
   
}


export default withRouter(Nav);