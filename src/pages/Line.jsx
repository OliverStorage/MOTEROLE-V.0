import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { PiGearSix } from 'react-icons/pi'
import { LuArrowBigLeft } from 'react-icons/lu'

const Line = () => {
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-4 lg:space-y-6">
                <div className="relative flex h-[75%] w-[60%] flex-col items-center rounded-3xl border-[6px] border-[#005981] bg-white p-5 lg:px-6 lg:py-8 drop-shadow-[5px_5px_0px_#000000] lg:mt-4 lg:h-[60%] lg:drop-shadow-[15px_10px_5px_#000000]">
                    <span className="absolute -top-9 flex lg:h-14 w-1/3 items-center justify-center rounded-2xl border-[6px] border-[#005981] bg-white font-nunito text-2xl font-black drop-shadow-[5px_5px_0px_#000000]">
                        Linya
                    </span>
                    <div className="flex h-full w-full items-center justify-evenly gap-4 rounded-xl bg-[#FFD568] px-4 py-6 font-nunito shadow-inner-lg lg:gap-10 lg:p-10">
                        <Link
                            to="/leveldifficulty"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] px-1 py-2 lg:px-2 lg:py-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-2xl font-[1000] text-black">
                                Linyang Patayo
                            </div>
                        </Link>
                        <Link
                            to="/leveldifficulty"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] px-1 py-2 lg:px-2 lg:py-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-2xl font-[1000] text-black">
                                Linyang pahilis
                            </div>
                        </Link>
                        <Link
                            to="/leveldifficulty"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] px-1 py-2 lg:px-2 lg:py-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-2xl font-[1000] text-black">
                                Linyang pakurba
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-7 right-6 flex space-x-2 lg:right-10 lg:space-x-4">
                    <Link
                        to="/achievement"
                        class="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#FFD700] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#bfa100,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <GrTrophy className="size-10 p-2 lg:size-14 lg:p-2.5" />
                    </Link>

                    <Link
                        to="/settings"
                        class="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#8D8686] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#5e5a5a,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <PiGearSix className="size-10 p-1 lg:size-14" />
                    </Link>
                </div>
                <Link
                    to="/category"
                    class="absolute left-5 top-0 flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                >
                    <LuArrowBigLeft className="size-10 p-1 lg:size-14" />
                </Link>
            </div>
        </>
    )
}

export default Line
