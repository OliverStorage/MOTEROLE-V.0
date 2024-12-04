import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link, useNavigate } from 'react-router-dom'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import { db } from '../firebaseConfig'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import TermsConditions from '../components/TermsConditions'

const SignUp = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [showTerms, setShowTerms] = useState(true) // State to manage Terms Modal visibility
    const [canProceed, setCanProceed] = useState(false) // State to track "Magpatuloy" button

    useEffect(() => {
        document.title = 'MoTeRole - Sign Up'
    })

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        username: '',
        gender: 'Male',
        email: '',
        password: '',
        achievements: '',
        points: 0,
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        // Capitalize the first letter for specific fields
        const capitalizeValue = (str) =>
            str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

        setForm({
            ...form,
            [name]:
                name === 'firstname' || name === 'lastname' || name === 'gender'
                    ? capitalizeValue(value)
                    : value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Query Firestore to check if there is already a user with the same username and email
            const duplicateQuery = query(
                collection(db, 'Preschooler'),
                where('email', '==', form.email), // Check for same email
                where('username', '==', form.username), // Check for same username under the same email
            )
            const duplicateSnapshot = await getDocs(duplicateQuery)

            // If there's an account with the same username and email, show an error
            if (!duplicateSnapshot.empty) {
                setErrorMessage(
                    'An account with this username already exists for this email.',
                )
                console.log(
                    'An account with this username already exists for this email.',
                )
                return
            }

            // Check if AccountHolder exists
            const accountHolderQuery = query(
                collection(db, 'AccountHolder'),
                where('Email', '==', form.email),
            )
            const accountHolderSnapshot = await getDocs(accountHolderQuery)

            let accountHolderId

            if (accountHolderSnapshot.empty) {
                // Create a new AccountHolder if it doesn't exist
                const newAccountHolder = await addDoc(
                    collection(db, 'AccountHolder'),
                    {
                        Email: form.email,
                    },
                )
                accountHolderId = newAccountHolder.id
            } else {
                // Use the existing AccountHolderId
                accountHolderId = accountHolderSnapshot.docs[0].id
            }

            // Add a new Preschooler linked to the AccountHolder
            await addDoc(collection(db, 'Preschooler'), {
                AccountHolderId: accountHolderId,
                firstname: form.firstname,
                lastname: form.lastname,
                email: form.email,
                gender: form.gender,
                username: form.username,
                password: form.password,
                points: 0,
                achievements: [],
                profileImage: '',
            })

            console.log('User registered successfully!')
            setForm({
                firstname: '',
                lastname: '',
                username: '',
                gender: '',
                email: '',
                password: '',
            })
            setErrorMessage('Signup Successful')
            navigate('/signin')
        } catch (error) {
            console.error('Error adding document: ', error)
            setErrorMessage(
                'An error occurred while signing up. Please try again.',
            )
            console.log('An error occurred while signing up. Please try again.')
        }
    }

    return (
        <>
            <Background />
            {showTerms && (
                <TermsConditions
                    isOpen={showTerms}
                    onAccept={() => {
                        setShowTerms(false) // Close the modal
                        setCanProceed(true) // Allow form interactions
                    }}
                    onDecline={() => {
                        // Navigate away or handle decline
                        navigate('/signin')
                    }}
                />
            )}
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-end">
                    <FullScreen />
                </div>
                {/* center */}
                <div className="-mt-12 flex w-full flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-8 mobile:space-y-3">
                    <div className="text-shadow text-8xl mobile:text-5xl ipad:text-7xl">
                        MoTeRole
                    </div>
                    <div className="relative flex h-[50%] w-[70%] flex-col items-center rounded-3xl border-8 border-grape bg-white bg-opacity-30 px-10 py-5 text-3xl mobile:h-[60%] mobile:rounded-xl mobile:border-4 mobile:p-4 mobile:px-4 mobile:py-1 mobile:text-base ipad:h-[40%] ipad:px-6 ipad:py-4 ipad:text-xl">
                        <form
                            onSubmit={handleSubmit}
                            className="flex h-full w-full flex-col items-center justify-between space-y-2 font-nunito font-black text-black mobile:space-y-2"
                        >
                            <span className="flex w-full justify-start pl-4 text-base text-gray-500 mobile:text-xs">
                                STUDENT
                            </span>
                            <div className="flex h-full w-full justify-center space-x-4">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    value={form.firstname}
                                    onChange={handleChange}
                                    className="h-full w-full rounded-2xl border-4 border-grape px-4 capitalize focus:outline-0 mobile:rounded-xl"
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    value={form.lastname}
                                    onChange={handleChange}
                                    className="h-full w-full rounded-2xl border-4 border-grape px-4 capitalize focus:outline-0 mobile:rounded-xl"
                                    required
                                />
                            </div>

                            <div className="flex h-full w-full space-x-4">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className="h-full w-1/2 rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                    autoComplete="username"
                                    required
                                />
                                <div className="flex w-1/2 justify-evenly">
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="radio"
                                            name="genger"
                                            value={form.gender === 'Female'}
                                            className="h-8 w-8 border-4 border-grape px-4 focus:outline-0 mobile:h-4 mobile:w-4 mobile:rounded-xl"
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            defaultChecked
                                            type="radio"
                                            name="genger"
                                            value={form.gender === 'Male'}
                                            className="h-8 w-8 border-4 border-grape px-4 focus:outline-0 mobile:h-4 mobile:w-4 mobile:rounded-xl"
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                </div>
                            </div>

                            <span className="flex w-full justify-start pl-4 text-base text-gray-500 mobile:text-xs">
                                TEACHER/GUARDIAN
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                autoComplete="email"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                autoComplete="new-password"
                                required
                            />
                            {/* Sign Up button inside the form */}
                            <div className="absolute -bottom-20 flex h-14 w-[80%] justify-evenly space-x-4 text-4xl text-white mobile:-bottom-12 mobile:h-10 mobile:text-xl ipad:-bottom-20 ipad:text-3xl">
                                <Link
                                    to="/signin"
                                    className="text-shadow flex h-full w-1/2 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                                >
                                    Sign In
                                </Link>
                                <button
                                    type="submit"
                                    className="text-shadow flex h-full w-1/2 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        {errorMessage && (
                            <div className="absolute -top-9 z-[100] w-full text-center text-base font-normal text-white mobile:-top-6 ipad:-top-8">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </div>

                {/* right column */}
                <div className="w-1/10 mobile:space-y- flex select-none flex-col space-y-4 opacity-0">
                    <Actionbtn
                        text=""
                        to="/settings"
                        bgColor="#AB47BC"
                        disabled={true}
                        icon={PiGearSixBold}
                    />
                    <Actionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        disabled={true}
                        icon={IoBulbOutline}
                    />
                </div>
            </div>
        </>
    )
}

export default SignUp
