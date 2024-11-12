import React, { useState, useEffect } from 'react'
import {app,db} from '../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

const Signin = () => {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    })
    const [loggedInUser, setLoggedInUser] = useState(null)

    // Check for a logged-in user in localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser')
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser))
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()

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
                    alert('Login successful')
                } else {
                    alert('Invalid login credentials')
                }
            } else {
                alert('No account associated with this email')
            }
        } catch (error) {
            console.error('Error logging in: ', error)
        }
    }

    const handleLogout = () => {
        setLoggedInUser(null)
        localStorage.removeItem('loggedInUser')
    }

    return (
        <div>
            {!loggedInUser ? (
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
            ) : (
                <div>
                    <h2>Welcome, {loggedInUser.username}!</h2>
                    <p>First Name: {loggedInUser.firstname}</p>
                    <p>Last Name: {loggedInUser.lastname}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    )
}

export default Signin
