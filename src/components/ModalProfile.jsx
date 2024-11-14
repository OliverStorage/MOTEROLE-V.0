import React, { useEffect, useState } from 'react'
import { LuArrowBigLeft } from 'react-icons/lu'
import { app, db } from '../firebaseConfig'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FaEdit } from 'react-icons/fa'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const ModalProfile = ({ onClose }) => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('category')
    const [profileImage, setProfileImage] = useState('') // State for profile image
    const [uploading, setUploading] = useState(false) // State for upload status
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [preschooler, setpPeschooler] = useState(null)
    const storage = getStorage(app)

    useEffect(() => {
        document.title = 'MoteRole - Profile'
        const storedUser = localStorage.getItem('loggedInUser')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setLoggedInUser(parsedUser)
            if (parsedUser?.AccountHolderId && parsedUser?.username) {
                fetchPreschooler(
                    parsedUser.AccountHolderId,
                    parsedUser.username,
                )
            } else {
                console.warn(
                    'AccountHolderId or username is missing from parsedUser',
                )
            }
        } else {
            console.warn('No logged-in user found in localStorage')
        }
    }, [])

    const fetchPreschooler = async (accountHolderId, username) => {
        try {
            const userQuery = query(
                collection(db, 'Preschooler'),
                where('AccountHolderId', '==', accountHolderId),
                where('username', '==', username),
            )
            const userSnapshot = await getDocs(userQuery)

            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0].data()
                setpPeschooler(userDoc)
            } else {
                console.log('No user data found')
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            setUploading(true)
            const storageRef = ref(storage, `profileImages/${file.name}`)
            await uploadBytes(storageRef, file) // Uploading to Firebase Storage
            const imageUrl = await getDownloadURL(storageRef) // Get the download URL
            setProfileImage(imageUrl) // Set the profile image URL
            setUploading(false)
        }
    }

    const handleLogout = () => {
        setLoggedInUser(null)
        localStorage.removeItem('loggedInUser')
        console.log('Logout successful')
        navigate('/signin')
    }

    return (
        <>
            <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-bubbles font-normal">
                <div className="text-shadow relative flex h-[80%] w-[60%] flex-col items-center gap-4 rounded-3xl border-8 border-modalbrowndark bg-cheese p-4 px-6 text-5xl text-white mobile:h-[80%] mobile:w-[60%] mobile:gap-0 mobile:p-2 mobile:text-xl ipad:w-[70%] ipad:text-3xl">
                    <div className="absolute -left-6 -top-6 z-50 mobile:-right-5 mobile:-top-5 ipad:-right-7">
                        <button className="action-btn flex cursor-pointer items-center justify-center rounded-xl bg-[#F40000] text-center">
                            <LuArrowBigLeft
                                onClick={onClose}
                                className="size-12 mobile:size-10 ipad:size-14"
                            />
                        </button>
                    </div>
                    <div className="text-outline tracking-wide">My Profile</div>
                    <div className="flex w-full items-center text-3xl mobile:gap-1 mobile:text-sm ipad:text-2xl">
                        <div className="relative flex w-[20%] items-end">
                            {/* make this img changable  */}
                            {/* <img
                                src={profileImage || 'default-user.png'}
                                alt="user"
                                className="h-[100px] w-[100px] object-center rounded-full text-base mobile:h-[60px] mobile:w-[60px] ipad:h-[90px] ipad:w-[90px]"
                            /> */}
                            <div className="h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-bluesky object-center text-base mobile:h-[60px] mobile:w-[60px] ipad:h-[90px] ipad:w-[90px]">
                                <img
                                    src={
                                        profileImage ||
                                        preschooler?.profileImage ||
                                        'default-user.png'
                                    }
                                    alt="user"
                                    className="flex h-full w-full items-center justify-end"
                                />
                            </div>

                            <div className="flex">
                                <label
                                    htmlFor="userProfileImage"
                                    className="ipad:size- mobile:size-5"
                                >
                                    <FaEdit className="h-full w-full cursor-pointer" />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="userProfileImage"
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="text-outline flex flex-col justify-between">
                                <div className="flex gap-3 mobile:gap-1">
                                    Username:
                                    <span className="capitalize">
                                        {preschooler?.username || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex gap-3 mobile:gap-1">
                                    Pangalan:{' '}
                                    <span className="capitalize">
                                        {preschooler
                                            ? `${preschooler.firstname} ${preschooler.lastname}`
                                            : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex gap-3 mobile:gap-1">
                                    Email:
                                    <span className="capitalize">
                                        {preschooler?.email || 'N/A'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                                <button
                                    onClick={handleLogout}
                                    className="inner-shadow-deactive rounded-xl bg-back px-3 py-1 duration-100 active:translate-y-1 active:drop-shadow-[0px_0px_0px_#000000]"
                                >
                                    <span className="text-outline flex items-center justify-center text-xl mobile:text-xs">
                                        Logout
                                    </span>
                                </button>
                                <div className="text-outline flex gap-3 mobile:gap-1">
                                    Gender:
                                    <span className="capitalize">
                                        {preschooler?.gender || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* tab */}
                    <div className="flex h-full w-full flex-col space-y-2 overflow-hidden p-1 text-3xl text-moldcheese mobile:text-base">
                        <div className="flex w-full space-x-4 mobile:space-x-2">
                            {/* Tab 1 */}
                            <div
                                onClick={() => setActiveTab('category')}
                                className={`cursor-pointer select-none rounded-lg bg-white px-3 py-1 mobile:px-1 mobile:py-0.5 ${
                                    activeTab === 'category'
                                        ? 'inner-shadow-active'
                                        : 'inner-shadow-deactive'
                                }`}
                            >
                                <span
                                    className={`flex items-center space-x-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path d="M10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
                                    </svg>
                                    <span className="capitalize">
                                        Kategorya
                                    </span>
                                </span>
                            </div>
                            {/* Tab 2 */}
                            <div
                                onClick={() => setActiveTab('level')}
                                className={`cursor-pointer select-none rounded-lg bg-white px-3 py-1 mobile:px-1 mobile:py-0.5 ${
                                    activeTab === 'level'
                                        ? 'inner-shadow-active'
                                        : 'inner-shadow-deactive'
                                }`}
                            >
                                <span
                                    className={`flex items-center space-x-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="#FFD568"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path d="M6 13H2a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1v-8a1 1 0 00-1-1zm-1 8H3v-6h2zM22 9h-4a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V10a1 1 0 00-1-1zm-1 12h-2V11h2zM14 1h-4a1 1 0 00-1 1v20a1 1 0 001 1h4a1 1 0 001-1V2a1 1 0 00-1-1zm-1 20h-2V3h2z" />
                                    </svg>
                                    <span className="capitalize">
                                        Leaderboard
                                    </span>
                                </span>
                            </div>
                        </div>
                        {activeTab === 'category' ? (
                            <div className="flex w-full flex-col gap-5 overflow-auto rounded-lg bg-white px-4 py-3 shadow-[inset_0_0px_4px_rgba(0,0,0,1)]">
                                <div className="h-20 flex-shrink-0 rounded-lg border-4 border-green-700 px-2 py-1">
                                    {preschooler
                                        ? `${preschooler.achievements[0]}`
                                        : 'N/A'}
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full flex-col gap-5 overflow-auto rounded-lg bg-white px-4 py-3 shadow-[inset_0_0px_4px_rgba(0,0,0,1)]">
                                <div className="h-20 flex-shrink-0 rounded-lg border-4 border-red-700 px-2 py-1">
                                    {preschooler
                                        ? `${preschooler.points}`
                                        : 'N/A'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalProfile
