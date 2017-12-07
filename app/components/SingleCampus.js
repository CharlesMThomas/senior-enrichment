import React, { Component } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CampusForm from './CampusForm';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

import { getCampusThunk, deleteCampusThunk} from '../store/selectedCampus';
import { resetCampusForm } from '../store/campusForm';
import { getStudentsForCampusThunk, deleteStudentThunk } from '../store/students';
import { updateStudentFormCampus } from '../store/studentForm';

class SingleCampus extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showForm: false,
        showStudentForm: false
      }

      this.handleToggleForm = this.handleToggleForm.bind(this);
      this.handleToggleStudentForm = this.handleToggleStudentForm.bind(this);
    }

    componentDidMount() {
      const campusID = this.props.match.params.id;
      this.props.getCampus(campusID);
      this.props.getStudentsForCampus(campusID);
      this.props.resetForm();
    }

    render() {
      return (
        <div className="campus">
          <Navigation />
          <h1>Single Campus View</h1>
          <button onClick={this.handleToggleForm}>Edit Campus</button>
          <button onClick={() => this.props.deleteCampus(this.props.campus.id, this.props.history)}>Delete Campus</button>
          <button onClick={this.handleToggleStudentForm}>Add Student</button>
          {
            this.state.showForm ?
            <CampusForm  action="edit" campusID={this.props.campus.id} hideForm={this.handleToggleForm} /> :
            null
          }
          {
            this.state.showStudentForm ?
            <StudentForm  action="add-to-campus" campuses={[this.props.campus]} hideForm={this.handleToggleStudentForm} /> :
            null
          }
          <div className="campus-details">
            {this.props.campus.name}
            <img src={this.props.campus.imageURL} />
            {this.props.campus.description}
          </div>
          <div className="campus-students">
            <StudentList history={this.props.history} students={this.props.students} deleteStudent={this.props.deleteStudent}/>
          </div>
        </div>
      );
    }

    handleToggleForm() {
      this.setState({ showForm: !this.state.showForm });
    }

    handleToggleStudentForm() {
      this.props.handleCampusChange(this.props.campus.id);
      this.setState({ showStudentForm: !this.state.showStudentForm });
    }
}

const mapStateToProps = (state) => {
  return {
    campus: state.selectedCampus,
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCampus: (campusID, history) => {
      dispatch(deleteCampusThunk(campusID, history));
    },
    getCampus: (campusID) => {
      dispatch(getCampusThunk(campusID));
    },
    getStudentsForCampus: (campusID) => {
      dispatch(getStudentsForCampusThunk(campusID));
    },
    handleCampusChange: (campusID) => {
      dispatch(updateStudentFormCampus(campusID))
    },
    resetForm: () => {
      dispatch(resetCampusForm());
    },
    deleteStudent: (studentID) => {
      dispatch(deleteStudentThunk(studentID));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
