// Package Imports
import React from 'react';
import { connect } from 'react-redux';

// Component Imports
import Navigation from './Navigation';

// Store Imports
import { updateStudentFormFirstName,
        updateStudentFormLastName,
        updateStudentFormEmail,
        updateStudentFormGpa,
        updateStudentFormCampus } from '../store/studentForm';
import { addStudentThunk, editStudentThunk } from '../store/students';

// import editCampusThunk from '../actions/editCampusthunk';

function StudentForm (props) {
  return (
    <div className="add-student">
      <div className="form-wrapper">
        <form className="student-form panel panel-default col-md-6 col-md-offset-3">
          {
            props.action === 'add' || props.action === 'add-to-campus' ?
            <h2 className="text-center">Add Student {props.action === 'add-to-campus' ? `to ${props.campuses[0].name}` : null}</h2> :
            <h2 className="text-center">Edit Student</h2>
          }
          <div className="close-btn" onClick={props.hideForm}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
            <div className="form-group">
              <label>
                First Name
              </label>
              <input
                id="firstName"
                className="form-control"
                type="text"
                value={props.firstName}
                onChange={props.handleFirstNameChange}
              />
            </div>
            <div className="form-group">
              <label>
                Last Name
              </label>
              <input
                id="lastName"
                className="form-control"
                type="text"
                value={props.lastName}
                onChange={props.handleLastNameChange}
              />
            </div>
            <div className="form-group">
              <label>
                Email
              </label>
              <input
                id="email"
                className="form-control"
                type="text"
                value={props.email}
                onChange={props.handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label>
                GPA
              </label>
              <input
                id="gpa"
                className="form-control"
                type="text"
                value={props.gpa}
                onChange={props.handleGpaChange}
              />
            </div>
            <div className="form-group">
              <label className={props.action === 'add-to-campus' ? "hide" : ""}>
                Campus
              </label>
              <select
                id="campusSelect"
                className={props.action === 'add-to-campus' ? "hide" : "form-control"}
                onChange={props.handleCampusChange}
                value={props.campusId}
              >
              {
                props.action !== 'add-to-campus' ?
                <option>Select a Campus</option> :
                null
              }

              {
                props.campuses.map(campus => {
                  return <option value={campus.id} key={campus.id}>{campus.name}</option>
                })
              }
              </select>
            </div>
            { props.action === 'add' || props.action === 'add-to-campus' ?
              <button type="submit" className="btn btn-success" onClick={(e) => props.handleAddStudent(e, props)}>Add</button> :
              <button type="submit" className="btn btn-success" onClick={(e) => props.handleEditStudent(e, props)}>Edit</button>
            }
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    firstName: state.studentForm.firstName,
    lastName: state.studentForm.lastName,
    email: state.studentForm.email,
    gpa: state.studentForm.gpa,
    campusId: state.studentForm.campusId,
    campuses: state.campuses
  }
}

const mapDisptachToProps = (dispatch) => {
  return {
    handleFirstNameChange: (e) => {
      dispatch(updateStudentFormFirstName(e.target.value))
    },
    handleLastNameChange: (e) => {
      dispatch(updateStudentFormLastName(e.target.value))
    },
    handleEmailChange: (e) => {
      dispatch(updateStudentFormEmail(e.target.value))
    },
    handleGpaChange: (e) => {
      dispatch(updateStudentFormGpa(e.target.value))
    },
    handleCampusChange: (e) => {
      dispatch(updateStudentFormCampus(e.target.value))
    },
    handleAddStudent: (e, props) => {
      e.preventDefault();
      dispatch(addStudentThunk(props.hideForm));
    },
    handleEditStudent: (e, props) => {
      e.preventDefault();
      dispatch(editStudentThunk(props.studentID, props.hideForm));
    }
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(StudentForm);
