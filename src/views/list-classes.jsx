import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Badge,
    Card,
    CardBody,
    CardColumns,
    CardHeader,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupText,
    Row,
    Table,
} from 'reactstrap'

const ListClasses = ({ status }) => {
    const classesFromState = useSelector((state) => state.classes)
    const [searchKey, setSearchKey] = useState('')
    const [classes, setClasses] = useState([])

    useEffect(() => {
        let cls = classesFromState
        switch (status) {
            case 'scheduled':
                let sc = cls.filter((o) => o.progress_state === 'SCHEDULED')
                setClasses(sc)
                break
            case 'in-progress':
                let ip = cls.filter((o) => o.progress_state === 'IN PROGRESS')
                setClasses(ip)
                break
            case 'completed':
                let cp = cls.filter((o) => o.progress_state === 'COMPLETED')
                setClasses(cp)
                break
            default:
                break
        }
    }, [classesFromState, status])

    return (
        <Container fluid="lg">
            <div className="searchBox mb-5">
                <InputGroup>
                    <InputGroupText>Search to filter</InputGroupText>
                    <Input onChange={(e) => setSearchKey(e.target.value)} />
                </InputGroup>
            </div>
            <CardColumns>
                <Row>
                    {classes
                        .filter((cls) =>
                            cls.title
                                .toLowerCase()
                                .includes(searchKey.toLowerCase())
                        )
                        .map((cls, key) => {
                            let color = 'default'
                            switch (cls.progress_state) {
                                case 'SCHEDULED':
                                    color = 'warning'
                                    break
                                case 'IN PROGRESS':
                                    color = 'success'
                                    break
                                case 'COMPLETED':
                                    color = 'danger'
                                    break
                                default:
                                    break
                            }
                            return (
                                <Col sm={12} md={6} className="mb-3" key={key}>
                                    <Card>
                                        <CardHeader className="d-flex justify-content-between align-items-center">
                                            <Link
                                                to={`/dashboard/classes/view/${cls.slug}`}
                                                state={{
                                                    cls,
                                                    progressClasses:
                                                        classesFromState.filter(
                                                            (o) =>
                                                                o.progress_state ===
                                                                'IN PROGRESS'
                                                        ),
                                                }}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#000',
                                                }}
                                            >
                                                <h3 className="text-xl ">
                                                    <b>{cls.title}</b>
                                                </h3>
                                            </Link>
                                            <Link
                                                to={`/dashboard/classes/view/${cls.slug}`}
                                                state={{
                                                    cls,
                                                    progressClasses:
                                                        classesFromState.filter(
                                                            (o) =>
                                                                o.progress_state ===
                                                                'IN PROGRESS'
                                                        ),
                                                }}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#3b82f6',
                                                }}
                                            >
                                                <span>View</span>
                                            </Link>
                                        </CardHeader>
                                        <CardBody>
                                            <Table className="table" borderless>
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Start</th>
                                                        <th>End</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            {moment(
                                                                cls.start_time
                                                            )
                                                                .tz(
                                                                    'Asia/Kolkata'
                                                                )
                                                                .format('LL')}
                                                        </td>
                                                        <td>
                                                            {moment(
                                                                cls.start_time
                                                            )
                                                                .tz(
                                                                    'Asia/Kolkata'
                                                                )
                                                                .format('LT')}
                                                        </td>
                                                        <td>
                                                            {moment(
                                                                cls.end_time
                                                            )
                                                                .tz(
                                                                    'Asia/Kolkata'
                                                                )
                                                                .format('LT')}
                                                        </td>
                                                        <td>
                                                            <Badge
                                                                color={color}
                                                            >
                                                                {
                                                                    cls.progress_state
                                                                }
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Video Link</b>
                                                        </td>
                                                        <td>
                                                            {cls.video_link ? (
                                                                <Badge color="primary">
                                                                    <a
                                                                        href={
                                                                            cls.video_link ||
                                                                            '#!'
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        style={{
                                                                            color: '#fff',
                                                                            textDecoration:
                                                                                'none',
                                                                            fontSize:
                                                                                '10px',
                                                                        }}
                                                                    >
                                                                        {
                                                                            cls.video_link
                                                                        }
                                                                    </a>
                                                                </Badge>
                                                            ) : (
                                                                <Badge color="danger">
                                                                    NA
                                                                </Badge>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            {/* <div className="p-2">
                                            {cls.progress_state ===
                                                'SCHEDULED' &&
                                            moment()
                                                .tz('Asia/Kolkata')
                                                .isBefore(
                                                    moment(cls.end_time).tz(
                                                        'Asia/Kolkata'
                                                    )
                                                ) ? (
                                                <Button color="primary" outline>
                                                    Start Class
                                                </Button>
                                            ) : null}
                                        </div> */}
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })}
                </Row>
            </CardColumns>
        </Container>
    )
}

export default ListClasses
