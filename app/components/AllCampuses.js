import React, { Component } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CampusForm from './CampusForm';
import { getCampusesThunk } from '../store/campuses';
import { resetCampusForm } from '../store/campusForm';

class AllCampuses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    }

    this.handleToggleForm = this.handleToggleForm.bind(this);
  }

  componentDidMount() {
    this.props.getCampuses();
    this.props.resetForm();
  }

  render() {
    return (
      <div className="campuses">
        <Navigation />
        <h1>All Campuses View</h1>
        <button onClick={this.handleToggleForm}>Add Campus</button>
        {
          this.state.showForm ?
          <CampusForm history={this.props.history} hideForm={this.handleToggleForm} action="add"/> :
          null
        }
        <ul>
        {
          this.props.campuses.map(campus => {
            return (
              <Link to={`/campuses/${campus.id}`} key={campus.id}>
                <li >{campus.name}</li>
              </Link>
            )
          })
        }
        </ul>
      </div>
    );
  }

  handleToggleForm() {
    this.setState({ showForm: !this.state.showForm });
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampuses: () => {
      dispatch(getCampusesThunk());
    },
    resetForm: () => {
      dispatch(resetCampusForm());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCampuses);
