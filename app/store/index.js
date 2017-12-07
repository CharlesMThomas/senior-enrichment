/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import { campusFormReducer } from './campusForm';
import { studentFormReducer } from './studentForm';
import { campusesRecucer } from './campuses';
import { selectedCampusRecuer } from './selectedCampus';
import { studentsReducer } from './students';
import { selectedStudentReducer } from './selectedStudent';

const rootReducer = combineReducers({
  campusForm: campusFormReducer,
  studentForm: studentFormReducer,
  campuses: campusesRecucer,
  selectedCampus: selectedCampusRecuer,
  students: studentsReducer,
  selectedStudent: selectedStudentReducer
})

export default rootReducer
