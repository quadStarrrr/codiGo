import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1>codiGo</h1>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
    </div>
  )
}
