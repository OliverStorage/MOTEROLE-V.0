import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import FullScreen from '../components/FullScreen'
import Actionbtn from '../components/Actionbtn'
import { Link } from 'react-router-dom'
import { LuArrowBigLeft } from 'react-icons/lu'
import { PiGearSixBold } from 'react-icons/pi'
import { IoBulbOutline } from 'react-icons/io5'
import line from '../assets/categorybtn/line.png'
import shape from '../assets/categorybtn/shape.png'
import abc from '../assets/categorybtn/abc.png'
import { app } from '../firebaseConfig' // Import Firebase config
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';
import InfoPopup from '../components/InfoPopup'

const Category = () => {
    const db = getFirestore(app);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'MoTeRole - Category'
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const categoryCollection = collection(db, 'Category');

            // Create a query to order by the 'Order' field
            const categoryQuery = query(categoryCollection, orderBy('Order'));

            const categorySnapshot = await getDocs(categoryQuery);
            const categories = categorySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setCategories(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-between">
                    <Actionbtn
                        text=""
                        to="/menu"
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                    />
                    <FullScreen />
                </div>
                {/* center */}
                <div className="-mt-12 flex w-full flex-col items-center justify-center space-y-4 font-bubbles text-white mobile:-mt-8 mobile:space-y-3">
                    <div className="text-shadow text-8xl mobile:text-5xl ipad:text-7xl">
                        Mga Kategorya
                    </div>
                    <div className="text-shadow flex h-[70%] w-[80%] rounded-3xl border-8 border-limblue bg-white p-8 mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <div className="inner-shadow flex h-full w-full items-center justify-evenly space-x-4 rounded-2xl bg-cheese p-4 font-nunito text-4xl font-black text-black mobile:overflow-x-auto mobile:rounded-xl mobile:text-2xl ipad:overflow-x-auto">
                            {categories?.length > 1 &&
                                categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/Exercises/${category.id}`}
                                        className={`text-shadow flex h-[80%] w-72 flex-shrink-0 flex-col items-center justify-between rounded-2xl border-8 ${category.borderColor} bg-butter p-2 duration-100 active:scale-95 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-60`}
                                        // onClick={() => handleCategorySelect('Linya','k41GvFSEcpDZNsZZ1RwK')}
                                    >
                                        <div
                                            style={{
                                                backgroundImage: `url(${line})`,
                                            }}
                                            className="h-full w-full bg-cover bg-center"
                                        ></div>
                                        <div>{category.CategoryName}</div>
                                    </Link>
                                ))}

                            {/* <Link
                                to="/line"
                                className="text-shadow flex h-[80%] w-72 flex-shrink-0 flex-col items-center justify-between rounded-2xl border-8 border-bluesky bg-butter p-2 duration-100 active:scale-95 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-60"
                                onClick={() => handleCategorySelect('Linya', 'k41GvFSEcpDZNsZZ1RwK')}
                            >
                                <div
                                    style={{ backgroundImage: `url(${line})` }}
                                    className="h-full w-full bg-cover bg-center"
                                ></div>
                                <div>Linya</div>
                            </Link>
                            <Link
                                to="/shape"
                                className="text-shadow flex h-[80%] w-72 flex-shrink-0 flex-col items-center justify-between rounded-2xl border-8 border-grape bg-butter p-2 duration-100 active:scale-95 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-60"
                                onClick={() => handleCategorySelect('Hugis', 'tCLzXVfobcwh1ECdm10D')}
                            >
                                <div
                                    style={{ backgroundImage: `url(${shape})` }}
                                    className="h-full w-full bg-cover bg-center"
                                ></div>
                                <div>Hugis</div>
                            </Link>
                            <Link
                                to="/alphabet"
                                className="text-shadow flex h-[80%] w-72 flex-shrink-0 flex-col items-center justify-between rounded-2xl border-8 border-lava bg-butter p-2 duration-100 active:scale-95 mobile:h-[90%] mobile:w-1/3 mobile:border-4 ipad:w-60"
                                onClick={() => handleCategorySelect('Alpabeto', 'tCLzXVfobcwh1ECdm10D')}
                            >
                                <div
                                    style={{ backgroundImage: `url(${abc})` }}
                                    className="h-full w-full bg-cover bg-center"
                                ></div>
                                <div>Alpabeto</div>
                            </Link> */}
                        </div>
                    </div>
                </div>
                {/* right column */}
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
                            'Linya: Sa Kategoryang ito, iguguhit ang iba’t - ibang uri ng linya.',
                            'Hugis: Sa Kategoryang ito, iguguhit ang iba’t - ibang uri ng hugis.',
                            'Alpabeto: Sa Kategoryang ito, iguguhit ang iba’t - ibang uri ng hugis.',
                        ]}
                    />
                </div>
            </div>
        </>
    )
}

export default Category
