import React from 'react';

export default function CampusPanel (props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{props.name}</h3>
      </div>
      <div className="panel-body">
        <img className="img img-responsive" src={props.imageURL}/>
      </div>
    </div>
  )
}
