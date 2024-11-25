import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const PublicRoute = ({ children }) => {
    const userSession = Cookies.get('userSession')

    // Redirect logged-in users to /menu
    if (userSession) {
        return <Navigate to="/menu" replace />
    }

    return children
}

export default PublicRoute
