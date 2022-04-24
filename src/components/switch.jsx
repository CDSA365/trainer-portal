import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'

const Switch = ({ attendance, student_id, class_id, disabled }) => {
    const { post } = axios
    const [checked, setChecked] = useState(
        attendance !== null && attendance !== 'ABSENT'
    )
    const [isInitialRender, setIsInitialRender] = useState(true)
    const handleToggle = () => setChecked(!checked)

    const markAttendance = (student_id, class_id) => {
        const combined_id = `${student_id}${class_id}`
        const time = moment().tz('Asia/Kolkata')
        const attendance = checked ? 'PRESENT' : 'ABSENT'
        const year = attendance === 'PRESENT' ? time.year() : null
        const month = attendance === 'PRESENT' ? time.month() + 1 : null
        const week = attendance === 'PRESENT' ? time.isoWeek() : null
        const date = attendance === 'PRESENT' ? time.date() : null
        const values = {
            combined_id,
            student_id,
            class_id,
            attendance,
            year,
            month,
            week,
            date,
        }
        post(config.api.markAttendance, values)
            .then(() => console.log('done'))
            .catch((err) => setChecked(false))
    }

    useEffect(() => {
        if (!isInitialRender) {
            markAttendance(student_id, class_id)
        } else {
            setIsInitialRender(false)
        }
    }, [checked])

    return (
        !disabled && (
            <>
                <input
                    checked={checked}
                    onChange={handleToggle}
                    className="react-switch-checkbox"
                    id={`react-switch-${student_id}`}
                    type="checkbox"
                    hidden
                />
                <label
                    style={{ background: checked ? '#10b981' : '#fb7185' }}
                    className="react-switch-label"
                    htmlFor={`react-switch-${student_id}`}
                >
                    <span className={`react-switch-button`} />
                </label>
            </>
        )
    )
}

export default Switch
