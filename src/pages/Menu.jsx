import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Play from '../assets/menubutton/play.png'
import Achievement from '../assets/menubutton/achievement.png'
import Profile from '../assets/menubutton/profile.png'
import Settings from '../assets/menubutton/settings.png'
import { Link } from 'react-router-dom'
import FullScreen from '../components/FullScreen'
import Leader from '../assets/leaderboard/leader.png'
import ModalLeaderBoard from '../components/ModalLeaderBoard'

const Menu = () => {
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        document.title = 'Menu'
    })
    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="flex flex-col justify-end">
                    {/* No need to pass onClick if using the default navigate(-1) */}
                    <FullScreen />
                </div>
                {/* center */}
                <div className="-mt-20 flex w-[80%] flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-10">
                    <div className="text-shadow text-9xl mobile:text-7xl">
                        MoTeRole
                    </div>
                    <div className="flex space-x-4 text-4xl mobile:text-xl ipad:text-2xl">
                        <Link
                            to="/category"
                            className="text-shadow flex flex-col items-center space-y-4 rounded-3xl bg-applegreen p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4"
                        >
                            <img
                                src={Play}
                                alt="play.png"
                                className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                            />
                            <span>Laro</span>
                        </Link>
                        <Link
                            to="/achievement"
                            className="text-shadow flex flex-col items-center space-y-4 rounded-3xl bg-tangerine p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4"
                        >
                            <img
                                src={Achievement}
                                alt="achievement.png"
                                className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                            />
                            <span>Tagumpay</span>
                        </Link>
                        <Link
                            to="/profile"
                            className="text-shadow flex flex-col items-center space-y-4 rounded-3xl bg-bluesky p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4"
                        >
                            <img
                                src={Profile}
                                alt="profile.png"
                                className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                            />
                            <span>Profile</span>
                        </Link>
                        <Link
                            to="/settings"
                            className="text-shadow flex flex-col items-center space-y-4 rounded-3xl bg-grape p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4"
                        >
                            <img
                                src={Settings}
                                alt="settings.png"
                                className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                            />
                            <span>Settings</span>
                        </Link>
                    </div>
                </div>
                {/* right column */}
                <div className="w-1/10 flex select-none flex-col justify-between opacity-100">
                    {/* Action button acting as a "Back" button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex cursor-pointer mobile:-translate-y-1 items-center justify-center rounded-xl text-center text-white duration-100 active:translate-y-1"
                    >
                        <img
                            src={Leader}
                            alt=""
                            className="size-12 mobile:size-10 ipad:size-14"
                        />
                    </button>
                </div>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalLeaderBoard onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    )
}

export default Menu
