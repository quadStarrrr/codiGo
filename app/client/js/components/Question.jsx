import React from 'react';
import { Link } from 'react-router';

const Question = props => {
  return (

    <div lassName="question">
      <h2 className="user-name"><Link to='/collaboration'>{props.description}</Link></h2>
      <span>{props.username}</span>
      <div className="question-text">{props.questionText}</div>
    </div>
  )
}

export default Question;