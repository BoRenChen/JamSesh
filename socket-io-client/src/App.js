import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Tone from "tone";
import $ from "jquery"; 
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import sketch2 from './sketch2';
import './App.css';



class App extends Component {

   constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:4200"
    };
  }

  componentDidMount() {

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    //SOCKET CONNECTION
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello Welcome to JamSesh - from client');
     });

    socket.on("press", function(data){
      console.log(data);
      synth.triggerAttack(data);
    });

    socket.on('release', function(data){
      console.log("release" + data)
        synth.triggerRelease();
     })




    //JQUERY COMPONENT
/*
     $('#C4').mousedown(function(e){
        var msg = "C4"
        socket.emit('buttonPressed', msg);
     });

     $('#C4').mouseup(function(e){
        var msg = "C4"
        socket.emit('buttonReleased', msg);
     });

     $('#E4').mousedown(function(e){
        var msg = "E4"
        socket.emit('buttonPressed', msg);
     });

     $('#E4').mouseup(function(e){
        var msg = "E4"
        socket.emit('buttonReleased', msg);
     });

     $('#G4').mousedown(function(e){
        var msg = "G4"
        socket.emit('buttonPressed', msg);
     });

     $('#G4').mouseup(function(e){
        var msg = "G4"
        socket.emit('buttonReleased', msg);
     });

     $('#B4').mousedown(function(e){
        var msg = "B4"
        socket.emit('buttonPressed', msg);
     });

     $('#B4').mouseup(function(e){
        var msg = "B4"
        socket.emit('buttonReleased', msg);
     });

*/
    var synth = new Tone.Synth().toMaster();


    //attach a listener to all of the buttons
    document.querySelectorAll('li').forEach(function(button){
      button.addEventListener('mousedown', function(e){
        //play the note on mouse down
        synth.triggerAttack(e.target.textContent)
        //Play sound base on content of the li
        socket.emit('buttonPressed', e.target.textContent);

        console.log("from local" + e.target.textContent)
        
      })
      button.addEventListener('mouseup', function(e){
        //release on mouseup
        synth.triggerRelease()
        //Release sound base on content of the li.
        socket.emit('buttonReleased', e.target.textContent);
      })
    })

  }
    render() {
    return (
      <div className="component-app">

      <ul className="set">
      <li className="white b" id="B4">B4</li>
      <li className="black as"></li>
      <li className="white a" id="A4">A4</li>
      <li className="black gs"></li>
      <li className="white g" id="G4">G4</li>
      <li className="black fs"></li>
      <li className="white f" id="F4">F4</li>
      <li className="white e" id="E4">E4</li>
      <li className="black ds"></li>
      <li className="white d" id="D4">D4</li>
      <li className="black cs"></li>
      <li className="white c" id="C4">C4</li>
    </ul>
    <input type="range" min="-10" max="10"/>


        <h1>Socket Test</h1>
    <div id="content">
      <button >C4</button>
      <button >E4</button>
      <button >G4</button>
      <button >B4</button>
    </div>

    <P5Wrapper sketch={sketch} />


      </div>
    );
  }
}


export default App;
