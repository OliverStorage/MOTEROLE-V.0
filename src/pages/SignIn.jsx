import React from 'react'
import Background from '../components/Background'
import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <>
            <Background />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-6">
                <span className="-mt-16 font-bubbles text-8xl text-white">
                    MoTeRole
                </span>
                <div className="relative flex h-[50%] w-[60%] flex-col items-center justify-center rounded-3xl border-[6px] border-[#AB47BC] bg-white bg-opacity-50 px-4 shadow-2xl shadow-black">
                    <form
                        action=""
                        className="flex w-[80%] flex-col items-center justify-center font-bubbles text-2xl text-gray-800"
                    >
                        <div className="flex w-full flex-col space-y-10">
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Email"
                                className="h-20 w-full rounded-2xl border-4 border-[#AB47BC] px-4 focus:outline-0"
                            />
                            <input
                                type="password"
                                name=""
                                id=""
                                placeholder="Password"
                                className="h-20 w-full rounded-2xl border-4 border-[#AB47BC] px-4 focus:outline-0"
                            />
                        </div>
                    </form>

                    <div className="absolute inset-x-0 -bottom-10 flex justify-evenly font-bubbles text-2xl tracking-widest text-white">
                        <Link
                            to="/signin"
                            className="rounded-2xl border-b-8 border-r-4 border-b-[#31799a] border-r-[#31799a] bg-[#4FC3F7] px-16 py-4 text-center"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/signup"
                            className="rounded-2xl border-b-8 border-r-4 border-b-[#31799a] border-r-[#31799a] bg-[#4FC3F7] px-16 py-4 text-center"
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
