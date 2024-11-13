import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link, useNavigate } from 'react-router-dom'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import { db } from '../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

const SignIn = () => {
    const navigate = useNavigate()
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    // Check for a logged-in user in localStorage on component mount
    useEffect(() => {
        document.title = 'MoTeRole - Sign in'
        const storedUser = localStorage.getItem('loggedInUser')
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser))
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        setErrorMessage('') // Reset error message on input change
    }

   const handleLogin = async (e) => {
       e.preventDefault()
       setErrorMessage('') // Clear previous error messages

       try {
           // Query to find AccountHolder by email
           const accountHolderQuery = query(
               collection(db, 'AccountHolder'),
               where('Email', '==', form.email),
           )
           const accountHolderSnapshot = await getDocs(accountHolderQuery)

           if (!accountHolderSnapshot.empty) {
               const accountHolderId = accountHolderSnapshot.docs[0].id
               // Query to find user by AccountHolderId, username, and password
               const userQuery = query(
                   collection(db, 'Preschooler'),
                   where('AccountHolderId', '==', accountHolderId),
                   where('username', '==', form.username),
                   where('password', '==', form.password),
               )

               const userSnapshot = await getDocs(userQuery)
               if (!userSnapshot.empty) {
                   const user = userSnapshot.docs[0].data()
                   setLoggedInUser(user)
                   // Store the logged-in user in localStorage
                   localStorage.setItem('loggedInUser', JSON.stringify(user))
                   console.log('Login successful')
                   navigate('/menu')
               } else {
                   setErrorMessage('Invalid username or password.')
                   console.log('Invalid username or password.')
               }
           } else {
               setErrorMessage('No account associated with this email.')
               console.log('No account associated with this email.')
           }
       } catch (error) {
           console.error('Error logging in: ', error)
           setErrorMessage('An error occurred during login. Please try again.')
       }
   }


    const handleLogout = () => {
        setLoggedInUser(null)
        localStorage.removeItem('loggedInUser')
    }

    return (
        <>
            <Background />
            <div className="relative flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-end">
                    <FullScreen />
                </div>
                {/* center */}
                <div className="relative -mt-12 flex w-full flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-8 mobile:space-y-3">
                    <div className="text-shadow w-full text-center text-8xl mobile:text-5xl ipad:text-7xl">
                        MoTeRole
                    </div>
                    <div className="relative flex h-[50%] w-[70%] flex-col items-center rounded-3xl border-8 border-grape bg-white bg-opacity-30 p-10 mobile:h-[60%] mobile:rounded-xl mobile:border-4 mobile:p-4 ipad:h-[40%] ipad:p-6">
                        <form
                            onSubmit={handleLogin}
                            className="flex h-full w-full flex-col items-center justify-evenly space-y-4 font-nunito text-3xl font-black text-black mobile:text-2xl"
                        >
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="h-1/3 w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                autoComplete="email"
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                className="h-1/3 w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                autoComplete="username"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="h-1/3 w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                autoComplete="current-password"
                                required
                            />

                            <div className="absolute -bottom-20 flex h-14 w-[80%] justify-evenly space-x-4 text-4xl text-white mobile:-bottom-12 mobile:h-10 mobile:text-xl ipad:-bottom-20 ipad:text-3xl">
                                <button
                                    type="submit"
                                    className="text-shadow flex h-full w-1/2 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                                >
                                    Sign In
                                </button>
                                <Link
                                    to="/signup"
                                    className="text-shadow flex h-full w-1/2 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </form>
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
