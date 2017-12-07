
// Action constants
const UPDATE_STUDENT_FORM_FIRST_NAME = 'UPDATE_STUDENT_FORM_FIRST_NAME';
const UPDATE_STUDENT_FORM_LAST_NAME = 'UPDATE_STUDENT_FORM_LAST_NAME';
const UPDATE_STUDENT_FORM_EMAIL = 'UPDATE_STUDENT_FORM_EMAIL';
const UPDATE_STUDENT_FORM_GPA = 'UPDATE_STUDENT_FORM_GPA';
const UPDATE_STUDENT_FORM_CAMPUS = 'UPDATE_STUDENT_FORM_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';

// Action creators
export function updateStudentFormCampus (campusId) {
  return {
    type: UPDATE_STUDENT_FORM_CAMPUS,
    campusId
  }
}

export function updateStudentFormEmail (email) {
  return {
    type: UPDATE_STUDENT_FORM_EMAIL,
    email
  }
}

export function updateStudentFormFirstName (firstName) {
  return {
    type: UPDATE_STUDENT_FORM_FIRST_NAME,
    firstName
  }
}

export function updateStudentFormGpa (gpa) {
  return {
    type: UPDATE_STUDENT_FORM_GPA,
    gpa
  }
}

export function updateStudentFormLastName (lastName) {
  return {
    type: UPDATE_STUDENT_FORM_LAST_NAME,
    lastName
  }
}

// Reducers
const initialState = {firstName: '', lastName: '', email: '', gpa: '', campusId: ''};

export function studentFormReducer (studentForm = initialState, action) {
  switch(action.type) {
    case UPDATE_STUDENT_FORM_FIRST_NAME:
      return Object.assign({}, studentForm, {firstName: action.firstName})
    case UPDATE_STUDENT_FORM_LAST_NAME:
      return Object.assign({}, studentForm, {lastName: action.lastName})
    case UPDATE_STUDENT_FORM_EMAIL:
      return Object.assign({}, studentForm, {email: action.email})
    case UPDATE_STUDENT_FORM_GPA:
      return Object.assign({}, studentForm, {gpa: action.gpa})
    case UPDATE_STUDENT_FORM_CAMPUS:
      return Object.assign({}, studentForm, {campusId: action.campusId})
    case ADD_STUDENT:
      return initialState;
    default:
      return studentForm;
  }
}

