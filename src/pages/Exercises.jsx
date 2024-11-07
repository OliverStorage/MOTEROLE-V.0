import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link, useParams } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { db } from '../firebaseConfig'
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore'

const MemoizedActionbtn = React.memo(({ text, to, bgColor, icon }) => (
    <Actionbtn text={text} to={to} bgColor={bgColor} icon={icon} />
))

const Exercises = () => {
    const { categoryId } = useParams()
    const [exercises, setExercises] = useState([])
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imageLoadStates, setImageLoadStates] = useState({})

    useEffect(() => {
        document.title = 'MoTeRole - Exercises'

        const categoryDocRef = doc(db, 'Category', categoryId)
        const unsubscribeCategory = onSnapshot(
            categoryDocRef,
            (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setCategory({ ...docSnapshot.data(), id: docSnapshot.id })
                    setLoading(false)
                }
            },
        )

        const exercisesCollection = collection(db, 'Exercises')
        const exercisesQuery = query(
            exercisesCollection,
            where('CategoryId', '==', categoryId),
            orderBy('Order', 'asc'),
        )

        const unsubscribeExercises = onSnapshot(exercisesQuery, (snapshot) => {
            setExercises(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
            )
        })

        return () => {
            unsubscribeCategory()
            unsubscribeExercises()
        }
    }, [categoryId])

    // Ensure each image has its own loading state
    useEffect(() => {
        const loadImages = async () => {
            const loadStatus = {}
            for (const exercise of exercises) {
                loadStatus[exercise.id] = false
                const img = new Image()
                img.src = exercise.mainIMG
                img.onload = () =>
                    setImageLoadStates((prev) => ({
                        ...prev,
                        [exercise.id]: true,
                    }))
            }
            setImageLoadStates(loadStatus)
        }

        loadImages()
    }, [exercises])

    if (loading || !category) return <div>Loading...</div>

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                <div className="w-1/10 flex flex-col justify-between">
                    <MemoizedActionbtn
                        text=""
                        to="/category"
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>

                <div className="flex w-full flex-col items-center justify-center overflow-hidden font-bubbles text-white">
                    <div
                        className={`${category.borderColor}  text-shadow relative flex h-[70%] w-[80%] justify-center rounded-3xl border-8 bg-white p-8 mobile:h-[80%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6`}
                    >
                        <span
                            className={`${category.borderColor} absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 bg-white px-4 font-nunito text-4xl font-black text-black mobile:h-12 mobile:w-auto mobile:border-4 mobile:text-2xl ipad:text-3xl`}
                        >
                            {category.CategoryName}
                        </span>

                        <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 overflow-auto rounded-2xl border-[0.5px] border-softgray bg-cheese p-4 font-nunito text-4xl font-black text-black mobile:overflow-x-auto mobile:rounded-xl mobile:text-xl ipad:overflow-x-auto ipad:text-3xl">
                            {exercises.map((exercise) => (
                                <Link
                                    key={exercise.id}
                                    to={`/GameExercise/${exercise.id}`}
                                    state={{ categoryId }}
                                    style={{
                                        backgroundImage: `url(${exercise.imageURL})`,
                                    }}
                                    className={`text-shadow flex h-[80%] w-1/4 flex-shrink-0 flex-col items-center justify-between rounded-2xl border-8 bg-contain bg-no-repeat p-2 mobile:px-2 mobile:py-1 border-${exercise.ExerciseColor} bg-butter bg-cover bg-center duration-100 active:scale-95 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3`}
                                >
                                    <div className="flex h-full w-full flex-col items-center justify-between">
                                        <span className="flex w-full justify-start text-5xl leading-none mobile:text-3xl">
                                            {exercise.Big}
                                        </span>
                                        {imageLoadStates[exercise.id] ? (
                                            <img
                                                src={exercise.mainIMG}
                                                alt="Exercise"
                                                className="h-[65%]"
                                            />
                                        ) : (
                                            <div>Loading...</div>
                                        )}
                                        <span className="flex w-full justify-center">
                                            {exercise.ExerciseName}
                                            {exercise.letterSound}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-1/10 flex select-none flex-col space-y-4 mobile:space-y-3">
                    <MemoizedActionbtn
                        text=""
                        to="/settings"
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                    />
                </div>
            </div>
        </>
    )
}

export default Exercises
