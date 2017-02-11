import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import QuestionContainer from './components/QuestionContainer.jsx';
import QuestionForm from './components/QuestionForm.jsx';
import Collaboration from './components/Collaboration.jsx';

        // <Route path='/question/:id' component={} />
render(
  <Router history={browserHistory}>
    <Route exact path='/' component={App}>
      <IndexRoute component={Login} />
      <Route path='signup' component={Signup} />
      <Route path='home' component={QuestionContainer} />
      <Route path='form' component={QuestionForm} />
      <Route path='collaboration' component={Collaboration} />
    </Route>
  </Router>,
  document.getElementById('app')
);

