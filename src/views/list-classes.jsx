import moment from 'moment-timezone'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    Badge,
    Card,
    CardColumns,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap'

const ListClasses = ({ status }) => {
    let classes = useSelector((state) => state.classes)
    switch (status) {
        case 'scheduled':
            classes = classes.filter((o) => o.progress_state === 'SCHEDULED')
            break
        case 'in-progress':
            classes = classes.filter((o) => o.progress_state === 'IN PROGRESS')
            break
        case 'completed':
            classes = classes.filter((o) => o.progress_state === 'COMPLETED')
            break
        default:
            break
    }
    return (
        <Container fluid="lg">
            <CardColumns>
                <Row>
                    {classes.map((cls) => {
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
                            <Col sm={12} md={3} className="mb-3">
                                <Card body>
                                    <p>
                                        <b>{cls.title}</b>
                                    </p>
                                    <p style={{ textDecoration: 'elipsis' }}>
                                        {cls.description.substring(0, 120)}
                                    </p>
                                    <Table className="table" borderless>
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Date
                                                </td>
                                                <td>
                                                    {moment(cls.start_time)
                                                        .tz('Asia/Kolkata')
                                                        .format('LL')}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Start
                                                </td>
                                                <td>
                                                    {moment(cls.start_time)
                                                        .tz('Asia/Kolkata')
                                                        .format('LT')}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    End
                                                </td>
                                                <td>
                                                    {moment(cls.end_time)
                                                        .tz('Asia/Kolkata')
                                                        .format('LT')}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Status
                                                </td>
                                                <td>
                                                    <Badge color={color}>
                                                        {cls.progress_state}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
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
