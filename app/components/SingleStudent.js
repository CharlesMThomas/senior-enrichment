import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import CampusPanel from './CampusPanel';
import StudentForm from './StudentForm';

import { deleteStudentThunk } from '../store/students';
import { updateStudentFormAllFields } from '../store/studentForm';

function SingleStudent (props) {
    const student = props.student || {};
    const campus = student.campus || {};
    return (
      <div className="single-student container">
        <div className="row">
          <div className="single-student-header col-xs-12">
            <h1>{student.name}</h1>
            <div className="buttons-wrapper">
              <button className="btn btn-default header-btn" onClick={() => {props.toggleStudentForm(); props.handleStudentEdit(student)}}>Edit</button>
              <button className="btn btn-danger header-btn" onClick={() => props.deleteStudent(props.studentID, props.history)}>Delete</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {
              props.showStudentForm ?
              <StudentForm  action="edit" studentID={student.id} hideForm={props.toggleStudentForm} /> :
              null
            }
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Link to={`/campuses/${campus.id}`}>
              <CampusPanel name={campus.name} imageURL={campus.imageURL}/>
            </Link>
          </div>
          <div className="col-md-9">
            <ul className="list-inline">
              <li className="list-inline-item">
                <h4>Email: </h4>
              </li>
              <li className="list-inline-item">
                {student.email}
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <h4>GPA: </h4>
              </li>
              <li className="list-inline-item">
                {student.gpa}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = (state, ownProps) => {
  return {
    student: state.students.find(student => {
      return student.id === +ownProps.routeProps.match.params.id
    })
    ,
    studentID: +ownProps.routeProps.match.params.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentID, history) => {
      dispatch(deleteStudentThunk(studentID, history));
    },
    handleStudentEdit: (student) => {
      dispatch(updateStudentFormAllFields(student))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

