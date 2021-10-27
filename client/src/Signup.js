import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from "react-router";
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password_confirmation: '',
            redirect: false,
            errors: ''
        };
    }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = this.state
        let user = {
            username: username,
            password: password
        }
        axios.post('http://localhost:3001/api/v1/users',{user}, {withCredentials: true})
            .then(response => {
                console.log(response.data)
                if (response.data.status === "created") {
                    this.setState({redirect: true})
                } else {

                }
            })
            .catch(error => console.log('api errors:', error))
    };render() {
        const {username, password, redirect, password_confirmation} = this.state
        if(redirect){
            return <Redirect to={'/'}/>
        }
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="password confirmation"
                        type="password"
                        name="password_confirmation"
                        value={password_confirmation}
                        onChange={this.handleChange}
                    />

                    <button placeholder="submit" type="submit">
                        Sign Up
                    </button>

                </form>
            </div>
        );
    }
}
export default Signup;