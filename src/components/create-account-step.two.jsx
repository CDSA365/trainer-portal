import React from 'react'
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'

const CreateAccountStepTwo = ({ handler, value }) => {
    return (
        <Form>
            <FormGroup>
                <Label htmlFor="address_one">Address Line 1</Label>
                <Input
                    id="address_one"
                    name="address_one"
                    placeholder="Apartment, studio, or floor"
                    onChange={handler}
                    value={value.address_one ?? ''}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="address_two">Address Line 2</Label>
                <Input
                    id="address_two"
                    name="address_two"
                    placeholder="Apartment, studio, or floor"
                    onChange={handler}
                    value={value.address_two ?? ''}
                />
            </FormGroup>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            name="city"
                            onChange={handler}
                            value={value.city ?? ''}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="district">District</Label>
                        <Input
                            id="district"
                            name="district"
                            onChange={handler}
                            value={value.district ?? ''}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="state">State</Label>
                        <Input
                            id="state"
                            name="state"
                            onChange={handler}
                            value={value.state ?? ''}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                            id="pincode"
                            name="pincode"
                            onChange={handler}
                            value={value.pincode ?? ''}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default CreateAccountStepTwo
