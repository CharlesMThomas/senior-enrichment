import React, { Component } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import StudentForm from './StudentForm';
import StudentList from './StudentList';

import { getStudentsThunk, deleteStudentThunk } from '../store/students';
import { getCampusesThunk } from '../store/campuses';

function AllStudents (props) {
  return (
    <div className="students container">
      <div className="row">
        <div className="students-header col-xs-12">
          <h1>Students</h1>
          <button className="btn btn-success" onClick={props.toggleStudentForm}>Add Student</button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {
            props.showStudentForm ?
            <StudentForm action="add" history={props.history} hideForm={props.toggleStudentForm} /> :
            null
          }
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-md-8">
        {
            props.students.length ?
            <StudentList history={props.history} students={props.students} view="student" /> :
            <h4 className="text-danger">No students currently enrolled.</h4>
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses
  }
}

export default connect(mapStateToProps)(AllStudents);

