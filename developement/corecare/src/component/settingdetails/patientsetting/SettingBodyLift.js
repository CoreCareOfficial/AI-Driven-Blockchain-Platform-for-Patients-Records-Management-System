import React,{useState} from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import {Card, Image } from "react-bootstrap";
import ahmed from '../../../assets/ahmed.jpg';
import { SettingForm, SettingInput, SettingSelect,SettingCountry } from "../TextFormSetting";
import { MdModeEdit } from "react-icons/md";

function SettingBodyLift(){

    const [General, setGeneral] = useState(true);
    const toggleEditGeneral = () => {
        setGeneral(!General);
    };
    const [Health, setHealth] = useState(true);
    const toggleEditHealth = () => {
        setHealth(!Health);
    };

    return(
        <>
        <DynamicCard name = "SettingBodyLift">
            <Image src={ahmed} style={{width:'130px',height:'130px',margin:'0px auto'}} roundedCircle />
            <Card.Title style={{
                textAlign:'center',
                color:"white",
                fontSize:'1.5em',
                marginTop:'5px',
                }}>User Name</Card.Title>

            <SettingForm name="SettingForm_form" legend="General Information" btn="Save Change">
                <span style={{
                    color:'white',
                    position:'absolute',right:'40px',top:'-15px',
                    fontSize:'1.3em',
                    borderRadius:'20px',
                    padding:'5px',
                    backgroundColor:'#272c34',
                    cursor:'pointer',
                }} onClick={toggleEditGeneral}
                ><MdModeEdit/></span>
                <SettingInput class_name="SettingInput" type="text" name="full-name" label="FullName:" placeholder="" disabled={General}/>
                <SettingInput class_name="SettingInput" type="text" name="phone-number" label="Phone Number:" placeholder="" disabled={General}/>
                <SettingInput class_name="SettingInput" type="text" name="address" label="Address:" placeholder="" disabled={General}/>
                <SettingInput class_name="SettingInput" type="text" name="job" label="Job:" placeholder="" disabled={General}/>
                <SettingSelect items={['Male' ,'Female']} label="Sex:" disabled={General}/>
                <SettingInput class_name="SettingInput" type="date" name="date" label="Date Of Birth:" placeholder="" disabled={General}/>
                <SettingCountry  label="Country:" name="country" disabled={General}/>
                <SettingSelect items={['Single' ,'Married']} label="Status:" name="status" disabled={General}/>
            </SettingForm>


            <SettingForm name="SettingForm_form" legend="Health Information" btn="Save Change">
                <span style={{
                    color:'white',
                    position:'absolute',right:'40px',top:'-15px',
                    fontSize:'1.3em',
                    borderRadius:'20px',
                    padding:'5px',
                    backgroundColor:'#272c34',
                    cursor:'pointer',
                }} onClick={toggleEditHealth}
                ><MdModeEdit/></span>
                <SettingSelect items={['A+' ,'A-','B+','B-','AB+','AB-','O+','O-']} name="bold-type" label="Bold Type:" disabled={Health}/>
                <SettingInput class_name="SettingInput" type="number" name="weight" label="Weight:" placeholder="" disabled={Health}/>
                <SettingInput class_name="SettingInput" type="number" name="height" label="Height:" placeholder="" disabled={Health}/>
                <SettingInput class_name="SettingInput" type="text" name="allergies" label="Allergies:" placeholder="" disabled={Health}/>
            </SettingForm>

        </DynamicCard>
        </>
    );
    
}
export default SettingBodyLift;