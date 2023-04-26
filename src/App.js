import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Card from './components/Card/Card'


function App() {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row">
        <div className="col-12">
        <  Navbar />

        </div>
      </div>
      <div className="row">
        <div className="col-12">
        <div className="container">
    <  Card />
    </div>
        </div>
        </div>
    
    </div>
  );
}

export default App;
