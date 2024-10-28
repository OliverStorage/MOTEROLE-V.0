import React, { useEffect, useContext, useState } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import TermsConditions from '../components/TermsConditions'
import { MusicContext } from '../contexts/MusicContext'

const Settings = () => {
    const [tunogVolume, setTunogVolume] = useState(30) // Sound effects volume
    const [showModal, setShowModal] = useState(false) // Toggle modal

    // Use MusicContext to get music settings and functions
    const {
        tugtogVolume,
        setTugtogVolume,
        selectedSong,
        setSelectedSong,
        isPlaying,
        togglePlay,
    } = useContext(MusicContext)

    useEffect(() => {
        document.title = 'Settings'
    }, [])

    // Volume change handlers
    const handleTugtogVolumeChange = (e) => setTugtogVolume(e.target.value)
    const handleTunogVolumeChange = (e) => setTunogVolume(e.target.value)
    const handleSongChange = (e) => setSelectedSong(e.target.value)

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* Left column */}
                <div className="w-1/10 flex flex-col justify-between">
                    <Actionbtn
                        text=""
                        to="#"
                        isLink={false}
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>

                {/* Center */}
                <div className="-mt-12 flex w-full flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-8 mobile:space-y-3">
                    <div className="text-shadow text-8xl mobile:text-5xl ipad:text-7xl">
                        Settings
                    </div>
                    <div className="flex h-[70%] w-[80%] rounded-2xl bg-black bg-opacity-60 p-8 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <div className="flex h-full w-full flex-col justify-between overflow-y-auto rounded-2xl text-center font-nunito text-5xl font-black text-black mobile:overflow-y-auto mobile:rounded-xl mobile:text-2xl ipad:overflow-y-auto">
                            <div className="flex flex-col space-y-4 text-white overflow-y-auto">
                                {/* Volume Sliders */}
                                <div className="flex justify-evenly space-x-10 px-4">
                                    <div className="flex w-full flex-col space-y-4">
                                        <span>Tugtog</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={tugtogVolume}
                                            onChange={handleTugtogVolumeChange}
                                            className="h-2 cursor-pointer bg-white"
                                        />
                                        <div>{tugtogVolume}%</div>
                                    </div>
                                    <div className="flex w-full flex-col space-y-4">
                                        <span>Tunog</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={tunogVolume}
                                            onChange={handleTunogVolumeChange}
                                            className="h-2 cursor-pointer bg-white"
                                        />
                                        <div>{tunogVolume}%</div>
                                    </div>
                                </div>

                                {/* Song Selection Dropdown */}
                                <div className="flex w-full items-center justify-center space-x-4 text-white ipad:text-2xl">
                                    <div className="text-nowrap">
                                        Mga Tugtog:
                                    </div>
                                    <select
                                        name="song-select"
                                        id="song-select"
                                        value={selectedSong}
                                        onChange={handleSongChange}
                                        className="h-10 w-full rounded-lg bg-white px-4 text-3xl text-black focus:outline-none mobile:h-8 mobile:text-xl ipad:text-lg"
                                    >
                                        <option value="bbbs">
                                            Baba Black Sheep
                                        </option>
                                        <option value="music2">Song 2</option>
                                        <option value="music3">Song 3</option>
                                        <option value="music4">Song 4</option>
                                    </select>
                                </div>

                                {/* Play/Pause Button */}
                                <button
                                    onClick={togglePlay}
                                    className="mt-4 text-white"
                                >
                                    {isPlaying ? 'Pause Music' : 'Play Music'}
                                </button>
                            </div>

                            {/* Buttons for About and Terms */}
                            <div className="flex justify-evenly space-x-4 text-center text-xl mobile:text-sm ipad:text-xl">
                                <button className="text-shadow w-1/2 text-nowrap rounded-xl bg-white py-2 mobile:py-1">
                                    Tungkol
                                </button>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="text-shadow w-1/2 text-nowrap rounded-xl bg-white py-2 mobile:py-1"
                                >
                                    Mga Tuntunin at Kundisyon
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 opacity-0 mobile:space-y-3">
                    <Actionbtn
                        text=""
                        disabled={true}
                        to="/settings"
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                    />
                    <Actionbtn
                        text=""
                        disabled={true}
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    />
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <TermsConditions onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    )
}

export default Settings
