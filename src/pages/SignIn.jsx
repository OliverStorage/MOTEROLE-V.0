import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link, useNavigate } from 'react-router-dom'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import { db } from '../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'
import Cookies from 'js-cookie'
import { throttle, debounce } from '../utils' // Adjust the path if necessary

const SignIn = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [isNavigating, setIsNavigating] = useState(false)

    // Check for a logged-in user in cookies on component mount
    useEffect(() => {
        document.title = 'MoTeRole - Sign in'
        const storedUser = Cookies.get('loggedInUser')
        const userSession = Cookies.get('userSession') // Get the cookie
        if (storedUser && userSession) {
            navigate('/menu') // Redirect to menu if logged in
        }
    }, [navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prevForm) => ({ ...prevForm, [name]: value })) // Update state immediately
        setErrorMessage('') // Clear error messages
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (isNavigating) return // Prevent repeated navigation
        setIsNavigating(true)
        setErrorMessage('') // Clear previous error messages

        // Input validation
        if (!form.email || !form.username || !form.password) {
            setErrorMessage('All fields are required.')
            setIsNavigating(false)
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            setErrorMessage('Please enter a valid email address.')
            setIsNavigating(false)
            return
        }

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
                    // Store the logged-in user in cookies
                    Cookies.set('loggedInUser', JSON.stringify(user), {
                        expires: 365, // Cookie expires in 365 days
                        secure: true, // Ensure secure storage
                        sameSite: 'Strict', // Prevent CSRF attacks
                    })
                    Cookies.set('userSession', 'active', {
                        expires: 365,
                        secure: true,
                        sameSite: 'Strict',
                    })

                    console.log('Login successful')
                    navigate('/menu') // Redirect to menu after successful login
                } else {
                    setErrorMessage('Invalid username or password.')
                    console.log('Invalid username or password.')
                }
            } else {
                setErrorMessage('No account associated with this email.')
                console.log('No account associated with this email.')
            }
        } catch (error) {
            if (error.message.includes('network')) {
                setErrorMessage('Network error. Please try again.')
            } else {
                setErrorMessage('An unexpected error occurred during login.')
            }
            console.error('Error logging in: ', error)
        } finally {
            setIsNavigating(false) // Reset navigation lock
        }
        console.log('Login attempt finished')
    }

    // Throttle function to limit the rate at which a function is invoked and clear cookies if throttled
    const throttledLogin = throttle(handleLogin, 2000, 'userSession') // Limit to once every 2 seconds, 'userSession' is the cookie key to clear and refresh

    // Debounced change handler to minimize the number of calls to handleChange
    const debouncedChangeHandler = debounce(handleChange, 300)
    return (
        <>
            <Background />
            <div className="relative flex h-screen justify-between p-5">
                {/* Left Column */}
                <div className="w-1/10 flex flex-col justify-end">
                    <FullScreen />
                </div>
                {/* Center */}
                <div className="relative -mt-12 flex w-full flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-8 mobile:space-y-3">
                    <div className="text-shadow w-full text-center text-8xl mobile:text-5xl ipad:text-7xl">
                        MoTeRole
                    </div>
                    <div className="relative flex h-[50%] w-[70%] flex-col items-center rounded-3xl border-8 border-grape bg-white bg-opacity-30 p-10 mobile:h-[60%] mobile:rounded-xl mobile:border-4 mobile:p-4 ipad:h-[40%] ipad:p-6">
                        <form
                            onSubmit={throttledLogin}
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
                                <Link
                                    to="/signup"
                                    className="text-shadow flex h-full w-1/2 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                                >
                                    Sign Up
                                </Link>
                                <button
                                    type="submit"
                                    className="text-shadow flex h-full w-1/2 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                                >
                                    Sign In
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
                {/* Right Column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 opacity-0">
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
