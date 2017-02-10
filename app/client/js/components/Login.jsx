import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.attributes.type.value === 'text') {
      this.setState({ username: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div>
        <h1>codiGo</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} onChange={this.handleChange} />
          <input type="password" value={this.state.password} onChange={this.handleChange} />
          <input type="submit" value="Log In" />
        </form>
        <Link to='/signup'>Sign Up</Link>
      </div>
    )
  }
}

export default Login;