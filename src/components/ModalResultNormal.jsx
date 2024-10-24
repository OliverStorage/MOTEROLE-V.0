import React from 'react'
import Cloud from '../assets/cloud.png'
import Grass from '../assets/grass.png'
import { LuArrowBigLeft } from 'react-icons/lu'

const ModalResultNormal = ({ onClose }) => {
        return (
            <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-nunito font-black">
                <div className="bg-lavender relative flex h-[70%] w-1/2 flex-col items-center justify-between gap-6 rounded-3xl border-8 border-black p-8 mobile:h-[80%] mobile:gap-5 mobile:p-4">
                    <img
                        src={Cloud}
                        alt="cloud.png"
                        className="absolute -left-56 -top-48 size-96 select-none mobile:-left-32 mobile:-top-28 mobile:size-56 ipad:-left-44 ipad:-top-40 ipad:size-80"
                    />
                    <img
                        src={Grass}
                        alt="cloud.png"
                        className="ipad:-bottom-22 absolute -bottom-16 -right-28 size-56 select-none mobile:-bottom-10 mobile:-right-16 mobile:size-32 ipad:-bottom-16 ipad:-right-28 ipad:size-56"
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
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                               className="size-28 text-sunshine mobile:size-16"
                            >
                                <path d="M16 0h128c5.3 0 10.3 2.7 13.3 7.1l81.1 121.6c-49.5 4.1-94 25.6-127.6 58.3L2.7 24.9C-.6 20-.9 13.7 1.9 8.5S10.1 0 16 0zm493.3 24.9L401.2 187.1c-33.5-32.7-78.1-54.2-127.6-58.3L354.7 7.1c3-4.5 8-7.1 13.3-7.1h128c5.9 0 11.3 3.2 14.1 8.5s2.5 11.5-.8 16.4zM432 336c0 97.2-78.8 176-176 176S80 433.2 80 336s78.8-176 176-176 176 78.8 176 176zm-167.6-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1l-50.2 7.3c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
                            </svg>
                        </span>
                        <span className="pb-5">
                            <svg
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                               className="size-28 text-sunshine mobile:size-16"
                            >
                                <path d="M16 0h128c5.3 0 10.3 2.7 13.3 7.1l81.1 121.6c-49.5 4.1-94 25.6-127.6 58.3L2.7 24.9C-.6 20-.9 13.7 1.9 8.5S10.1 0 16 0zm493.3 24.9L401.2 187.1c-33.5-32.7-78.1-54.2-127.6-58.3L354.7 7.1c3-4.5 8-7.1 13.3-7.1h128c5.9 0 11.3 3.2 14.1 8.5s2.5 11.5-.8 16.4zM432 336c0 97.2-78.8 176-176 176S80 433.2 80 336s78.8-176 176-176 176 78.8 176 176zm-167.6-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1l-50.2 7.3c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
                            </svg>
                        </span>
                        <span className="pt-5">
                            <svg
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                               className="size-28 text-sunshine mobile:size-16"
                            >
                                <path d="M16 0h128c5.3 0 10.3 2.7 13.3 7.1l81.1 121.6c-49.5 4.1-94 25.6-127.6 58.3L2.7 24.9C-.6 20-.9 13.7 1.9 8.5S10.1 0 16 0zm493.3 24.9L401.2 187.1c-33.5-32.7-78.1-54.2-127.6-58.3L354.7 7.1c3-4.5 8-7.1 13.3-7.1h128c5.9 0 11.3 3.2 14.1 8.5s2.5 11.5-.8 16.4zM432 336c0 97.2-78.8 176-176 176S80 433.2 80 336s78.8-176 176-176 176 78.8 176 176zm-167.6-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1l-50.2 7.3c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
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

export default ModalResultNormal
