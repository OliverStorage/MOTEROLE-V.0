// src/context/AudioProvider.js

import React, { createContext, useState, useEffect, useRef } from 'react'
import bbbs from '../assets/bbbs.mp3'


// Create the AudioContext to share audio data and controls
export const AudioContext = createContext()

const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(true) // Set to play by default
    const [selectedSong, setSelectedSong] = useState('bbbs') // Default song
    const [volume, setVolume] = useState(0.3) // Default volume (30%)
    const audioRef = useRef(null) // Reference for the audio element

    const songMap = {
        bbbs: bbbs,
    }

    // Load and play the selected song on mount or when the song changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = songMap[selectedSong]
            audioRef.current.loop = true // Enable looping
            isPlaying && audioRef.current.play()
        }
    }, [selectedSong])

    // Toggle play/pause based on `isPlaying` state
    useEffect(() => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.play() : audioRef.current.pause()
        }
    }, [isPlaying])

    // Adjust volume based on `volume` state
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    // Handlers for controlling the music
    const togglePlay = () => setIsPlaying(!isPlaying)
    const changeSong = (song) => setSelectedSong(song)
    const changeVolume = (newVolume) => setVolume(newVolume / 100) // Convert slider to 0-1 range

    return (
        <AudioContext.Provider
            value={{
                isPlaying,
                togglePlay,
                selectedSong,
                changeSong,
                volume,
                changeVolume,
            }}
        >
            {children}
            <audio ref={audioRef} />
        </AudioContext.Provider>
    )
}

export default AudioProvider
