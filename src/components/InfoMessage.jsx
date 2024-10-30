import React from 'react'
import { IoBulbOutline } from 'react-icons/io5'

const InfoMessage = ({ messages = [] }) => {
    return (
        <>
            <div className="flex w-full flex-col items-center justify-center gap-4 mobile:gap-2 cursor-pointer">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className="w-[80%] items-center font-nunito text-3xl font-black mobile:text-base ipad:text-2xl"
                    >
                        <div className="flex w-full items-center gap-6 rounded-2xl border-8 border-moldcheese bg-white px-4 py-2 mobile:border-4 ipad:gap-3 mobile:px-2 mobile:gap-2 mobile:py-1">
                            <IoBulbOutline className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-700 p-2 text-white mobile:size-8 ipad:size-12 ipad:p-1" />
                            <span className="flex text-wrap">{msg}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default InfoMessage
