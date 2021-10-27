import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  };
  componentDidMount() {
    this.loginStatus();
  }
  handleLogout = () => {
    axios.post('http://localhost:3001/api/v1/logout')
        .then(response => {
          if (response.data.logged_out) {
            this.setState({
              isLoggedIn: false,
              user: {},
            });
          } else {

          }
        })
        .catch(error => console.log('api errors:', error))
  }
  loginStatus = () => {
    axios
      .get("http://localhost:3001/api/v1/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogin(response.data)
        } else {
          this.handleLogout()
        }
      })
      .catch((error) => console.log("api errors:", error));
  };
  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"> <Home handleLogout={this.handleLogout} handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn}/></Route>
            <Route exact path="/login"> <Login handleLogout={this.handleLogout} handleLogin={this.handleLogin}/></Route>
            <Route exact path="/signup"> <Signup handleLogin={this.handleLogin}/></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
