import React, { Component } from 'react';
import axios from 'axios';
import Router from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      user_id: '',
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // console.log('check', e.target.elements.questionTitle.value);
    // console.log('check', e.target.elements.questionText.value);
    let reqObj = { 
      user_id: Number(this.state.user_id),
      question_title: e.target.elements.questionTitle.value,
      question_text: e.target.elements.questionText.value,
      question_id: Math.floor(Math.random() * 100000),
      status: 'open',
      ip_address: '',
      port_id: 0,
    }
    axios.post('/createQuestion', reqObj)
    .then((res) => {
      console.log(res);
      this.props.router.push('/home');
    })
    .catch((err) => {
      console.log(err);
    });
    console.log('event: ', e);
  }

  handleLogin(e) {
    e.preventDefault();
    //make post request to database to login the user
    axios.post('/login', { username: this.state.username, password: this.state.password })
    .then((res) => {
      this.setState({ user_id: res.data.user_id });
      console.log('login-response: ', res);
      if (res.status === 200) {
        //redirect to /home
        this.props.router.push('/home');  
      }
    })
    .catch((error) => {
      // console.log(error);
    });
  }

  handleInputChange(e) {
    if (e.target.attributes.type.value === 'text') {
      this.setState({ username: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  }

  handleSignup(e) {
    //handle when a user tries to make an account
    e.preventDefault();
    console.log(e);
    axios.post('/register', { username: this.state.username, password: this.state.password })
    .then((res) => {
      console.log(res);
      this.setState({ user_id: res.data.user_id, password: '' });
      this.props.router.push('/home');
    });
  }

  render() {
    return ( 
      <div>
        {React.cloneElement(
          this.props.children, 
          {username: this.state.username, 
          password: this.state.password, 
          handleLogin: this.handleLogin, 
          handleInputChange: this.handleInputChange,
          handleFormSubmit: this.handleFormSubmit,
          handleSignup: this.handleSignup}
        )}
      </div>
     
    )
  }
}

export default App;
