import React, { useState } from 'react'

const TermsConditions = ({ onClose }) => {
    const [tugtogVolume, setTugtogVolume] = useState(30) // Initial volume for Tugtog (Music)
    const [tunogVolume, setTunogVolume] = useState(30) // Initial volume for Tunog (Sound Effects)
    const [isChecked, setIsChecked] = useState(false) // State to track checkbox

    // Handler for checkbox change
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked)
    }

    const handleTugtogVolumeChange = (e) => {
        setTugtogVolume(e.target.value)
    }

    const handleTunogVolumeChange = (e) => {
        setTunogVolume(e.target.value)
    }

    return (
        <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 font-nunito font-black">
            <div className="text-shadow relative flex h-[80%] w-[80%] flex-col items-center space-y-2 rounded-lg bg-poop px-10 pb-10 pt-5 text-4xl text-white mobile:justify-between mobile:space-y-1 mobile:px-5 mobile:pb-5 mobile:text-xl">
                <div>Mga Tuntunin at Kundisyon</div>
                <div className="h-full text-justify text-xl mobile:overflow-y-auto mobile:text-sm mobile:leading-tight">
                    Ang dokumentong "Mga Tuntunin at Kundisyon Hinggil sa
                    Seguridad at Privacy para sa Mga Account ng Tagapag-alaga"
                    ay naglalaman ng mga patakaran at alituntunin na dapat
                    sundin ng mga magulang o guro sa paggamit ng kanilang mga
                    account para sa pamamahala ng impormasyon ng mga batang
                    manlalaro sa isang laro. Layunin nitong tiyakin na ang
                    personal na impormasyon ng mga bata ay protektado at ligtas,
                    habang pinapaalalahanan ang mga tagapag-alaga ng kanilang
                    mga responsibilidad upang mapanatili ang seguridad ng
                    account. Narito ang mga patakaran na ipinaliwanag isa-isa:
                </div>

                <div className="inner-shadow w-full space-y-2 overflow-y-auto rounded-lg bg-white px-8 py-4 text-base text-black mobile:h-1/2 mobile:text-base">
                    <div>
                        Mga Tuntunin at Kundisyon Hinggil sa Seguridad at
                        Privacy para sa Mga Account ng Tagapag-alaga
                    </div>
                    <div>
                        1. Pagpapakilala <br />
                        <div className="pl-4">
                            Ang mga Tuntunin at Kundisyon na ito ay naglalarawan
                            ng mga patakaran at alituntunin para sa paggamit ng
                            mga account ng mga tagapag-alaga (mga magulang o
                            guro) sa larong ito. Ang mga account na ito ay
                            ginagamit upang pamahalaan ang impormasyon ng batang
                            manlalaro.
                        </div>
                    </div>
                    <div>
                        2. Impormasyon ng Manlalaro <br />
                        <ul className="list-disc pl-10">
                            <li>
                                Pagkakakilanlan: Ang pangalan lamang ng batang
                                manlalaro ang gagamitin bilang pagkakakilanlan
                                sa laro.
                            </li>
                            <li>
                                Proteksyon ng Impormasyon: Ang impormasyon ng
                                manlalaro ay hindi ibabahagi sa sinumang tao o
                                ikatlong partido nang walang pahintulot mula sa
                                tagapag-alaga.
                            </li>
                        </ul>
                    </div>
                    <div>
                        3. Seguridad ng Account <br />
                        <ul className="list-disc pl-10">
                            <li>
                                Responsibilidad ng Tagapag-alaga: Ang mga
                                tagapag-alaga ay may pananagutan sa pag-iingat
                                ng kanilang mga account at impormasyon. Dapat
                                nilang itago ang kanilang password at huwag
                                itong ibahagi.
                            </li>
                            <li>
                                Pag-uulat ng mga Insidente: Kung mayroong
                                anumang hindi awtorisadong pag-access o iba pang
                                insidente na nagbabanta sa seguridad ng account,
                                agad na ipaalam ito sa suporta ng laro.
                            </li>
                        </ul>
                    </div>
                    <div>
                        4. Patakaran sa Privacy <br />
                        <ul className="list-disc pl-10">
                            <li>
                                Paano Kinokolekta ang Impormasyon: Kinokolekta
                                lamang ang impormasyon na kinakailangan para sa
                                paglikha at pamamahala ng account.
                            </li>
                            <li>
                                Paggamit ng Impormasyon: Ang impormasyon ay
                                gagamitin lamang para sa layunin ng pagpapabuti
                                ng karanasan ng manlalaro at hindi ibebenta o
                                ibabahagi sa ibang kumpanya.
                            </li>
                        </ul>
                    </div>
                    <div>
                        5. Pagsang-ayon <br />
                        <div className="pl-4">
                            Sa paggamit ng account, sumasang-ayon ang mga
                            tagapag-alaga sa mga patakarang ito at nauunawaan
                            ang kanilang mga karapatan at responsibilidad
                            patungkol sa seguridad at privacy ng impormasyon.
                        </div>
                    </div>
                    <div>
                        6. Pagbabago sa Mga Patakaran <br />
                        <div className="pl-4">
                            Maaaring baguhin ang mga Tuntunin at Kundisyon na
                            ito anumang oras. Ang mga pagbabago ay ipapaalam sa
                            pamamagitan ng isang abiso sa laro o sa pamamagitan
                            ng email. Kung kailangan mo pa ng karagdagang tulong
                            o nais mong baguhin ang anumang bahagi nito, huwag
                            mag-atubiling ipaalam!
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-center justify-start space-x-4 px-10 text-base mobile:px-4 mobile:text-xs">
                    <input
                        type="checkbox"
                        name="termsConditions"
                        id="termsConditions"
                        className="size-5"
                        onChange={handleCheckboxChange} // Update checkbox state on change
                    />
                    <label
                        htmlFor="termsConditions"
                        className="select-none mobile:text-xs"
                    >
                        Sumasang-ayon ako sa mga Tuntunin at Kundisyon hinggil
                        sa Seguridad at Privacy ng account na ito.
                    </label>
                </div>

                <div className="flex w-full items-center justify-end space-x-6 text-xl mobile:text-sm">
                    {/* Disable the button if the checkbox is not checked */}
                    <button
                        onClick={onClose}
                        className={`text-shadow h-10 w-40 rounded-md bg-darkpeach mobile:h-7 mobile:w-24 ${
                            !isChecked ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={!isChecked}
                    >
                        Magpatuloy
                    </button>
                    <button
                        className="text-shadow h-10 w-40 rounded-md bg-darkpeach mobile:h-7 mobile:w-24"
                        onClick={onClose} // Close modal when clicked
                    >
                        Bumalik
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TermsConditions
