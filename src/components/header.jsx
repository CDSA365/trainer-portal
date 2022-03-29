import React from 'react'
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

const Header = () => {
    return (
        <Container
            fluid
            style={{ backgroundColor: '#181C31' }}
            className="py-3"
        >
            <Row>
                <Col>
                    <Container>
                        <Navbar color="transparent" expand="md" dark>
                            <NavbarBrand href="/">reactstrap</NavbarBrand>
                            <NavbarToggler onClick={function noRefCheck() {}} />
                            <Collapse navbar>
                                <Nav className="me-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/components/">
                                            Components
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="https://github.com/reactstrap/reactstrap">
                                            GitHub
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <NavbarText>Simple Text</NavbarText>
                            </Collapse>
                        </Navbar>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Header
