import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleFormSubmit}>
          <input type="text"/>
      </form>
    )
  }
}

export default QuestionForm;