import React, { useEffect, useState } from 'react'
import Cloud from '../assets/cloud.png'

const ModalSettings = ({ onClose }) => {
    const [tugtogVolume, setTugtogVolume] = useState(30) // Initial volume for Tugtog (Music)
    const [tunogVolume, setTunogVolume] = useState(30) // Initial volume for Tunog (Sound Effects)
    // Handler functions to change the volume levels
    const handleTugtogVolumeChange = (e) => {
        setTugtogVolume(e.target.value)
    }

    const handleTunogVolumeChange = (e) => {
        setTunogVolume(e.target.value)
    }
    return (
        <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-nunito font-black">
            <div className="text-shadow relative flex h-[70%] w-1/2 flex-col gap-6 rounded-3xl border-8 border-black border-opacity-50 bg-modalblue p-8 mobile:h-[80%] mobile:gap-5 mobile:p-4">
                <img
                    src={Cloud}
                    alt="cloud.png"
                    className="absolute -left-56 -top-48 size-96 select-none mobile:-left-32 mobile:-top-28 mobile:size-56 ipad:-left-44 ipad:-top-40 ipad:size-80"
                />
                <div className="inner-shadow flex h-[60%] flex-col justify-between overflow-hidden rounded-2xl bg-peach p-5 text-center text-4xl mobile:p-2 mobile:text-3xl">
                    <span className="leading-none">Settings</span>
                    {/* volumn slider */}
                    <div className="flex h-full flex-col justify-evenly px-4 text-2xl mobile:text-xl">
                        <div className="flex w-full items-center justify-between space-x-4">
                            <span>Tugtog</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={tugtogVolume}
                                onChange={handleTugtogVolumeChange}
                                className="h-2 w-[70%] cursor-pointer bg-white"
                            />
                        </div>

                        {/* Tunog Volume Slider */}
                        <div className="flex w-full items-center justify-between space-x-4">
                            <span>Tunog</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={tunogVolume}
                                onChange={handleTunogVolumeChange}
                                className="h-2 w-[70%] cursor-pointer bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* modal buttons */}
                <div className="flex h-[40%] flex-col gap-5">
                    <div className="flex h-full justify-evenly space-x-4">
                        <div
                            onClick={onClose}
                            className="flex h-full w-full items-center justify-center rounded-xl bg-modalbrown"
                        >
                            1
                        </div>
                        <div
                            onClick={onClose}
                            className="flex h-full w-full items-center justify-center rounded-xl bg-modalbrown"
                        >
                            2
                        </div>
                    </div>
                    <div className="flex h-full justify-evenly space-x-4">
                        <div
                            onClick={onClose}
                            className="flex h-full w-full items-center justify-center rounded-xl bg-modalbrown"
                        >
                            1
                        </div>
                        <div
                            onClick={onClose}
                            className="flex h-full w-full items-center justify-center rounded-xl bg-modalbrown"
                        >
                            2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSettings
