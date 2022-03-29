import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Container, Input, Row, Table } from 'reactstrap'
import TimelineProgress from '../components/progress-timeline'
import { config } from '../config/config'

const Attendance = () => {
    const { id } = useParams()
    const [attendance, setAttendance] = useState({})
    const [selectedWeek, setSelectedWeek] = useState(() => {
        let currentTime = moment()
        let year = currentTime.format('YYYY')
        let week = currentTime.isoWeek()
        let selected = `${year}-W${week}`
        return selected
    })
    const dayOfWeeks = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ]

    const getDuration = (d, attendance) => {
        if (d && attendance[d]) {
            let seconds = attendance[d].duration
            return moment.utc(seconds * 1000).format('HH:mm:ss')
        } else {
            return '0:00:00'
        }
    }

    useEffect(() => {
        const week = moment(selectedWeek).isoWeek()
        const month = moment(selectedWeek).month() + 1
        const year = moment(selectedWeek).year()
        axios
            .get(config.api.getAttendance + `/${id}/${week}/${month}/${year}`)
            .then(({ data }) => {
                setAttendance(data)
            })
            .catch((err) => console.log(err))
    }, [selectedWeek])

    useEffect(() => console.log('attendance', attendance), [attendance])

    return (
        <Container>
            <Row>
                <Col>
                    <Card body className="py-4">
                        <Row className="mb-3">
                            <Col className="d-flex gap-4">
                                <span
                                    className="p-2 rounded font-bold"
                                    style={{
                                        backgroundColor: '#fee2e2',
                                        color: '#ef4444',
                                    }}
                                >
                                    {moment(selectedWeek).format('YYYY')}
                                </span>
                                <span
                                    className="p-2 rounded font-bold"
                                    style={{
                                        backgroundColor: '#fee2e2',
                                        color: '#ef4444',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {moment(selectedWeek).format('MMMM')}
                                </span>
                                <span
                                    className="p-2 rounded font-bold"
                                    style={{
                                        backgroundColor: '#fee2e2',
                                        color: '#ef4444',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {`WEEK ${moment(selectedWeek).isoWeek()}`}
                                </span>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                                <Input
                                    type="week"
                                    name="week"
                                    defaultValue={selectedWeek}
                                    onChange={(e) =>
                                        setSelectedWeek(e.target.value)
                                    }
                                />
                            </Col>
                        </Row>
                        <Table borderless responsive>
                            <tbody>
                                {attendance &&
                                    dayOfWeeks.map((d) => (
                                        <tr key={d}>
                                            <td className="col-md-1 align-middle">
                                                <Row className="d-flex flex-column">
                                                    <Col
                                                        className="font-bold"
                                                        style={{
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {d}
                                                    </Col>
                                                </Row>
                                            </td>
                                            <td>
                                                <TimelineProgress
                                                    day={d}
                                                    attendance={attendance}
                                                />
                                            </td>
                                            <td className="col-md-1 align-middle">
                                                {attendance &&
                                                    getDuration(d, attendance)}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Attendance
