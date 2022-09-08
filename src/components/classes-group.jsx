import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Col, Row } from 'reactstrap'
import { config } from '../config/config'
import { setClass } from '../redux/actions/actions'
import Classes from './classes'
import Placeholder from './placeholder'

const ClassesGroup = () => {
    const user = useSelector((state) => state.user)
    const { id } = user
    const [classes, setClasses] = useState([])
    const [error, setError] = useState(null)
    const [scheduledClasses, setScheduledClasses] = useState([])
    const [progressClasses, setProgressClasses] = useState([])
    const [completedClasses, setCompletedClasses] = useState([])
    const dispatch = useDispatch()

    const fetchClasses = () => {
        const url = config.api.getTrainerClasses + `/${id}`
        axios
            .get(url)
            .then(({ data }) =>
                dispatch(setClass(data)).then(() => setClasses(data))
            )
            .catch((err) => console.log(err))
    }

    const startClass = (classId, end_time) => {
        const currentTime = moment()
        if (progressClasses.length) {
            const message = `You have a class in progress. please complete the class to start a new class.`
            setError(message)
        } else if (currentTime.isAfter(moment(end_time))) {
            const message = `The class you are trying to start cannot be started after the end time.`
            setError(message)
        } else {
            if (error) setError(null)
            const classStatusUrl = config.api.updateClass + `/${classId}`
            const logTimeUrl = config.api.createTrainerTime
            const classData = {
                progress_state: 'IN PROGRESS',
            }
            const logData = {
                trainer_id: id,
                class_id: classId,
                day_of_week: currentTime.format('dddd'),
                day: currentTime.date(),
                week: currentTime.isoWeek(),
                month: currentTime.month() + 1,
                year: currentTime.year(),
                date: currentTime.format('YYYY-MM-DD'),
                start_time: currentTime.toISOString(),
                salary: user.salary,
            }
            const udpateClassState = axios.put(classStatusUrl, classData)
            const createTimeLog = axios.post(logTimeUrl, logData)
            const promises = [createTimeLog, udpateClassState]
            Promise.allSettled(promises)
                .then((result) => {
                    console.log(result)
                    fetchClasses()
                })
                .catch((err) => console.log(err))
        }
    }

    const endClass = (classId, endTime) => {
        const classStatusUrl = config.api.updateClass + `/${classId}`
        const logTimeUrl = config.api.endTrainerTime + `/${id}/${classId}`
        const classData = {
            progress_state: 'COMPLETED',
        }
        const logData = {
            end_time: moment().isAfter(moment(endTime))
                ? moment(endTime).toISOString()
                : moment().toISOString(),
        }
        const trainerLog = axios.put(logTimeUrl, logData)
        const classUpdate = axios.put(classStatusUrl, classData)
        const promises = [trainerLog, classUpdate]
        Promise.allSettled(promises)
            .then((result) => {
                console.log(result)
                fetchClasses()
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchClasses()
    }, [])

    useEffect(() => {
        if (classes.length) {
            const cls = classes
            const P = 'SCHEDULED'
            const IP = 'IN PROGRESS'
            const C = 'COMPLETED'
            const scheduled = cls.filter((o) => o.progress_state === P)
            const progress = cls.filter((o) => o.progress_state === IP)
            const completed = cls.filter((o) => o.progress_state === C)
            setScheduledClasses(scheduled)
            setProgressClasses(progress)
            setCompletedClasses(completed)
        } else {
            setScheduledClasses([])
            setProgressClasses([])
            setCompletedClasses([])
        }
    }, [classes])

    return (
        <Row>
            {error && (
                <Col xs={12}>
                    <Alert color="info">{error}</Alert>
                </Col>
            )}
            {[...scheduledClasses, ...progressClasses, ...completedClasses]
                .length === 0 ? (
                <Placeholder message={'No classes to view at this moment.'} />
            ) : (
                <>
                    <Col md={4} sm={12}>
                        <Classes
                            status="scheduled"
                            title="Classes Scheduled"
                            classes={scheduledClasses}
                            startClass={startClass}
                            endClass={endClass}
                            fetchClasses={fetchClasses}
                            progressClasses={progressClasses}
                        />
                    </Col>
                    <Col md={4} sm={12}>
                        <Classes
                            status="in-progress"
                            title="Classes in progress"
                            classes={progressClasses}
                            startClass={startClass}
                            endClass={endClass}
                            fetchClasses={fetchClasses}
                        />
                    </Col>
                    <Col md={4} sm={12}>
                        <Classes
                            status="completed"
                            title="Classes Completed"
                            classes={completedClasses}
                            startClass={startClass}
                            endClass={endClass}
                            fetchClasses={fetchClasses}
                        />
                    </Col>
                </>
            )}
        </Row>
    )
}

export default ClassesGroup
