import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { PiGearSix } from 'react-icons/pi'
import { LuArrowBigLeft } from 'react-icons/lu'

// Generate the alphabet letters (both upper and lower case)
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const Alphabet = () => {
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-6">
                {/* Main container for the alphabet cards */}
                <div className="relative mt-4 flex h-[60%] w-[60%] flex-col items-center rounded-3xl border-[6px] border-[#CD0045] bg-white px-6 py-8 drop-shadow-[15px_10px_5px_#000000]">
                    {/* Back button */}
                    <Link
                        to="/category"
                        className="absolute -left-8 -top-7 flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <LuArrowBigLeft className="size-14 p-1" />
                    </Link>

                    {/* Title */}
                    <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-[6px] border-[#CD0045] bg-white font-nunito text-2xl font-black drop-shadow-[5px_5px_0px_#000000]">
                        Letra
                    </span>

                    {/* Alphabet Cards Container */}
                    <div className="flex h-full w-full items-center gap-6 overflow-x-auto overflow-y-hidden rounded-xl bg-[#FFD568] px-6 py-4 font-nunito shadow-inner-lg">
                        {/* Map over the alphabet array to generate cards with both uppercase and lowercase */}
                        {alphabet.map((letter, index) => (
                            <Link
                                key={index}
                                to="/leveldifficulty"
                                className="flex h-[75%] flex-shrink-0 flex-col items-center justify-center rounded-2xl border-[6px] border-[#CD0045] bg-[#FFEDBE] p-4 transition-transform active:scale-95"
                            >
                                <div className="w-auto object-contain font-nunito text-8xl font-black">
                                    {letter}
                                    {letter.toLowerCase()}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom buttons */}
                <div className="absolute bottom-7 right-10 flex space-x-4">
                    <Link
                        to="/achievement"
                        className="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#FFD700] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#bfa100,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <GrTrophy className="size-14 p-2.5" />
                    </Link>

                    <Link
                        to="/settings"
                        className="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#8D8686] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#5e5a5a,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <PiGearSix className="size-14 p-2.5" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Alphabet
