import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { setUser } from '../redux/actions/actions'
import { Link } from 'react-router-dom'

const Header = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const signout = () => {
        dispatch(setUser({}))
    }
    return (
        <Container
            fluid
            style={{ backgroundColor: '#181C31' }}
            className="py-3"
        >
            <Row>
                <Col>
                    <Container fluid="lg">
                        <Navbar color="transparent" expand="md" dark>
                            <Link to="/dashboard" className="navbar-brand">
                                CDSA365
                            </Link>
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
                                {user.isLoggedIn ? (
                                    <NavbarText
                                        className="text-white"
                                        style={{ cursor: 'pointer' }}
                                        onClick={signout}
                                    >
                                        <FaSignOutAlt size={20} />
                                    </NavbarText>
                                ) : (
                                    <NavbarText
                                        className="text-white"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <FaSignInAlt size={20} />
                                    </NavbarText>
                                )}
                            </Collapse>
                        </Navbar>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Header
