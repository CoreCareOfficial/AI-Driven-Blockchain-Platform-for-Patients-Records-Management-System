import "../../css/UserPageStyle/profile.css"
import Osama from '../../assets/osama.jpg'
import { AiOutlineX } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";



function Profile() {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-header-icon">
                    <div><MdErrorOutline /></div>
                    <div><IoMdNotifications /></div>
                    <div><CiSettings /></div>
                    <div><AiOutlineX /></div>
                </div>
                <div className="image-name-container">
                    <div className="image-container">
                        <img src={Osama} alt="Profile" />
                    </div>
                    <div className="name-container">
                        <p>Username</p>
                        <p>Name</p>
                        <p>Male, 29 years old</p>
                    </div>
                </div>
                <div className="info-container">
                    <a href="https://www.x.com" rel="noreferrer" target="_blank">
                        <AiOutlineX />
                    </a>
                    <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
                        <AiFillInstagram />
                    </a>
                    <a href="https://www.linkedin.com" rel="noreferrer" target="_blank">
                        <AiFillLinkedin />
                    </a>
                    <a href="https://www.fb.com" rel="noreferrer" target="_blank">
                        <AiFillFacebook />
                    </a>
                    <a href="https://www.whatsapp.com" rel="noreferrer" target="_blank">
                        <AiOutlineWhatsApp />
                    </a>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default Profile;

