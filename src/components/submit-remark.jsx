import axios from 'axios'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert, Button, Input, ListGroup, ListGroupItem } from 'reactstrap'
import { config } from '../config/config'

const SubmitRemark = ({ class_id }) => {
    const user = useSelector((state) => state.user)
    const [remarks, setRemarks] = useState([])
    const [formData, setFormData] = useState({
        remark: '',
        trainer_id: user.id,
        class_id,
    })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const addRemarks = () => {
        if (formData.remark.length === 0) {
            setError('Please enter remark!')
        } else {
            axios
                .post(config.api.addRemarks, formData)
                .then(() => {
                    setError(null)
                    fetchRemarks()
                })
                .catch((err) => console.log(err))
        }
    }

    const fetchRemarks = () => {
        axios
            .get(config.api.getRemarks + `/${class_id}/${user.id}`)
            .then(({ data }) => setRemarks(data))
            .catch((err) => console.log(err))
            .finally(() => setFormData((state) => ({ ...state, remark: '' })))
    }

    useEffect(() => {
        fetchRemarks()
    }, [class_id])

    return (
        <div>
            <div className="mb-4">
                <h4 style={{ fontWeight: 'bold' }}>Remarks</h4>
            </div>
            {remarks.length > 0 && (
                <ul className="mb-4 p-0" style={{ listStyleType: 'none' }}>
                    {remarks.map((remark, i) => (
                        <li
                            key={i}
                            className="p-3 mb-3 border rounded"
                            style={{
                                backgroundColor: '#f1f5f9',
                                borderWidth: '1px solid #cbd5e1',
                            }}
                        >
                            <p className="mb-0">{remark.remark}</p>
                        </li>
                    ))}
                </ul>
            )}
            {error && <Alert color="danger">{error}</Alert>}
            <Input
                size="lg"
                name="remark"
                type="textarea"
                value={formData.remark}
                onChange={handleChange}
                className="mb-3"
            />
            <Button
                size="md"
                color="primary"
                className="float-end"
                onClick={addRemarks}
            >
                Add remark
            </Button>
        </div>
    )
}

export default SubmitRemark
