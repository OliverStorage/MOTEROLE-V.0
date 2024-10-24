import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import FullScreen from '../components/FullScreen';
import Actionbtn from '../components/Actionbtn';
import { Link, useNavigate } from 'react-router-dom';
import { LuArrowBigLeft } from 'react-icons/lu';
import { PiGearSixBold } from 'react-icons/pi';
import { IoBulbOutline } from 'react-icons/io5';
import { app } from '../firebaseConfig';
import { getFirestore, collection, addDoc, getDocs, query, where,limit } from 'firebase/firestore/lite';

const SignUp = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        document.title = 'Sign up';
    });

    const db = getFirestore(app);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target['signup-email'].value;
        const password = e.target['signup-password'].value;
        const firstName = e.target['signup-firstname'].value;
        const lastName = e.target['signup-lastname'].value;
        const username = e.target['signup-username'].value;

        try {
            // 1. Check if email already exists in AccountHolder
            const accountHoldersCollection = collection(db, 'AccountHolder');
            const existingAccountHolderQuery = query(accountHoldersCollection, where('Email', '==', email));
            const existingAccountHolderSnapshot = await getDocs(existingAccountHolderQuery);

            let accountHolderDocRef;

            if (!existingAccountHolderSnapshot.empty) {
                // Use the existing AccountHolder document
                accountHolderDocRef = existingAccountHolderSnapshot.docs[0].ref; 
            } else {
                // Create a new AccountHolder
                accountHolderDocRef = await addDoc(accountHoldersCollection, {
                    Email: email,
                });
                console.log('New AccountHolder added to Firestore with ID:', accountHolderDocRef.id);
            }

            // 3. Count existing Preschoolers with the same AccountHolderId (limit to 20)
            const preschoolersCollection = collection(db, 'Preschooler');
            const existingPreschoolersQuery = query(
                preschoolersCollection,
                where('AccountHolderId', '==', accountHolderDocRef.id),
                limit(20) 
            );
            const existingPreschoolersSnapshot = await getDocs(existingPreschoolersQuery);

            if (existingPreschoolersSnapshot.size >= 20) {
                setErrorMessage('You have already used this account for the maximum number of allowed users (20).');
                return;
            }

            // 4. Create a new Preschooler with the AccountHolderId
            await addDoc(preschoolersCollection, {
                AccountHolderId: accountHolderDocRef.id, 
                Firstname: firstName,
                Lastname: lastName,
                Username: username,
                Password: password,
                Points: 0, // Initial points
                Achievements: [], // Initial achievements (empty array)
            });
            console.log('Preschooler added to Firestore!');

            navigate('/signin');
        } catch (error) {
            console.error('Error during sign up:', error);
            setErrorMessage('An error occurred during sign up. Please try again.');
        }
    };
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
                                    name="signup-firstname"
                                    id="signup-firstname"
                                    placeholder="First Name"
                                    className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                />
                                <input
                                    type="text"
                                    name="signup-lastname"
                                    id="signup-lastname"
                                    placeholder="Last Name"
                                    className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                />
                            </div>

                            <div className="flex h-full w-full space-x-4">
                                <input
                                    type="text"
                                    name="signup-username"
                                    id="signup-username"
                                    placeholder="Username"
                                    className="h-full w-1/2 rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                                />
                                <div className="flex w-1/2 justify-evenly">
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="radio"
                                            name="signup-gender"
                                            id="female"
                                            value="female" 
                                            className="h-8 w-8 border-4 border-grape px-4 focus:outline-0 mobile:h-4 mobile:w-4 mobile:rounded-xl"
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            defaultChecked
                                            type="radio"
                                            name="signup-gender"
                                            id="male"
                                            value="male" 
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
                                name="signup-email"
                                id="signup-email"
                                placeholder="Email"
                                className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                            />
                            <input
                                type="password"
                                name="signup-password"
                                id="signup-password"
                                placeholder="Password"
                                className="h-full w-full rounded-2xl border-4 border-grape px-4 focus:outline-0 mobile:rounded-xl"
                            />
                            {errorMessage && <div className="text-red-500">{errorMessage}</div>}

                            {/* Sign Up button inside the form */}
                            <div className="flex h-14 w-[100%] justify-evenly space-x-4 text-4xl mobile:h-10 mobile:text-xl">
                                <button 
                                    type="submit"  
                                    className="text-shadow flex h-full w-1/2 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95"
                                >
                                    Sign Up
                                </button> 
                            </div>
                        </form>

                        {/* Sign In link outside the form */}
                        <div className="absolute -bottom-20 flex h-14 w-[100%] justify-evenly space-x-4 text-4xl mobile:-bottom-12 mobile:h-10 mobile:text-xl ipad:-bottom-20 ipad:text-3xl">
                            <Link to="/signin" className="text-shadow flex h-full w-1/3 items-center justify-center rounded-xl bg-bluesky duration-100 active:scale-95">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>

                {/* right column */}
                <div className="w-1/10 mobile:space-y- flex select-none flex-col space-y-4 opacity-0">
                    <Actionbtn text="" to="/settings" bgColor="#AB47BC" disabled={true} icon={PiGearSixBold} />
                    <Actionbtn text="" to="/achievement" bgColor="#8BC34A" disabled={true} icon={IoBulbOutline} />
                </div>
            </div>
        </>
    );
};

export default SignUp;