import React, { useEffect, useState, useRef } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import ModalSettings from '../components/ModalSettings'
import ModalResult from '../components/ModalResult'
import { db } from '../firebaseConfig'
import { collection, addDoc, doc, getDoc, query } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Ingame = () => {
    const { gamesessionId } = useParams()
    const [showModal, setShowModal] = useState(false)
    const [showResultModal, setShowResultModal] = useState(false)
    const [isErasing, setIsErasing] = useState(false)
    const [accuracy, setAccuracy] = useState(0)
    const [detectedLetter, setDetectedLetter] = useState('Unknown')
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const preschoolerId = 'somePreschoolerId'
    const [difficultyLevel, setDifficultyLevel] = useState(null)
    const [xpath, setXpath] = useState([])
    const [ypath, setYpath] = useState([])
    const [gameSession, setGameSession] = useState(null)
    const [activeExercise, setActiveExercise] = useState(1)

    useEffect(() => {
        document.title = 'MoTeRole - IN GAME'
        const fetchGameExercise = async () => {
            try {
                const gameSessionCollection = collection(db, 'GameSession')
                const gameSessionRef = doc(gameSessionCollection, gamesessionId)
                const gameSessionDoc = await getDoc(gameSessionRef)

                if (gameSessionDoc.exists()) {
                    // console.log('Game Exercise Data:', gameSessionDoc.data())
                } else {
                    console.log('No such document!')
                }
                const data = gameSessionDoc.data()
                console.log(data.GameExerciseId)
                const gameExerciseCollection = collection(db, 'GameExercise')
                const gameExerciseRef = doc(
                    gameExerciseCollection,
                    data.GameExerciseId,
                )
                const gameExerciseDoc = await getDoc(gameExerciseRef)
                console.log(gameExerciseDoc.data())
                setGameSession(gameExerciseDoc.data())
            } catch (error) {
                console.error('Error fetching game exercise:', error)
            }
        }

        fetchGameExercise()
        console.log(gamesessionId)
    }, [])

    useEffect(() => {
        console.log(gameSession)
    }, [gameSession])

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        ctxRef.current = canvas.getContext('2d', { willReadFrequently: true })

        const handleResize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const startDrawing = (e) => {
        setIsDrawing(true)
        draw(e)
    }

    const finishDrawing = () => {
        setIsDrawing(false)
        ctxRef.current.beginPath()
    }

    const draw = (e) => {
        if (!isDrawing) return
        const ctx = ctxRef.current
        ctx.lineWidth = getLineWidth()
        ctx.lineCap = 'round'
        ctx.strokeStyle = isErasing ? 'rgba(255, 255, 255, 1)' : 'white'

        const rect = canvasRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setXpath((prev) => [...prev, x])
        setYpath((prev) => [...prev, y])

        ctx.globalCompositeOperation = isErasing
            ? 'destination-out'
            : 'source-over'
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const toggleEraser = () => {
        setIsErasing((prev) => !prev)
    }

    const resetCanvas = () => {
        const ctx = ctxRef.current
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctxRef.current.beginPath()
    }

    // const preprocessImage = (imageData) => {
    //     const img = new Image()
    //     img.src = imageData

    //     return new Promise((resolve) => {
    //         img.onload = () => {
    //             const canvas = document.createElement('canvas')
    //             const ctx = canvas.getContext('2d')
    //             canvas.width = 28 // Resize to model input size
    //             canvas.height = 28

    //             ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    //             const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    //             const normalizedData = new Float32Array(28 * 28)

    //             for (let i = 0; i < data.data.length; i += 4) {
    //                 const avg =
    //                     (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3
    //                 normalizedData[i / 4] = avg / 255 // Normalize to [0, 1]
    //             }

    //             resolve(normalizedData)
    //         }
    //     })
    // }

    // const submitCanvas = async () => {
    //     console.log(xpath)
    //     console.log(ypath)

    //     const canvas = canvasRef.current
    //     const imageData = canvas.toDataURL('image/png')

    //     try {
    //         const processedData = await preprocessImage(imageData)
    //         const response = await axios.post(
    //             'http://127.0.0.1:8000/api/predict-view/',
    //             {
    //                 image: processedData,
    //             },
    //         )
    //         setDetectedLetter(response.data.letter) // Get detected letter
    //         setAccuracy(response.data.accuracy)
    //     } catch (error) {
    //         console.error('Error fetching the prediction:', error)
    //     }

    //     setShowResultModal(true)
    // }

    //for small letter
    //   const submitCanvas = async () => {
    //       if (gameSession.ExerciseImage2) {
    //           setActiveExercise(2)
    //       }
    //   }

    const submitCanvas = () => {
        // const canvas = canvasRef.current
        // const imageData = canvas.toDataURL('image/png') // Capture the canvas data as PNG

        // // Create a link element to download the image
        // const link = document.createElement('a')
        // link.href = imageData
        // link.download = `${gamesessionId}-${Date.now()}-${activeExercise}` // Set the download file name
        // link.click()
        resetCanvas()

        //small letter
        if (gameSession.ExerciseImage2) {
            setActiveExercise(2)
        }
    }

    const handleTouchStart = (e) => {
        startDrawing(e.touches[0])
    }

    const handleMouseMove = (e) => {
        draw(e)
    }

    const handleTouchMove = (e) => {
        draw(e.touches[0])
    }

  const getLineWidth = () => {
      const width = window.innerWidth

      // Adjust line width if ExerciseImage2 (activeExercise 2) is active
      if (activeExercise === 2) {
          if (width >= 1500 && width <= 2000) return 50
          if (width >= 1024 && width < 1500) return 35
          return 25 // Default width for other screen sizes
      }

      // Default line widths for other exercises
      if (width >= 1500 && width <= 2000) return 62
      if (width >= 1024 && width < 1500) return 45
      return 30
  }

    const startGameSession = async () => {
        const sessionStartTime = new Date()
        const sessionData = {
            GameExerciseId: gameExerciseId,
            PreschoolerId: preschoolerId,
            PreschoolerOutput: '',
            SessionStartTime: sessionStartTime,
            SessionEndTime: null,
        }

        try {
            const gameSessionRef = collection(db, 'GameSession')
            await addDoc(gameSessionRef, sessionData)
            console.log('Game session created successfully')
        } catch (error) {
            console.error('Error creating game session: ', error)
        }
    }

    const handleDifficultySelect = (level) => {
        setDifficultyLevel(level)
        startGameSession()
    }

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                <div className="w-1/10 flex flex-col justify-between">
                    <Actionbtn
                        text=""
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                        isLink={false}
                    />
                    <FullScreen />
                </div>
                <div className="flex w-full flex-col items-center justify-center font-bubbles text-white">
                    <div className="text-shadow relative flex h-[85%] w-[80%] justify-center rounded-3xl border-8 border-bluesky bg-white p-8 mobile:h-[85%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-bluesky bg-white font-nunito text-4xl font-black text-black mobile:h-12 mobile:border-4 mobile:text-2xl ipad:text-3xl">
                            TITLE
                        </span>
                        <div className="relative flex h-full w-full flex-col items-center justify-between rounded-2xl border-8 border-wood bg-darkgreen bg-contain bg-center bg-no-repeat px-6 py-10 mobile:overflow-x-auto mobile:rounded-xl mobile:border-4 mobile:py-8 ipad:overflow-x-auto">
                            <div className="h-2 w-full bg-lineblue mobile:h-1" />
                            <div className="h-2 w-full border-t-8 border-dashed border-linered mobile:border-t-4" />
                            <div className="h-2 w-full bg-lineblue mobile:h-1" />
                            {gameSession && (
                                <div
                                    style={{
                                        backgroundImage: `url(${activeExercise === 1 ? gameSession.ExerciseImage : gameSession.ExerciseImage2})`,
                                    }}
                                    className="absolute inset-0 z-10 bg-contain bg-center bg-no-repeat mobile:m-4 ipad:m-4"
                                />
                            )}
                            {!gameSession && <>Loading...</>}
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <canvas
                                    ref={canvasRef}
                                    onMouseDown={startDrawing}
                                    onMouseUp={finishDrawing}
                                    onMouseMove={handleMouseMove}
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={finishDrawing}
                                    onTouchMove={handleTouchMove}
                                    className="bg-transparent"
                                    style={{
                                        cursor: 'crosshair',
                                        width: '50%',
                                        height: '100%',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 transform space-x-4">
                    <button
                        onClick={toggleEraser}
                        className="rounded bg-gray-600 p-2 text-white"
                    >
                        {isErasing ? 'Pen' : 'Eraser'}
                    </button>
                    <button
                        onClick={resetCanvas}
                        className="rounded bg-red-600 p-2 text-white"
                    >
                        Reset
                    </button>
                    <button
                        onClick={submitCanvas}
                        className="rounded bg-blue-600 p-2 text-white"
                    >
                        Submit
                    </button>
                </div>
                <div className="w-1/10 flex select-none flex-col space-y-4 mobile:space-y-3">
                    <Actionbtn
                        text=""
                        isLink={false}
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                        onClick={() => setShowModal(true)}
                    />
                    {/* <Actionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    /> */}
                </div>
            </div>

            {/* Modal for Settings */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalSettings onClose={() => setShowModal(false)} />
                </div>
            )}

            {/* Modal for Result */}
            {showResultModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalResult
                        accuracy={accuracy}
                        detectedLetter={detectedLetter}
                        onClose={() => setShowResultModal(false)}
                    />
                </div>
            )}
        </>
    )
}

export default Ingame
