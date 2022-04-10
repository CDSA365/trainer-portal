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
    Alert,
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
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
    })

    const nextStep = () => {
        if (step === 1) {
            if (
                'phone' in formData &&
                formData.phone.length &&
                'whatsapp' in formData &&
                formData.whatsapp.length &&
                'dob' in formData &&
                formData.dob.length &&
                'gender' in formData &&
                formData.gender !== null
            ) {
                if (error) setError(null)
                setStep((step) => step + 1)
            } else {
                setError('All fields are mandatory')
            }
        } else if (step === 2) {
            if (
                'address_one' in formData &&
                formData.address_one.length &&
                'address_two' in formData &&
                formData.address_two &&
                'city' in formData &&
                formData.city.length &&
                'district' in formData &&
                formData.district.length &&
                'state' in formData &&
                formData.state.length &&
                'pincode' in formData &&
                formData.pincode.length
            ) {
                if (error) setError(null)
                setStep((step) => step + 1)
            } else {
                setError('All fields are mandatory')
            }
        }
    }

    const prevStep = () => {
        setStep((step) => step - 1)
    }

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        if (
            'education' in formData &&
            formData.education.length &&
            'certificate_url' in formData &&
            formData.certificate_url.length &&
            'aadhar_number' in formData &&
            formData.aadhar_number.length &&
            'password' in formData &&
            formData.password.length
        ) {
            if (error) setError(null)
            const url = config.api.updateTrainer + `/${state.token}`
            formData.joining_date = moment().format()
            formData.status = 1
            formData.country = 'India'
            axios
                .put(url, formData)
                .then(() => navigate('/login', { replace: true }))
                .catch((err) => console.log(err))
        } else {
            setError('All fields are mandatory')
        }
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
                        <CardBody>
                            {error && <Alert color="danger">{error}</Alert>}
                            {renderform(step)}
                        </CardBody>
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
