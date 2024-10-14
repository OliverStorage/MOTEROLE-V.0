import React, { useEffect } from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { MdPersonOutline } from 'react-icons/md'
import Play from '../assets/menubutton/play.png'
import Achievement from '../assets/menubutton/achievement.png'

import FullScreen from '../components/FullScreen'

const Menu = () => {
    useEffect(() => {
        document.title = 'Menu'
    })

    return (
        <>
            <Background />

            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-4 xl:space-y-10">
                <span className="-mt-16 font-bubbles text-7xl text-white drop-shadow-[5px_5px_0px_#000000] xl:-mt-24 xl:text-9xl">
                    MoTeRole
                </span>
                <div className="flex w-[70%] justify-center gap-5 font-bubbles text-xl text-white xl:w-[80%] xl:gap-8 xl:text-4xl">
                    <Link
                        to="/category"
                        className="flex flex-col items-center justify-center space-y-2 rounded-xl bg-[#8BC34A] p-3 text-center text-white duration-100 [box-shadow:0_5px_0_#6b9839,0_10px_0_#67676789] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#67676789,0_0px_0_0_#67676789] xl:space-y-4 xl:p-4"
                    >
                        <img
                            src={Play}
                            alt="play.png"
                            className="size-28 rounded-lg bg-[#ffedbf] xl:size-44"
                        />
                        <span>Laro</span>
                    </Link>
                    <Link
                        to="/achievement"
                        className="flex flex-col items-center justify-center space-y-2 rounded-xl bg-[#F8BC35] p-3 text-center text-white duration-100 [box-shadow:0_5px_0_#b08726,0_10px_0_#67676789] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#67676789,0_0px_0_0_#67676789] xl:space-y-4 xl:p-4"
                    >
                        <img
                            src={Achievement}
                            alt="play.png"
                            className="size-28 rounded-lg bg-[#ffedbf] xl:size-44"
                        />
                        <span>Tagumpay</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex flex-col items-center justify-center space-y-2 rounded-xl bg-[#4FC3F7] p-3 text-center text-white duration-100 [box-shadow:0_5px_0_#3785a9,0_10px_0_#67676789] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#67676789,0_0px_0_0_#67676789] xl:space-y-4 xl:p-4"
                    >
                        <img
                            src={Play}
                            alt="play.png"
                            className="size-28 rounded-lg bg-[#ffedbf] xl:size-44"
                        />
                        <span>Profile</span>
                    </Link>
                    <Link
                        to="/settings"
                        className="flex flex-col items-center justify-center space-y-2 rounded-xl bg-[#6F42C1] p-3 text-center text-white duration-100 [box-shadow:0_5px_0_#52318f,0_10px_0_#67676789] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#67676789,0_0px_0_0_#67676789] xl:space-y-4 xl:p-4"
                    >
                        <img
                            src={Play}
                            alt="play.png"
                            className="size-28 rounded-lg bg-[#ffedbf] xl:size-44"
                        />
                        <span>Settings</span>
                    </Link>
                </div>
                <div className="absolute bottom-7 flex w-full">
                    <div className="flex w-full justify-between space-x-2 px-5 xl:space-x-4">
                        <FullScreen />

                        <div className="flex space-x-2 xl:space-x-4">
                            {/* <Link
                                to="/achievement"
                                className="flex cursor-pointer items-center justify-center rounded-xl bg-[#FFD700] text-center text-white duration-100 [box-shadow:0_4px_0_0_#bfa100,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                            >
                                <GrTrophy className="size-10 p-2  xl:size-14  xl:p-2.5" />
                            </Link>

                            <Link
                                to="/profile"
                                className="flex cursor-pointer items-center justify-center rounded-xl bg-[#4FC3F7] text-center text-white duration-100 [box-shadow:0_4px_0_0_#3789ad,0_8px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                            >
                                <MdPersonOutline className="size-10 p-1  xl:size-14" />
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu
