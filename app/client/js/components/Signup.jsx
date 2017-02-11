import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSignup}>
        <input type="text" value={this.props.username} onChange={this.props.handleChange} placeholder="username"/>
        <br/>
        <input type="password" value={this.props.password} onChange={this.props.handleChange} placeholder="password"/>
        <br/>
        <input type="submit" value="Sign Up" />
      </form>
    )
  }
}

// Signup.propTypes = {
//   msg: React.PropTypes.string.isRequired
// };

export default Signup;