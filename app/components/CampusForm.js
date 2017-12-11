import React from 'react';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import { updateCampusFormName,
         updateCampusFormImage,
         updateCampusFormDesc } from '../store/campusForm';
import { addCampusThunk, editCampusThunk } from '../store/campuses';

function CampusForm (props) {
  return (
    <div className="add-campus">
      <div className="form-wrapper">
        <form className="campus-form panel panel-default col-md-6 col-md-offset-3">
          {
            props.action === 'add' ?
            <h2 className="text-center">Add New Campus</h2> :
            <h2 className="text-center">Edit Campus</h2>
          }
          <div className="close-btn" onClick={props.hideForm}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
          <div className="form-group">
            <label>
              Campus Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={props.name}
              onChange={props.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label>
              Campus Image URL
            </label>
            <input
              id="imageURL"
              type="text"
              className="form-control"
              value={props.imageURL}
              onChange={props.handleImageChange}
            />
          </div>
          <div className="form-group">
            <label>
              Campus Description
            </label>
            <textarea
              id="description"
              type="text"
              className="form-control"
              value={props.description}
              onChange={props.handleDescChange}
            >
          </textarea>
          </div>
          {
            props.action === 'add' ?
            <button className="btn btn-success" type="submit" onClick={(e) => props.handleAddCampus(e, props)}>Add</button> :
            <button className="btn btn-success" type="submit" onClick={(e) => props.handleEditCampus(e, props)}>Edit</button>
          }
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.campusForm.name,
    imageURL: state.campusForm.imageURL,
    description: state.campusForm.description
  }
}

const mapDisptachToProps = (dispatch) => {
  return {
    handleNameChange: (e) => {
      dispatch(updateCampusFormName(e.target.value))
    },
    handleImageChange: (e) => {
      dispatch(updateCampusFormImage(e.target.value))
    },
    handleDescChange: (e) => {
      dispatch(updateCampusFormDesc(e.target.value))
    },
    handleAddCampus: (e, props) => {
      e.preventDefault();
      dispatch(addCampusThunk(props.hideForm));
    },
    handleEditCampus: (e, props) => {
      e.preventDefault();
      dispatch(editCampusThunk(props.campusID, props.hideForm));
    }
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(CampusForm);
