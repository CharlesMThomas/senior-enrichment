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
      <form>
        <label>
          Campus Name
        </label>
        <input
          id="name"
          type="text"
          value={props.name}
          onChange={props.handleNameChange}
        />
        <label>
          Campus Image
        </label>
        <input
          id="imageURL"
          type="text"
          value={props.imageURL}
          onChange={props.handleImageChange}
        />
        <label>
          Campus Description
        </label>
        <textarea
          id="description"
          type="text"
          value={props.description}
          onChange={props.handleDescChange}
        >
        </textarea>
        {
          props.action === 'add' ?
          <button type="submit" onClick={(e) => props.handleAddCampus(e, props)}>Add</button> :
          <button type="submit" onClick={(e) => props.handleEditCampus(e, props)}>Edit</button>
        }

      </form>
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
