import React, { Component } from 'react';
import axios from 'axios'

const userAdded = 'User added successfully';
export default class CreateUser extends Component{
    constructor(props){
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            username: '',
            success: false
        }
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = (e) => {
        this.setState({success: true})
        e.preventDefault()
        const user = {
            username: this.state.username
        }
        console.log(user)
        axios.post('http://localhost:8000/users/add', user)
             .then(res => console.log(res.data))
        this.setState({
            username: '',
        })
    }

    render(){
        return(
            <React.Fragment>
                <h3> Create new excersice </h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                            <label>Username </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.username}
                                   onChange={this.onChangeUsername}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Excersice Log" className="btn btn-primary"/>
                    </div>
                    {
                            this.state.success ?
                            <div class="alert alert-success">
                                <strong>{userAdded}</strong>
                            </div>: ''
                    }
                </form>
                
            </React.Fragment>
        )
    }
}