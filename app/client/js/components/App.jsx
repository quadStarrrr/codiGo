import React, { Component } from 'react';
import axios from 'axios';
import Router from 'react-router';

// require("css!./stylesheet.css");
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// // import Landing from './Landing.jsx';
// import Login from './Login.jsx';
// import Signup from './Signup.jsx';
// import Forum from './Forum.jsx';
// import QuestionContainer from './QuestionContainer.jsx';

        {/*<div>
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/home' component={Forum}>
            <IndexRoute component={QuestionContainer} />
          </Route>
        </div>*/}
        {/*<Route exact path='/' component={Login}>
          <Route path='signup' component={Signup} />
          <Route path='home' component={Forum}>
          </Route>
        </Route>*/}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      user_id: '',
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log('check', e.target.elements.questionTitle.value);
    console.log('check', e.target.elements.questionText.value);
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

  handleLoginChange(e) {
    if (e.target.attributes.type.value === 'text') {
      this.setState({ username: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  }

  handleSignup(e) {
    //handle when a user tries to make an account
    e.preventDefault();
    axios.post('/register', { username: this.state.username, password: this.state.password })
    .then((res) => {
      console.log(res);
      this.setState({ user_id: res.data.user_id, password: '' });
      
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
          handleLoginChange: this.handleLoginChange,
          handleFormSubmit: this.handleFormSubmit,
          handleSignup: this.handleSignup}
        )}
      </div>
     
    )
  }
}

export default App;
