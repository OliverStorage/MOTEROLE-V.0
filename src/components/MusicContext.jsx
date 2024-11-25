// src/contexts/MusicContext.js
import React, { createContext, useEffect, useRef, useState } from 'react'
import bbbs from '../assets/bbbs.mp3'
// import additional songs here

export const MusicContext = createContext()

export const MusicProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false) // Default to false
    const [tugtogVolume, setTugtogVolume] = useState(
        localStorage.getItem('tugtogVolume') || 30,
    )
    const [tunogVolume, setTunogVolume] = useState(
        localStorage.getItem('tugtogVolume') || 30,
    )
    const [selectedSong, setSelectedSong] = useState('bbbs')
    const audioRef = useRef(new Audio(bbbs))

    // Song map to easily switch between tracks
    const songMap = {
        bbbs: bbbs,
        // Uncomment and add additional songs as needed
        // music2: music2,
        // music3: music3,
        // music4: music4,
    }

    useEffect(() => {
        const audio = audioRef.current
        audio.volume = tugtogVolume / 100
        audio.loop = true // Enable looping

        // Attempt autoplay
        if (isPlaying) {
            audio.play().catch((error) => {
                console.log(
                    'Autoplay failed, user interaction may be required.',
                )
            })
        }

        return () => {
            audio.pause()
        }
    }, [])

    // Update audio volume in real-time
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = tugtogVolume / 100
        }
        localStorage.setItem('tugtogVolume', tugtogVolume)
    }, [tugtogVolume])

    // Update audio volume in real-time
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = tunogVolume / 100
        }
        localStorage.setItem('tunogVolume', tunogVolume)
    }, [tunogVolume])

    // Update song selection or play/pause state
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = songMap[selectedSong]
            if (isPlaying) {
                audioRef.current.play()
            }
        }
    }, [selectedSong, isPlaying])

    // Toggle play/pause functionality
    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current
                .play()
                .catch((error) => console.log('Error playing audio:', error))
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <MusicContext.Provider
            value={{
                tugtogVolume,
                setTugtogVolume,
                tunogVolume,
                setTunogVolume,
                selectedSong,
                setSelectedSong,
                isPlaying,
                togglePlay,
            }}
        >
            {children}
        </MusicContext.Provider>
    )
}
