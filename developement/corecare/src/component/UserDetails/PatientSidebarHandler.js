import { useEffect, useRef, useState } from 'react';
import { BsPerson } from "react-icons/bs";
import { FaFileMedical } from "react-icons/fa";
import { MdEventNote } from "react-icons/md"
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GiKeyLock } from "react-icons/gi";
import H1 from "../H1";
import SideBtn from "./SideBtn";
import Button from "./Button";
import { IoLogOutOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { HiPlus } from "react-icons/hi2";
import { MdSummarize } from "react-icons/md";
import DropDownButton from "./DropDownButton";
import { FaFolderOpen } from "react-icons/fa";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FaXRay } from "react-icons/fa";
import { FaFilePrescription } from "react-icons/fa6";
import { LuFolderPlus } from "react-icons/lu";
import { FaHospitalUser } from "react-icons/fa6";
import SideBar from "./SideBar";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginInfo } from '../../Recoil/Atom';
import { Toast } from 'primereact/toast';
import ConfirmedDialog from '../../utiles/ConfirmedDialog';

const useOptimistic = (initialValue, callback) => {
    const [value, setValue] = useState(initialValue);

    const updateValue = async (newValue) => {
        const previousValue = value;
        setValue(newValue);
        try {
            await callback(newValue);
        } catch (error) {
            setValue(previousValue);
        }
    };

    return [value, updateValue];
};

