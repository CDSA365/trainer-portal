import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { config } from '../config/config'

const VerifyInvite = () => {
    const [verifying, setVerifying] = useState(false)
    const [error, setError] = useState([])
    const { token } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setVerifying(true)
        const url = config.api.verifyTrainer + `/${token}`
        axios
            .get(url)
            .then(({ data }) => {
                if (data.verified) {
                    setVerifying(false)
                    navigate('/create-account', {
                        replace: true,
                        state: {
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email,
                            token: data.token,
                        },
                    })
                }
            })
            .catch((err) => {
                console.log(err.response.data)
                setVerifying(false)
                setError([...err.response.data])
            })
    }, [token])

    return <div>{verifying ? 'Verifying...' : 'Verified'}</div>
}

export default VerifyInvite
