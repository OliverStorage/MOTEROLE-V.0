import React, { useEffect } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import Madali from '../assets/levelbtn/Madali.png'
import Karaniwan from '../assets/levelbtn/Karaniwan.png'
import Mahirap from '../assets/levelbtn/Mahirap.png'

const LevelDifficulty = () => {
    useEffect(() => {
        document.title = 'Line'
    }, [])

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-between">
                    {/* Action button acting as a "Back" button */}
                    <Actionbtn
                        text=""
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                        isLink={false}
                    />
                    <FullScreen />
                </div>
                {/* center */}
                <div className="flex w-full flex-col items-center justify-center font-bubbles text-white mobile:space-y-3">
                    <div className="text-shadow relative flex h-[70%] w-[80%] justify-center rounded-3xl border-8 border-softgray bg-white p-8 mobile:h-[85%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-softgray bg-white font-nunito text-4xl font-black text-black mobile:h-12 mobile:border-4 mobile:text-2xl ipad:text-3xl">
                            Lebel
                        </span>
                        <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 rounded-2xl border-[0.5px] border-softgray bg-cheese p-4 text-center font-nunito text-4xl font-black text-black mobile:overflow-x-auto mobile:rounded-xl mobile:text-3xl ipad:overflow-x-auto">
                            <Link
                                to="/ingame"
                                className="text-shadow h-[80%] w-72 flex-shrink-0 rounded-2xl border-8 border-softgray bg-butter p-4 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3"
                            >
                                <div
                                    style={{
                                        backgroundImage: `url(${Madali})`,
                                    }}
                                    className="h-full w-full bg-cover bg-center"
                                >
                                    <span>Madali</span>
                                </div>
                            </Link>
                            <Link
                                to="/ingame"
                                className="text-shadow h-[80%] w-72 flex-shrink-0 rounded-2xl border-8 border-softgray bg-butter p-4 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3"
                            >
                                <div
                                    style={{
                                        backgroundImage: `url(${Karaniwan})`,
                                    }}
                                    className="h-full w-full bg-cover bg-center"
                                >
                                    <span>Madali</span>
                                </div>
                            </Link>
                            <Link
                                to="/ingame"
                                className="text-shadow h-[80%] w-72 flex-shrink-0 rounded-2xl border-8 border-softgray bg-butter p-4 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3"
                            >
                                <div
                                    style={{
                                        backgroundImage: `url(${Mahirap})`,
                                    }}
                                    className="h-full w-full bg-cover bg-center"
                                >
                                    <span>Madali</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* right column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 mobile:space-y-3">
                    {/* Action button acting as a "Back" button */}
                    <Actionbtn
                        text=""
                        to="/settings"
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                    />
                    <Actionbtn
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

export default LevelDifficulty
