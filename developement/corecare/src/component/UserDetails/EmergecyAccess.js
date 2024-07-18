
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../Recoil/Atom";
import { useEffect, useRef } from "react";
import img from '../../assets/ahmed.jpg';
import { GiKeyLock } from "react-icons/gi";


function EmergencyAccess(props) {
    const loginInfoValue = useRecoilValue(loginInfo);
    const hasEffectRun = useRef(false);
    const getUserData = async (fetchText) => {

        try {
            const response = await fetch(fetchText, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const jsonData = await response.json();
            console.log(jsonData)
            // setUserInfo(jsonData);
            console.log("success");
        } catch (err) {
            // setError(err.message);
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        if (!hasEffectRun.current) {

            getUserData(`http://192.168.137.1:5000/emergencycontacts?${loginInfoValue.patientId}`);
            hasEffectRun.current = true;
        }
    }, [props.userType, loginInfoValue.patientId])
    return (
        <>
            <div className='flex flex-col flex-wrap justify-between w-full'>
                <div className='flex flex-row justify-center border-top border-bottom m-4 p-4 w-[95%]'>
                    <GiKeyLock className='text-white text-3xl mr-2' />
                    <h3 className='text-white p-2 font-serif'>Users that have granted you emergency access protocol</h3>
                </div>
                <div className="flex flex-row w-full flex-wrap justify-between">
                    <div className="bg-[#3f4652] rounded mx-4 p-2 w-[15%] text-center cursor-pointer hover:scale-[1.01] transition-all">
                        <img className="w-[120px] h-[120px] my-[5px] mx-auto rounded-full" src={img} alt="error" />
                        <h1 className="text-white">ahmed qahtan</h1>
                        <p className="text-white">Taiz-Yemen</p>
                    </div>


                </div>
            </div>
        </>
    );
}

export default EmergencyAccess;