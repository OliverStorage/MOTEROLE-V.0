import React, { useState } from 'react'

const ErrorModal = ({
    isVisible,
    title = 'Error Message',
    message = 'Something went wrong.',
    buttonText = 'Retry',
    onClose,
    onAction,
}) => {
    const [showModal, setShowModal] = useState(true)

    const handleRetry = () => {
        console.log('Retrying...')
        setShowModal(false)
    }
    //if (!isVisible) return null
    return (
        <>
            <div className="absolute z-[100] flex h-screen w-screen items-center justify-center bg-black bg-opacity-80">
                <div className="flex h-72 w-[500px] flex-col items-center justify-between space-y-2 rounded-xl bg-white p-5">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className="size-20 text-red-600"
                    >
                        <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z" />
                        <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
                    </svg>
                    <span className="flex w-full items-center justify-center text-xl font-black">
                        {title}
                    </span>
                    <span className="text-center">{message}</span>
                    <button
                        onClick={handleRetry}
                        className="h-10 w-full rounded-lg bg-red-600 text-white hover:bg-red-500 active:bg-red-700"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ErrorModal
