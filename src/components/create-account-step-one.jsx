import React from 'react'
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'

const CreateAccountStepOne = ({ handler, value }) => {
    return (
        <Form>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="first_name" className="text-xs">
                            First Name
                        </Label>
                        <Input
                            id="first_name"
                            name="first_name"
                            placeholder="First Name"
                            type="text"
                            value={value.first_name ?? ''}
                            onChange={handler}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="last_name" className="text-xs">
                            Last Name
                        </Label>
                        <Input
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name"
                            type="text"
                            value={value.last_name ?? ''}
                            onChange={handler}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label htmlFor="email" className="text-xs">
                    Email
                </Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={value.email ?? ''}
                    readOnly
                />
            </FormGroup>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="phone" className="text-xs">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Phone Number"
                            type="tel"
                            onChange={handler}
                            value={value.phone ?? ''}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="whatsapp_number" className="text-xs">
                            WhatsApp Number
                        </Label>
                        <Input
                            id="whatsapp_number"
                            name="whatsapp"
                            placeholder="WhatsApp Number"
                            type="tel"
                            onChange={handler}
                            value={value.whatsapp ?? ''}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="exampleAddress" className="text-xs">
                            Date of Birth
                        </Label>
                        <Input
                            type="date"
                            id="dob"
                            name="dob"
                            onChange={handler}
                            value={value.dob ?? ''}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="gender">Gender</Label>
                        <Input
                            type="select"
                            name="gender"
                            id="gender"
                            onChange={handler}
                            value={value.gender ?? null}
                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default CreateAccountStepOne
