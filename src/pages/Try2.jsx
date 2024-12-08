import React from 'react'

const Try2 = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="mb-4 text-2xl font-bold">
                Responsive TailwindCSS Example
            </h1>

            {/* Default styles for all screens */}
            <div className="mb-4 rounded-lg bg-blue-500 p-4 text-white">
                Default styling for all devices.
            </div>

            {/* Styling for wide smartphones */}
            <div className="phone-wide:bg-red-500 phone-wide:p-6 phone-wide:rounded-xl mb-4">
                Styling for smartphones up to 1000px wide.
            </div>

            {/* Styling for tablets */}
            <div className="tablet:bg-green-500 tablet:p-8 tablet:rounded-2xl mb-4">
                Styling for tablets between 641px and 1000px wide.
            </div>

            {/* Aspect ratio handling */}
            <div className="mb-4 aspect-[20/9] rounded-lg bg-yellow-500 xl:aspect-[1/1]">
                <div className="flex items-center justify-center text-white">
                    Aspect Ratio: 16:9
                </div>
            </div>
            <div className="aspect-h-9 aspect-w-16 mb-4 rounded-lg bg-yellow-500">
                <div className="flex items-center justify-center text-white">
                    Aspect Ratio: 16:9
                </div>
            </div>
            <div className="aspect-h-3 aspect-w-4 rounded-lg bg-purple-500">
                <div className="flex items-center justify-center text-white">
                    Aspect Ratio: 4:3
                </div>
            </div>
        </div>
    )
}

export default Try2
