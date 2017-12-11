/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import { campusFormReducer } from './campusForm';
import { studentFormReducer } from './studentForm';
import { campusesRecucer } from './campuses';
import { studentsReducer } from './students';

const rootReducer = combineReducers({
  campusForm: campusFormReducer,
  studentForm: studentFormReducer,
  campuses: campusesRecucer,
  students: studentsReducer,
})

export default rootReducer
