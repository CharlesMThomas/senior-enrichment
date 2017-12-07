import axios from 'axios';

// Action constants
const GET_STUDENT = 'GET_STUDENT';

// Thunks
export function getStudentThunk (studentID) {
  return (dispatch, getState) => {
    axios.get(`/api/students/${studentID}`)
      .then(res => res.data)
      .then(student => dispatch(getStudent(student)))
  }
}

// Action Creators
function getStudent (student) {
  return {
    type: GET_STUDENT,
    student
  }
}

// Reducer
export function selectedStudentReducer (student = {}, action) {
  switch(action.type) {
    case GET_STUDENT:
      return action.student;
    default:
      return student;
  }
}
