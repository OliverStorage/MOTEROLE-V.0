import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'

const Profile = () => {
    const [activeTab, setActiveTab] = useState('category')

    useEffect(() => {
        document.title = 'Profile'
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
                        to="#"
                        isLink={false}
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>

                {/* center */}
                <div className="-mt-12 flex w-full flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-8 mobile:space-y-3">
                    <div className="text-shadow text-7xl mobile:text-4xl ipad:text-5xl">
                        Personal na Impormasyon
                    </div>

                    <div className="flex h-[70%] w-[80%] rounded-2xl bg-black bg-opacity-60 p-8 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <div className="flex h-full w-full flex-col space-y-4 overflow-y-auto font-nunito text-4xl font-black text-white mobile:overflow-y-auto mobile:rounded-md mobile:text-2xl ipad:overflow-y-auto">
                            {/* profile and info */}
                            <div className="flex space-x-10 mobile:space-x-4">
                            {/* <img
                                    src=""
                                    alt="profile"
                                    className="size-56 rounded-xl border-2 mobile:size-28 ipad:size-44"
                                />     */}
                                <div className="flex flex-col justify-between mobile:text-xl ipad:text-2xl">
                                    <div>Pangalan: Juan Dela Cruz</div>
                                    <div>Gender: Lalake</div>
                                    <div>Email: jdelacruz.58@gmail.com</div>
                                </div>
                            </div>

                            {/* tab */}
                            <div className="flex h-full w-full flex-col text-3xl mobile:text-xl">
                                <div className="flex w-full space-x-1 text-black">
                                    {/* Tab 1 */}
                                    <div
                                        onClick={() => setActiveTab('category')}
                                        className={`w-56 cursor-pointer rounded-xl rounded-b-none border-2 border-black bg-white px-2 py-1 text-center mobile:w-36 ipad:w-40 ${
                                            activeTab === 'category'
                                                ? 'border-b-0'
                                                : ''
                                        }`}
                                    >
                                        Kategory
                                    </div>
                                    {/* Tab 2 */}
                                    <div
                                        onClick={() => setActiveTab('level')}
                                        className={`w-56 cursor-pointer rounded-xl rounded-b-none border-2 border-black bg-white px-2 py-1 text-center mobile:w-36 ipad:w-40 ${
                                            activeTab === 'level'
                                                ? 'border-b-0'
                                                : ''
                                        }`}
                                    >
                                        Lebel
                                    </div>
                                </div>

                                <div className="h-full rounded-b-xl border-2 border-t-0 border-black bg-white p-10 text-5xl text-black mobile:p-4 mobile:text-2xl ipad:p-6 ipad:text-4xl">
                                    {/* Content changes based on the active tab */}
                                    {activeTab === 'category' ? (
                                        <div className="flex">
                                            <div className="flex w-1/3 flex-col items-center space-y-4 text-limblue">
                                                <div className="">Linya</div>
                                                <div className="flex size-56 items-center justify-center rounded-full bg-limblue p-4 text-limblue mobile:size-28 mobile:p-2 ipad:size-44">
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                                        80%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-1/3 flex-col items-center space-y-4 text-grape">
                                                <div className="">Hugis</div>
                                                <div className="flex size-56 items-center justify-center rounded-full bg-grape p-4 mobile:size-28 mobile:p-2 ipad:size-44">
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                                        73%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-1/3 flex-col items-center space-y-4 text-lava">
                                                <div className="">Alpabeto</div>
                                                <div className="flex size-56 items-center justify-center rounded-full bg-lava p-4 mobile:size-28 mobile:p-2 ipad:size-44">
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                                        30%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex">
                                            <div className="flex w-1/3 flex-col items-center space-y-4 text-limblue">
                                                <div className="">Madali</div>
                                                <div className="flex size-56 items-center justify-center rounded-full bg-limblue p-4 text-limblue mobile:size-28 mobile:p-2 ipad:size-44">
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                                        100%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-1/3 flex-col items-center space-y-4 text-grape">
                                                <div className="">
                                                    Karaniwan
                                                </div>
                                                <div className="flex size-56 items-center justify-center rounded-full bg-grape p-4 mobile:size-28 mobile:p-2 ipad:size-44">
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                                        60%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-1/3 flex-col items-center space-y-4 text-lava">
                                                <div className="">Mahirap</div>
                                                <div className="flex size-56 items-center justify-center rounded-full bg-lava p-4 mobile:size-28 mobile:p-2 ipad:size-44">
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                                        10%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 opacity-0 mobile:space-y-3">
                    <Actionbtn
                        text=""
                        disabled={true}
                        to="/settings"
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                    />
                    <Actionbtn
                        text=""
                        disabled={true}
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    />
                </div>
            </div>
        </>
    )
}

export default Profile
