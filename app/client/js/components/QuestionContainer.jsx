import React, { Component } from 'react';
import { Link } from 'react-router';

class QuestionContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //make request to our database to get list of questions
    axios.get('192.168.0.55:3000/loadForum')
      .then(res => console.log(res));
  }

  render() {
    console.log(this.props.children)
    return (
      <div>
        <h1>Hello</h1>
        <Link to='/form'>Form</Link>
        {this.props.children}
      </div>
    )
  }
}

export default QuestionContainer;