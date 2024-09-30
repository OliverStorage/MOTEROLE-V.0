import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { PiGearSix } from 'react-icons/pi'
import { LuArrowBigLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

const Ingame = () => {
    const navigate = useNavigate()
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-6">
                <div className="relative mt-4 flex h-[80%] w-[60%] flex-col items-center rounded-3xl border-[6px] border-[#B0BEC5] bg-white px-6 py-8 drop-shadow-[15px_10px_5px_#000000]">
                    <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-[6px] border-[#B0BEC5] bg-white font-nunito text-2xl font-black drop-shadow-[5px_5px_0px_#000000]">
                        title
                    </span>
                    <div className="flex h-full w-full items-center justify-evenly gap-10 rounded-3xl border-[6px] border-[#D68E5E] bg-[#2B4D39]"></div>
                </div>
                <div className="absolute right-5 top-0 flex space-x-4">
                    <Link
                        to="/settings"
                        class="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#8D8686] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#5e5a5a,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <PiGearSix className="size-14 p-2.5" />
                    </Link>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    class="absolute left-5 top-0 flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                >
                    <LuArrowBigLeft className="size-14 p-1" />
                </button>
            </div>
        </>
    )
}

export default Ingame
