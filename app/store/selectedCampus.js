import axios from 'axios';

// Action Constansts
const GET_CAMPUS = 'GET_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';

// Thunks
export function getCampusThunk (campusID) {
  return (dispatch, getState) => {
    axios.get(`/api/campuses/${campusID}`)
      .then(res => res.data)
      .then(campus => dispatch(getCampus(campus)))
  }
}

// Action Creators
function getCampus (campus) {
  console.log(campus);
  return {
    type: GET_CAMPUS,
    campus
  }
}

// Reducer
export function selectedCampusRecuer (campus = {}, action) {
  switch(action.type) {
    case GET_CAMPUS:
      return action.campus;
    case EDIT_CAMPUS:
      return action.editedCampus;
    default:
      return campus;
  }
}
