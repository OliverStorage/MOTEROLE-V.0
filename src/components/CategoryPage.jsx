// components/CategoryPage.js
import React from 'react'
import { Link } from 'react-router-dom'
import Background from './Background'
import FullScreen from './FullScreen'
import Actionbtn from './Actionbtn'

const CategoryPage = ({ title, items, images, borderColor, toPath }) => {
    return (
        <div className="relative flex h-screen w-screen items-center justify-between p-5">
            {/* Left column */}
            <div className="w-1/10 flex h-full flex-col justify-between">
                <Actionbtn
                    text=""
                    to="/category"
                    bgColor="#F40000"
                    icon="LuArrowBigLeft"
                />
                <FullScreen />
            </div>

            {/* Center area with items */}
            <div
                className="relative flex h-[70%] w-[80%] flex-col items-center rounded-3xl p-8"
                style={{ border: `8px solid ${borderColor}` }}
            >
                <span className="absolute top-[-2rem] h-14 w-1/3 text-center text-4xl font-bold">
                    {title}
                </span>
                <div className="flex h-full w-full items-center justify-evenly space-x-4 overflow-auto rounded-2xl bg-cheese p-4">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            to={toPath}
                            className="relative flex h-[80%] w-1/4 flex-shrink-0 flex-col items-center justify-center rounded-2xl border-8 bg-cover"
                            style={{
                                backgroundImage: images[item]?.bgImage
                                    ? `url(${images[item].bgImage})`
                                    : 'none',
                            }}
                        >
                            <div
                                className="flex h-3/4 w-full items-center justify-center bg-cover"
                                style={{
                                    backgroundImage: images[item]?.itemImage
                                        ? `url(${images[item].itemImage})`
                                        : 'none',
                                }}
                            />
                            <span className="text-xl">{item}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Right column */}
            <div className="w-1/10 flex flex-col space-y-4">
                <Actionbtn
                    text=""
                    to="/settings"
                    bgColor="#AB47BC"
                    icon="PiGearSixBold"
                />
                <Actionbtn
                    text=""
                    to="/achievement"
                    bgColor="#8BC34A"
                    icon="IoBulbOutline"
                />
            </div>
        </div>
    )
}

export default CategoryPage
