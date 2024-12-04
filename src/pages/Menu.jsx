import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import ModalProfile from '../components/ModalProfile'
import InfoPopup from '../components/InfoPopup'
import DP from '../assets/DisplayP.png'
import Cookies from 'js-cookie'

const Menu = () => {
    const [menuImages, setMenuImages] = useState({
        Play: '',
        Profile: '',
        Settings: '',
    })
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [loggedInUser, setLoggedInUser] = useState(null)

    useEffect(() => {
        document.title = 'MoteRole - Menu'

        // Retrieve user from cookies
        const storedUser = Cookies.get('loggedInUser')
        if (!storedUser) {
            navigate('/signin') // Redirect to Sign In page if no user is found
            return // Stop further execution if redirecting
        }
        setLoggedInUser(JSON.parse(storedUser)) // Update loggedInUser only if the user exists

        const storage = getStorage()

        // Fetch image URLs concurrently using Promise.all
        const fetchImages = async () => {
            try {
                const [playURL, profileURL, settingsURL] = await Promise.all([
                    getDownloadURL(ref(storage, 'Menu/play.png')),
                    getDownloadURL(ref(storage, 'Menu/profile.png')),
                    getDownloadURL(ref(storage, 'Menu/settings.png')),
                ])

                setMenuImages({
                    Play: playURL,
                    Profile: profileURL,
                    Settings: settingsURL,
                })
            } catch (error) {
                console.error(
                    'Error fetching images from Firebase Storage:',
                    error,
                )
            } finally {
                setLoading(false) // Ensure loading is turned off after the fetch
            }
        }

        fetchImages()
    }, [navigate]) // Keep dependency array minimal

    // MenuItem component to avoid code duplication
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
                            imgSrc={menuImages.Play}
                            label="Laro"
                            bgColor="bg-applegreen"
                        />
                        <MenuItem
                            to="#"
                            imgSrc={menuImages.Profile}
                            label="Profile"
                            onClick={() => setShowModal(true)}
                            bgColor="bg-bluesky"
                        />
                        <MenuItem
                            to="/settings"
                            imgSrc={menuImages.Settings}
                            label="Settings"
                            bgColor="bg-grape"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/10 flex select-none flex-col justify-between opacity-100">
                    <button
                        disabled
                        onClick={() => setShowModal(true)}
                        className="flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-full text-center text-white opacity-0 outline outline-4 outline-modalbrowndark duration-100 active:translate-y-1 mobile:-translate-y-1"
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
