import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import FullScreen from '../components/FullScreen';
import Actionbtn from '../components/Actionbtn';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LuArrowBigLeft } from 'react-icons/lu';
import { PiGearSixBold } from 'react-icons/pi';
import { IoBulbOutline } from 'react-icons/io5';
import { db } from '../firebaseConfig'; // Ensure the correct path
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';

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

                    console.error(`Error loading images for ${lineType}:`, err.message);
                    const fallbackImage = '/path/to/fallback.png';

                    return {
                        [lineType]: {
                            linebg: fallbackImage,
                            lineimg: fallbackImage,
                        },
                    };
                }
            });

            const resolvedImages = await Promise.all(imagePromises);
            setImages(
                resolvedImages.reduce((acc, imageObj) => ({ ...acc, ...imageObj }), {})
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

    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        document.title = 'Exercises';
        const categoryDocRef = doc(db, 'Category', categoryId);
        const categoryUnsubscribe = onSnapshot(categoryDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const categoryData = { ...docSnapshot.data(), id: docSnapshot.id };
                setCategory(categoryData);
                console.log(categoryData); // For debugging
            }
        });

        const exercisesCollection = collection(db, 'Exercises');
        const exercisesQuery = query(
            exercisesCollection,
            where('CategoryId', '==', categoryId),
            orderBy('Order', 'asc')
        );


        const unsubscribe = onSnapshot(exercisesQuery, (snapshot) => {
            const exercisesData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,

            }));
            setExercises(exercisesData);
            console.log(exercisesData); // For debugging
        });

        return () => {
            unsubscribe();
            categoryUnsubscribe();
        };
    }, [categoryId]);

    if (!category) return null; // Loading state


    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* Left column */}
                <div className="w-1/10 flex flex-col justify-between">
                    <MemoizedActionbtn
                        text=""
                        to="/category"
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>

                {/* Center */}
                <div className="flex w-full flex-col items-center justify-center overflow-hidden font-bubbles text-white">
                    <div
                        className={`text-shadow relative flex h-[70%] w-[80%] justify-center rounded-3xl border-8 ${category.borderColor} bg-white p-8 mobile:h-[80%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6`}
                    >
                        {/* Title */}
                        <span
                            className={`${category.borderColor} absolute -top-9 flex h-14 w-1/3 px-4 items-center justify-center rounded-2xl border-8 bg-white font-nunito text-4xl font-black text-black mobile:h-12 mobile:w-auto mobile:border-4 mobile:text-2xl ipad:text-3xl`}
                        >

                           {category.CategoryName} 

                        </span>

                        {/* Exercises Container */}
                        <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 overflow-auto rounded-2xl border-[0.5px] border-softgray bg-cheese p-4 font-nunito text-4xl font-black text-black mobile:overflow-x-auto mobile:rounded-xl mobile:text-xl ipad:overflow-x-auto ipad:text-3xl">
                            {exercises.length > 0 &&
                                exercises.map((exercise) => (
                                    <Link
                                        key={exercise.id}
                                        to={`/GameExercise/${exercise.id}`}
                                        state={{ categoryId }} // Pass categoryId
                                        className={`text-shadow flex h-[80%] w-1/4 flex-shrink-0 flex-col items-center justify-center rounded-2xl border-8 border-${exercise.ExerciseColor} bg-butter bg-cover bg-center duration-100 active:scale-95 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-1/3`}
                                    >
                                        <div className="flex size-[90%] flex-col items-center justify-end bg-cover bg-center mobile:size-[90%] ipad:size-[90%]">
                                            <span>{exercise.ExerciseName}</span>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Right column */}
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
