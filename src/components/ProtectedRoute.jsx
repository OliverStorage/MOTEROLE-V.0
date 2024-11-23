import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
    const userSession = Cookies.get('userSession') // Get the session cookie
    const location = useLocation() // Get the current location (URL path)

    // If the user is logged in and tries to access /signin or /signup, redirect them to /menu
    if (
        userSession &&
        (location.pathname === '/signin' || location.pathname === '/signup')
    ) {
        return <Navigate to="/menu" replace />
    }

    // If the user is not logged in, redirect them to /signin
    return userSession ? children : <Navigate to="/signin" replace />
}

export default ProtectedRoute
