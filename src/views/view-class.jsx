import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Alert,
    Badge,
    Button,
    Card,
    CardText,
    CardTitle,
    Col,
    Container,
    Row,
} from 'reactstrap'
import {
    FaCalendar,
    FaCheck,
    FaClock,
    FaPauseCircle,
    FaPlay,
    FaRegClock,
} from 'react-icons/fa'
import moment from 'moment'
import StudentsInClass from '../components/list-students-in-class'
import SubmitRemark from '../components/submit-remark'
import { config } from '../config/config'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ViewClass = () => {
    const { id, salary } = useSelector((state) => state.user)
    const { state } = useLocation()
    const [cls, setCls] = useState(state.cls)
    const [error, setError] = useState(null)

    const badgeColor = (progress_state) => {
        switch (progress_state) {
            case 'SCHEDULED':
                return 'warning'
            case 'IN PROGRESS':
                return 'primary'
            case 'COMPLETED':
                return 'success'
            default:
                break
        }
    }
    const badgeIcon = (progress_state) => {
        switch (progress_state) {
            case 'SCHEDULED':
                return <FaCalendar size={14} />
            case 'IN PROGRESS':
                return <FaPlay />
            case 'COMPLETED':
                return <FaCheck />
            default:
                break
        }
    }

    const fetchClassDetail = (class_id) => {
        axios
            .get(config.api.getClassDetails + `/${class_id}`)
            .then(({ data }) => setCls(data))
    }

    const checkForRemarks = (class_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const url = config.api.getRemarks + `/${class_id}/${id}`
                const { data } = await axios.get(url)
                data.length ? resolve(true) : reject(false)
            } catch (error) {
                reject(false)
            }
        })
    }

    const startClass = (classId, end_time) => {
        const currentTime = moment()
        if (state.progressClasses.length) {
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
                salary: salary,
            }
            const udpateClassState = axios.put(classStatusUrl, classData)
            const createTimeLog = axios.post(logTimeUrl, logData)
            const promises = [createTimeLog, udpateClassState]
            Promise.allSettled(promises)
                .then((result) => fetchClassDetail(classId))
                .catch((err) => console.log(err))
        }
    }

    const endClass = (classId, endTime) => {
        checkForRemarks(classId)
            .then(() => {
                if (error) setError(null)
                const classStatusUrl = config.api.updateClass + `/${classId}`
                const logTimeUrl =
                    config.api.endTrainerTime + `/${id}/${classId}`
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
                    .then(() => fetchClassDetail(classId))
                    .catch((err) => console.log(err))
            })
            .catch(() => {
                setError('Please add remarks to end the class')
            })
    }

    return (
        <Container fluid="lg">
            <Row>
                <Col xs={12} md={8}>
                    {error && <Alert color="danger">{error}</Alert>}
                    <Card body className="shadow-none mb-4">
                        <CardTitle
                            style={{ fontSize: '1.5em' }}
                            className="font-bold"
                        >
                            {cls.title}
                        </CardTitle>
                        <Col className="d-inline-flex gap-4">
                            <Badge
                                color={badgeColor(cls.progress_state)}
                                className="d-inline-flex gap-2 align-items-center"
                            >
                                {badgeIcon(cls.progress_state)}
                                {cls.progress_state}
                            </Badge>
                            <Badge
                                color="danger"
                                className="d-inline-flex gap-2 align-items-center"
                            >
                                <FaCalendar />
                                {moment(cls.start_time).format('LL')}
                            </Badge>
                            <Badge
                                color="info"
                                className="d-inline-flex gap-2 align-items-center"
                            >
                                <FaRegClock />
                                {moment(cls.start_time).format('LT')}
                            </Badge>
                            <Badge
                                color="info"
                                className="d-inline-flex gap-2 align-items-center"
                            >
                                <FaClock />
                                {moment(cls.end_time).format('LT')}
                            </Badge>
                        </Col>
                        <hr />
                        <CardText>{cls.description}</CardText>
                        <Col className="d-flex justify-content-end">
                            {cls.progress_state === 'SCHEDULED' && (
                                <Button
                                    color="success"
                                    className="d-inline-flex align-items-center gap-3"
                                    onClick={() =>
                                        startClass(cls.id, cls.end_time)
                                    }
                                >
                                    START CLASS <FaPlay />
                                </Button>
                            )}
                            {cls.progress_state === 'IN PROGRESS' && (
                                <Button
                                    color="warning"
                                    className="d-inline-flex align-items-center gap-3"
                                    onClick={() =>
                                        endClass(cls.id, cls.end_time)
                                    }
                                >
                                    END CLASS <FaPauseCircle />
                                </Button>
                            )}
                        </Col>
                    </Card>
                    <Card body className="shadow-none mb-4">
                        <StudentsInClass
                            id={cls.id}
                            progress_state={cls.progress_state}
                        />
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card body className="shadow-none">
                        <SubmitRemark class_id={cls.id} />
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewClass
