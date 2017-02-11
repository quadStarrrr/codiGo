import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleFormSubmit}>
          <input type="text" placeholder="question title"/>
          <textarea placeholder="enter your question here"></textarea>
          <input type="submit">post</input>
      </form>
    )
  }
}

export default QuestionForm;