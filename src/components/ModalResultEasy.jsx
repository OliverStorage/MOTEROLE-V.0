import React from 'react'
import Cloud from '../assets/cloud.png'
import Grass from '../assets/grass.png'
import { LuArrowBigLeft } from 'react-icons/lu'

const ModalResultEasy = ({ onClose }) => {
       return (
           <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-nunito font-black">
               <div className="bg-lavender relative flex h-[70%] w-1/2 flex-col items-center justify-between gap-6 rounded-3xl border-8 border-black p-8 mobile:h-[80%] mobile:gap-5 mobile:p-4">
                   <img
                       src={Cloud}
                       alt="cloud.png"
                       className="absolute -left-56 -top-48 size-96 select-none mobile:-left-32 mobile:-top-28 mobile:size-56 ipad:-left-44 ipad:-top-40 ipad:size-80"
                   />
                   <img
                       src={Grass}
                       alt="cloud.png"
                       className="ipad:-bottom-22 absolute -bottom-16 -right-28 size-56 select-none mobile:-bottom-10 mobile:-right-16 mobile:size-32 ipad:-bottom-16 ipad:-right-28 ipad:size-56"
                   />

                   <div className="absolute -right-6 -top-5 z-50 mobile:-right-5 mobile:-top-6 ipad:-right-7 ipad:-top-7">
                       <button className="action-btn flex cursor-pointer items-center justify-center rounded-xl bg-[#F40000] text-center text-white">
                           <LuArrowBigLeft
                               onClick={onClose}
                               className="size-12 mobile:size-10 ipad:size-14"
                           />
                       </button>
                   </div>
                   <div className="text-shadow text-6xl font-black text-white mobile:text-3xl">
                       Resulta
                   </div>
                   <div className="flex w-full justify-center space-x-4">
                       <span className="pt-5">
                           <svg
                               fill="currentColor"
                               viewBox="0 0 16 16"
                               height="1em"
                               width="1em"
                               className="size-28 text-sunshine mobile:size-16"
                           >
                               <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                           </svg>
                       </span>
                       <span className="pb-5">
                           <svg
                               fill="currentColor"
                               viewBox="0 0 16 16"
                               height="1em"
                               width="1em"
                               className="size-28 text-black mobile:size-16"
                           >
                               <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                           </svg>
                       </span>
                       <span className="pt-5">
                           <svg
                               fill="currentColor"
                               viewBox="0 0 16 16"
                               height="1em"
                               width="1em"
                               className="size-28 text-black mobile:size-16"
                           >
                               <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                           </svg>
                       </span>
                   </div>
                   <div className="text-shadow text-6xl font-black text-white mobile:text-3xl">
                       Perpekto!
                   </div>
                   <div className="font flex w-full justify-evenly space-x-6 text-2xl mobile:text-xl">
                       <button className="text-shadow flex h-12 w-full items-center justify-center rounded-xl bg-modalbrown duration-100 active:scale-95 mobile:h-8">
                           Ulitin ang Laro
                       </button>
                       <button className="text-shadow flex h-12 w-full items-center justify-center rounded-xl bg-modalbrown duration-100 active:scale-95 mobile:h-8">
                           Sunod na Laro
                       </button>
                   </div>
               </div>
           </div>
       )
}

export default ModalResultEasy
