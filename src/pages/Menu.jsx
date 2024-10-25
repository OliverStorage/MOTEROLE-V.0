import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Play from '../assets/menubutton/play.png'
import Achievement from '../assets/menubutton/achievement.png'
import Profile from '../assets/menubutton/profile.png'
import Settings from '../assets/menubutton/settings.png'
import { Link, useNavigate } from 'react-router-dom'
import FullScreen from '../components/FullScreen'
import Leader from '../assets/leaderboard/leader.png'
import ModalLeaderBoard from '../components/ModalLeaderBoard'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, child, get, update } from 'firebase/database'
import { app } from '../firebaseConfig'

const database = getDatabase(app)

const Menu = () => {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Menu'

        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                const uid = user.uid
                const dbRef = ref(database)

                get(child(dbRef, `AccountHolder/${uid}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const accountHolderData = snapshot.val()
                            console.log(
                                'AccountHolder Data:',
                                accountHolderData,
                            )

                            const accountHolderId =
                                accountHolderData.AccountHolderId
                            return get(
                                child(dbRef, `Preschooler/${accountHolderId}`),
                            )
                        } else {
                            console.log('No AccountHolder data available')
                            setLoading(false)
                        }
                    })
                    .then((preschoolerSnapshot) => {
                        if (
                            preschoolerSnapshot &&
                            preschoolerSnapshot.exists()
                        ) {
                            const preschoolerData = preschoolerSnapshot.val()
                            console.log('Preschooler Data:', preschoolerData)
                        } else {
                            console.log('No Preschooler data available')
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                console.log('User is signed out')
                setLoading(false)
            }
        })

        return () => unsubscribe() // Cleanup subscription
    }, [])

    const handleLaroClick = () => {
        const auth = getAuth()
        const user = auth.currentUser

        if (user) {
            const userId = user.uid
            const userRef = ref(database, `users/${userId}`)

            // Reset selections when going to the Category page
            update(userRef, {
                selectedCategory: null,
                selectedExercise: null,
                selectedDifficulty: null,
                startTime: null,
                score: 0,
                results: null,
            })
        }
        navigate('/category')
    }

    if (loading) {
        return <div>Loading...</div> // Loading state
    }

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                <div className="flex flex-col justify-end">
                    <FullScreen />
                </div>
                <div className="-mt-20 flex w-[80%] flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-10">
                    <div className="text-shadow text-9xl mobile:text-7xl">
                        MoTeRole
                    </div>
                    <div className="flex space-x-4 text-4xl mobile:text-xl ipad:text-2xl">
                        <Link
                            to="/category"
                            className="text-shadow flex flex-col items-center space-y-4 rounded-3xl bg-applegreen p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4"
                        >
                            <img
                                src={Play}
                                alt="Play"
                                className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                            />
                            <span>Laro</span>
                        </Link>
                        <Link
                            to="/achievement"
                            className="text-shadow flex flex-col items-center space-y-4 rounded-3xl bg-tangerine p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4"
                        >
                            <img
                                src={Achievement}
                                alt="Achievement"
                                className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                            />
                            <span>Tagumpay</span>
                        </Link>
                        <Link
                            to="/profile"
                            className="text-shadow flex flex-col items-center space-y-4 rounded-3xl bg-bluesky p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4"
                        >
                            <img
                                src={Profile}
                                alt="Profile"
                                className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                            />
                            <span>Profile</span>
                        </Link>
                        <Link
                            to="/settings"
                            className="text-shadow flex flex-col items-center space-y-4 rounded-3xl bg-grape p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4"
                        >
                            <img
                                src={Settings}
                                alt="Settings"
                                className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                            />
                            <span>Settings</span>
                        </Link>
                    </div>
                </div>
                <div className="w-1/10 flex select-none flex-col justify-between opacity-100">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex cursor-pointer items-center justify-center rounded-xl text-center text-white duration-100 active:translate-y-1 mobile:-translate-y-1"
                    >
                        <img
                            src={Leader}
                            alt="Leaderboard"
                            className="size-12 mobile:size-10 ipad:size-14"
                        />
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalLeaderBoard onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    )
}

export default Menu
