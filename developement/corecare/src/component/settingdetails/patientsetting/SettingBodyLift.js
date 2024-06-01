import React from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import {Card, Image } from "react-bootstrap";
import ahmed from '../../../assets/ahmed.jpg';
import { SettingForm, SettingInput, SettingSelect,SettingCountry } from "../TextFormSetting";
import { MdModeEdit } from "react-icons/md";

function SettingBodyLift(){
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
                }}
                ><MdModeEdit/></span>
                <SettingInput name="SettingInput" type="text" label="FullName:" placeholder=""/>
                <SettingInput name="SettingInput" type="text" label="Phone Number:" placeholder=""/>
                <SettingInput name="SettingInput" type="text" label="Address:" placeholder=""/>
                <SettingInput name="SettingInput" type="text" label="Job:" placeholder=""/>
                <SettingSelect items={['Male' ,'Female']} label="Sex:"/>
                <SettingInput name="SettingInput" type="date" label="Date Of Birth:" placeholder=""/>
                <SettingCountry  label="Country:"/>
                <SettingSelect items={['Single' ,'Married']} label="Status:"/>
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
                }}
                ><MdModeEdit/></span>
                <SettingSelect items={['A+' ,'A-','B+','B-','AB+','AB-','O+','O-']} label="Bold Type:"/>
                <SettingInput name="SettingInput" type="number" label="Weight:" placeholder=""/>
                <SettingInput name="SettingInput" type="number" label="Height:" placeholder=""/>
                <SettingInput name="SettingInput" type="text" label="Allergies:" placeholder=""/>
            </SettingForm>

        </DynamicCard>
        </>
    );
    
}
export default SettingBodyLift;