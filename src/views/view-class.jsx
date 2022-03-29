import React from 'react'
import { useLocation } from 'react-router-dom'
import {
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

const ViewClass = () => {
    const { state } = useLocation()
    const { cls } = state
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
    return (
        <Container>
            <Row>
                <Col xs={12} md={8}>
                    <Card body className="shadow">
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
                                >
                                    START CLASS <FaPlay />
                                </Button>
                            )}
                            {cls.progress_state === 'IN PROGRESS' && (
                                <Button
                                    color="warning"
                                    className="d-inline-flex align-items-center gap-3"
                                >
                                    END CLASS <FaPauseCircle />
                                </Button>
                            )}
                        </Col>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card body className="shadow"></Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewClass
