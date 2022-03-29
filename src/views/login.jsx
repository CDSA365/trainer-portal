import axios from 'axios'
import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Col,
    Container,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap'
import { config } from '../config/config'

const Login = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState([])
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        axios
            .post(config.api.login, formData)
            .then(({ data }) => {
                if (error.length) setError([])
                navigate(`/dashboard/${data.id}`, {
                    replace: true,
                    state: data,
                })
            })
            .catch((err) => {
                const { error: e, errors } = err.response.data
                console.log(err.response.data)
                if (e) setError([...errors])
            })
            .finally(() => setFormData({}))
    }

    return (
        <Container
            fluid
            style={{ height: '100vh', backgroundColor: '#1E293B' }}
        >
            <Row className="h-100 d-flex justify-content-center align-items-center">
                <Col md={3}>
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="uppercase font-bold text-center mb-0">
                                <CardText>Login</CardText>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {error.length > 0 &&
                                error.map((e, i) => (
                                    <div key={i}>
                                        <Alert color="danger">{e.msg}</Alert>
                                    </div>
                                ))}
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="john@doe.com"
                                    value={formData.email ?? ''}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="*********"
                                    value={formData.password ?? ''}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button
                                block
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Login <FaSignInAlt />
                            </Button>
                        </CardBody>
                    </Card>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Link
                                to="/forgot-password"
                                className="py-2 text-white"
                            >
                                Forgot Password
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
