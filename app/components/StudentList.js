import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentList (props) {
  return (
    <div className="student-list">
      <ul>
        {
          props.students.map(student => {
            return (
              <div key={student.id}>
                <Link to={`/students/${student.id}`}>
                  <li>{student.name}</li>
                </Link>
                <li><button onClick={() => props.deleteStudent(student.id)}>Delete</button></li>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}
