import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { PiGearSix } from 'react-icons/pi'
import { LuArrowBigLeft } from 'react-icons/lu'

const Achievement = () => {
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-6">
                {/* Title */}
                <span className="-mt-20 font-bubbles text-7xl text-white drop-shadow-[5px_5px_0px_#000000]">
                    Mga Tagumpay
                </span>

                {/* Achievement Cards Container */}
                <div className="relative flex h-[60%] w-[60%] flex-col items-center space-y-4 overflow-y-auto rounded-xl bg-black bg-opacity-50 px-4 py-5">
                    {/* Achievement Cards */}
                    <div className="h-24 w-[80%] flex-shrink-0 rounded-xl border-4 border-[#FFD700] bg-white"></div>
                    <div className="h-24 w-[80%] flex-shrink-0 rounded-xl border-4 border-[#FFD700] bg-white"></div>
                    <div className="h-24 w-[80%] flex-shrink-0 rounded-xl border-4 border-[#FFD700] bg-white"></div>
                    <div className="h-24 w-[80%] flex-shrink-0 rounded-xl border-4 border-[#FFD700] bg-white"></div>
                    <div className="h-24 w-[80%] flex-shrink-0 rounded-xl border-4 border-[#FFD700] bg-white"></div>
                    <div className="h-24 w-[80%] flex-shrink-0 rounded-xl border-4 border-[#FFD700] bg-white"></div>
                    <div className="h-24 w-[80%] flex-shrink-0 rounded-xl border-4 border-[#FFD700] bg-white"></div>
                    <div className="h-24 w-[80%] flex-shrink-0 rounded-xl border-4 border-[#FFD700] bg-white"></div>
                </div>

                {/* Back Button */}
                <Link
                    to="/menu"
                    className="absolute left-5 top-0 flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                >
                    <LuArrowBigLeft className="size-14 p-1" />
                </Link>
            </div>
        </>
    )
}

export default Achievement
