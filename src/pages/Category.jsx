import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { PiGearSix } from 'react-icons/pi'
import { LuArrowBigLeft } from 'react-icons/lu'

const Category = () => {
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-6">
                <span className="-mt-20 font-bubbles text-7xl text-white drop-shadow-[5px_5px_0px_#000000]">
                    Mga Kategorya
                </span>
                <div className="relative flex h-[60%] w-[60%] flex-col items-center rounded-3xl border-[6px] border-[#4FC3F7] bg-white px-6 py-8 drop-shadow-[15px_10px_5px_#000000]">
                    <div className="flex h-full w-full items-center justify-evenly gap-10 rounded-xl bg-[#FFD568] p-10 font-nunito shadow-inner-lg">
                        <Link
                            to="/line"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] p-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-4xl font-bold text-white drop-shadow-[0_0px_3px_#007dd7]">
                                Linya
                            </div>
                        </Link>
                        <Link
                            to="/shape"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] p-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-4xl font-bold text-white drop-shadow-[0_0px_3px_#AB47BC]">
                                Hugis
                            </div>
                        </Link>
                        <Link
                            to="/alphabet"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] p-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-4xl font-bold text-white drop-shadow-[0_0px_3px_#CD0045]">
                                Alpabeto
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-7 right-10 flex space-x-4">
                    <Link
                        to="/achievement"
                        class="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#FFD700] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#bfa100,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <GrTrophy className="size-14 p-2.5" />
                    </Link>

                    <Link
                        to="/settings"
                        class="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#8D8686] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#5e5a5a,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <PiGearSix className="size-14 p-2.5" />
                    </Link>
                </div>
                <Link
                    to="/menu"
                    class="absolute left-5 top-0 flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                >
                    <LuArrowBigLeft className="size-14 p-1" />
                </Link>
            </div>
        </>
    )
}

export default Category
