import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Redirect} from "react-router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: '',
            redirect: false
        };
    }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    };
    handleRedirect = (event) => {
        event.preventDefault()
        return  <Redirect to={'/login'} />

    }
    handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = this.state
        let user = {
            username: username,
            password: password
        }
        axios.post('http://localhost:3001/api/v1/login', {user}, {withCredentials: true})
            .then(response => {
                if (response.data.logged_in) {
                    console.log(response.data);
                    this.props.handleLogin(response.data)
                    this.setState({redirect: true})
                } else {
                    console.log("ERRORS:", response.data)
                    this.setState({
                        username: '',
                        password: '',
                        errors: response.data.errors
                    })
                }
            })
            .catch(error => console.log('api errors:', error))
    }
    handleReset = () => {
        this.setState({username: '', password: ''});
    };
    render() {
        const {username, password, redirect} = this.state
        if (redirect){
            return <Redirect to={'/'}/>
        }

        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="username"
                        type="text"
                        name="username"
                        autoComplete={"current-username"}
                        value={username}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        autoComplete={"current-password"}
                        value={password}
                        onChange={this.handleChange}
                    />
                    <button placeholder="submit" type="submit">
                        Log In
                    </button>
                    {this.state.errors && <div style={{color: "red"}} className="error">{this.state.errors[0]}, {this.state.errors[1]}</div>}
                </form>
                <form onSubmit={this.handleReset}>
                    <button> Reset </button>
                    <div>
                        or <Link to='/signup'>sign up</Link>
                    </div>
                </form>

            </div>
        );
    }
}
export default Login;
