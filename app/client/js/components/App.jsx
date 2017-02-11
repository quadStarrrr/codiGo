import React, { Component } from 'react';
import axios from 'axios';

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
    axios.post('/createQuestion', {

    })
  }

  handleLogin(e) {
    e.preventDefault();
    //make post request to database to login the user
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
  }

  render() {
    console.log(this)
    return ( 
      <div>
        {React.cloneElement(
          this.props.children, 
          {username: this.state.username, 
          password: this.state.password, 
          handleSubmit: this.handleLogin, 
          handleChange: this.handleLoginChange,
          handleSignup: this.handleSignup}
        )}
      </div>
     
    )
  }
}

export default App;
