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
      user_id: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleFormSubmit(e) {
    // let reqObj = { 
    //   user_id: req.body.user_id,
    //   question_text: req.body.question_text,
    //   ip_address: req.body.ip_address,
    //   port_id: req.body.port_id,
    // }
    // axios.post('/createQuestion', reqObj, (req, res) => {

    // });
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
        console.log('good response');
        Router.browserHistory.push('/home');
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
          handleSignup: this.handleSignup}
        )}
      </div>
     
    )
  }
}

export default App;
