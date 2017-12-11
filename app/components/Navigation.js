import React from 'react';
import { Link } from 'react-router-dom';

export default function Naviation(props) {
  return (
    <div className="navbar navbar-default">
      <div className="container-fluid">
        <div className="nav-header">
          <Link to="/campuses" className="navbar-brand">
            NYC Coding Bootcamps
          </Link>
        </div>
        <div className="navbar-right">
          <Link to="/campuses"><button className="btn btn-default nav-btns">Home</button></Link>
          <Link to="/students"><button className="btn btn-default nav-btns">Students</button></Link>
        </div>
      </div>
    </div>
  )
}
