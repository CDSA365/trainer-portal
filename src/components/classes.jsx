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
    Button,
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

const Classes = ({
    status,
    title,
    classes,
    startClass,
    endClass,
    fetchClasses,
}) => {
    const showStartBtn = status === 'scheduled'
    const showCompleteBtn = status === 'in-progress'
    const showDoneBtn = status === 'completed'
    return (
        <Card className="shadow mb-4">
            <CardBody>
                <Row>
                    <Col>
                        <Row className="d-flex border-bottom pb-3 -mx-2">
                            <Col sm={9} xs={9} className="flex-grow-1">
                                <CardTitle className="text-xl font-bold mb-0 text-sky">
                                    {`${classes.length} ${title}`}
                                </CardTitle>
                                <CardText className="text-sm">
                                    List of assigned classes
                                </CardText>
                            </Col>
                            <Col
                                sm={3}
                                xs={3}
                                className="d-flex justify-content-end gap-3 align-items-center"
                            >
                                <BiRefresh
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    size={24}
                                    onClick={fetchClasses}
                                />
                                <Link to={`/dashboard/classes/view/${status}`}>
                                    <FaArrowRight
                                        size={16}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <ListGroup flush className="px-0 pt-3">
                                {classes.slice(0, 5).map((cls, i) => (
                                    <ListGroupItem
                                        key={i}
                                        className="py-3 d-flex"
                                    >
                                        <Col className="flex-grow-1">
                                            <Link
                                                to={`/dashboard/classes/view/${cls.slug}`}
                                                state={{ cls: cls }}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#333',
                                                }}
                                            >
                                                <ListGroupItemHeading
                                                    title={cls.title}
                                                    style={{
                                                        whiteSpace: 'nowrap',
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
                                                    style={{ color: '#a8a29e' }}
                                                >
                                                    <FaCalendar fill="#64748b" />{' '}
                                                    {moment(
                                                        cls.start_time
                                                    ).format('LL')}
                                                </Col>
                                                <Col
                                                    className="mb-0"
                                                    style={{ color: '#a8a29e' }}
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
                                            {showStartBtn && (
                                                <FaPlay
                                                    fill="#06b6d4"
                                                    type="button"
                                                    size={20}
                                                    onClick={() =>
                                                        startClass(cls.id)
                                                    }
                                                />
                                            )}
                                            {showCompleteBtn && (
                                                <FaStopCircle
                                                    fill="#f43f5e"
                                                    type="button"
                                                    size={20}
                                                    onClick={() =>
                                                        endClass(cls.id)
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
                                ))}
                                {/* {classes.length > 5 && (
                                    <ListGroupItem className="d-flex justify-content-right align-items-center">
                                        <Button>
                                            View all <FaArrowRight />
                                        </Button>
                                    </ListGroupItem>
                                )} */}
                            </ListGroup>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Classes
