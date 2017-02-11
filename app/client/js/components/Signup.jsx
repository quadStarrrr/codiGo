import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSignup}>
        <input name="username" type="text" onChange={this.props.handleInputChange} placeholder="username"/>
        <br/>
        <input name="password" type="password" onChange={this.props.handleInputChange} placeholder="password"/>
        <br/>
        <input type="submit" value="Sign Up" />
      </form>
    )
  }
}

export default Signup;