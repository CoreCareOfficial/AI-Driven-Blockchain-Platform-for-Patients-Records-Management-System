import { MdPersonOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { FaVenusMars } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import { MdOutlineEditRoad } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { MdBloodtype } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";
import { MdWorkOutline } from "react-icons/md";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Card, Image } from "react-bootstrap";
import ahmed from "../../assets/ahmed.jpg";
import blood from "../../assets/blood.png";
import sugar from "../../assets/suger.png";
import weight from "../../assets/weight.png";
import height from "../../assets/height.png";
import pressure from "../../assets/pressure.png";
import respiratory from "../../assets/respiratory.png";
import heart from "../../assets/heart.png";
import allergies from "../../assets/allergies.png";

function ProfileBody() {
  return (
    <div className="profile-body">
      <div className="profile-body-left">
        <div className="profile-body-left-top">
          <div className="general-info">
            <h3>General Information :</h3>
            <div className="general-info-container">
              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <MdPersonOutline />
                  </span>
                  <p> Full Name :</p>
                </div>
                <p className="value">Osama Alathwari</p>
              </div>

              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <MdAlternateEmail />
                  </span>
                  <p> Email :</p>
                </div>
                <p className="value">Osama@gmail.com</p>
              </div>

              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <FaVenusMars />
                  </span>
                  <p> Gender :</p>
                </div>
                <p className="value">Male</p>
              </div>
              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <MdLocalPhone />
                  </span>
                  <p> Phone Number :</p>
                </div>
                <p className="value">+967711379934</p>
              </div>
              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <MdCalendarToday />
                  </span>
                  <p> Date of Birth :</p>
                </div>
                <p className="value">8 sep 1995</p>
              </div>
              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <MdOutlineEditRoad />
                  </span>
                  <p> Address :</p>
                </div>
                <p className="value">Yemen, Taiz, Gamal Street</p>
              </div>
              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <MdLanguage />
                  </span>
                  <p> Nationality :</p>
                </div>
                <p className="value">Yemeni</p>
              </div>
              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <MdBloodtype />
                  </span>
                  <p> Blood Type :</p>
                </div>
                <p className="value">A+</p>
              </div>
              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <GrStatusGoodSmall />
                  </span>
                  <p> Status :</p>
                </div>
                <p className="value">Osama</p>
              </div>
              <div className="general-info-item">
                <div className="general-info-item-icon">
                  <span className="icon">
                    <MdWorkOutline />
                  </span>
                  <p> Job :</p>
                </div>
                <p className="value">Fucker</p>
              </div>
            </div>
          </div>
          <div className="profile-body-left-bottom">
            <div className="current-medication">
              <h5>Current Medication :</h5>
              <div className="current-medication-container">
                <ul>
                  <li>Medication 1</li>
                  <li>Medication 2</li>
                  <li>Medication 3</li>
                </ul>
              </div>
            </div>
            <div className="past-condition">
              <h5 >Past Condition :</h5>
              <div className="past-condition-container">
                <ul>
                  <li>Condition 1</li>
                  <li>Condition 2</li>
                  <li>Condition 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-body-right">
        <h3>Health Information :</h3>
        <div className="flex flex-col my-1">
          <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
              <img src={blood} alt="ahmed" className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto">
              <h5 className="font-bold">Blood (HP) :</h5>
              <p className="text-slate-500">2 weeks ago</p>
            </div>
            <div className="m-auto text-white">11</div>
          </div>
          <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
              <img src={sugar} alt="ahmed" className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto">
              <h5 className="font-bold">Blood Sugar :</h5>
              <p className="text-slate-500">3 weeks ago</p>
            </div>
            <div className="m-auto text-white">90</div>
          </div>
          <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
              <img src={pressure} alt="ahmed" className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto">
              <h5 className="font-bold">Blood Pressure :</h5>
              <p className="text-slate-500">2 years ago</p>
            </div>
            <div className="m-auto text-white">115</div>
          </div>
          <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
              <img src={heart} alt="ahmed" className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto">
              <h5 className="font-bold">Heart Rate (Pulse):</h5>
              <p className="text-slate-500">5 Years Ago ago</p>
            </div>
            <div className="m-auto text-white">70/m</div>
          </div>
          <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
              <img src={respiratory} alt="ahmed" className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto">
              <h5 className="font-bold">Respiratory Rate :</h5>
              <p className="text-slate-500">3 Years ago</p>
            </div>
            <div className="m-auto text-white">15/m</div>
          </div>
          <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
              <img src={allergies} alt="ahmed" className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto">
              <h5 className="font-bold">Allergies :</h5>
              <p className="text-slate-500">0 weeks ago</p>
            </div>
            <div className="m-auto text-white">null</div>
          </div>
          <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
              <img src={weight} alt="ahmed" className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto">
              <h5 className="font-bold">Weight :</h5>
              <p className="text-slate-500">3 months ago</p>
            </div>
            <div className="m-auto text-white">54 kg</div>
          </div>
          <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
              <img src={height} alt="ahmed" className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto">
              <h5 className="font-bold">Height :</h5>
              <p className="text-slate-500">4 Years ago</p>
            </div>
            <div className="m-auto text-white">170 cm</div>
          </div>
        </div>
      </div>
      <div className="profile-body-bottom">
        <h3>Previos Doctors :</h3>
        <div className="previous-doctors-container">
          <DynamicCard name="previous-doctor-card">
            <Image src={ahmed} roundedCircle />
            <Card.Title>Ahmed Qahtan</Card.Title>
            <Card.Text>Software Engineer</Card.Text>
          </DynamicCard>
          <DynamicCard name="previous-doctor-card">
            <Image src={ahmed} roundedCircle />
            <Card.Title>Ahmed Qahtan</Card.Title>
            <Card.Text>Software Engineer</Card.Text>
          </DynamicCard>

        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
