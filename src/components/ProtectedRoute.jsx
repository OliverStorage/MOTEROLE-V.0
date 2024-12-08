import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
    const userSession = Cookies.get('userSession')
    const storedUser = Cookies.get('loggedInUser')
    const location = useLocation()

    // Redirect logged-out users to /signin
    if (!userSession || !storedUser) {
        Cookies.remove('userSession')
        Cookies.remove('loggedInUser')
        return <Navigate to="/signin" replace />
    }

    return children
}

export default ProtectedRoute
