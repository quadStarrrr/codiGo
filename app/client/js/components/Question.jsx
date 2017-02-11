import React from 'react';
import { Link } from 'react-router';

const Question = props => {
  return (
    <div>
      <h2><Link to='/collaboration'>{props.description}</Link></h2>
      <p>{props.questionText}</p>
    </div>
  )
}

export default Question;