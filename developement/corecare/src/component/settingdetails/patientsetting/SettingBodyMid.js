import React from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { SettingForm,SocialSettingInput,PasswordSettingInput } from "../TextFormSetting";
import { AiOutlineX } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

function SettingBodyMid(){
    return(
        <>
        <DynamicCard name = "SettingBodyMid">
        <SettingForm name="SettingForm_form" legend="Password Change" btn="Change Password">
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
                <PasswordSettingInput label="Old Password:"/>
                <PasswordSettingInput label="New Password:"/>
                <PasswordSettingInput label="Confirm Password:"/>
            </SettingForm>


            <SettingForm name="SettingForm_form" legend="Social Media Links" btn="Save Change">
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
                <SocialSettingInput label="Facebook:" icon={<AiFillFacebook/>} placeholder=""/>
                <SocialSettingInput label="Twitter:" icon={<AiOutlineX/>} placeholder=""/>
                <SocialSettingInput label="Linkedin:" icon={<AiFillLinkedin/>} placeholder=""/>
                <SocialSettingInput label="Instagram:" icon={<AiFillInstagram/>} placeholder=""/>
                <SocialSettingInput label="WhatsApp:" icon={<AiOutlineWhatsApp/>} placeholder=""/>
            </SettingForm>
        </DynamicCard>
        </>
    );
    
}
export default SettingBodyMid;