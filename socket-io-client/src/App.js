import React, { Component } from "react";
import socketIOClient from "socket.io-client";

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
    socket.on("press", function(data){
      console.log(data);
    });
  }

    render() {
    return (
      <div className="component-app">
        <h1>Socket Test</h1>
        
      </div>
    );
  }
}


export default App;
