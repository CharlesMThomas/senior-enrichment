import React, { Component } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CampusForm from './CampusForm';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

import { deleteCampusThunk } from '../store/campuses';
import { resetCampusForm, updateCampusFormAllFields } from '../store/campusForm';
import { getStudentsForCampusThunk, deleteStudentThunk } from '../store/students';
import { updateStudentFormCampus } from '../store/studentForm';

function SingleCampus (props) {
  const campus = props.campus || {};
  const students = props.students || [];
  return (
    <div className="campus container">
      <div className="row">
        <div className="campus-header col-xs-12">
          <h1>{campus.name}</h1>
          <div className="campus-buttons">
            <button className="btn btn-default" onClick={() => { props.toggleCampusForm(), props.handleCampusEdit(campus)}}>
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit Campus
            </button>
            <button className="btn btn-danger" onClick={() => props.deleteCampus(props.campus.id, props.history)}>
              <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete Campus
            </button>
            <button className="btn btn-success" onClick={() => { props.toggleStudentForm(); props.handleCampusChange(props.campusID)}}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Student
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {
            props.showCampusForm ?
            <CampusForm action="edit" campusID={props.campus.id} hideForm={props.toggleCampusForm} currentCampus={props.campus}/> :
            null
          }
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
      {
        props.showStudentForm ?
        <StudentForm  action="add-to-campus" campuses={[props.campus]} hideForm={props.toggleStudentForm} /> :
        null
      }
        </div>
      </div>
      <div className="row">
        <div className="campus-details col-md-6">
          <div className="col-md-4">
            <img className="img-responsive" src={campus.imageURL} />
          </div>
          <div className="col-md-8">
            <h3>About</h3>
            <p className="text-justify">{campus.description}</p>
          </div>
        </div>
        <div className="campus-students col-md-6">
          <h3>Enrolled Students</h3>
          {
            students.length ?
            <StudentList history={props.history} students={students} view="campus" /> :
            <h4 className="text-danger">No students currently enrolled.</h4>
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    campus: state.campuses.find(campus => {
      return campus.id === +ownProps.routeProps.match.params.id;
    }),
    students: state.students.filter(student => {
      return student.campusId === +ownProps.routeProps.match.params.id;
    }),
    campusID: +ownProps.routeProps.match.params.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCampus: (campusID, history) => {
      dispatch(deleteCampusThunk(campusID, history));
    },
    handleCampusChange: (campusID) => {
      dispatch(updateStudentFormCampus(campusID))
    },
    handleCampusEdit: (campus) => {
      dispatch(updateCampusFormAllFields(campus))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
