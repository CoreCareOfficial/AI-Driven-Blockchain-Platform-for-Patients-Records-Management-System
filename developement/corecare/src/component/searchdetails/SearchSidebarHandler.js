import { useState } from 'react';
import { BsPerson } from "react-icons/bs";
import { FaFileMedical } from "react-icons/fa";
import { MdEventNote } from "react-icons/md"
import { AiFillSetting } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { HiPlus } from "react-icons/hi2";
import { MdSummarize } from "react-icons/md";
import DropDownButton from "../UserDetails/DropDownButton";
import { FaFolderOpen } from "react-icons/fa";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FaXRay } from "react-icons/fa";
import { FaFilePrescription } from "react-icons/fa6";
import { LuFolderPlus } from "react-icons/lu";
import { FaHospitalUser } from "react-icons/fa6";
import H1 from '../H1';
import P from '../P';
import SideBar from '../UserDetails/SideBar';
import SideBtn from '../UserDetails/SideBtn';
import Button from '../UserDetails/Button';
import SearchCheckBox from './SearchCheckBox';
function SearchSidebarHandler(props) {
    const [activeButton, setActiveButton] = useState("Profile");

    const medicalSpecializations = [
        'Anesthetics',
        'Breast Screening',
        'Cardiology',
        'Ear, nose and throat (ENT)',
        'Elderly services department',
        'Gastroenterology',
        'General Surgery',
        'Gynecology',
        'Hematology',
        'Neonatal Unit',
        'Neurology',
        'Nutrition and dietetics',
        'Obstetrics and gynecology units',
        'Oncology',
        'Ophthalmology',
        'Orthopedics',
        'Physiotherapy',
        'Renal Unit',
        'Sexual Health',
        'Urology'
    ]


    const logoutIcon =
        <IconContext.Provider value={{ className: "logout", size: "2rem" }}>
            <IoLogOutOutline />
        </IconContext.Provider>

    return (
        <>
            <SideBar >
                <div className="sidebar-content">
                    <H1 name="Title" title="Refine Your Search" />
                    <p style={{color:'#fff'}}>Specialty</p>
                    {medicalSpecializations.map((specialization, index) => (
                    <SearchCheckBox id={index} name="specialization" value={specialization}/>
                    ))}
                </div>

                <div className="flex flex-col flex-wrap max-w-full">
                    <Button name="button secondary" label="Update Search"/>
                    <Button name="button logout" label="Logout" IconComponent={logoutIcon} />
                </div>
            </SideBar >
        </>
    );

}

export default SearchSidebarHandler;
