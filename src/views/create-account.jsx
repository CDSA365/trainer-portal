import React, { useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Row,
    Button,
    CardFooter,
    CardText,
} from 'reactstrap'
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa'
import CreateAccountStepOne from '../components/create-account-step-one'
import CreateAccountStepTwo from '../components/create-account-step.two'
import CreateAccountStepThree from '../components/create-account-step-three'
import { useLocation, useNavigate } from 'react-router-dom'
import { config } from '../config/config'
import axios from 'axios'
import moment from 'moment-timezone'

const CreateAccount = () => {
    const { state } = useLocation()
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        phone: '',
        whatsapp: '',
        dob: '',
        gender: '',
    })

    const nextStep = () => {
        setStep((step) => step + 1)
    }

    const prevStep = () => {
        setStep((step) => step - 1)
    }

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        const url = config.api.updateTrainer + `/${state.token}`
        formData.joining_date = moment().format()
        formData.status = 1
        formData.country = 'India'
        axios
            .put(url, formData)
            .then(() => navigate('/login', { replace: true }))
            .catch((err) => console.log(err))
    }

    const renderform = (step) => {
        switch (step) {
            case 1:
                return (
                    <CreateAccountStepOne
                        handler={handleChange}
                        value={formData}
                    />
                )
            case 2:
                return (
                    <CreateAccountStepTwo
                        handler={handleChange}
                        value={formData}
                    />
                )
            case 3:
                return (
                    <CreateAccountStepThree
                        handler={handleChange}
                        value={formData}
                    />
                )
            default:
                break
        }
    }

    return (
        <Container
            fluid
            style={{ height: '100vh', backgroundColor: '#1E293B' }}
        >
            <Row className="h-100 d-flex justify-content-center align-items-center">
                <Col md={4} className="">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="uppercase font-bold text-center mb-0">
                                <CardText>Create Account</CardText>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>{renderform(step)}</CardBody>
                        <CardFooter
                            className={`d-flex justify-content-${
                                step === 1 ? 'end' : 'between'
                            } py-3`}
                        >
                            {step > 1 && (
                                <Button color="primary" onClick={prevStep}>
                                    <FaArrowLeft /> Previous
                                </Button>
                            )}
                            {step < 3 && (
                                <Button color="primary" onClick={nextStep}>
                                    Continue <FaArrowRight />
                                </Button>
                            )}
                            {step === 3 && (
                                <Button color="success" onClick={handleSubmit}>
                                    Create Account <FaCheck />
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateAccount
