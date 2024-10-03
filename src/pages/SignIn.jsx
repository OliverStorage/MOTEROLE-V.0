import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const SignIn = () => {
    useEffect(() => {
        document.title = 'Sign in'
    })
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen select-none flex-col items-center justify-center space-y-6">
                <span className="-mt-16 font-bubbles text-7xl text-white drop-shadow-[5px_5px_0px_#000000] lg:text-9xl">
                    MoTeRole
                </span>
                <div className="relative flex h-[50%] w-[60%] flex-col items-center justify-center rounded-3xl border-[6px] border-[#AB47BC] bg-white bg-opacity-50 px-4 shadow-2xl shadow-black">
                    <form
                        action=""
                        className="flex w-[80%] flex-col items-center justify-center font-bubbles text-2xl text-gray-800"
                    >
                        <div className="flex w-full flex-col gap-4 lg:gap-10">
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Email"
                                className="h-12 w-full rounded-xl border-4 border-[#AB47BC] px-4 focus:outline-0 lg:h-20"
                            />
                            <input
                                type="password"
                                name=""
                                id=""
                                placeholder="Password"
                                className="h-12 w-full rounded-xl border-4 border-[#AB47BC] px-4 focus:outline-0 lg:h-20"
                            />
                        </div>
                    </form>

                    <div className="absolute inset-x-0 -bottom-10 flex justify-evenly font-bubbles tracking-widest text-white lg:text-3xl">
                        <Link
                            to="/signin"
                            className="flex h-12 w-32 items-center justify-center rounded-2xl border-b-8 border-b-[#31799a] bg-[#4FC3F7] text-center lg:h-16 lg:w-60"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/signup"
                            className="flex h-12 w-32 items-center justify-center rounded-2xl border-b-8 border-b-[#31799a] bg-[#4FC3F7] text-center lg:h-16 lg:w-60"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
