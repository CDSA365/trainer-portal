import React from 'react'
import { Link } from 'react-router-dom'
import {
    Col,
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarText,
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
                    <Container>
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
                                        <NavLink
                                            href="/components/"
                                            className="sub-nav-link px-3 py-4"
                                        >
                                            Scheduled Classes
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="sub-nav">
                                        <NavLink
                                            href="/components/"
                                            className="sub-nav-link px-3 py-4"
                                        >
                                            Classes In Progress
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="sub-nav">
                                        <NavLink
                                            href="/components/"
                                            className="sub-nav-link px-3 py-4"
                                        >
                                            Completed Classes
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="sub-nav">
                                        <Link
                                            to={`/dashboard/attendance/`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <NavLink className="sub-nav-link px-3 py-4">
                                                Attendance
                                            </NavLink>
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
