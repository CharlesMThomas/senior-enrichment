import axios from 'axios';

// Action types
const ADD_STUDENT = 'ADD_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENTS_FOR_CAMPUS = 'GET_STUDENTS_FOR_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';


// Thunks
export function addStudentThunk (hideForm) {
  return (dispatch, getState) => {
    axios.post('/api/students', getState().studentForm)
      .then(res => res.data)
      .then(newStudent => dispatch(addStudent(newStudent)))
      .then(() => hideForm());
  }
}

export function deleteStudentThunk (studentID, history) {
  return (dispatch, getState) => {
    axios.delete(`/api/students/${studentID}`)
      .then(() => dispatch(deleteStudent(studentID)))
      .then(() => {
        if (history) history.push('/students')
      })
  }
}

export function getStudentsForCampusThunk (campusID) {
  return (dispatch, getState) => {
    axios.get(`/api/students/campuses/${campusID}`)
      .then(res => res.data)
      .then(students => dispatch(getStudentsForCampus(students)))
  }
}

export function getStudentsThunk () {
  return (dispatch, getState) => {
    axios.get(`/api/students`)
      .then(res => res.data)
      .then(student => dispatch(getStudents(student)))
  }
}

export function editStudentThunk (studentId, hideForm) {
  return (dispatch, getState) => {
    axios.put(`/api/students/${studentId}`, getState().studentForm)
      .then(res => res.data)
      .then(student => dispatch(editStudent(student)))
      .then(() => hideForm());
  }
}

// Action Creators
function addStudent (newStudent) {
  return {
    type: ADD_STUDENT,
    newStudent
  }
}

function editStudent (student) {
  return {
    type: EDIT_STUDENT,
    student
  }
}

function deleteStudent (studentID) {
  return {
    type: DELETE_STUDENT,
    studentID
  }
}

function getStudentsForCampus (students) {
  return {
    type: GET_STUDENTS_FOR_CAMPUS,
    students
  }
}

function getStudents (students) {
  return {
    type: GET_STUDENTS,
    students
  }
}

// Reducers
const initialState = [];

export function studentsReducer (students = initialState, action) {
  switch(action.type) {
    case ADD_STUDENT:
      return [...students, action.newStudent];
    case EDIT_STUDENT:
      return students.map(student => {
        if (student.id === action.student.id) {
          return action.student;
        } else {
          return student
        }
      });
    case GET_STUDENTS:
      return action.students;
    case GET_STUDENTS_FOR_CAMPUS:
      return action.students;
    case DELETE_STUDENT:
      return students.filter(student => {
        return student.id !== action.studentID;
      });
    default:
      return students;
  }
}
