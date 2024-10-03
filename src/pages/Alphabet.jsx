import React, { useEffect } from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { PiGearSix } from 'react-icons/pi'
import { LuArrowBigLeft } from 'react-icons/lu'

// Adjusted alphabet array with "NG" as a single card
const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'NG',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
]

const Alphabet = () => {
    useEffect(() => {
        document.title = 'Alphabet'
    }, [])

    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen select-none flex-col items-center justify-center space-y-4 lg:space-y-6">
                {/* Main container for the alphabet cards */}
                <div className="relative flex h-[75%] w-[60%] flex-col items-center rounded-3xl border-[6px] border-[#CD0045] bg-white p-5 drop-shadow-[5px_5px_0px_#000000] lg:mt-4 lg:h-[60%] lg:px-6 lg:py-8 lg:drop-shadow-[15px_10px_5px_#000000]">
                    {/* Title */}
                    <span className="absolute -top-9 flex w-1/3 items-center justify-center rounded-2xl border-[6px] border-[#CD0045] bg-white font-nunito text-2xl font-black drop-shadow-[5px_5px_0px_#000000] lg:h-14">
                        Letra
                    </span>

                    {/* Alphabet Cards Container */}
                    <div className="flex h-full w-full items-center gap-6 overflow-x-auto overflow-y-hidden rounded-xl bg-[#FFD568] px-6 py-4 font-nunito shadow-inner-lg">
                        {/* Map over the alphabet array to generate cards with both uppercase and lowercase */}
                        {alphabet.map((letter, index) => (
                            <Link
                                key={index}
                                to="/leveldifficulty"
                                className="flex h-[75%] w-auto flex-shrink-0 flex-col items-center justify-center text-nowrap rounded-2xl border-[6px] border-[#CD0045] bg-[#FFEDBE] p-4 drop-shadow-[5px_5px_0px_#000000] transition-transform active:scale-95"
                            >
                                <div className="w-auto object-contain font-nunito text-7xl font-black lg:text-8xl">
                                    {/* Special case for NG */}
                                    {letter === 'NG'
                                        ? 'NG ng'
                                        : `${letter}${letter.toLowerCase()}`}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom buttons */}
                <div className="absolute bottom-7 right-6 flex space-x-2 lg:right-10 lg:space-x-4">
                    <Link
                        to="/achievement"
                        className="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#FFD700] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#bfa100,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <GrTrophy className="size-10 p-2 lg:size-14 lg:p-2.5" />
                    </Link>

                    <Link
                        to="/settings"
                        className="flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#8D8686] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#5e5a5a,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                    >
                        <PiGearSix className="size-10 p-1 lg:size-14" />
                    </Link>
                </div>
                <Link
                    to="/category"
                    className="absolute left-5 top-0 flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                >
                    <LuArrowBigLeft className="size-10 p-1 lg:size-14" />
                </Link>
            </div>
        </>
    )
}

export default Alphabet
