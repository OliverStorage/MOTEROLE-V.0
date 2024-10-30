import React, { useState } from 'react'
import Info from '../assets/info.png'
import InfoMessage from './InfoMessage'

const InfoPopup = ({ messages = [] }) => {
    // Default to empty array
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="flex cursor-pointer select-none items-center justify-center overflow-hidden text-center text-white duration-100 active:translate-y-1 mobile:-translate-y-1"
            >
                <img
                    src={Info}
                    alt="Info"
                    className="size-14 select-none mobile:size-10 ipad:size-14"
                />
            </button>
            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                >
                    <InfoMessage messages={messages} />
                </div>
            )}
        </>
    )
}

export default InfoPopup
