import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const excersiceUpdated = "Excerisce updated successfully"
export default class EditExcersice extends Component{
    constructor(props){
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
            success: false
        }
    }

    componentDidMount(){
        this.getData()
        this.setState({success: false})
    }

    getData = () => {
        axios.get('http://localhost:8000/excersice/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        axios.get('http://localhost:8000/users/')
                .then(response => {
                    console.log(response.data)
                    if(response.data.length > 0){
                        this.setState({
                            users: response.data.map(user => user.username),
                            username: response.data[0].username
                        })
                    }
                    console.log(this.state.users)
        })
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration = (e) => {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        });
    }

    onSubmit = (e) => {
        this.setState({success: true})
        e.preventDefault();
        const excersice = {
            username: this.state.username,
            duration: this.state.duration,
            description: this.state.description,
            date: this.state.date
        }
        axios.put('http://localhost:8000/excersice/update/'+this.props.match.params.id, excersice)
             .then(res => console.log(res.data))
        console.log(excersice)
        
    }
    render(){
        console.log("in render",this.state.users,this.state.username)
        return(
            <React.Fragment>
                <h3> Edit excersice </h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className = "form-control"
                                value = {this.state.username}
                                onChange = {this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return (
                                            <option
                                            key={user}
                                            value={user}>
                                                {user}
                                            </option>
                                        )
                                    })
                                }
                        </select>
                    </div>

                    <div className="form-group">
                            <label>Description </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.description}
                                   onChange={this.onChangeDescription}/>
                    </div>
                            
                    <div className="form-group">
                            <label>Duration (Minutes): </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.duration}
                                   onChange={this.onChangeDuration}/>
                    </div>

                    <div className="form-group">
                            <label>Date: </label>
                            <DatePicker
                                selected = {this.state.date}
                                onChange = {this.onChangeDate}
                             />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Excersice Log" className="btn btn-primary"/>
                    </div>
                </form>
                {
                    this.state.success?
                    <div className="alert alert-success">
                                <strong>{excersiceUpdated}</strong>
                    </div>: ''
                }
            </React.Fragment>
        )
    }
}