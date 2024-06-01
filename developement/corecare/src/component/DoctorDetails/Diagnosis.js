import { MdOutlineVaccines } from "react-icons/md";
import { FaVial } from "react-icons/fa";
import { FaXRay } from "react-icons/fa";



function Diagnosis() {
    return (
        <form id="main">
            <div className="flex flex-col justify-around gap-2 h-full">
                <div className="flex flex-row justify-between bg-[#3F4652] rounded-md p-3 gap-2 mx-5 my-3">
                    <label className="self-center font-bold font-serif">Diagnosis</label>
                    <input className="bg-transparent border-1 border-[#272C34] outline-none rounded-md w-full h-[5vh] p-4" placeholder="Write your diagnosis" autoFocus type="text" name="diagnosis" id="diagnosis" />
                </div>

                <div className="flex flex-col justify-between bg-[#3F4652] rounded-md p-3 gap-2 mx-5 my-3">
                    <label className=" font-bold font-serif">Notes</label>
                    <textarea className="bg-transparent border-1 border-[#272C34] outline-none rounded-md w-full p-4" form="main" rows={13} autoComplete="on" autoCorrect="on" placeholder="Write your notes" name="notes" id="diagnosis" />
                </div>


                <div className="doctor-body-bottom p-2 flex flex-row justify-between mx-5">
                    <div className="flex flex-col bg-[#3F4652] p-2 rounded-md">
                        <div className="flex flex-row justify-between gap-2 border-b p-2 border-[#272C34] ">
                            <span className="text-xl"><MdOutlineVaccines /></span>
                            <h5>The Prescribed Midicine</h5>
                        </div>
                        <div className="flex flex-col my-1">
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-[#3F4652] p-2 rounded-md">
                        <div className="flex flex-row justify-between gap-2 border-b p-2 border-[#272C34] ">
                            <span className="text-xl"><FaVial /></span>
                            <h5>The Prescribed Lab Test</h5>
                        </div>
                        <div className="flex flex-col my-1">
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-[#3F4652] p-2 rounded-md">
                        <div className="flex flex-row justify-between gap-2 border-b p-2 border-[#272C34] ">
                            <span className="text-xl"><FaXRay /></span>
                            <h5>The Prescribed X-rays</h5>
                        </div>
                        <div className="flex flex-col my-1">
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                            <div className="flex flex-row justify-start">
                                <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">1</div>
                                <div className=" text-center self-center">Augmen</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </form>
    );
}

export default Diagnosis;