import React, { useState, useEffect } from 'react'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'

const FullScreen = () => {
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Fullscreen toggle function
    const toggleFullscreen = () => {
        const elem = document.documentElement // Get the whole document element

        if (!document.fullscreenElement) {
            // Enter fullscreen mode if the Fullscreen API is available
            if (elem.requestFullscreen) {
                elem.requestFullscreen()
            } else if (elem.webkitRequestFullscreen) {
                // Safari compatibility
                elem.webkitRequestFullscreen()
            } else if (elem.msRequestFullscreen) {
                // IE/Edge compatibility
                elem.msRequestFullscreen()
            }

            // Try to lock the orientation to landscape (for mobile devices)
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation
                    .lock('landscape')
                    .then(() => console.log('Orientation locked to landscape'))
                    .catch((err) => {
                        console.warn(
                            'Orientation lock failed or not supported:',
                            err,
                        )
                    })
            }

            setIsFullscreen(true) // Update state to fullscreen
        } else {
            // Exit fullscreen mode if the Fullscreen API is available
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.webkitExitFullscreen) {
                // Safari compatibility
                document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
                // IE/Edge compatibility
                document.msExitFullscreen()
            }

            setIsFullscreen(false) // Update state to non-fullscreen
        }
    }

    // Listen for changes to fullscreen state
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement) // Update state based on whether we're in fullscreen
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange,
            )
        }
    }, [])

    return (
        <>
            {/* Fullscreen button */}
            <button
                onClick={toggleFullscreen}
                className="action-btn flex cursor-pointer items-center justify-center rounded-xl bg-stone text-center text-white"
            >
                {isFullscreen ? (
                    <MdFullscreenExit className="size-12 mobile:size-10 ipad:size-14" />
                ) : (
                    <MdFullscreen className="size-12 mobile:size-10 ipad:size-14" />
                )}
            </button>
        </>
    )
}

export default FullScreen
