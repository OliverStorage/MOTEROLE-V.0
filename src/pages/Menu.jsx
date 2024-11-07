import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import ModalProfile from '../components/ModalProfile'
import InfoPopup from '../components/InfoPopup'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, child, get, update } from 'firebase/database'
import { app } from '../firebaseConfig'
import Play from '../assets/menubutton/play.png'
import Profile from '../assets/menubutton/profile.png'
import Settings from '../assets/menubutton/settings.png'
import DP from '../assets/DisplayP.png'

const database = getDatabase(app)

const Menu = () => {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'MoteRole - Menu'
        const auth = getAuth()

        const fetchData = async (uid) => {
            try {
                const dbRef = ref(database)
                const accountHolderSnap = await get(
                    child(dbRef, `AccountHolder/${uid}`),
                )

                if (accountHolderSnap.exists()) {
                    const accountHolderData = accountHolderSnap.val()
                    console.log('AccountHolder Data:', accountHolderData)

                    const preschoolerSnap = await get(
                        child(
                            dbRef,
                            `Preschooler/${accountHolderData.AccountHolderId}`,
                        ),
                    )
                    if (preschoolerSnap.exists()) {
                        console.log('Preschooler Data:', preschoolerSnap.val())
                    } else {
                        console.log('No Preschooler data available')
                    }
                } else {
                    console.log('No AccountHolder data available')
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchData(user.uid)
            } else {
                console.log('User is signed out')
                setLoading(false)
            }
        })

        return () => unsubscribe()
    }, [])

    const handleLaroClick = () => {
        const auth = getAuth()
        const user = auth.currentUser

        if (user) {
            update(ref(database, `users/${user.uid}`), {
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

    const MenuItem = ({ to, imgSrc, label, onClick, bgColor }) => (
        <Link
            to={to}
            onClick={onClick}
            className={`text-shadow flex flex-col items-center space-y-4 rounded-3xl ${bgColor} p-5 duration-100 active:scale-95 mobile:space-y-2 mobile:rounded-lg mobile:p-3 ipad:rounded-xl ipad:p-4`}
        >
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <img
                    src={imgSrc}
                    alt={label}
                    className="size-52 rounded-lg bg-butter mobile:size-28 mobile:rounded-md ipad:size-36"
                />
            )}
            <span>{label}</span>
        </Link>
    )

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* Left Side */}
                <div className="flex flex-col justify-end">
                    <FullScreen />
                </div>

                {/* Center */}
                <div className="-mt-20 flex w-[80%] flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-10">
                    <h1 className="text-shadow text-9xl mobile:text-7xl">
                        MoTeRole
                    </h1>
                    <div className="flex space-x-10 text-4xl mobile:space-x-5 mobile:text-xl ipad:text-2xl">
                        <MenuItem
                            to="/category"
                            imgSrc={Play}
                            label="Laro"
                            onClick={handleLaroClick}
                            bgColor="bg-applegreen"
                        />
                        <MenuItem
                            to="#"
                            imgSrc={Profile}
                            label="Profile"
                            onClick={() => setShowModal(true)}
                            bgColor="bg-bluesky"
                        />
                        <MenuItem
                            to="/settings"
                            imgSrc={Settings}
                            label="Settings"
                            bgColor="bg-grape"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/10 flex select-none flex-col justify-between opacity-100">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-full text-center text-white outline outline-4 outline-modalbrowndark duration-100 active:translate-y-1 mobile:-translate-y-1"
                    >
                        {loading ? (
                            <div className="loader">Loading...</div>
                        ) : (
                            <img
                                src={DP}
                                alt="Leaderboard"
                                className="size-14 select-none mobile:size-10 ipad:size-14"
                            />
                        )}
                    </button>
                    <InfoPopup
                        className="flex flex-col"
                        messages={[
                            'Main Menu: pumili sa tatlong kahon ang nais ng manlalaro na gawin',
                            'Laro: sa kahong iito ang magsisimula na ang laro',
                            'Tagumpay: sa kahong ito makikita ang mga natapos sa laro',
                            'Settings: sa kahong ito maaring ayusin ang tugtog at tunog na nais ng manlalaro',
                        ]}
                    />
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalProfile onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    )
}

export default Menu
