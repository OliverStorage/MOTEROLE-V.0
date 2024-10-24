import React, { useEffect, useState, useRef } from 'react';
import Background from '../components/Background';
import FullScreen from '../components/FullScreen';
import Actionbtn from '../components/Actionbtn';
import { LuArrowBigLeft } from 'react-icons/lu';
import { PiGearSixBold } from 'react-icons/pi';
import { IoBulbOutline } from 'react-icons/io5';
import ModalSettings from '../components/ModalSettings';
import A from '../assets/abcEasy/A.png';

const Ingame = () => {
    const [showModal, setShowModal] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        document.title = 'IN GAME';
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctxRef.current = canvas.getContext('2d');

        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const startDrawing = (e) => {
        e.preventDefault();
        setIsDrawing(true);
        draw(e);
    };

    const finishDrawing = () => {
        setIsDrawing(false);
        ctxRef.current.beginPath(); // Start a new path
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const ctx = ctxRef.current;
        ctx.lineWidth = 60;
        ctx.lineCap = 'round';
        ctx.strokeStyle = isErasing ? 'rgba(255, 255, 255, 1)' : 'white';

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const toggleEraser = () => {
        setIsErasing((prev) => !prev);
    };

    const resetCanvas = () => {
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas
        ctxRef.current.beginPath(); // Reset the path
    };

    const submitCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Convert to grayscale
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;     // Red
            data[i + 1] = avg; // Green
            data[i + 2] = avg; // Blue
            // Alpha remains unchanged
        }

        ctx.putImageData(imageData, 0, 0);

        // Create a downloadable image
        const grayscaleImage = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = grayscaleImage;
        link.download = 'drawing.png';
        link.click();
    };

    const handleTouchStart = (e) => {
        startDrawing(e.touches[0]);
    };

    const handleMouseMove = (e) => {
        draw(e);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    };

    return (
        <>
            <Background />
            <div className="flex h-screen justify-between p-5">
                {/* left column */}
                <div className="w-1/10 flex flex-col justify-between">
                    <Actionbtn
                        text=""
                        bgColor="#F40000"
                        icon={LuArrowBigLeft}
                        isLink={false}
                    />
                    <FullScreen />
                </div>
                {/* center */}
                <div className="flex w-full flex-col items-center justify-center font-bubbles text-white">
                    <div className="text-shadow relative flex h-[85%] w-[80%] justify-center rounded-3xl border-8 border-bluesky bg-white p-8 mobile:h-[85%] mobile:border-4 mobile:p-4 ipad:h-[60%] ipad:p-6">
                        <span className="absolute -top-9 flex h-14 w-1/3 items-center justify-center rounded-2xl border-8 border-bluesky bg-white font-nunito text-4xl font-black text-black mobile:h-12 mobile:border-4 mobile:text-2xl ipad:text-3xl">
                            TITLE
                        </span>
                        <div className="flex h-full bg-center relative bg-contain bg-no-repeat w-full flex-col items-center justify-between rounded-2xl border-8 border-wood bg-darkgreen px-6 py-10 mobile:overflow-x-auto mobile:rounded-xl mobile:border-4 mobile:py-8 ipad:overflow-x-auto">
                            <div className="h-2 w-full bg-lineblue mobile:h-1" />
                            <div className="h-2 w-full border-t-8 border-dashed border-linered mobile:border-t-4" />
                            <div className="h-2 w-full bg-lineblue mobile:h-1" />
                            <div
                                style={{ backgroundImage: `url(${A})` }}
                                className='absolute ipad:m-4 mobile:m-4 inset-0 z-10 bg-center bg-contain bg-no-repeat'
                            />
                            {/* Canvas for Drawing */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <canvas
                                    ref={canvasRef}
                                    onMouseDown={startDrawing}
                                    onMouseUp={finishDrawing}
                                    onMouseMove={handleMouseMove}
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={finishDrawing}
                                    onTouchMove={handleTouchMove}
                                    className="border border-black"
                                    style={{ cursor: 'crosshair', width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Control Buttons */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button onClick={toggleEraser} className="bg-gray-600 text-white p-2 rounded">
                        {isErasing ? 'Pen' : 'Eraser'}
                    </button>
                    <button onClick={resetCanvas} className="bg-red-600 text-white p-2 rounded">
                        Reset
                    </button>
                    <button onClick={submitCanvas} className="bg-blue-600 text-white p-2 rounded">
                        Submit
                    </button>
                </div>
                {/* right column */}
                <div className="w-1/10 flex select-none flex-col space-y-4 mobile:space-y-3">
                    <Actionbtn
                        text=""
                        isLink={false}
                        bgColor="#AB47BC"
                        icon={PiGearSixBold}
                        onClick={() => setShowModal(true)}
                    />
                    <Actionbtn
                        text=""
                        to="/achievement"
                        bgColor="#8BC34A"
                        icon={IoBulbOutline}
                    />
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalSettings onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    );
};

export default Ingame;
