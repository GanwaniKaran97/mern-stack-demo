import React from 'react';
import  { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import ExcersiceList from "./components/excersiceList"
import EditExcersice from "./components/editExcersice"
import CreateExcersice from "./components/createExcersice"
import CreateUser from "./components/createUser"
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component = {ExcersiceList}/>
        <Route path="/edit/:id" component = {EditExcersice}/>
        <Route path="/create" component = {CreateExcersice}/>
        <Route path="/user" component = {CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
