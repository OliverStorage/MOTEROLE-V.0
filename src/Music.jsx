import React from 'react'
import bbbs from '../assets/bbbs.mp3'

const Music = () => {
    const [isPlaying, setIsPlaying] = useState(false) // Track play/pause status
    const audioRef = useRef(null) // Ref for controlling audio
    const songMap = {
        bbbs: bbbs,
    }

    const handlePlayMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    // Adjust volume based on tugtogVolume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = tugtogVolume / 100 // Convert to 0-1 range
        }
    }, [tugtogVolume])

    // Load and play the selected song
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = songMap[selectedSong] // Set the source to selected song path
            audioRef.current.pause()
            audioRef.current.load()
            if (isPlaying) {
                audioRef.current.play()
            }
        }
    }, [selectedSong, isPlaying])
    // Volume change handler
    const handleTugtogVolumeChange = (e) => setTugtogVolume(e.target.value)
    const handleTunogVolumeChange = (e) => setTunogVolume(e.target.value)
    const handleSongChange = (e) => setSelectedSong(e.target.value)

    return <div>Music</div>
}

export default Music
