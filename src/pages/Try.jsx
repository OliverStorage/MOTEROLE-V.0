import React, { useEffect, useState } from 'react'
import { LuArrowBigLeft } from 'react-icons/lu'
import { app } from '../firebaseConfig'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FaEdit } from 'react-icons/fa'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig' // Ensure the db is correctly imported

const ModalProfile = ({ onClose, userId }) => {
    const [activeTab, setActiveTab] = useState('category')
    const [profileImage, setProfileImage] = useState('') // State for profile image
    const [uploading, setUploading] = useState(false) // State for upload status
    const [userProfile, setUserProfile] = useState(null) // State for user profile data
    const storage = getStorage(app)

    useEffect(() => {
        document.title = 'MoteRole - Profile'
        if (userId) {
            fetchUserProfile(userId) // Fetch user profile on component load
        }
    }, [userId])

    const fetchUserProfile = async (userId) => {
        try {
            const docRef = doc(db, 'Preschooler', userId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setUserProfile(docSnap.data())
            } else {
                console.log('No such document!')
            }
        } catch (error) {
            console.error('Error fetching user profile:', error)
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

    return (
        <>
            <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-bubbles font-normal">
                <div className="text-shadow relative flex h-[80%] w-[60%] flex-col items-center gap-4 rounded-3xl border-8 border-modalbrowndark bg-cheese p-4 px-6 text-5xl text-white mobile:h-[80%] mobile:w-1/2 mobile:gap-0 mobile:p-2 mobile:text-xl ipad:w-[70%] ipad:text-3xl">
                    <div className="absolute -left-6 -top-6 z-50 mobile:-right-5 mobile:-top-5 ipad:-right-7">
                        <button className="action-btn flex cursor-pointer items-center justify-center rounded-xl bg-[#F40000] text-center">
                            <LuArrowBigLeft
                                onClick={onClose}
                                className="size-12 mobile:size-10 ipad:size-14"
                            />
                        </button>
                    </div>

                    <div className="text-outline tracking-wide">My Profile</div>
                    <div className="flex w-full items-center gap-3 text-3xl mobile:gap-1 mobile:text-sm ipad:text-2xl">
                        <div className="relative flex w-[20%] items-end">
                            {/* Make this img changable  */}
                            <img
                                src={
                                    profileImage ||
                                    userProfile?.ImageProfile ||
                                    '/default-profile.png'
                                }
                                alt="user.png"
                                className="h-[100px] w-[100px] rounded-full object-center border-4 border-bluesky text-base mobile:h-[60px] mobile:w-[60px] ipad:h-[90px] ipad:w-[90px]"
                            />
                            <div className="flex">
                                <label
                                    htmlFor="userProfileImage"
                                    className="mobile:size-5 ipad:size-7"
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
                                    <span>
                                        {userProfile?.Username || 'Loading...'}
                                    </span>
                                </div>
                                <div className="flex gap-3 mobile:gap-1">
                                    Pangalan:
                                    <span>
                                        {userProfile?.Firstname +
                                            ' ' +
                                            userProfile?.Lastname ||
                                            'Loading...'}
                                    </span>
                                </div>
                                <div className="flex gap-3 mobile:gap-1">
                                    Email:
                                    <span>
                                        {userProfile?.Email || 'Loading...'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                                <button className="inner-shadow-deactive rounded-xl bg-back px-3 py-1 duration-100 active:translate-y-1 active:drop-shadow-[0px_0px_0px_#000000]">
                                    <span className="text-outline flex items-center justify-center text-xl mobile:text-xs">
                                        Logout
                                    </span>
                                </button>
                                <div className="text-outline flex gap-3 mobile:gap-1">
                                    Gender:{' '}
                                    <span>
                                        {userProfile?.Gender || 'Loading...'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tab */}
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
                                    <span>Kategorya</span>
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
                                        <path d="M6 13H2a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1v-8a1 1 0 00-1-1zM3 21V15h2v6H3zm12 0h-4a1 1 0 01-1-1v-8a1 1 0 011-1h4a1 1 0 011 1v8a1 1 0 01-1 1zm-3-8v6h2v-6h-2zm6-6h-4a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V7a1 1 0 00-1-1zm-3 6V8h4v4h-4z" />
                                    </svg>
                                    <span>Level</span>
                                </span>
                            </div>
                        </div>
                        {/* Tab content here based on activeTab */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalProfile
