import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
    render(){
        return(
            <React.Fragment>
                <nav className ="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className ="navbar-brand"> Excersice Tracker </Link>
                    <div className="collpase navbar-collapse">
                        <ul className ="navbar-nav mr-auto">
                            <li className="navbar-item"> 
                                <Link to="/" className="nav-link">Excersice</Link>
                            </li>
                            <li className="navbar-item"> 
                                <Link to="/create" className="nav-link">Create Excersice Log</Link>
                            </li>
                            <li className="navbar-item"> 
                                <Link to="/user" className="nav-link">Create User</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}