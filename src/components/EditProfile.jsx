import React from 'react'
import { FaEdit } from 'react-icons/fa'

const EditProfile = ({
    profileImage,
    preschooler,
    onLogout,
    onEditToggle,
    editProfile,
}) => {
    return (
        <div className="flex w-full items-center gap-1 text-3xl mobile:gap-1 mobile:text-sm ipad:gap-2 ipad:text-2xl">
            <div className="relative flex w-[19%] items-start ipad:w-[20%]">
                <div className="h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-bluesky object-center text-base mobile:h-[60px] mobile:w-[60px] ipad:h-[85px] ipad:w-[85px]">
                    <img
                        src={profileImage}
                        alt="user"
                        className="flex h-full w-full items-center justify-end"
                    />
                </div>
            </div>
            <div className="flex w-full justify-between">
                <div className="text-outline flex flex-col justify-between">
                    <div className="flex gap-3 mobile:gap-1">
                        <span className="select-none">Username:</span>
                        <span className="capitalize">
                            {preschooler?.username || 'N/A'}
                        </span>
                    </div>
                    <div className="flex gap-3 mobile:gap-1">
                        <span className="select-none">Pangalan:</span>
                        <span className="capitalize">
                            {preschooler
                                ? `${preschooler.firstname} ${preschooler.lastname}`
                                : 'N/A'}
                        </span>
                    </div>
                    <div className="flex gap-3 mobile:gap-1">
                        <span className="select-none">Email:</span>
                        <span className="capitalize">
                            {preschooler?.email || 'N/A'}
                        </span>
                    </div>
                    <div className="flex gap-3 mobile:gap-1">
                        Gender:
                        <span className="capitalize">
                            {preschooler?.gender || 'N/A'}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                    <div className="flex space-x-2">
                        <button
                            onClick={onEditToggle}
                            className="inner-shadow-deactive flex items-center rounded-xl bg-applegreen px-3 py-1 duration-100 active:translate-y-1"
                        >
                            <FaEdit className="mr-1 size-9 mobile:size-4 ipad:size-7" />
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={onLogout}
                            className="inner-shadow-deactive rounded-xl bg-back px-3 py-1 duration-100 active:translate-y-1"
                        >
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
