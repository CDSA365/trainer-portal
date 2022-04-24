import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import { config } from '../config/config'
import Switch from './switch'

const StudentsInClass = ({ id, progress_state }) => {
    const [students, setStudents] = useState([])

    const fetchStudentInClass = (id) => {
        axios
            .get(config.api.getStudentsInClass + `/${id}`)
            .then(({ data }) => setStudents(data))
            .catch((err) => console.log())
    }

    useEffect(() => {
        fetchStudentInClass(id)
    }, [id])

    return (
        <div>
            <div className="py-3 mb-4">
                <h4 style={{ fontWeight: 'bold' }}>
                    Students in this class ({students.length})
                </h4>
            </div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Student Phone</th>
                            <th>Mark Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, i) => {
                            return (
                                <tr key={i}>
                                    <td>{student.id}</td>
                                    <td>{student.student_name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <a href={`tel:+91${student.phone}`}>
                                            {student.phone}
                                        </a>
                                    </td>
                                    <td>
                                        <Switch
                                            name={'present'}
                                            student_id={student.id}
                                            class_id={id}
                                            attendance={student.attendance}
                                            disabled={
                                                progress_state !== 'IN PROGRESS'
                                            }
                                        />
                                        {progress_state === 'COMPLETED' &&
                                            student.attendance}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default StudentsInClass
