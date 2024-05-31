import React from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { AddEmergency } from "../TextFormSetting";
import { Card } from "react-bootstrap";

function EmergencyContact({isOpen}){
    return(
        <>
        <div className = "EmergencyContact"
        style={isOpen?{display:"block"}:{display:"none"}}>
            <DynamicCard name="addUserContact">
            <Card.Title style={{color:'white'}}>Add Emergency Contact</Card.Title>
                <AddEmergency type="text" btn="Add" />
            </DynamicCard>
        </div>
        </>
    );
    
}
export default EmergencyContact;