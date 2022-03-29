import React from 'react'
import { Outlet } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import Header from '../components/header'
import SubHeader from '../components/sub-header'

const Dashboard = () => {
    return (
        <Container fluid>
            <Row>
                <Header />
                <SubHeader />
            </Row>
            <Row className="py-5">
                <Col>
                    <Container>
                        <Outlet />
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
