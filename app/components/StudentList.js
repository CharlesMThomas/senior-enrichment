import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteStudentThunk } from '../store/students';

function StudentList (props) {
  return (
    <div className="student-list">
      <table className="table table-striped panel panel-default">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            {
              props.view === 'student' ?
              <th>Campus</th> :
              null
            }
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            props.students.map(student => {
              return (
                <tr key={student.id}>
                <td>
                  {student.id}
                </td>
                <td>
                  <Link to={`/students/${student.id}`}>{student.name}</Link>
                </td>
                {
                  props.view === 'student' ?
                  <td><Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></td> :
                  null
                }
                <td>
                  <span className="glyphicon glyphicon-remove delete" aria-hidden="true" onClick={() => props.deleteStudent(student.id)}></span>
                </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: (studentID) => {
      dispatch(deleteStudentThunk(studentID));
    }
  }
}

export default connect(null, mapDispatchToProps)(StudentList)
