import React, { Component } from 'react';
import axios from 'axios'
import  { Link } from "react-router-dom";

const Excersice = props => (
    <tr>
        <td>{props.excersice.username}</td>
        <td>{props.excersice.description}</td>
        <td>{props.excersice.duration}</td>
        <td>{props.excersice.date.substring(0,10)}</td>
        <td>
            <Link to = {"/edit/" + props.excersice._id}>Edit</Link> | <a href="#" onClick = {() => {props.deleteExcersice(props.excersice._id)}}>delete</a>
        </td>
    </tr>
)

const userDeleted = "Excersice deleted successufully !"

export default class ExcersiceList extends Component{
    constructor(props){
        super(props)
        this.deleteExcersice = this.deleteExcersice.bind(this)
        this.state = {
            excersices: [],
            success: false
        }
    }

    componentDidMount(){
       this.getData()
    }

    getData = () => {
        axios.get('http://localhost:8000/excersice/')
        .then(res =>{
            this.setState({
                excersices: res.data,
                success: false
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteExcersice = (id) => {
        this.setState({success: true})
        axios.delete('http://localhost:8000/excersice/'+id)
        .then(res =>console.log(res.data))

         this.setState({
            excersices: this.state.excersices.filter(ele => ele._id !== id)
        })
    }
    

    excersiceList(){
        return this.state.excersices.map(currentExcersice => {
            return <Excersice excersice = {currentExcersice} deleteExcersice = {this.deleteExcersice} key={currentExcersice._id}/>
        })
    }

    render(){
        return(
            <React.Fragment>
                <h3>Logged Excersice</h3>
                <table className = "table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.excersiceList()}
                    </tbody>
                </table>
                {
                    this.state.success ?
                    <div className="alert alert-success">
                                <strong>{userDeleted}</strong>
                    </div>: ''
                }
            </React.Fragment>
        )
    }
}