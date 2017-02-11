import React from 'react';

const Question = props => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  )
}

export default Question;