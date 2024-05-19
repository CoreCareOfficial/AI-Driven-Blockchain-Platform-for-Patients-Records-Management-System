import "../../css/UserPageStyle/sidebar.css"
import "../../css/UserPageStyle/icon.css"
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


function SideBar() {

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
        <div className="Container">
            <div className="Wrapper">
                <H1 name="Title" title="Core Care" />
                <SideBtn name="sideBtn active" icon={<BsPerson />} text="Profile" />
                <DropDownButton icon={<FaFileMedical />} text="Patient Records" >
                    <SideBtn name="sideBtn" icon={<FaFolderOpen />} text="All Records" />
                    <SideBtn name="sideBtn" icon={<MdOutlineReceiptLong />} text="Reports" />
                    <SideBtn name="sideBtn" icon={<FaRegFileLines />} text="Examinations" />
                    <SideBtn name="sideBtn" icon={<FaXRay />} text="X Rays" />
                    <SideBtn name="sideBtn" icon={<FaFilePrescription />} text="Prescription" />
                    <SideBtn name="sideBtn" icon={<LuFolderPlus />} text="Additional Records" />
                </DropDownButton>
                <SideBtn name="sideBtn" icon={<MdEventNote />} text="Appointment Schedule" />
                <SideBtn name="sideBtn" icon={<AiFillSetting />} text="Settings" />
                <Button name="button secondary" label="Summarize Records" IconComponent={SummarizeIcon} />
                <Button name="button primary" label="Create Access Key" IconComponent={plusIcon} />
                <Button name="button logout" label="Logout" IconComponent={logoutIcon} />
            </div>
        </div>


    );
}

export default SideBar;