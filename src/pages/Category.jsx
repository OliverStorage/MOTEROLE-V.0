import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { PiGearSix } from 'react-icons/pi'
import { LuArrowBigLeft } from 'react-icons/lu'
import line from '../assets/line.png'
import shape from '../assets/shape.png'
import abc from '../assets/abc.png'
import { useEffect } from 'react'
import FullScreen from '../components/FullScreen'

const Category = () => {
    useEffect(() => {
        document.title = 'Category'
    })
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-4 lg:space-y-6">
                <span className="font-bubbles text-6xl text-white drop-shadow-[5px_5px_0px_#000000] lg:-mt-24 lg:text-8xl">
                    Mga Kategorya
                </span>
                <div className="relative flex h-[70%] w-[60%] flex-col items-center rounded-3xl border-[6px] border-[#4FC3F7] bg-white px-4 py-4 drop-shadow-[5px_5px_0px_#000000] lg:h-[60%] lg:px-6 lg:py-8">
                    {/* Add the overflow properties here */}
                    <div className="flex h-full w-full items-center gap-6 overflow-x-auto overflow-y-hidden rounded-xl bg-[#FFD568] px-6 py-4 font-nunito shadow-inner-lg lg:gap-10 lg:overflow-x-hidden lg:p-10">
                        <Link
                            to="/line"
                            className="flex h-full w-40 flex-shrink-0 flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] p-4 drop-shadow-[5px_5px_0px_#000000] transition-all active:scale-90 lg:w-1/3 lg:flex-shrink"
                        >
                            <img src={line} alt="line" />
                            <div className="text-2xl font-bold text-white drop-shadow-[0_0px_3px_#007dd7] lg:text-4xl">
                                Linya
                            </div>
                        </Link>
                        <Link
                            to="/shape"
                            className="flex h-full w-40 flex-shrink-0 flex-col items-center justify-between rounded-2xl border-[6px] border-[#AB47BC] bg-[#FFEDBE] p-4 drop-shadow-[5px_5px_0px_#000000] transition-all active:scale-90 lg:w-1/3 lg:flex-shrink"
                        >
                            <img src={shape} alt="shape" />
                            <div className="text-2xl font-bold text-white drop-shadow-[0_0px_3px_#AB47BC] lg:text-4xl">
                                Hugis
                            </div>
                        </Link>
                        <Link
                            to="/alphabet"
                            className="flex h-full w-40 flex-shrink-0 flex-col items-center justify-between rounded-2xl border-[6px] border-[#CD0045] bg-[#FFEDBE] p-4 drop-shadow-[5px_5px_0px_#000000] transition-all active:scale-90 lg:w-1/3 lg:flex-shrink"
                        >
                            <img src={abc} alt="abc" />
                            <div className="text-2xl font-bold text-white drop-shadow-[0_0px_3px_#CD0045] lg:text-4xl">
                                Alpabeto
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-7 flex w-full justify-between px-5">
                    <FullScreen />
                    <div className="flex space-x-2 lg:space-x-4">
                        <Link
                            to="/achievement"
                            className="flex cursor-pointer items-center justify-center rounded-xl bg-[#FFD700] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#bfa100,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                        >
                            <GrTrophy className="size-10 p-2 lg:size-14 lg:p-2.5" />
                        </Link>

                        <Link
                            to="/settings"
                            className="flex cursor-pointer items-center justify-center rounded-xl bg-[#8D8686] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#5e5a5a,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                        >
                            <PiGearSix className="size-10 p-1 lg:size-14" />
                        </Link>
                    </div>
                </div>
                <Link
                    to="/menu"
                    className="absolute left-5 top-0 flex cursor-pointer items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                >
                    <LuArrowBigLeft className="size-10 p-1 lg:size-14" />
                </Link>
            </div>
        </>
    )
}

export default Category
