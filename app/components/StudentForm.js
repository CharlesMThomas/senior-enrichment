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
import { addStudentThunk } from '../store/students';

// import editCampusThunk from '../actions/editCampusthunk';

function StudentForm (props) {
  return (
    <div className="add-campus">
      <form>
        <label>
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={props.firstName}
          onChange={props.handleFirstNameChange}
        />
        <label>
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={props.lastName}
          onChange={props.handleLastNameChange}
        />
        <label>
          Email
        </label>
        <input
          id="email"
          type="text"
          value={props.email}
          onChange={props.handleEmailChange}
        />
        <label>
          GPA
        </label>
        <input
          id="gpa"
          type="text"
          value={props.gpa}
          onChange={props.handleGpaChange}
        />

        <select
          id="campusSelect"
          onChange={props.handleCampusChange}
        >
        {
          props.action === 'add' ?
          <option>Select a Campus</option> :
          null
        }

        {
          props.campuses.map(campus => {
            return <option value={campus.id} key={campus.id}>{campus.name}</option>
          })
        }
        </select>

        { props.action === 'add' || props.action === 'add-to-campus' ?
          <button type="submit" onClick={(e) => props.handleAddStudent(e, props)}>Add</button> :
          <button type="submit" onClick={(e) => props.handleEditStudent(e, props)}>Edit</button>
        }

      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    firstName: state.studentForm.firstName,
    lastName: state.studentForm.lastName,
    email: state.studentForm.email,
    gpa: state.studentForm.gpa
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
      dispatch(editStudentThunk(props.campusID, props.hideForm));
    }
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(StudentForm);
