import React from 'react'
import { Link } from 'react-router-dom'
import {
    Col,
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    NavLink,
    Row,
} from 'reactstrap'

const SubHeader = () => {
    return (
        <Container fluid style={{ backgroundColor: '#ffffff' }}>
            <Row>
                <Col>
                    <Container fluid="lg">
                        <Navbar
                            color="transparent"
                            expand="md"
                            light
                            className="py-0"
                        >
                            <NavbarToggler onClick={null} />
                            <Collapse navbar>
                                <Nav className="me-auto" navbar>
                                    <NavItem className="sub-nav">
                                        <Link
                                            to="/dashboard/scheduled-classes"
                                            style={{ textDecoration: 'none' }}
                                            className="nav-link sub-nav-link px-3 py-4"
                                        >
                                            Scheduled Classes
                                        </Link>
                                    </NavItem>
                                    <NavItem className="sub-nav">
                                        <Link
                                            to={`/dashboard/in-progress-classes`}
                                            style={{ textDecoration: 'none' }}
                                            className="nav-link sub-nav-link px-3 py-4"
                                        >
                                            Classes In Progress
                                        </Link>
                                    </NavItem>
                                    <NavItem className="sub-nav">
                                        <Link
                                            to={`/dashboard/completed-classes`}
                                            style={{ textDecoration: 'none' }}
                                            className="nav-link sub-nav-link px-3 py-4"
                                        >
                                            Completed Classes
                                        </Link>
                                    </NavItem>
                                    <NavItem className="sub-nav">
                                        <Link
                                            to={`/dashboard/attendance/`}
                                            style={{ textDecoration: 'none' }}
                                            className="nav-link sub-nav-link px-3 py-4"
                                        >
                                            Attendance
                                        </Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default SubHeader
