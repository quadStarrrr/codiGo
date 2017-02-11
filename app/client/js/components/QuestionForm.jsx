import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <div className="innerLogin">
          <form classname="form-group" onSubmit={this.props.handleFormSubmit}>
            <div>
            <input className="form-control"  name="questionTitle" type="text" placeholder="question title"/>

            </div>
            <textarea className="form-control question-input" name="questionText" placeholder="enter your question here"></textarea>
            <input className="loginButton btn" type="submit" value="post" />
          </form>
        </div>
      </div>
    )
    console.log('check: ', this.props.handleFormSubmit);
  }
}

export default QuestionForm;