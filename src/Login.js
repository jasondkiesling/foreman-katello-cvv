import React from "react";

import Header from "./Header.js";

import "./Login.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server_address: '',
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('https://' + this.state.username + ':' + this.state.password + '@' + this.state.server_address);
    event.preventDefault();
    this.setState({
      server_address: '',
      username: '',
      password: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Server Address: 
          <input
            name="server_address"
            type="text"
            value={this.state.server_address}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Username:  
          <input 
            name="username" 
            type="text" 
            value={this.state.username} 
            onChange={this.handleChange} 
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            name="password"
            type="password" 
            value={this.state.password} 
            onChange={this.handleChange} 
          />
        </label>
        <input type="submit" />
      </form>
    )
  }
}

export default function Login() {
  return (
    <div>
      <Header />
      <p>Login Page</p>
      <LoginForm />
    </div>
  );
}
