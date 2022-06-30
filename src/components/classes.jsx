import React from 'react'
import {
    FaArrowRight,
    FaCalendar,
    FaCheck,
    FaClock,
    FaPlay,
    FaStopCircle,
} from 'react-icons/fa'
import { BiRefresh } from 'react-icons/bi'
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    Row,
} from 'reactstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Placeholder from './placeholder'

const Classes = ({
    status,
    title,
    classes,
    startClass,
    endClass,
    fetchClasses,
    progressClasses = [],
}) => {
    const showStartBtn = status === 'scheduled'
    const showCompleteBtn = status === 'in-progress'
    const showDoneBtn = status === 'completed'
    return (
        <Card className="shadow-none mb-4">
            <CardBody>
                <Row>
                    <Col>
                        <Row className="d-flex border-bottom pb-3 -mx-2">
                            <Col sm={6} xs={6} className="flex-grow-1">
                                <CardTitle className="text-xl font-bold mb-0 text-sky">
                                    {`${classes.length} ${title}`}
                                </CardTitle>
                                <CardText className="text-sm">
                                    List of assigned classes
                                </CardText>
                            </Col>
                            <Col
                                sm={6}
                                xs={6}
                                className="d-flex justify-content-end gap-3 align-items-center"
                            >
                                <BiRefresh
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    size={24}
                                    onClick={fetchClasses}
                                />
                                <Link
                                    to={`/dashboard/${status}-classes`}
                                    replace={true}
                                    className="btn btn-primary btn-xs d-flex"
                                >
                                    <span>View all</span>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <ListGroup flush className="px-0 pt-3">
                                {classes.length > 0 ? (
                                    classes.slice(0, 5).map((cls, i) => (
                                        <ListGroupItem
                                            key={i}
                                            className="py-3 d-flex"
                                        >
                                            <Col className="flex-grow-1">
                                                <Link
                                                    to={`/dashboard/classes/view/${cls.slug}`}
                                                    state={{
                                                        cls,
                                                        progressClasses,
                                                    }}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: '#333',
                                                    }}
                                                >
                                                    <ListGroupItemHeading
                                                        title={cls.title}
                                                        style={{
                                                            whiteSpace:
                                                                'nowrap',
                                                            color:
                                                                moment().isAfter(
                                                                    moment(
                                                                        cls.end_time
                                                                    )
                                                                ) &&
                                                                cls.progress_state ===
                                                                    'SCHEDULED'
                                                                    ? '#ef4444'
                                                                    : '#1f2937',
                                                        }}
                                                    >
                                                        {cls.title.length > 34
                                                            ? cls.title.substr(
                                                                  0,
                                                                  34
                                                              ) + '...'
                                                            : cls.title}
                                                    </ListGroupItemHeading>
                                                </Link>
                                                <Col className="d-md-flex gap-2">
                                                    <Col
                                                        className="mb-0"
                                                        style={{
                                                            color: '#a8a29e',
                                                        }}
                                                    >
                                                        <FaCalendar fill="#64748b" />{' '}
                                                        {moment(
                                                            cls.start_time
                                                        ).format('LL')}
                                                    </Col>
                                                    <Col
                                                        className="mb-0"
                                                        style={{
                                                            color: '#a8a29e',
                                                        }}
                                                    >
                                                        <FaClock fill="#64748b" />{' '}
                                                        {moment(
                                                            cls.start_time
                                                        ).format('LT') +
                                                            ' - ' +
                                                            moment(
                                                                cls.end_time
                                                            ).format('LT')}
                                                    </Col>
                                                </Col>
                                            </Col>
                                            <Col
                                                sm={2}
                                                xs={2}
                                                className="d-flex flex-column justify-content-center align-items-center gap-3"
                                            >
                                                {showStartBtn &&
                                                    moment().isBefore(
                                                        moment(cls.end_time)
                                                    ) && (
                                                        <FaPlay
                                                            fill="#06b6d4"
                                                            type="button"
                                                            size={20}
                                                            onClick={() =>
                                                                startClass(
                                                                    cls.id,
                                                                    cls.end_time
                                                                )
                                                            }
                                                        />
                                                    )}
                                                {showCompleteBtn && (
                                                    <FaStopCircle
                                                        fill="#f43f5e"
                                                        type="button"
                                                        size={20}
                                                        onClick={() =>
                                                            endClass(
                                                                cls.id,
                                                                cls.end_time
                                                            )
                                                        }
                                                    />
                                                )}
                                                {showDoneBtn && (
                                                    <FaCheck
                                                        fill="#10b981"
                                                        size={20}
                                                    />
                                                )}
                                            </Col>
                                        </ListGroupItem>
                                    ))
                                ) : (
                                    <Placeholder
                                        message={'No classes to list'}
                                    />
                                )}
                            </ListGroup>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Classes
