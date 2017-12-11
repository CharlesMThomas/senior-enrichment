import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './Navigation';

import CampusForm from './CampusForm';
import CampusPanel from './CampusPanel';

function AllCampuses (props) {
  return (
    <div className="campuses container">
      <div className="row">
        <div className="campuses-header col-xs-12">
          <h1>Campuses</h1>
          <button className="btn btn-success add-campus-btn" data-toggle="modal" data-target="#myModal" onClick={props.toggleCampusForm}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Campus</button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {
            props.showCampusForm ?
            <CampusForm history={props.history} hideForm={props.toggleCampusForm} action="add"/> :
            null
          }
        </div>
      </div>
      <div className="row">
          <div className="col-xs-12">
            <ul>
              {
                props.campuses.map(campus => {
                  return (
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3 campus-panel" key={campus.id}>
                      <Link to={`/campuses/${campus.id}`} key={campus.id}>
                        <CampusPanel imageURL={campus.imageURL} name={campus.name} />
                      </Link>
                    </div>
                  )
                })
              }
            </ul>
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

export default connect(mapStateToProps)(AllCampuses);
