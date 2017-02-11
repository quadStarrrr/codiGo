import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1>codiGo</h1>
        <form onSubmit={this.props.handleLogin}>
          <input type="text" value={this.props.username} onChange={this.props.handleLoginChange} placeholder="username"/>
          <br/>
          <input type="password" value={this.props.password} onChange={this.props.handleLoginChange} placeholder="password"/>
          <br/>
          <input type="submit" value="Log In" />
        </form>
        <Link to='/signup'>Sign Up</Link>
      </div>
    )
  }
}

export default Login;