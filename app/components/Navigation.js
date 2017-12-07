import React from 'react';
import { Link } from 'react-router-dom';

export default function Naviation(props) {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/students">Students</Link>
    </div>
  )
}
