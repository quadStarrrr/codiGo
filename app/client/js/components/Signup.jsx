import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <div className="innerLogin">
          <form className="form-group" onSubmit={this.props.handleSignup}>
            <input className="form-control" type="text" onChange={this.props.handleChange} placeholder="username"/>
            <br/>
            <input className="form-control" type="password" onChange={this.props.handleChange} placeholder="password"/>
            <br/>
            <input className="loginButton btn" type="submit" value="Sign Up" />
          </form>
          <h3>Welcome to</h3>
          <h2>codiGo</h2>
        </div>
      </div>
    )
  }
}

export default Signup;