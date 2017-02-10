import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import Landing from './Landing.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
// import Forum from './components/Forum.jsx';
import QuestionContainer from './components/QuestionContainer.jsx';
import QuestionForm from './components/QuestionForm.jsx';
import Test from './components/Test.jsx';

        // <Route path='/question/:id' component={} />
render(
  <Router history={browserHistory}>
    <Route exact path='/' component={App}>
      <IndexRoute component={Login} />
      <Route path='signup' component={Signup} />
      <Route path='home' component={QuestionContainer}>
        <Route path='/form' component={QuestionForm} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('app')
);

