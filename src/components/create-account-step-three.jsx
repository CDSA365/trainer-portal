import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

const CreateAccountStepThree = ({ handler, value }) => {
    return (
        <Form>
            <FormGroup>
                <Label htmlFor="education">Education</Label>
                <Input
                    id="education"
                    name="education"
                    placeholder="Eg: Bachelor's of Engineering"
                    onChange={handler}
                    value={value.education ?? ''}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="certificate_url">Certificates</Label>
                <Input
                    id="certificate_url"
                    name="certificate_url"
                    onChange={handler}
                    value={value.certificate_url ?? ''}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="aadhar_number">Aadhar Number</Label>
                <Input
                    id="aadhar_number"
                    name="aadhar_number"
                    onChange={handler}
                    value={value.aadhar_number ?? ''}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Create Password</Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handler}
                    value={value.password ?? ''}
                />
            </FormGroup>
        </Form>
    )
}

export default CreateAccountStepThree
