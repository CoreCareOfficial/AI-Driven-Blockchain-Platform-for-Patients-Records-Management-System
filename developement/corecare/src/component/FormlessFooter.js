import "../css/FormlessFooter.css"
import { AiOutlineX } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
function FormlessFooter() {
    return (
        <>
            <footer className="FooterContainer">
                <div className="contact">
                    <h1 className="email-container">
                        <a className="email" href="mailto:corecareofficial@gmail.com">corecareofficial@gmail.com</a>
                    </h1>
                    <p className="phone-container">
                        <a className="phone" href="tel:+967711379934">+967 711 379 934</a>
                    </p>
                </div>

                <div className="logoContainer">
                    <h2 className="textLogo">@corecare 2024</h2>
                </div>

                <div className="followContainer">
                    <h2>Follow for more</h2>
                    <div className="iconContainer">
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
            </footer>
        </>
    );
}

export default FormlessFooter;