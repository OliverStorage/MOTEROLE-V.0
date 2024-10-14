import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { useEffect } from 'react'
import FullScreen from '../components/FullScreen'

const Profile = () => {
    useEffect(() => {
        document.title = 'Profile'
    })
    return (
        <>
            <Background />
            <div className="absolute bottom-5 left-5">
                <FullScreen />
            </div>
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-4 xl:space-y-6">
                {/* Title */}
                <span className="font-bubbles text-4xl text-white drop-shadow-[5px_5px_0px_#000000] xl:-mt-20 xl:text-7xl">
                    Personal na Impormasyon
                </span>

                <div className="relative flex h-[70%] w-[80%] flex-col space-y-4 rounded-xl xl:h-[60%]">
                    <div className="flex space-x-4">
                        <div className="size-28 rounded-2xl border-4 border-[#8BC34A] bg-white xl:size-36"></div>
                        <div className="flex flex-col justify-center space-y-4 font-bubbles text-2xl text-white drop-shadow-[5px_5px_0px_#000000] xl:text-4xl">
                            <div>Pangalan: Juan Delacruz</div>
                            <div>Email: jdelacruz@gmail.com</div>
                        </div>
                    </div>
                    <div className="h-[100%] w-[100%] rounded-2xl bg-white"></div>
                </div>

                {/* Back Button */}
                <Link
                    to="/menu"
                    className="absolute left-5 top-0 flex cursor-pointer items-center justify-center rounded-xl bg-[#F40000] text-center text-white transition-all duration-150 [box-shadow:0_4px_0_0_#ab0000,0_6px_0_0_#1b70f841] active:translate-y-1 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]"
                >
                    <LuArrowBigLeft className="size-10 p-1 xl:size-14" />
                </Link>
            </div>
        </>
    )
}

export default Profile
