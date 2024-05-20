import { AiOutlineX } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { IconContext } from "react-icons";

function InfoContainer(props) {
    const XIcon =
        <IconContext.Provider value={{ size: "2rem" }}>
            <AiOutlineX />
        </IconContext.Provider>
    const instaIcon =
        <IconContext.Provider value={{ size: "2rem" }}>
            <AiFillInstagram />
        </IconContext.Provider>
    const linkedinIcon =
        <IconContext.Provider value={{ size: "2rem" }}>
            <AiFillLinkedin />
        </IconContext.Provider>
    const fbIcon =
        <IconContext.Provider value={{ size: "2rem" }}>
            <AiFillFacebook />
        </IconContext.Provider>
    const whatsappIcon =
        <IconContext.Provider value={{ size: "2rem" }}>
            <AiOutlineWhatsApp />
        </IconContext.Provider>
    return (
        <div className="info-container">
            <a href={`https://www.x.com/${props.twitter}`} rel="noreferrer" target="_blank">
                {XIcon}
            </a>
            <a href={`https://www.instagram.com/${props.insta}`} rel="noreferrer" target="_blank">
                {instaIcon}
            </a>
            <a href={`https://www.linkedin.com/${props.linkedin}`} rel="noreferrer" target="_blank">
                {linkedinIcon}
            </a>
            <a href={`https://www.fb.com/${props.fb}`} rel="noreferrer" target="_blank">
                {fbIcon}
            </a>
            <a href={`https://www.whatsapp.com/${props.whatsapp}`} rel="noreferrer" target="_blank">
                {whatsappIcon}
            </a>
        </div>
    )
}

export default InfoContainer


