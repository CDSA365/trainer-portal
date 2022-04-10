import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Dashboard from '../layout/dashboard'

const PrivateRoute = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    return isLoggedIn ? <Dashboard /> : <Navigate to={'/login'} replace />
}

export default PrivateRoute
