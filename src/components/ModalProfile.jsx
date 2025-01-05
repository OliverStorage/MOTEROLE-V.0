import React, { useEffect, useState, useRef } from 'react'
import { LuArrowBigLeft } from 'react-icons/lu'
import { FaEdit } from 'react-icons/fa'
import { app, db } from '../firebaseConfig'
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage'

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ModalProfile = ({ onClose }) => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('category')
    const [profileImage, setProfileImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [preschooler, setPreschooler] = useState(null)
    const [editProfile, setEditProfile] = useState(false)
    const [infoEdit, setInfoEdit] = useState(false)
    const storage = getStorage(app)

    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('Male')

    const [errorMessage, setErrorMessage] = useState('')

    let editProfileRef = useRef()

    useEffect(() => {
        document.title = 'MoteRole - Profile'

        // Close edit mode when clicking outside the profile section
        const handler = (e) => {
            if (
                editProfileRef.current &&
                !editProfileRef.current.contains(e.target)
            ) {
                setEditProfile(false)
            }
        }
        document.addEventListener('mousedown', handler)

        // Fetch logged-in user from cookies
        const storedUser = Cookies.get('loggedInUser') // Retrieve user from cookies
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
            console.warn('No logged-in user found in cookies')
            navigate('/signin') // Redirect to sign-in page if no user found
        }

        // Initialize form fields only when entering edit mode
        if (infoEdit) {
            setUsername((prev) =>
                prev !== '' ? prev : preschooler?.username || '',
            )
            setFirstname((prev) =>
                prev !== '' ? prev : preschooler?.firstname || '',
            )
            setLastname((prev) =>
                prev !== '' ? prev : preschooler?.lastname || '',
            )
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [navigate, infoEdit]) // Removed `preschooler` dependency

    const fetchPreschooler = async (accountHolderId, username) => {
        try {
            const userQuery = query(
                collection(db, 'Preschooler'),
                where('AccountHolderId', '==', accountHolderId),
                where('username', '==', username),
            )
            const userSnapshot = await getDocs(userQuery)

            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0]
                const profileImgUrl = userDoc.data().profileImage || ''

                // If no profile image is found, set the default profile image
                setProfileImage(
                    profileImgUrl ||
                        (await getDownloadURL(
                            ref(storage, 'profileImages/default-profile.png'),
                        )),
                )

                setPreschooler({ id: userDoc.id, ...userDoc.data() })
            } else {
                //make this work, if the document field is not empty but not showing hte image, make the default-profile.png show
                setProfileImage(
                    await getDownloadURL(
                        ref(storage, 'profileImages/default-profile.png'),
                    ),
                )
                console.log('No user data found')
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        try {
            if (loggedInUser && preschooler) {
                // Construct the filename using email and username
                const filename = `${loggedInUser.email}-${preschooler.username}`
                const storageRef = ref(storage, `profileImages/${filename}`)

                // Upload the file to Firebase Storage
                await uploadBytes(storageRef, file)
                console.log('Image uploaded successfully')

                // Get the download URL and set it as the profile image
                const downloadURL = await getDownloadURL(storageRef)
                setProfileImage(downloadURL)

                // Optionally, update the user's profileImage field in Firestore
                await updateDoc(doc(db, 'Preschooler', preschooler.id), {
                    profileImage: downloadURL,
                })
                setEditProfile(false)
                console.log('Profile image URL updated in Firestore')
            } else {
                console.warn('User or preschooler data is missing')
            }
        } catch (error) {
            console.error('Error uploading the image:', error)
        }
    }

    const handleRemoveImage = async (imagePath) => {
        try {
            if (!profileImage || profileImage.includes('default-profile.png')) {
                // Check if the image is already removed or set to the default
                console.log('Image is already removed.')
                setErrorMessage('Image already removed')
                return
            }

            if (loggedInUser && preschooler) {
                // Construct the image reference
                const imageRef = ref(storage, imagePath)

                // Delete the image from Firebase Storage
                await deleteObject(imageRef)
                console.log('Profile image removed from Firebase Storage')

                // Update Firestore to remove the profileImage field
                await updateDoc(doc(db, 'Preschooler', preschooler.id), {
                    profileImage: '', // Remove the profile image link
                })

                // Reset the profile image to the default
                setProfileImage(
                    await getDownloadURL(
                        ref(storage, 'profileImages/default-profile.png'),
                    ),
                )
                setEditProfile(false)
                console.log('Profile image URL removed from Firestore')
            } else {
                console.warn('User or preschooler data is missing')
            }
        } catch (error) {
            if (error.code === 'storage/object-not-found') {
                // Handle the case when the image is already removed
                console.log(
                    'Image already removed or not found in Firebase Storage.',
                )
            } else {
                // General error handling for other cases
                console.error('Error removing the image:', error)
            }
        }
    }

    const handleSave = async () => {
        try {
            // Capitalize firstname and lastname for consistent formatting
            const capitalizedFirstname =
                firstname.charAt(0).toUpperCase() +
                firstname.slice(1).toLowerCase()
            const capitalizedLastname =
                lastname.charAt(0).toUpperCase() +
                lastname.slice(1).toLowerCase()

            const normalizedEmail = preschooler.email // Email remains case-insensitive

            console.log('Current Username: ', preschooler.username)
            console.log('New Username: ', username)

            // Check if any changes have been made
            const isUsernameChanged = username !== preschooler.username // Compare original values
            const isFirstnameChanged =
                capitalizedFirstname !== preschooler.firstname
            const isLastnameChanged =
                capitalizedLastname !== preschooler.lastname
            const isGenderChanged = gender !== preschooler.gender
            const isProfileImageChanged =
                profileImage !== preschooler.profileImage

            const noChanges =
                !isUsernameChanged &&
                !isFirstnameChanged &&
                !isLastnameChanged &&
                !isGenderChanged &&
                !isProfileImageChanged

            if (noChanges) {
                console.log('No changes detected.')
                setErrorMessage('Nothing changed in the information.')
                return // Exit the function without saving
            }

            // Check for duplicate usernames for the same email
            const duplicateQuery = query(
                collection(db, 'Preschooler'),
                where('email', '==', normalizedEmail),
            )
            const duplicateSnapshot = await getDocs(duplicateQuery)

            const isDuplicateUsername = duplicateSnapshot.docs.some((doc) => {
                const docData = doc.data()
                return (
                    doc.id !== preschooler.id && // Exclude the current user's document
                    docData.username === username // Compare original values without altering case
                )
            })

            if (isDuplicateUsername) {
                console.warn(
                    `Duplicate username detected: "${username}" already exists for email "${preschooler.email}". Changes not saved.`,
                )
                setErrorMessage(
                    `Duplicate username detected: "${username}" already exists for email "${preschooler.email}". Please choose a unique username.`,
                )
                return // Exit the function if a duplicate username is found
            }

            // Update Firestore with the new values
            await updateDoc(doc(db, 'Preschooler', preschooler.id), {
                username,
                firstname: capitalizedFirstname,
                lastname: capitalizedLastname,
                gender,
                profileImage, // Ensure the new profile image is saved
            })

            console.log('Profile updated successfully')

            // Update the local state
            setPreschooler({
                ...preschooler,
                username,
                firstname: capitalizedFirstname,
                lastname: capitalizedLastname,
                gender,
                profileImage,
            })

            // Update the cookies
            const updatedUser = {
                ...loggedInUser,
                username,
                firstname: capitalizedFirstname,
                lastname: capitalizedLastname,
                gender,
            }
            Cookies.set('loggedInUser', JSON.stringify(updatedUser))

            setErrorMessage('Profile updated successfully.')
            setInfoEdit(false)
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    const handleLogout = () => {
        Cookies.remove('userSession')
        Cookies.remove('loggedInUser') // Remove logged-in user cookie
        console.log('Logout successful')
        navigate('/signin') // Redirect to sign-in
    }

    return (
        <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-bubbles font-normal">
            <div className="ipad:w-[70%] ipad:text-3xl relative flex h-[80%] w-[60%] flex-col items-center gap-4 rounded-3xl border-8 border-modalbrowndark bg-cheese p-4 px-6 text-5xl text-white mobile:h-[80%] mobile:w-[60%] mobile:gap-0 mobile:border-[6px] mobile:p-2 mobile:text-xl">
                <div className="ipad:-right-7 absolute -left-6 -top-6 z-50 mobile:-right-5 mobile:-top-5">
                    <button className="action-btn flex cursor-pointer items-center justify-center rounded-xl bg-[#F40000] text-center">
                        <LuArrowBigLeft
                            onClick={onClose}
                            className="ipad:size-14 size-12 mobile:size-10"
                        />
                    </button>
                </div>
                {errorMessage && (
                    <div className="ipad:-top-8 absolute -top-0 z-[100] w-full text-center text-base font-normal text-white mobile:-top-6">
                        {errorMessage}
                    </div>
                )}
                <div className="text-outline tracking-wide">My Profile</div>
                <div className="ipad:gap-2 ipad:text-2xl flex w-full items-center gap-1 text-3xl mobile:gap-1 mobile:text-sm">
                    <div className="ipad:w-[20%] relative flex w-[19%] items-start">
                        <div className="ipad:h-[85px] ipad:w-[85px] h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-bluesky object-center text-base mobile:h-[60px] mobile:w-[60px]">
                            <img
                                src={profileImage}
                                alt="user"
                                className="flex h-full w-full items-center justify-end"
                            />
                        </div>
                        <div ref={editProfileRef} className="relative flex">
                            {infoEdit ? (
                                <>
                                    <span className="ipad:size- mobile:size-5">
                                        <FaEdit
                                            className="h-full w-full cursor-pointer"
                                            //onClick={handleEditClick}
                                            onClick={() => {
                                                setEditProfile(!editProfile)
                                            }}
                                        />
                                    </span>
                                    {editProfile && (
                                        <div className="ipad:-bottom-[55px] ipad:-right-[100px] absolute -bottom-[54px] -right-[94px] z-50 flex w-56 rounded-xl border-4 border-black bg-white text-base text-black mobile:-bottom-[45px] mobile:-right-[100px] mobile:border-2">
                                            <div className="relative flex w-full items-center justify-evenly">
                                                <div className="absolute -top-5 h-0 w-0 border-b-[16px] border-l-[15px] border-r-[15px] border-solid border-b-[#000] border-l-transparent border-r-transparent mobile:-top-4" />
                                                <label
                                                    htmlFor="userProfileImage"
                                                    className="flex cursor-pointer items-center justify-center space-x-1 p-1 mobile:p-0.5"
                                                >
                                                    <svg
                                                        viewBox="0 0 1024 1024"
                                                        fill="currentColor"
                                                        height="1em"
                                                        width="1em"
                                                    >
                                                        <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                                                    </svg>
                                                    <span>Change</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        className="hidden"
                                                        id="userProfileImage"
                                                        disabled={uploading}
                                                    />
                                                </label>

                                                <span
                                                    onClick={() =>
                                                        handleRemoveImage(
                                                            preschooler.profileImage,
                                                        )
                                                    }
                                                    className="flex cursor-pointer items-center justify-center space-x-1 p-1 mobile:p-0.5"
                                                >
                                                    <svg
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        height="1em"
                                                        width="1em"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M8 11a1 1 0 100 2h8a1 1 0 100-2H8z"
                                                        />
                                                        <path
                                                            fill="currentColor"
                                                            fillRule="evenodd"
                                                            d="M1 5a4 4 0 014-4h14a4 4 0 014 4v14a4 4 0 01-4 4H5a4 4 0 01-4-4V5zm4-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span>Remove</span>
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="text-outline flex flex-col justify-between">
                            <div className="flex gap-3 mobile:gap-1">
                                <span className="select-none">Username:</span>
                                {infoEdit ? (
                                    <input
                                        className="w-[240px] rounded-md border px-1 text-black focus:outline-none"
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                ) : (
                                    <span className="">
                                        {preschooler?.username || 'N/A'}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-3 mobile:gap-1">
                                <span className="select-none">Pangalan:</span>
                                {infoEdit ? (
                                    <div className="flex space-x-2">
                                        <input
                                            className="w-[120px] rounded-md border px-1 capitalize text-black focus:outline-none"
                                            type="text"
                                            value={firstname}
                                            onChange={(e) =>
                                                setFirstname(e.target.value)
                                            }
                                            onBlur={() =>
                                                setFirstname(
                                                    firstname
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        firstname
                                                            .slice(1)
                                                            .toLowerCase(),
                                                )
                                            }
                                        />
                                        <input
                                            className="w-[120px] rounded-md border px-1 capitalize text-black focus:outline-none"
                                            type="text"
                                            value={lastname}
                                            onChange={(e) =>
                                                setLastname(e.target.value)
                                            }
                                            onBlur={() =>
                                                setLastname(
                                                    lastname
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        lastname
                                                            .slice(1)
                                                            .toLowerCase(),
                                                )
                                            }
                                        />
                                    </div>
                                ) : (
                                    <span className="capitalize">
                                        {preschooler
                                            ? `${preschooler.firstname} ${preschooler.lastname}`
                                            : 'N/A'}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-3 mobile:gap-1">
                                <span className="select-none">Email:</span>
                                <span className="">
                                    {preschooler?.email || 'N/A'}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                            <div className="flex space-x-2">
                                {infoEdit ? (
                                    <button
                                        onClick={() => setInfoEdit(!infoEdit)}
                                        className="inner-shadow-deactive flex items-center rounded-xl bg-back px-3 py-1 duration-100 active:translate-y-1"
                                    >
                                        <span>Cancel</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setInfoEdit(!infoEdit)}
                                        className="inner-shadow-deactive flex items-center rounded-xl bg-applegreen px-3 py-1 duration-100 active:translate-y-1"
                                    >
                                        <FaEdit className="ipad:size-7 mr-1 size-9 mobile:size-4" />
                                        <span>Edit</span>
                                    </button>
                                )}
                                {infoEdit ? (
                                    <button
                                        onClick={handleSave}
                                        className="inner-shadow-deactive rounded-xl bg-applegreen px-3 py-1 duration-100 active:translate-y-1"
                                    >
                                        <span>Save</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="inner-shadow-deactive rounded-xl bg-back px-3 py-1 duration-100 active:translate-y-1"
                                    >
                                        <span>Logout</span>
                                    </button>
                                )}
                            </div>

                            <div className="text-outline flex gap-3 mobile:gap-1">
                                Gender:
                                {infoEdit ? (
                                    <select
                                        className="rounded-md border capitalize text-black focus:outline-none"
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                ) : (
                                    <span className="capitalize">
                                        {preschooler?.gender || 'N/A'}
                                    </span>
                                )}
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
                                <span className="capitalize">Kategorya</span>
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
                                <span className="capitalize">Leaderboard</span>
                            </span>
                        </div>
                    </div>
                    {activeTab === 'category' ? (
                        <div className="overflow-y-auto">
                            {preschooler &&
                            preschooler.achievements &&
                            preschooler.achievements.length > 0
                                ? preschooler.achievements.map(
                                      (achievement, index) => (
                                          <div
                                              key={index}
                                              className="mb-3 flex w-full flex-col overflow-auto rounded-lg bg-white px-4 py-3 shadow-[inset_0_0px_4px_rgba(0,0,0,1)]"
                                          >
                                              <div className="h-20 flex-shrink-0 rounded-lg border-4 border-green-700 px-2 py-1 mobile:h-12">
                                                  {achievement}
                                              </div>
                                          </div>
                                      ),
                                  )
                                : 'N/A'}
                        </div>
                    ) : (
                        <div className="mb-3 flex w-full flex-col overflow-auto rounded-lg bg-white px-4 py-3 shadow-[inset_0_0px_4px_rgba(0,0,0,1)]">
                            <div className="flex h-20 flex-shrink-0 space-x-3 rounded-lg border-4 border-red-700 px-2 py-1 mobile:h-12">
                                <span>1st</span>
                                <span>Oliver Molina</span>
                                <div className="text-black">
                                    {preschooler
                                        ? `${preschooler.points}`
                                        : 'N/A'}
                                </div>
                                <span>Pts</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ModalProfile
