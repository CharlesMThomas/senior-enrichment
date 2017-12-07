import React, { Component } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import { getStudentsThunk } from '../store/students';
import { getCampusesThunk } from '../store/campuses';

class AllStudents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    }

    this.handleFormToggle = this.handleFormToggle.bind(this);
  }

  componentDidMount() {
    this.props.getStudents();
    this.props.getCampuses();
  }

  render() {
    return (
      <div className="students">
        <Navigation />
        <h1>All Students View</h1>
        <button onClick={this.handleFormToggle}>Add Student</button>
        {
          this.state.showForm ?
          <StudentForm action="add" history={this.props.history} hideForm={this.handleFormToggle} campuses={this.props.campuses}/> :
          null
        }
        <div>
          <StudentList students={this.props.students} />
        </div>
      </div>
    );
  }

  handleFormToggle () {
    this.setState({ showForm: !this.state.showForm });
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: () => {
      dispatch(getStudentsThunk());
    },
    getCampuses: () => {
      dispatch(getCampusesThunk());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents);

