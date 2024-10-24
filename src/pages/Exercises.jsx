import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import FullScreen from '../components/FullScreen';
import Actionbtn from '../components/Actionbtn';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LuArrowBigLeft } from 'react-icons/lu';
import { PiGearSixBold } from 'react-icons/pi';
import { IoBulbOutline } from 'react-icons/io5';
import { db } from '../firebaseConfig'; // Ensure the correct path
import { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot } from 'firebase/firestore'

// Image loader function for line background and images
const useLineImages = (lineTypes) => {
    const [images, setImages] = useState({});

    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = lineTypes.map(async (lineType) => {
                try {
                    const [linebg, lineimg] = await Promise.all([
                        import(`../assets/linebg/${lineType}.png`),
                        import(`../assets/lineimg/${lineType}.png`),
                    ]);

                    return {
                        [lineType]: {
                            linebg: linebg.default,
                            lineimg: lineimg.default,
                        },
                    };
                } catch (err) {
                    console.error(`Error loading images for ${lineType}:`, err);
                    return { [lineType]: { linebg: null, lineimg: null } };
                }
            });

            const resolvedImages = await Promise.all(imagePromises);
            setImages(
                resolvedImages.reduce(
                    (acc, imageObj) => ({ ...acc, ...imageObj }),
                    {}
                )
            );
        };

        const debounceTimeout = setTimeout(() => {
            loadImages();
        }, 100);

        return () => clearTimeout(debounceTimeout);
    }, [lineTypes]);

    return images;
};

// Memoized Actionbtn to prevent unnecessary re-renders
const MemoizedActionbtn = React.memo(({ text, to, bgColor, icon }) => (
    <Actionbtn text={text} to={to} bgColor={bgColor} icon={icon} />
));

const Exercises = () => {
    const {categoryId} = useParams()
    const navigate = useNavigate();
    const lineTypes = ['Patayo', 'Pahilis', 'Pahiga', 'Pakurba', 'Pazigzag'];
    const lineImages = useLineImages(lineTypes);
    const [exercises, setExercises] = useState(null);

    useEffect(() => {
        document.title = 'Line';
        const exercisesCollection = collection(db, 'Exercise');
        const exercisesQuery = query(exercisesCollection,where("CategoryId", "==", categoryId));
        const unsubscribe = onSnapshot(exercisesQuery, async (snapshot) => {
            const exercisesdb = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setExercises(exercisesdb);
            console.log(exercisesdb); // For debugging
        });
       
       return () => unsubscribe();
        
    }, []);

    

    const handleExerciseSelect = async (exerciseName, exerciseId) => {
        try {
            const docRef = await addDoc(collection(db, 'Exercise'), {
                ExerciseId: exerciseId,
                CategoryId: 'your_category_id', // Replace with actual category ID
                DifficultyLevel: 'your_difficulty_level', // Replace with actual difficulty level
                ExerciseName: exerciseName,
            });
            console.log('Document written with ID: ', docRef.id);
            navigate('/leveldifficulty'); // Proceed to Difficulty Level
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-between">
                    <MemoizedActionbtn
                        text=""
                        to="/category"
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>
                {/* center */}
                <div className="flex w-full flex-col items-center justify-center font-bubbles text-white">
                    <div className="text-shadow relative flex h-[70%] w-[80%] justify-center rounded-3xl border-8 border-limblue bg-white p-8 mobile:h-[85%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-limblue bg-white font-nunito text-4xl font-black text-black mobile:h-12 mobile:border-4 mobile:text-2xl ipad:text-3xl">
                            Linya
                        </span>
                        <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 overflow-auto rounded-2xl border-[0.5px] border-softgray bg-cheese p-4 font-nunito text-4xl font-black text-black mobile:overflow-x-auto mobile:rounded-xl mobile:text-xl ipad:overflow-x-auto ipad:text-3xl">
                            {exercises?.length > 0 && exercises.map((exercise, index) => (
                                <div
                                    key={index}
                                    //onClick={() => handleExerciseSelect(lineType, lineType === 'Patayo' ? 'kVhA311ENofLQ8RAkqVR' : lineType === 'Pahiga' ? 'CpZHiUm5Nfk1tPEzTSSl' : lineType === 'Pahilis' ? 'giVbV06XN4G831EAlmSN' : lineType === 'Pakurba' ? 'wpjd9BIqU1HPE5ilfwBL' : 'dwWIxXQ7sr5HIwW1Ryw3')}
                                    className="text-shadow flex h-[80%] w-1/4 flex-shrink-0 flex-col items-center justify-center rounded-2xl border-8 border-limblue bg-butter bg-cover bg-center duration-100 active:scale-95 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3"
                                    style={{
                                        //backgroundImage: lineImages[lineType]?.linebg ? `url(${lineImages[lineType].linebg})` : 'none',
                                    }}
                                >
                                    <div
                                        className="flex size-[90%] flex-col items-center justify-end bg-cover bg-center mobile:size-[90%] ipad:size-[90%]"
                                        style={{
                                            //backgroundImage: lineImages[lineType]?.lineimg ? `url(${lineImages[lineType].lineimg})` : 'none', 
                                        }}
                                    >
                                        <span>{exercise.ExerciseName}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* right column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 mobile:space-y-3">
                    <MemoizedActionbtn
                        text=""
                        to="/settings"
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                    />
                    <MemoizedActionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    />
                </div>
            </div>
        </>
    );
};

export default Exercises;
