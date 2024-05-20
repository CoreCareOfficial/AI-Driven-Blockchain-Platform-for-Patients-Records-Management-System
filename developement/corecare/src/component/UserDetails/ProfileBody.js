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
              <h5>Past Condition :</h5>
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
        <div className="health-info-container">
          <div className="health-info-item">
            <p>Height :</p>
            <p>170 cm</p>
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
