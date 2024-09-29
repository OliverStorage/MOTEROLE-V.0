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
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-6">
                <div className="relative mt-4 flex h-[60%] w-[60%] flex-col items-center rounded-3xl border-[6px] border-[#005981] bg-white px-6 py-8 drop-shadow-[15px_10px_5px_#000000]">
                    <Link
                        to="/category"
                        class="absolute -left-8 -top-7 flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <LuArrowBigLeft className="size-14 p-1" />
                    </Link>
                    <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-[6px] border-[#005981] bg-white font-nunito text-2xl font-black">
                        Linya
                    </span>
                    <div className="flex h-full w-full items-center justify-evenly gap-10 rounded-xl bg-[#FFD568] p-10 font-nunito shadow-inner-lg">
                        <Link
                            to="/ingame"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] px-2 py-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-2xl font-[1000] text-black">
                                Linyang Patayo
                            </div>
                        </Link>
                        <Link
                            to="/ingame"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] px-2 py-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-2xl font-[1000] text-black">
                                Linyang pahilis
                            </div>
                        </Link>
                        <Link
                            to="/ingame"
                            className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-[6px] border-[#005981] bg-[#FFEDBE] px-2 py-4 transition-all active:scale-90"
                        >
                            <div>1</div>
                            <div className="text-2xl font-[1000] text-black">
                                Linyang pakurba
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
            </div>
        </>
    )
}

export default Line
