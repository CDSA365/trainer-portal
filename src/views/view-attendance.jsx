import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Col, Container, Row } from 'reactstrap'
import Attendance from '../components/attendance'

const ViewAttendance = () => {
    const user = useSelector((state) => state.user)
    const { id } = user
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
