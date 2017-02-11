import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="login">
        <div className="innerLogin">
          <h1>codiGo</h1>
          <form className="form-group" onSubmit={this.props.handleLogin}>
            <input className="form-control" type="text" onChange={this.props.handleInputChange} placeholder="username"/>
            <br/>
            <input className="form-control" type="password" onChange={this.props.handleInputChange} placeholder="password"/>
            <br/>
            <input className="loginButton btn" type="submit" value="Log In" />
          </form>
          <Link to='/register'><input className="loginButton btn" value="Sign Up" /></Link>
        </div>
      </div>
    );
  }
}

export default Login;