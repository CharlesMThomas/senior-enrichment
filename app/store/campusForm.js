
// Action constants
const UPDATE_CAMPUS_FORM_DESC = 'UPDATE_CAMPUS_FORM_DESC';
const UPDATE_CAMPUS_FORM_IMAGE = 'UPDATE_CAMPUS_FORM_IMAGE';
const UPDATE_CAMPUS_FORM_NAME = 'UPDATE_CAMPUS_FORM_NAME';
const ADD_CAMPUS = 'ADD_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const RESET_FORM = 'RESET_FORM';

// Action Creators
export function updateCampusFormDesc (description) {
  return {
    type: UPDATE_CAMPUS_FORM_DESC,
    description
  }
}

export function updateCampusFormImage (imageURL) {
  return {
    type: UPDATE_CAMPUS_FORM_IMAGE,
    imageURL
  }
}

export function updateCampusFormName (name) {
  return {
    type: UPDATE_CAMPUS_FORM_NAME,
    name
  }
}

export function resetCampusForm () {
  return {
    type: RESET_FORM
  }
}


// Reducer
const initialState = {name: '', imageURL: '', description: ''};

export function campusFormReducer (campusForm = initialState, action) {
  switch(action.type) {
    case UPDATE_CAMPUS_FORM_NAME:
      return Object.assign({}, campusForm, {name: action.name})
    case UPDATE_CAMPUS_FORM_IMAGE:
      return Object.assign({}, campusForm, {imageURL: action.imageURL})
    case UPDATE_CAMPUS_FORM_DESC:
      return Object.assign({}, campusForm, {description: action.description})
    case ADD_CAMPUS:
      return initialState;
    case EDIT_CAMPUS:
      return initialState;
    case RESET_FORM:
      return initialState;
    default:
      return campusForm;
  }
}

