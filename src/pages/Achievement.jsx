import React from 'react'
import Background from '../components/Background'
import { LuArrowBigLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Achievement = () => {
    useEffect(() => {
        document.title = 'Achievements'
    })
    const navigate = useNavigate()
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen select-none flex-col items-center justify-center space-y-4 lg:space-y-6">
                {/* Title */}
                <span className="font-bubbles text-6xl text-white drop-shadow-[5px_5px_0px_#000000] lg:text-9xl">
                    Mga Tagumpay
                </span>

                {/* Achievement Cards Container */}
                <div className="relative flex h-[70%] w-[80%] flex-col items-center space-y-4 overflow-y-auto rounded-xl bg-black bg-opacity-50 px-4 py-5">
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
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-5 top-0 flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                >
                    <LuArrowBigLeft className="size-10 p-1 lg:size-14" />
                </button>
            </div>
        </>
    )
}

export default Achievement
