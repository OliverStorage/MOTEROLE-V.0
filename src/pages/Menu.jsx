import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { MdPersonOutline } from 'react-icons/md'

const Menu = () => {
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-4 lg:space-y-10">
                <span className="-mt-16 font-bubbles text-8xl lg:text-9xl text-white drop-shadow-[5px_5px_0px_#000000]">
                    MoTeRole
                </span>
                <div className="flex w-[25%] flex-col items-center gap-5 lg:gap-8 font-bubbles text-3xl lg:text-4xl text-white">
                    <Link
                        to="/category"
                        class="flex  h-12 lg:h-16 w-full cursor-pointer select-none items-center justify-center rounded-lg bg-[#8BC34A] text-center transition-all duration-150 lg:[box-shadow:0_10px_0_0_#4f6f2a,0_15px_0_0_#1b70f841] [box-shadow:0_7px_0_0_#4f6f2a,0_10px_0_0_#1b70f841] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        Laro
                    </Link>
                    <Link
                        to="/tutorial"
                        class="flex  h-12 lg:h-16 w-full cursor-pointer select-none items-center justify-center rounded-lg bg-[#FF4B4B] text-center transition-all duration-150 lg:[box-shadow:0_10px_0_0_#ad3232,0_15px_0_0_#1b70f841] [box-shadow:0_7px_0_0_#ad3232,0_10px_0_0_#1b70f841] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        Gabay
                    </Link>
                    <Link
                        to="/settings"
                        class="flex  h-12 lg:h-16 w-full cursor-pointer select-none items-center justify-center rounded-lg bg-[#007DD7] text-center transition-all duration-150 lg:[box-shadow:0_10px_0_0_#01528c,0_15px_0_0_#1b70f841] [box-shadow:0_7px_0_0_#01528c,0_10px_0_0_#1b70f841] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        Settings
                    </Link>
                </div>
                <div className="absolute bottom-7 right-6 lg:right-10 flex space-x-2 lg:space-x-4">
                    <Link
                        to="/achievement"
                        class="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#FFD700] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#bfa100,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <GrTrophy className="size-10 lg:size-14 p-2 lg:p-2.5" />
                    </Link>

                    <Link
                        to="/profile"
                        class="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#4FC3F7] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#3789ad,0_8px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <MdPersonOutline className="size-10 lg:size-14 p-1" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Menu
