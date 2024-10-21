import React, { useEffect, useState } from 'react'
import Background from '../Background'
import FullScreen from '../FullScreen'
import Actionbtn from '../Actionbtn'
import { Link } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import ModalSettings from '../ModalSettings'
import C from '../../assets/abcEasy/C.png'

const letterC = () => {
    const [showModal, setShowModal] = useState(false) // Declare the state for showModal
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
                    {/* No need to pass onClick if using the default navigate(-1) */}
                    <FullScreen />
                </div>
                {/* center */}
                <div className="flex w-full flex-col items-center justify-center font-bubbles text-white">
                    <div className="text-shadow relative flex h-[85%] w-[80%] justify-center rounded-3xl border-8 border-bluesky bg-white p-8 mobile:h-[85%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-bluesky bg-white font-nunito text-4xl font-black text-black mobile:h-12 mobile:border-4 mobile:text-2xl ipad:text-3xl">
                            TITLE
                        </span>
                        <div className="relative flex h-full w-full flex-col items-center justify-between rounded-2xl border-8 border-wood bg-darkgreen bg-contain bg-center bg-no-repeat px-6 py-10 mobile:overflow-x-auto mobile:rounded-xl mobile:border-4 mobile:py-8 ipad:overflow-x-auto">
                            <div className="h-2 w-full bg-lineblue mobile:h-1" />
                            <div className="h-2 w-full border-t-8 border-dashed border-linered mobile:border-t-4" />
                            <div className="h-2 w-full bg-lineblue mobile:h-1" />
                            <div
                                style={{
                                    backgroundImage: `url(${C})`,
                                }}
                                className="absolute inset-0 z-10 bg-contain bg-center bg-no-repeat mobile:m-4 ipad:m-4"
                            ></div>
                        </div>
                    </div>
                </div>
                {/* right column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 mobile:space-y-3">
                    {/* Action button acting as a "Back" button */}
                    <Actionbtn
                        text=""
                        isLink={false}
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                        onClick={() => setShowModal(true)}
                    />
                    <Actionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    />
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalSettings onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    )
}

export default letterC
