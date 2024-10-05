import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { GrTrophy } from 'react-icons/gr'
import { PiGearSix } from 'react-icons/pi'
import { LuArrowBigLeft } from 'react-icons/lu'

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

const letterSounds = {
    A: 'Aso',
    B: 'Bola',
    C: 'Carrot',
    D: 'Daga',
    E: 'Eroplano',
    F: 'Filipino',
    G: 'Gagamba',
    H: 'Hari',
    I: 'Isda',
    J: 'Jollibee',
    K: 'Karabaw',
    L: 'Lapis',
    M: 'Manok',
    N: 'Niyog',
    Ñ: 'Niño',
    NG: 'Ngipin',
    O: 'Okra',
    P: 'Pusa',
    Q: 'Quezo',
    R: 'Radyo',
    S: 'Saging',
    T: 'Talong',
    U: 'Unggoy',
    V: 'Vinta',
    W: 'Watawat',
    X: 'X-ray',
    Y: 'Yelo',
    Z: 'Zebra',
}

const Alphabet = () => {
    useEffect(() => {
        document.title = 'Alphabet'
    }, [])

    const useLetterImage = (letter) => {
        const [imageSrc, setImageSrc] = useState(null)

        useEffect(() => {
            const loadImage = async () => {
                try {
                    const image = await import(
                        `../assets/letterImages/${letter}.png`
                    )
                    setImageSrc(image.default)
                } catch (err) {
                    console.error(`Error loading image for ${letter}:`, err)
                    setImageSrc(null)
                }
            }

            loadImage()
        }, [letter])

        return imageSrc
    }

    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen select-none flex-col items-center justify-center space-y-4 lg:space-y-6">
                <div className="relative flex h-[75%] w-[60%] flex-col items-center rounded-3xl border-[6px] border-[#CD0045] bg-white p-5 drop-shadow-[5px_5px_0px_#000000] lg:mt-4 lg:h-[60%] lg:px-6 lg:py-8 lg:drop-shadow-[15px_10px_5px_#000000]">
                    <span className="absolute -top-9 flex w-1/3 items-center justify-center rounded-2xl border-[6px] border-[#CD0045] bg-white font-nunito text-2xl font-black drop-shadow-[5px_5px_0px_#000000] lg:h-14">
                        Letra
                    </span>

                    <div className="flex h-full w-full items-center gap-6 overflow-x-auto overflow-y-hidden rounded-xl bg-[#FFD568] px-6 py-4 font-nunito shadow-inner-lg">
                        {alphabet.map((letter, index) => {
                            const imageSrc = useLetterImage(letter)
                            const isNG = letter === 'NG'
                            const sound = letterSounds[letter]
                            return (
                                <Link
                                    key={index}
                                    to="/leveldifficulty"
                                    className={`relative flex h-[75%] flex-col justify-between pb-2 px-1 lg:p-2 ${
                                        isNG ? 'w-auto' : 'w-32 lg:w-56'
                                    } flex-shrink-0 flex-col rounded-2xl border-[6px] border-[#CD0045] bg-[#FFEDBE] drop-shadow-[5px_5px_0px_#000000] transition-transform active:scale-95`}
                                >
                                    <div className="flex justify-start font-nunito text-4xl font-black lg:text-6xl">
                                        {isNG
                                            ? 'NG ng'
                                            : `${letter}${letter.toLowerCase()}`}
                                    </div>
                                    <div className="flex h-20 w-full justify-center">
                                        {imageSrc ? (
                                            <img
                                                src={imageSrc}
                                                alt={`${letter} letter`}
                                                className={`${
                                                    isNG
                                                        ? 'h-24 w-56'
                                                        : 'h-auto w-auto'
                                                } object-contain`}
                                            />
                                        ) : (
                                            <span>Image not found</span>
                                        )}
                                    </div>
                                    <div className="flex justify-end font-nunito text-xl font-black lg:text-4xl">
                                        {sound || 'No sound available'}{' '}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

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
