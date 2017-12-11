import axios from 'axios';

// Action Types
const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const GET_CAMPUS = 'GET_CAMPUS';

// Thunks
export function getCampusesThunk () {
    return (dispatch, getState) => {
      axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => dispatch(getCampuses(campuses)))
    }
  }

export function addCampusThunk (hideForm) {
  return (dispatch, getState) => {
    axios.post('/api/campuses', getState().campusForm)
      .then(res => res.data)
      .then(newCampus => dispatch(addCampus(newCampus)))
      .then(() => hideForm());
  }
}

export function deleteCampusThunk (campusID, history) {
  return (dispatch, getState) => {
    axios.delete(`/api/campuses/${campusID}`)
      .then(() => dispatch(deleteCampus(campusID)))
      .then(() => history.push('/'))
  }
}

export function editCampusThunk (campusID, hideForm) {
  return (dispatch, getState) => {
    axios.put(`/api/campuses/${campusID}`, getState().campusForm)
      .then(res => res.data)
      .then(editedCampus => dispatch(editCampus(editedCampus)))
      .then(() => hideForm());
  }
}

export function getCampusThunk (campusID) {
  return (dispatch, getState) => {
    axios.get(`/api/campuses/${campusID}`)
      .then(res => res.data)
      .then(campus => dispatch(getCampus(campus)))
  }
}

// Action Creators
function getCampuses (campuses) {
  return {
    type: GET_CAMPUSES,
    campuses
  }
}

function addCampus (newCampus) {
  return {
    type: ADD_CAMPUS,
    newCampus
  }
}

function deleteCampus (campusID) {
  return {
    type: DELETE_CAMPUS,
    campusID
  }
}

function editCampus (editedCampus) {
  return {
    type: EDIT_CAMPUS,
    editedCampus
  }
}

function getCampus (campus) {
  return {
    type: GET_CAMPUS,
    campus
  }
}

// Reducers
const initialState = [];

export function campusesRecucer (campuses = [], action) {
  switch(action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case ADD_CAMPUS:
      return [...campuses, action.newCampus];
    case DELETE_CAMPUS:
      return campuses.filter(campus => {
        return campus.id !== action.campusID;
      });
    case EDIT_CAMPUS:
      return campuses.map(campus => {
        if (campus.id === action.editedCampus.id) {
          return action.editedCampus;
        } else {
          return campus;
        }
      })
    default:
      return campuses;
  }
}
