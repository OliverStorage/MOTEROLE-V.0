import React from 'react'
import Ribbon from '../assets/leaderboard/ribbon.png'
import Stars from '../assets/leaderboard/stars.png'
import Gold from '../assets/leaderboard/Gold.png'
import Silver from '../assets/leaderboard/Silver.png'
import Bronze from '../assets/leaderboard/Bronze.png'
import Top1 from '../assets/leaderboard/top1.png'
import Top2 from '../assets/leaderboard/top2.png'
import Top3 from '../assets/leaderboard/top3.png'
import { LuArrowBigLeft } from 'react-icons/lu'

const ModalLeaderBoard = ({ onClose }) => {
    return (
        <>
            <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-nunito font-black">
                <div className="text-shadow relative flex h-[90%] w-1/3 flex-col items-center justify-end gap-5 rounded-3xl border-8 border-modalbrowndark bg-modalbrownlight p-8 mobile:h-[80%] mobile:w-1/2 mobile:gap-0 mobile:p-4 ipad:w-1/2">
                    <div
                        style={{ backgroundImage: `url(${Ribbon})` }}
                        className="absolute inset-x-0 -top-7 flex h-28 w-full flex-col items-center bg-cover bg-center text-center mobile:-top-9"
                    >
                        <div className="absolute -right-6 z-50 mobile:-right-5 mobile:top-3 ipad:-right-7">
                            <button className="action-btn flex cursor-pointer items-center justify-center rounded-xl bg-[#F40000] text-center text-white">
                                <LuArrowBigLeft
                                    onClick={onClose}
                                    className="size-12 mobile:size-10 ipad:size-14"
                                />
                            </button>
                        </div>
                    </div>
                    <span className="absolute inset-x-0 -top-3 text-center text-3xl text-white mobile:-top-2.5 mobile:text-xl">
                        Leaderboard
                    </span>

                    <img
                        src={Stars}
                        alt="stars.png"
                        className="h-20 w-80 object-cover object-center mobile:my-2 mobile:h-12 mobile:w-56"
                    />
                    <div className="inner-shadow h-full w-full space-y-5 overflow-y-auto rounded-xl bg-white p-4">
                        <div className="flex items-center">
                            <div className="w-[10%]">
                                <img
                                    src={Gold}
                                    alt="Gold.png"
                                    className="size-full"
                                />
                            </div>
                            <div className="w-[10%]">
                                <img
                                    src={Top1}
                                    alt="top1.png"
                                    className="size-full"
                                />
                            </div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">
                                <img
                                    src={Silver}
                                    alt="Gold.png"
                                    className="size-full"
                                />
                            </div>
                            <div className="w-[10%]">
                                <img
                                    src={Top2}
                                    alt="top1.png"
                                    className="size-full"
                                />
                            </div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">
                                <img
                                    src={Bronze}
                                    alt="Gold.png"
                                    className="size-full"
                                />
                            </div>
                            <div className="w-[10%]">
                                <img
                                    src={Top3}
                                    alt="top1.png"
                                    className="size-full"
                                />
                            </div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>{' '}
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>{' '}
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[10%]">img</div>
                            <div className="w-[10%]">dp</div>
                            <div className="w-[60%] pl-4">Player 1212</div>
                            <div className="w-[20%]">
                                29 <span>pts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalLeaderBoard
