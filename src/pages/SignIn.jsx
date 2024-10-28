import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link, useNavigate } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import { app } from '../firebaseConfig'
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore'

const SignIn = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        document.title = 'MoTeRole - Sign in'
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage('')

        const email = event.target['signup-email'].value.trim() // Trim whitespace
        const username = event.target['signup-username'].value.trim() // Trim whitespace
        const password = event.target['signup-password'].value.trim() // Trim whitespace

        console.log('Email:', email)
        console.log('Username:', username)
        console.log('Password:', password)

        try {
            const db = getFirestore(app)
            const accountHoldersRef = collection(db, 'AccountHolder')
            const preschoolersRef = collection(db, 'Preschooler')

            const q = query(accountHoldersRef, where('Email', '==', email))
            const accountHolderSnapshot = await getDocs(q)

            console.log('AccountHolder Snapshot:', accountHolderSnapshot)

            if (accountHolderSnapshot.empty) {
                setErrorMessage('Incorrect Email, Username or Password')
                return
            }

            const accountHolderId = accountHolderSnapshot.docs[0].id

            const preschoolerQ = query(
                preschoolersRef,
                where('Username', '==', username),
                where('Password', '==', password),
                where('AccountHolderId', '==', accountHolderId),
            )
            const preschoolerSnapshot = await getDocs(preschoolerQ)

            console.log('Preschooler Snapshot:', preschoolerSnapshot)

            if (preschoolerSnapshot.empty) {
                setErrorMessage('Incorrect Email, Username or Password')
                return
            }

            navigate('/menu')
        } catch (error) {
            console.error('Error signing in:', error)
            setErrorMessage('An error occurred. Please try again later.')
        }
    }

    return (
        <>
            <Background />
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
                    <div className="relative flex h-[50%] w-[70%] flex-col items-center rounded-3xl border-8 border-grape bg-white bg-opacity-30 p-10 mobile:h-[60%] mobile:rounded-xl mobile:border-4 mobile:p-4 ipad:h-[40%] ipad:p-6">
                        <form
                            onSubmit={handleSubmit}
                            className="flex h-full w-full flex-col items-center justify-evenly space-y-4 font-nunito text-3xl font-black text-black mobile:text-2xl"
                        >
                            <input
                                type="email"
                                name="signup-email"
                                id="sigin-email"
                                placeholder="Email"
                                className="h-1/3 w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                            />
                            <input
                                type="text"
                                name="signup-username"
                                id="sigin-username"
                                placeholder="Username"
                                className="h-1/3 w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                            />
                            <input
                                type="password"
                                name="signup-password"
                                id="sigin-password"
                                placeholder="Password"
                                className="h-1/3 w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                            />

                            <button
                                type="submit"
                                className="text-shadow flex h-full w-1/3 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                            >
                                Sign In
                            </button>
                        </form>

                        {errorMessage && (
                            <div className="absolute -bottom-14 text-center font-bold text-red-500">
                                {errorMessage}
                            </div>
                        )}

                        <div className="absolute -bottom-20 flex h-14 w-[100%] justify-evenly space-x-4 text-4xl mobile:-bottom-12 mobile:h-10 mobile:text-xl ipad:-bottom-20 ipad:text-3xl">
                            <Link
                                to="/signup"
                                className="text-shadow flex h-full w-1/3 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                            >
                                Sign Up
                            </Link>
                        </div>
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

export default SignIn
