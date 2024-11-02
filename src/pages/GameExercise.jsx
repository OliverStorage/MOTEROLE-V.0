import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { LuArrowBigLeft } from 'react-icons/lu';
import { PiGearSixBold } from 'react-icons/pi';
import { IoBulbOutline } from 'react-icons/io5';
import { db } from '../firebaseConfig';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import Background from '../components/Background';
import FullScreen from '../components/FullScreen';
import Actionbtn from '../components/Actionbtn';
import InfoPopup from '../components/InfoPopup'


const GameExercise = () => {
    const { exercisesId } = useParams();
    const { state } = useLocation();
    const categoryId = state?.categoryId;
    const [gameExercises, setGameExercises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Game Exercise';
        const gameExerciseCollection = collection(db, 'GameExercise');
        const gameExerciseQuery = query(gameExerciseCollection, where('ExercisesId', '==', exercisesId));
        const unsubscribe = onSnapshot(gameExerciseQuery, (snapshot) => {
            const gameExercisesData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setGameExercises(gameExercisesData);
        });

        return () => unsubscribe();
    }, [exercisesId]);

    const handleDifficultySelect = async (gameExerciseId) => {
        const sessionData = {
            GameExerciseId: gameExerciseId,

            SessionStartTime: new Date(),
        };


        try {

            const gameSessionRef = collection(db, 'GameSession');
            await addDoc(gameSessionRef, sessionData);
            navigate(`/Ingame/${gameExerciseId}`);
        } catch (error) {
            console.error("Error adding document: ", error);
            // You might want to show a user-friendly message here

        }
    }

    const GameExerciseCard = ({ gameExercise }) => (
        <div
            onClick={() => handleDifficultySelect(gameExercise.id)}
            className="text-shadow h-[80%] w-72 flex-shrink-0 cursor-pointer rounded-2xl border-8 border-softgray bg-butter p-2 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3"
        >
            <div className="flex h-full flex-col items-center justify-end bg-cover bg-center">
                <span>{gameExercise.DifficultyLevel}</span>
            </div>
        </div>
    );

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                <div className="w-1/10 flex flex-col justify-between">
                    <Actionbtn
                        text=""
                        to={`/Exercises/${categoryId}`}
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>
                <div className="flex w-full flex-col items-center justify-center font-bubbles text-white">
                    <div className="text-shadow relative flex h-[70%] w-[80%] justify-center rounded-3xl border-8 border-softgray bg-white p-8 mobile:h-[80%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-softgray bg-white px-4 font-nunito text-4xl font-black text-black mobile:h-12 mobile:border-4 mobile:w-auto mobile:text-2xl ipad:text-3xl">
                          Lebel
                        </span>
                        <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 rounded-2xl bg-cheese p-4 text-center font-nunito text-4xl font-black text-black mobile:overflow-x-auto mobile:rounded-xl mobile:text-xl ipad:overflow-x-auto ipad:text-3xl">
                            {gameExercises.length > 0 && gameExercises.map(gameExercise => (
                                <GameExerciseCard key={gameExercise.id} gameExercise={gameExercise} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/10 flex select-none flex-col justify-between">
                    <div className="flex flex-col space-y-4 mobile:space-y-3">
                        <Actionbtn
                            text=""
                            to="/settings"
                            bgColor="#AB47BC"
                            icon={PiGearSixBold}
                        />
                        {/* <Actionbtn
                            text=""
                            to="/achievement"
                            bgColor="#8BC34A"
                            icon={IoBulbOutline}
                        /> */}
                    </div>
                    <InfoPopup
                        className="flex flex-col"
                        messages={[
                            'LEBEL: PUMILI SA TATLONG KAHON NG LEBEL ANG NAIS NA SUBUKAN',
                            'MADALI NA LEBEL NG LINYA: SUNDAN ANG LINYA BATAY SA GABAY NG NUMERO AT I-TRACE ANG LINYA',
                            'KARANIWAN NA LEBEL NG LINYA: SUNDAN ANG LINYA BATAY SA LINYA NG PAG-TRACE',
                            'MAHIRAP NA LEBEL NG LINYA: ISULAT ANG LINYA NG WALANG GABAY NA BATAYAN',
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default GameExercise;
