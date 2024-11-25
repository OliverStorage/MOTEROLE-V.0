import React from 'react'
import Bg from '../assets/Bg.png'

const Background = () => {
    return (
        <div
            style={{ backgroundImage: `url(${Bg})` }}
            className="absolute z-[-100] h-screen w-screen bg-cover bg-bottom"
        />
    )
}

export default Background
