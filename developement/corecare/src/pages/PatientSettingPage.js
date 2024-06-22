import React,{useState} from "react";
import '../css/settingpagestyle/patientsetting.css';
import { Container } from "react-bootstrap";
import SettingBodyLift from "../component/settingdetails/patientsetting/SettingBodyLift";
import SettingBodyMid from "../component/settingdetails/patientsetting/SettingBodyMid";
import SettingBodyRight from "../component/settingdetails/patientsetting/SettingBodyRight";
import EmergencyContact from "../component/settingdetails/patientsetting/EmergencyContact";
function PatientSettingPage(props){

    const [isOpen , setIsOpen] = useState(false);

    const handleAddContact =()=> {
        setIsOpen(!isOpen);
    };
    return(
        <Container className="PatientSettingPage">
            <SettingBodyLift userType={props.userType}/>
            
            <Container className="PatientSettingPage_right">

                <EmergencyContact isOpen={isOpen}/>

                <Container className="mid_right">
                    
                <SettingBodyMid userType={props.userType}/>
                <SettingBodyRight userType={props.userType} handleAddContact={handleAddContact}/>

                </Container>
            </Container>
        </Container>
    );
    
}
export default PatientSettingPage;