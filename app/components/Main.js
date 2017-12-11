import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Navigation from './Navigation';

import { getCampusesThunk } from '../store/campuses';
import { getStudentsThunk } from '../store/students';
import { resetCampusForm } from '../store/campusForm';
import { resetStudentForm } from '../store/studentForm';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCampusForm: false,
      showStudentForm: false
    }

    this.toggleCampusForm = this.toggleCampusForm.bind(this);
    this.toggleStudentForm = this.toggleStudentForm.bind(this);
  }

  componentDidMount() {
    this.props.getCampuses();
    this.props.getStudents();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/students/:id" render={(routeProps) => <SingleStudent routeProps={routeProps} history={routeProps.history} showStudentForm={this.state.showStudentForm} toggleStudentForm={this.toggleStudentForm}/>} />
              <Route exact path="/students" render={(routeProps) => <AllStudents routeProps={routeProps} history={routeProps.history} showStudentForm={this.state.showStudentForm} toggleStudentForm={this.toggleStudentForm} />} />
              <Route exact path="/campuses/:id" render={(routeProps) => <SingleCampus routeProps={routeProps} history={routeProps.history} showCampusForm={this.state.showCampusForm} toggleCampusForm={this.toggleCampusForm} showStudentForm={this.state.showStudentForm} toggleStudentForm={this.toggleStudentForm} />} />
              <Route exact path="/campuses" render={(routeProps) => <AllCampuses history={routeProps.history} showCampusForm={this.state.showCampusForm} toggleCampusForm={this.toggleCampusForm} /> } />
              <Redirect path="/" to="/campuses" />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }

  toggleCampusForm() {
    if (this.state.showCampusForm) this.props.resetCampusForm();
    this.setState({ showCampusForm: !this.state.showCampusForm });
  }

  toggleStudentForm() {
    if (this.state.showStudentForm) this.props.resetStudentForm();
    this.setState({ showStudentForm: !this.state.showStudentForm });
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampuses: () => {
      dispatch(getCampusesThunk());
    },
    getStudents: () => {
      dispatch(getStudentsThunk());
    },
    deleteCampus: (campusID, history) => {
      dispatch(deleteCampusThunk(campusID, history));
    },
    deleteStudent: (studentID) => {
      dispatch(deleteStudentThunk(studentID));
    },
    resetCampusForm: () => {
      dispatch(resetCampusForm());
    },
    resetStudentForm: () => {
      dispatch(resetStudentForm());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
