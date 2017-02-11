import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('check: ', this.props.handleFormSubmit);
    return (
      <form onSubmit={this.props.handleFormSubmit}>
          <input name="questionTitle" type="text" placeholder="question title"/>
          <textarea name="questionText" placeholder="enter your question here"></textarea>
          <input type="submit" value="post" />
      </form>
    )
  }
}

export default QuestionForm;