import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import FullScreen from '../components/FullScreen';
import Actionbtn from '../components/Actionbtn';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { LuArrowBigLeft } from 'react-icons/lu';
import { PiGearSixBold } from 'react-icons/pi';
import { IoBulbOutline } from 'react-icons/io5';
import { db } from '../firebaseConfig';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';

const GameExercise = () => {
    const { exercisesId } = useParams();
    const location = useLocation();
    const categoryId = location.state?.categoryId; // Get categoryId from state
    const [gameExercises, setGameExercises] = useState([]);
    const navigate = useNavigate(); // Use navigate for programmatic navigation

    useEffect(() => {
        document.title = 'Game Exercise';
        const gameExerciseCollection = collection(db, 'GameExercise');
        const gameExerciseQuery = query(
            gameExerciseCollection,
            where('ExercisesId', '==', exercisesId)
        );

        const unsubscribe = onSnapshot(gameExerciseQuery, (snapshot) => {
            const gameExercisesData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setGameExercises(gameExercisesData);
            console.log(gameExercisesData);
        });

        return () => unsubscribe();
    }, [exercisesId]);

    const handleDifficultySelect = async (gameExerciseId) => {
        // Prepare data for GameSession
        const sessionData = {
            GameExerciseId: gameExerciseId,
            SessionStartTime: new Date(), // Set the current time
            // You may need to set PreschoolerID based on your application logic
        };

        // Add the session to the GameSession table
        try {
            const gameSessionRef = collection(db, 'GameSession');
            await addDoc(gameSessionRef, sessionData);
            // Navigate to the GameSession if needed
            navigate(`/Ingame/${gameExerciseId}`);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                <div className="w-1/10 flex flex-col justify-between">
                    <Actionbtn
                        text=""
                        to={`/Exercises/${categoryId}`} // Navigate back to exercises with the correct category
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>
                <div className="flex w-full flex-col items-center justify-center font-bubbles text-white">
                    <div className="text-shadow relative flex h-[70%] w-[80%] justify-center rounded-3xl border-8 border-softgray bg-white p-8">
                        <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-softgray bg-white font-nunito text-4xl font-black text-black">
                            Mga Lebel sa {/* Lagay ng {exercises.ExerciseName}*/}
                        </span>
                        <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 rounded-2xl bg-cheese p-4 text-center font-nunito text-4xl font-black text-black">
                            {gameExercises.length > 0 &&
                                gameExercises.map((gameExercise) => (
                                    <div
                                        key={gameExercise.id} 
                                        onClick={() => handleDifficultySelect(gameExercise.id)} // Use the handler
                                        className={`text-shadow h-[80%] w-72 flex-shrink-0 cursor-pointer rounded-2xl border-8 border-softgray bg-butter p-4 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3`}
                                    >
                                        <div className="flex size-[90%] flex-col items-center justify-end bg-cover bg-center">
                                            <span>{gameExercise.DifficultyLevel}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/10 flex flex-col space-y-4">
                    <Actionbtn
                        text=""
                        to="/settings"
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                    />
                    <Actionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    />
                </div>
            </div>
        </>
    );
}

export default GameExercise;