function PatientSidebarHandler(props) {
    const [isOpenSummarize, setIsOpenSummarize] = useState(false);
    const [dataSummarize, setDataSummarize] = useState({ summary: '' });
    const [activeButton, setActiveButton] = useState("Profile");
    const navigate = useNavigate();
    const toast = useRef(null);
    const [notificationsCount, setNotificationsCount] = useState(0);

    const handleSummarize = (data) => {
        setDataSummarize(data);
        setIsOpenSummarize(!isOpenSummarize);
    }


    const parseRecordString = (recordString) => {
        let htmlContent = recordString
            .replace(/## (.*)/g, '<h2>$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\* (.*?)/g, '<li>$1</li>') // Replace bullet points with list items
            .replace(/\n/g, '<br>'); // Replace newlines with <br>

        // Wrap list items with <ul>
        htmlContent = htmlContent.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

        // Remove unnecessary <br> before <ul> and after </ul>
        htmlContent = htmlContent.replace(/<br><ul>/g, '<ul>').replace(/<\/ul><br>/g, '</ul>');

        return htmlContent;
    };

    // const userInfoValue = useRecoilValue(loginInfo);
    const handleSaveSummarize = async () => {
        if (userInfoValue.patientId === '' && dataSummarize.summary === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login First' });
            return;
        }
        const data = {
            patientid: userInfoValue.patientId,
            summary: dataSummarize.summary,
            recordid: dataSummarize.recordid,
            resultid: dataSummarize.resultid,
        }
        try {
            const response = await fetch(`https://corecare-server.onrender.com/records/savesummary`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Summary Saved' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Summary Saved' });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Summary Saved' });
        }
        console.log('Save Summarize');
        setIsOpenSummarize(!isOpenSummarize);
    }


    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
        props.handleButtonClick(buttonText);
    };
    const setUserInfo = useSetRecoilState(loginInfo);
    const userInfoValue = useRecoilValue(loginInfo);

    const handleGoout = () => {
        sessionStorage.removeItem('email');
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            login: ''
        }));
        navigate('/');

    };

    const [userInfoOptimistic, setUserInfoOptimistic] = useOptimistic(loginInfo, async (newUserInfoValue) => {
        console.log(newUserInfoValue.patientId);
        toast.current.show({ severity: 'info', summary: 'Processing', detail: 'Summarizing Medical Records, please wait...', life: 5000 });

        const data = {
            patientid: newUserInfoValue.patientId
        }
        try {
            const response = await fetch("https://corecare-server.onrender.com/ai/summarizerecords", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                handleSummarize(data);
                // navigate('/signup/password-step');
                // Optionally show a success toast
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Summarized Medical records successful' });
            } else {
                const errorData = await response.json();
                toast.current.show({ severity: 'error', summary: 'Error', detail: errorData.message || 'Invalid Data' });
                throw new Error(errorData.message || 'Invalid Data');
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }
    });

    const handleSummarizeRecords = async () => {
        if (userInfoValue.patientId === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Sorry Error Occured, Session expired please login in again' });
            return;
        }
        console.log(userInfoValue.patientId);
        try {
            await setUserInfoOptimistic(userInfoValue);
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }

    };

    useEffect(() => {
        setNotificationsCount(userInfoValue.notificationsCount);
    }, [userInfoValue.notificationsCount]);

    const logoutIcon =
        <IconContext.Provider value={{ className: "", size: "2rem" }}>
            <IoLogOutOutline />
        </IconContext.Provider>

    const plusIcon =
        <IconContext.Provider value={{ className: "plus", size: "2rem" }}>
            <HiPlus />
        </IconContext.Provider>

    const SummarizeIcon =
        <IconContext.Provider value={{ className: "summary", size: "2rem" }} >
            <MdSummarize />
        </IconContext.Provider>

    return (
        <>
            <Toast ref={toast} />
            <SideBar >
                <div className="sidebar-content">
                    <H1 name="Title" title="Core Care" />
                    <SideBtn
                        name="sideBtn"
                        id={activeButton === "Profile" ? "active" : ""}
                        icon={<BsPerson />}
                        text="Profile"
                        onClick={() => handleButtonClick("Profile")}
                    />

                    {/* ================================== */}

                    {props.userType === "Patient" || props.userType === "Doctor" ? (
                        <DropDownButton icon={<FaFileMedical />} text="Patient Records" >
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "All Records" ? "active" : ""}
                                icon={<FaFolderOpen />}
                                text="All Records"
                                onClick={() => handleButtonClick("All Records")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Report" ? "active" : ""}
                                icon={<MdOutlineReceiptLong />}
                                text="Reports"
                                onClick={() => handleButtonClick("Report")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Lab test" ? "active" : ""}
                                icon={<FaRegFileLines />}
                                text="Lab Tests"
                                onClick={() => handleButtonClick("Lab test")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Radiology" ? "active" : ""}
                                icon={<FaXRay />}
                                text="Radiology"
                                onClick={() => handleButtonClick("Radiology")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Prescription" ? "active" : ""}
                                icon={<FaFilePrescription />}
                                text="Prescription"
                                onClick={() => handleButtonClick("Prescription")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Summarized Files" ? "active" : ""}
                                icon={<LuFolderPlus />}
                                text="Summarized Files"
                                onClick={() => handleButtonClick("Summarized Files")}
                            />
                        </DropDownButton>
                    ) : null}

                    {/* ================================== */}

                    {props.userType === "Hospital" ? (
                        <DropDownButton icon={<FaFileMedical />} text="Add Account" >
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Add Patient" ? "active" : ""}
                                icon={<HiOutlineUserAdd />}
                                text="Add Patient"
                                onClick={() => handleButtonClick("Add Patient")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Add Doctor" ? "active" : ""}
                                icon={<HiOutlineUserAdd />}
                                text="Add Doctor"
                                onClick={() => handleButtonClick("Add Doctor")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Add Laboratory" ? "active" : ""}
                                icon={<HiOutlineUserAdd />}
                                text="Add Laboratory"
                                onClick={() => handleButtonClick("Add Laboratory")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Add Radiology" ? "active" : ""}
                                icon={<HiOutlineUserAdd />}
                                text="Add Radiology"
                                onClick={() => handleButtonClick("Add Radiology")}
                            />
                            <SideBtn
                                name="sideBtn"
                                id={activeButton === "Add Pharmacy" ? "active" : ""}
                                icon={<HiOutlineUserAdd />}
                                text="Add Pharmacy"
                                onClick={() => handleButtonClick("Add Pharmacy")}
                            />
                        </DropDownButton>
                    ) : null}

                    {/* ================================== */}

                    {props.userType !== "Patient" ? (
                        <SideBtn
                            name="sideBtn"
                            id={activeButton === "Patient Access Management" ? "active" : ""}
                            icon={<FaHospitalUser />}
                            text="Patient Access Management"
                            numofnotification={notificationsCount}
                            display={notificationsCount > 0}
                            onClick={() => handleButtonClick("Patient Access Management")}
                        />
                    ) : null}

                    {/* ================================== */}

                    {/*{props.userType === "Patient" || props.userType === "Doctor" ? (
                        <SideBtn
                            name="sideBtn"
                            id={activeButton === "Appointment Schedule" ? "active" : ""}
                            icon={<MdEventNote />}
                            text="Appointment Schedule"
                            onClick={() => handleButtonClick("Appointment Schedule")}
                        />
                    ) : null}*/}

                    {/* ================================== */}

                    <SideBtn
                        name="sideBtn"
                        id={activeButton === "Emergency Access" ? "active" : ""}
                        icon={<GiKeyLock />}
                        text="Emergency Access"
                        onClick={() => handleButtonClick("Emergency Access")}
                    />
                    {/*<DropDownButton icon={<RiDashboardHorizontalFill />} text="Dashboard" >
                        {
                            props.userType === "Patient" || props.userType === "Doctor" ? (
                                <>
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "General Info" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="General Info"
                                        onClick={() => handleButtonClick("General Info")}
                                    />
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "Health Info" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="Health Info"
                                        onClick={() => handleButtonClick("Health Info")}
                                    />
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "Change Password" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="Change Password"
                                        onClick={() => handleButtonClick("Change Password")}
                                    />
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "Social Media Accounts" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="Social Media Accounts"
                                        onClick={() => handleButtonClick("Social Media Accounts")}
                                    />
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "Emergency Contacts" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="Emergency Contacts"
                                        onClick={() => handleButtonClick("Emergency Contacts")}
                                    />
                                    {
                                        props.userType === "Doctor" ? (
                                            <>
                                                <SideBtn
                                                    name="sideBtn"
                                                    id={activeButton === "Practice Info" ? "active" : ""}
                                                    icon={<GiKeyLock />}
                                                    text="Practice Info"
                                                    onClick={() => handleButtonClick("Practice Info")}
                                                />
                                                <SideBtn
                                                    name="sideBtn"
                                                    id={activeButton === "Profissional Info" ? "active" : ""}
                                                    icon={<GiKeyLock />}
                                                    text="Profissional Info"
                                                    onClick={() => handleButtonClick("Profissional Info")}
                                                />
                                                <SideBtn
                                                    name="sideBtn"
                                                    id={activeButton === "Educational Info" ? "active" : ""}
                                                    icon={<GiKeyLock />}
                                                    text="Educational Info"
                                                    onClick={() => handleButtonClick("Educational Info")}
                                                />
                                                <SideBtn
                                                    name="sideBtn"
                                                    id={activeButton === "Work Hours" ? "active" : ""}
                                                    icon={<GiKeyLock />}
                                                    text="Work Hours"
                                                    onClick={() => handleButtonClick("Work Hours")}
                                                />
                                            </>
                                        ) : null
                                    }
                                </>
                            ) : props.userType === "Hospital" || props.userType === "Pharmacy" || props.userType === 'Laboratory' || props.userType === 'Radiology' ? (
                                <>
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "General Info" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="General Info"
                                        onClick={() => handleButtonClick("General Info")}
                                    />
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "Change Password" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="Change Password"
                                        onClick={() => handleButtonClick("Change Password")}
                                    />
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "Social Media Accounts" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="Social Media Accounts"
                                        onClick={() => handleButtonClick("Social Media Accounts")}
                                    />
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "Emergency Services" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text={props.userType === 'Hospital' ? "Emergency Services" : "Services"}
                                        onClick={() => handleButtonClick("Emergency Services")}
                                    />
                                    <SideBtn
                                        name="sideBtn"
                                        id={activeButton === "Work Hours" ? "active" : ""}
                                        icon={<GiKeyLock />}
                                        text="Work Hours"
                                        onClick={() => handleButtonClick("Work Hours")}
                                    />
                                    {
                                        props.userType === "Hospital" ? (
                                            <>

                                                <SideBtn
                                                    name="sideBtn"
                                                    id={activeButton === "Departments" ? "active" : ""}
                                                    icon={<GiKeyLock />}
                                                    text="Departments"
                                                    onClick={() => handleButtonClick("Departments")}
                                                />
                                                <SideBtn
                                                    name="sideBtn"
                                                    id={activeButton === "Work & Visit Hours" ? "active" : ""}
                                                    icon={<GiKeyLock />}
                                                    text="Work & Visit Hours"
                                                    onClick={() => handleButtonClick("Work & Visit Hours")}
                                                />
                                            </>
                                        ) : null
                                    }
                                </>
                            ) : null
                        }
                    </DropDownButton>*/}
                    <SideBtn
                        name="sideBtn"
                        id={activeButton === "Settings" ? "active" : ""}
                        icon={<RiDashboardHorizontalFill />}
                        text="Dashboard"
                        onClick={() => handleButtonClick("Settings")}
                    />
                </div>
                <div className="flex flex-col flex-wrap max-w-full">

                    {props.userType === "Patient" || props.userType === "Doctor" ? (
                        <Button name="button secondary" label="Summarize Records" IconComponent={SummarizeIcon} onClick={handleSummarizeRecords} />
                    ) : null}

                    {/* ========================== */}

                    {props.userType === "Patient" || props.userType === "Doctor" ? (
                        <Button name="button primary" label="Create Access Key" IconComponent={plusIcon} onClick={props.handleCreateAccessKeyClick} />
                    ) : null}

                    {/* ========================== */}
                    <Button name="button logout" label="Logout" IconComponent={logoutIcon} onClick={handleGoout} />
                </div>
            </SideBar >
            <ConfirmedDialog show={isOpenSummarize} handleClose={() => setIsOpenSummarize(!isOpenSummarize)} message={parseRecordString(dataSummarize.summary)} handleOk={handleSaveSummarize} title='AI Summarizing' isSummary={true} />

        </>
    );

}

export default PatientSidebarHandler;
