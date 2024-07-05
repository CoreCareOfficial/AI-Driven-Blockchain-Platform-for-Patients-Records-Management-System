import { useState } from 'react';
import { BsPerson } from "react-icons/bs";
import { FaFileMedical } from "react-icons/fa";
import { MdEventNote } from "react-icons/md"
import { AiFillSetting } from "react-icons/ai";
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


function PatientSidebarHandler(props) {
    const [activeButton, setActiveButton] = useState("Profile");

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
        props.handleButtonClick(buttonText);
    };

    const logoutIcon =
        <IconContext.Provider value={{ className: "logout", size: "2rem" }}>
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

                    {props.userType ==="Patient" || props.userType ==="Doctor"? (
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
                            id={activeButton === "Additional Records" ? "active" : ""}
                            icon={<LuFolderPlus />}
                            text="Additional Records"
                            onClick={() => handleButtonClick("Additional Records")}
                        />
                    </DropDownButton>
                    ) : null}

                    {/* ================================== */}

                    {props.userType ==="Hospital"? (
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

                    {props.userType !=="Patient"? (
                        <SideBtn
                            name="sideBtn"
                            id={activeButton === "Patient Access Management" ? "active" : ""}
                            icon={<FaHospitalUser />}
                            text="Patient Access Management"
                            numofnotification={10}
                            display={true}
                            onClick={() => handleButtonClick("Patient Access Management")}
                        />
                    ) : null}

                    {/* ================================== */}

                    {props.userType ==="Patient" || props.userType ==="Doctor"? (
                        <SideBtn
                        name="sideBtn"
                        id={activeButton === "Appointment Schedule" ? "active" : ""}
                        icon={<MdEventNote />}
                        text="Appointment Schedule"
                        onClick={() => handleButtonClick("Appointment Schedule")}
                        />
                    ) : null}

                    {/* ================================== */}

                    <SideBtn
                        name="sideBtn"
                        id={activeButton === "Settings" ? "active" : ""}
                        icon={<AiFillSetting />}
                        text="Settings"
                        onClick={() => handleButtonClick("Settings")}
                    />
                </div>
                <div className="flex flex-col flex-wrap max-w-full">
                    
                    {props.userType ==="Patient" || props.userType ==="Doctor"? (
                        <Button name="button secondary" label="Summarize Records" IconComponent={SummarizeIcon} />
                    ) : null }
                    
                    {/* ========================== */}

                    {props.userType ==="Patient" || props.userType ==="Doctor"? (
                    <Button name="button primary" label="Create Access Key" IconComponent={plusIcon} />
                    ):null}

                    {/* ========================== */}
                    <Button name="button logout" label="Logout" IconComponent={logoutIcon} />
                </div>
            </SideBar >
        </>
    );

}

export default PatientSidebarHandler;
