import React from 'react'
import { useEffect } from 'react'

const Error = () => {
    useEffect(() => {
        document.title = 'Error 404'
    })
    return <div>Error 404</div>
}

export default Error
