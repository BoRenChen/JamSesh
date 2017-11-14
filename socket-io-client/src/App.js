import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Tone from "tone";
import $ from "jquery"

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


    var synth = new Tone.Synth().toMaster();


    //attach a listener to all of the buttons
    document.querySelectorAll('button').forEach(function(button){
      button.addEventListener('mousedown', function(e){
        //play the note on mouse down
        synth.triggerAttack(e.target.textContent)
        console.log("from local" + e.target.textContent)
        
      })
      button.addEventListener('mouseup', function(e){
        //release on mouseup
        synth.triggerRelease()
      })
    })

  }

    render() {
    return (
      <div className="component-app">
        <h1>Socket Test</h1>

    <div id="content">
      <button id="C4">C4</button>
      <button id="E4">E4</button>
      <button id="G4">G4</button>
      <button id="B4">B4</button>
    </div>

      </div>
    );
  }
}


export default App;
