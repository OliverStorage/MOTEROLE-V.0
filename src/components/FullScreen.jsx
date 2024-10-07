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
                className="flex cursor-pointer items-center justify-center rounded-xl bg-[#8D8686] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#5e5a5a,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
            >
                {isFullscreen ? (
                    <MdFullscreenExit className="size-10 lg:size-14" />
                ) : (
                    <MdFullscreen className="size-10 lg:size-14" />
                )}
            </button>
        </>
    )
}

export default FullScreen
