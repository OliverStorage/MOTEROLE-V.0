import React, { useEffect, useState, useCallback } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'

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

const letterName = {
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

// Memoized Actionbtn to prevent unnecessary re-renders
const MemoizedActionbtn = React.memo(({ text, to, bgColor, icon }) => (
    <Actionbtn text={text} to={to} bgColor={bgColor} icon={icon} />
))

const Alphabet = () => {
    useEffect(() => {
        document.title = 'Alphabet'
    })

    const useLetterImage = (letter) => {
        const [imageSrc, setImageSrc] = useState(null)

        useEffect(() => {
            const loadImage = async () => {
                try {
                    const image = await import(
                        `../assets/alphabetbtn/${letter}.png`
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
            <div className="relative flex h-screen w-screen items-center justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex h-full flex-col justify-between">
                    {/* Action button acting as a "Back" button */}
                    <MemoizedActionbtn
                        text=""
                        to="/category"
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>

                <div className="just text-shadow relative flex h-[70%] w-[75%] flex-col items-center rounded-3xl border-8 border-lava bg-white p-8 mobile:h-[85%] mobile:w-[72%] mobile:overflow-x-auto mobile:rounded-xl mobile:text-xl ipad:overflow-x-auto ipad:text-3xl">
                    <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-lava bg-white font-nunito text-4xl font-black text-black mobile:h-12 mobile:border-4 mobile:text-2xl ipad:text-3xl">
                        Letra
                    </span>
                    <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 overflow-auto rounded-2xl border-[0.5px] border-softgray bg-cheese p-4 font-nunito text-4xl font-black text-black mobile:overflow-x-auto mobile:rounded-xl mobile:text-xl ipad:overflow-x-auto ipad:text-3xl">
                        {alphabet.map((letter, index) => {
                            const imageSrc = useLetterImage(letter)
                            const isNG = letter === 'NG'
                            const sound = letterName[letter]
                            return (
                                <Link
                                    key={index}
                                    to="/leveldifficulty"
                                    className={`text-shadow relative flex h-[80%] flex-shrink-0 flex-col justify-between rounded-2xl border-8 border-lava bg-[#FFEDBE] px-2 py-1 font-nunito font-black transition-transform active:scale-95 mobile:h-[90%] mobile:border-4 ${
                                        isNG
                                            ? 'w-auto ipad:w-1/3'
                                            : 'w-48 ipad:w-1/3'
                                    } `}
                                >
                                    <div className="flex justify-start text-5xl mobile:text-4xl">
                                        {isNG
                                            ? 'NG ng'
                                            : `${letter}${letter.toLowerCase()}`}
                                    </div>
                                    <div className="flex h-20 w-full items-center justify-center">
                                        {imageSrc ? (
                                            <img
                                                src={imageSrc}
                                                alt={`${letter} letter`}
                                                className={`${
                                                    isNG
                                                        ? 'h-24 w-56 lg:h-48 xl:h-28'
                                                        : 'h-24 w-56 lg:h-48 xl:h-32'
                                                } object-contain`}
                                            />
                                        ) : (
                                            <span>Image not found</span>
                                        )}
                                    </div>
                                    <div className="flex justify-end text-3xl mobile:text-2xl">
                                        {sound || 'No sound available'}{' '}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* right column */}
                <div className="w-1/10 flex h-full select-none flex-col space-y-4 mobile:space-y-3">
                    <MemoizedActionbtn
                        text=""
                        to="/settings"
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                    />
                    <MemoizedActionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    />
                </div>
            </div>
        </>
    )
}

export default Alphabet
