import React, { useEffect } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import line from '../assets/categorybtn/line.png'
import shape from '../assets/categorybtn/shape.png'
import abc from '../assets/categorybtn/abc.png'

const Achievement = () => {
    useEffect(() => {
        document.title = 'Achievements'
    })
    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-between">
                    {/* Action button acting as a "Back" button */}
                    <Actionbtn
                        text=""
                        to="#"
                        isLink={false}
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    {/* No need to pass onClick if using the default navigate(-1) */}
                    <FullScreen />
                </div>
                {/* center */}
                <div className="-mt-12 flex w-full flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-8 mobile:space-y-3">
                    <div className="text-shadow text-8xl mobile:text-5xl ipad:text-7xl">
                        Mga Tagumpay
                    </div>
                    <div className="flex h-[70%] w-[80%] rounded-2xl bg-black bg-opacity-60 p-8 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <div className="flex h-full w-full flex-col space-y-4 overflow-y-auto rounded-2xl font-nunito text-4xl font-black text-black mobile:overflow-y-auto mobile:rounded-xl mobile:text-2xl ipad:overflow-y-auto">
                            <div className="flex h-1/4 w-full flex-shrink-0 items-center rounded-xl border-4 border-sunshine bg-white px-4 mobile:h-1/3 ipad:h-1/4">
                                1
                            </div>
                            <div className="flex h-1/4 w-full flex-shrink-0 items-center rounded-xl border-4 border-sunshine bg-white px-4 mobile:h-1/3 ipad:h-1/4">
                                1
                            </div>
                            <div className="flex h-1/4 w-full flex-shrink-0 items-center rounded-xl border-4 border-sunshine bg-white px-4 mobile:h-1/3 ipad:h-1/4">
                                1
                            </div>
                            <div className="flex h-1/4 w-full flex-shrink-0 items-center rounded-xl border-4 border-sunshine bg-white px-4 mobile:h-1/3 ipad:h-1/4">
                                1
                            </div>
                            <div className="flex h-1/4 w-full flex-shrink-0 items-center rounded-xl border-4 border-sunshine bg-white px-4 mobile:h-1/3 ipad:h-1/4">
                                1
                            </div>
                            <div className="flex h-1/4 w-full flex-shrink-0 items-center rounded-xl border-4 border-sunshine bg-white px-4 mobile:h-1/3 ipad:h-1/4">
                                1
                            </div>
                            <div className="flex h-1/4 w-full flex-shrink-0 items-center rounded-xl border-4 border-sunshine bg-white px-4 mobile:h-1/3 ipad:h-1/4">
                                1
                            </div>
                        </div>
                    </div>
                </div>
                {/* right column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 opacity-0 mobile:space-y-3">
                    {/* Action button acting as a "Back" button */}
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
        </>
    )
}

export default Achievement
