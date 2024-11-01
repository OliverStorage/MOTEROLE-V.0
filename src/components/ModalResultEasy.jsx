import React from 'react'
import Cloud from '../assets/cloud.png'
import Grass from '../assets/grass.png'
import { LuArrowBigLeft } from 'react-icons/lu'

const ModalResultEasy = ({ onClose }) => {
    return (
        <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-nunito font-black">
            <div className="relative flex h-[70%] w-1/2 flex-col items-center justify-between gap-6 rounded-3xl border-8 border-black bg-lavender p-8 mobile:h-[80%] mobile:gap-5 mobile:p-4">
                <img
                    src={Cloud}
                    alt="cloud.png"
                    className="absolute -left-56 -top-48 size-96 select-none mobile:-left-32 mobile:-top-28 mobile:size-56 ipad:-left-44 ipad:-top-40 ipad:size-80"
                />

                <div className="absolute -right-6 -top-5 z-50 mobile:-right-5 mobile:-top-6 ipad:-right-7 ipad:-top-7">
                    <button className="action-btn flex cursor-pointer items-center justify-center rounded-xl bg-[#F40000] text-center text-white">
                        <LuArrowBigLeft
                            onClick={onClose}
                            className="size-12 mobile:size-10 ipad:size-14"
                        />
                    </button>
                </div>
                <div className="text-shadow text-6xl font-black text-white mobile:text-3xl">
                    Resulta
                </div>
                <div className="flex w-full justify-center space-x-4">
                    <span className="pt-5">
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="size-28 text-sunshine mobile:size-16"
                        >
                            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                        </svg>
                    </span>
                    <span className="pb-5">
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="size-28 text-sunshine mobile:size-16"
                        >
                            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                        </svg>
                    </span>
                    <span className="pt-5">
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="size-28 text-sunshine mobile:size-16"
                        >
                            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                        </svg>
                    </span>
                </div>
                <div className="text-shadow text-6xl font-black text-white mobile:text-3xl">
                    Perpekto!
                </div>
                <div className="font flex w-full justify-evenly space-x-6 text-2xl mobile:text-xl">
                    <button className="text-shadow flex h-12 w-full items-center justify-center rounded-xl bg-modalbrown duration-100 active:scale-95 mobile:h-8">
                        Ulitin ang Laro
                    </button>
                    <button className="text-shadow flex h-12 w-full items-center justify-center rounded-xl bg-modalbrown duration-100 active:scale-95 mobile:h-8">
                        Sunod na Laro
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalResultEasy
