import React, { Component } from 'react';

// require("css!./stylesheet.css");
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// // import Landing from './Landing.jsx';
import Login from './Login.jsx';
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
  }

  render() {
    console.log(this.props.children)
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
