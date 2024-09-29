import React from 'react'
import Bg from '../assets/Bg.png'

const Background = () => {
    return (
        <div
            style={{ backgroundImage: `url(${Bg})` }}
            className="from- absolute z-[-100] h-screen w-screen bg-gradient-to-b bg-cover bg-bottom"
        />
    )
}

export default Background
