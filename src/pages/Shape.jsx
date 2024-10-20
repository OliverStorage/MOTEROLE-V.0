import React, { useEffect, useState, useCallback } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'

// Image loader function for line background and images
const useshapeImages = (shapeTypes) => {
    const [images, setImages] = useState({})

    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = shapeTypes.map(async (shapeType) => {
                try {
                    const [shapebg, shapeimg] = await Promise.all([
                        import(`../assets/shapebg/${shapeType}.png`),
                        import(`../assets/shapeimg/${shapeType}.png`),
                    ])

                    return {
                        [shapeType]: {
                            shapebg: shapebg.default,
                            shapeimg: shapeimg.default,
                        },
                    }
                } catch (err) {
                    console.error(`Error loading images for ${shapeType}:`, err)
                    return { [shapeType]: { shapebg: null, shapeimg: null } }
                }
            })

            const resolvedImages = await Promise.all(imagePromises)
            setImages(
                resolvedImages.reduce(
                    (acc, imageObj) => ({ ...acc, ...imageObj }),
                    {},
                ),
            )
        }

        // Debounce logic to delay image loading
        const debounceTimeout = setTimeout(() => {
            loadImages()
        }, 100) // Adjust delay as necessary

        return () => clearTimeout(debounceTimeout)
    }, [shapeTypes])

    return images
}

// Memoized Actionbtn to prevent unnecessary re-renders
const MemoizedActionbtn = React.memo(({ text, to, bgColor, icon }) => (
    <Actionbtn text={text} to={to} bgColor={bgColor} icon={icon} />
))

const Shape = () => {
    useEffect(() => {
        document.title = 'Shape'
    })
    const shapeTypes = ['Bilog', 'Tatsulok', 'Parisukat', 'Parihaba', 'Oblong']

    // Get both shapebg and shapeimg
    const shapeImages = useshapeImages(shapeTypes)

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-between">
                    {/* Action button acting as a "Back" button */}
                    <MemoizedActionbtn
                        text=""
                        to="/category"
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>
                {/* center */}
                <div className="flex w-full flex-col items-center justify-center font-bubbles text-white">
                    <div className="text-shadow relative flex h-[70%] w-[80%] justify-center rounded-3xl border-8 border-grape bg-white p-8 mobile:h-[85%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-grape bg-white font-nunito text-4xl font-black text-black mobile:h-12 mobile:border-4 mobile:text-2xl ipad:text-3xl">
                            Hugis
                        </span>
                        <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 overflow-auto rounded-2xl border-[0.5px] border-softgray bg-cheese p-4 font-nunito text-4xl font-black text-black mobile:overflow-x-auto mobile:rounded-xl mobile:text-xl ipad:overflow-x-auto ipad:text-3xl">
                            {shapeTypes.map((shapeType, index) => (
                                <Link
                                    key={index}
                                    to="/leveldifficulty"
                                    className="text-shadow flex h-[80%] w-1/4 flex-shrink-0 flex-col items-center justify-center rounded-2xl border-8 border-grape bg-butter bg-cover bg-center duration-100 active:scale-95 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3"
                                    style={{
                                        backgroundImage: shapeImages[shapeType]
                                            ?.shapebg
                                            ? `url(${shapeImages[shapeType].shapebg})`
                                            : 'none',
                                    }}
                                >
                                    {/* Line image div */}
                                    <div
                                        className="flex size-[90%] flex-col items-center justify-end bg-cover bg-center mobile:size-[90%] ipad:size-[90%]"
                                        style={{
                                            backgroundImage: shapeImages[
                                                shapeType
                                            ]?.shapeimg
                                                ? `url(${shapeImages[shapeType].shapeimg})`
                                                : 'none',
                                        }}
                                    >
                                        {/* Line type text */}
                                        <span>{shapeType}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {/* right column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 mobile:space-y-3">
                    <MemoizedActionbtn
                        text=""
                        to="/settings"
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                    />
                    <MemoizedActionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    />
                </div>
            </div>
        </>
    )
}

export default Shape
