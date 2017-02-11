import React from 'react';
import { Link } from 'react-router';

const Question = props => {
  return (
    <div className="question">
      <h2 className="user-name"><Link to='/collaboration'>{props.description}</Link></h2>
      <div className="question-text">{props.questionText}</div>
    </div>
  )
}

export default Question;