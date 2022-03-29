import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Container, Row } from 'reactstrap'
import Attendance from '../components/attendance'

const ViewAttendance = () => {
    const { id } = useParams()
    return (
        <Container fluid="lg">
            <Row>
                <Col>
                    <Card body>
                        <Attendance id={id} />
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewAttendance
