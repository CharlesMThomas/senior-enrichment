import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './Navigation';

import { deleteStudentThunk } from '../store/students';
import { getStudentThunk } from '../store/selectedStudent';

class SingleStudent extends Component {

  componentDidMount() {
    const studentID = this.props.match.params.id;
    this.props.getStudent(studentID);
  }

  render() {
    const studentID = this.props.match.params.id;
    const history = this.props.history;

    return (
      <div className="campus">
        <Navigation />
        <h1>Single Student View</h1>
        <button onClick={() => this.props.deleteStudent(studentID, history)}>Delete</button>
        <div className="student">
          {this.props.student.name}
          {this.props.student.email}
          {this.props.student.gpa}
          <Link to={`/campuses/${this.props.campus.id}`}>
            {this.props.campus.name}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.selectedStudent,
    campus: state.selectedStudent.campus || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudent: (studentID) => {
      dispatch(getStudentThunk(studentID));
    },
    deleteStudent: (studentID, history) => {
      dispatch(deleteStudentThunk(studentID, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

