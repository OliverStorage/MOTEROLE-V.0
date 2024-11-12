import React, { useState } from 'react'
import { app, db } from '../firebaseConfig'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

const Signup = () => {
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        username: '',
        gender: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
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
                points: 0, // Initialize points to 0
                achievements: [], // Initialize achievements as an empty array
            })

            alert('User registered successfully!')
            setForm({
                firstname: '',
                lastname: '',
                username: '',
                gender: '',
                email: '',
                password: '',
            })
        } catch (error) {
            console.error('Error adding document: ', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={form.firstname}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={form.lastname}
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
                type="text"
                name="gender"
                placeholder="Gender"
                value={form.gender}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
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
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default Signup
