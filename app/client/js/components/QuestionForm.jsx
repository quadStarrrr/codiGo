import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <input type="text"/>
      </form>
    )
  }
}

export default QuestionForm;