import React, { useEffect } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import line from '../assets/categorybtn/line.png'
import shape from '../assets/categorybtn/shape.png'
import abc from '../assets/categorybtn/abc.png'

const SignUp = () => {
    useEffect(() => {
        document.title = 'Sign up'
    })
    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-end">
                    {/* No need to pass onClick if using the default navigate(-1) */}
                    <FullScreen />
                </div>
                {/* center */}
                <div className="-mt-12 flex w-full flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-8 mobile:space-y-3">
                    <div className="text-shadow text-8xl mobile:text-5xl ipad:text-7xl">
                        MoTeRole
                    </div>
                    <div className="relative flex h-[50%] w-[70%] flex-col items-center rounded-3xl border-8 border-grape bg-white bg-opacity-30 px-10 py-5 text-3xl mobile:h-[60%] mobile:rounded-xl mobile:border-4 mobile:p-4 mobile:px-4 mobile:py-1 mobile:text-base ipad:h-[40%] ipad:px-6 ipad:py-4 ipad:text-xl">
                        <form
                            action=""
                            className="flex h-full w-full flex-col items-center justify-between space-y-2 font-nunito font-black text-black mobile:space-y-2"
                        >
                            <span className="flex w-full justify-start pl-4 text-base text-gray-500 mobile:text-xs">
                                STUDENT
                            </span>
                            <div className="flex h-full w-full justify-center space-x-4">
                                <input
                                    type="text"
                                    name="signup-firstname"
                                    id="sigin-firstname"
                                    placeholder="First Name"
                                    className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                />
                                <input
                                    type="text"
                                    name="signup-lastname"
                                    id="sigin-lastname"
                                    placeholder="Last Name"
                                    className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                />
                            </div>

                            <div className="flex h-full w-full space-x-4">
                                <input
                                    type="text"
                                    name="signup-username"
                                    id="sigin-username"
                                    placeholder="Username"
                                    className="h-full w-1/2 rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                />
                                <div className="flex w-1/2 justify-evenly">
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="radio"
                                            name="signup-gender"
                                            id="female"
                                            placeholder="Username"
                                            className="h-8 w-8 border-4 border-grape px-4 focus:outline-0 mobile:h-4 mobile:w-4 mobile:rounded-xl"
                                        />
                                        <label for="female">Female</label>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            defaultChecked
                                            type="radio"
                                            name="signup-gender"
                                            id="male"
                                            placeholder="Username"
                                            className="h-8 w-8 border-4 border-grape px-4 focus:outline-0 mobile:h-4 mobile:w-4 mobile:rounded-xl"
                                        />
                                        <label for="male">Male</label>
                                    </div>
                                </div>
                            </div>
                            <span className="flex w-full justify-start pl-4 text-base text-gray-500 mobile:text-xs">
                                TEACHER/GUARDIAN
                            </span>
                            <input
                                type="email"
                                name="signup-email"
                                id="sigin-email"
                                placeholder="Email"
                                className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                            />
                            <input
                                type="password"
                                name="signup-password"
                                id="sigin-password"
                                placeholder="Password"
                                className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                            />
                        </form>

                        <div className="absolute -bottom-20 flex h-14 w-[100%] justify-evenly space-x-4 text-4xl mobile:-bottom-12 mobile:h-10 mobile:text-xl ipad:-bottom-20 ipad:text-3xl">
                            <Link
                                to="/signin"
                                className="text-shadow flex h-full w-1/3 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="text-shadow flex h-full w-1/3 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
                {/* right column */}
                <div className="w-1/10 mobile:space-y- flex select-none flex-col space-y-4 opacity-0">
                    {/* Action button acting as a "Back" button */}
                    <Actionbtn
                        text=""
                        to="/settings"
                        bgColor="#AB47BC"
                        disabled={true}
                        icon={PiGearSixBold}
                    />
                    <Actionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        disabled={true}
                        icon={IoBulbOutline}
                    />
                </div>
            </div>
        </>
    )
}

export default SignUp
