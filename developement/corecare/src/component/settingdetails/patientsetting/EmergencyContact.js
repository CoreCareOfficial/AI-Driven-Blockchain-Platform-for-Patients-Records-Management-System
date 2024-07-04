import React from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { AddEmergency } from "../TextFormSetting";
import { Card } from "react-bootstrap";

function EmergencyContact(props) {
    return (
        <>
            <div className="EmergencyContact"
                style={props.isOpen ? { display: "block" } : { display: "none" }}>
                <DynamicCard name="addUserContact">
                    <Card.Title style={{ color: 'white' }}>Add Emergency Contact</Card.Title>
                    <AddEmergency
                        name="addUserContact"
                        type="text" btn="Add"
                        placeholder='Write Email OR Username of Emergency Contact....'
                        TheEvent={props.handleAddContact}
                        handleAddContactSuccessful={props.handleAddContactSuccessful}
                        userid={props.userid ? props.userid : ''}
                    />
                </DynamicCard>
            </div>
        </>
    );

}
export default EmergencyContact;