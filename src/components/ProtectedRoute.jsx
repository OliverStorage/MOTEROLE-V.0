import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
    const userSession = Cookies.get('userSession') // Get the session cookie

    // Redirect to /signin if no session is found
    return userSession ? children : <Navigate to="/signin" replace />
}

export default ProtectedRoute
