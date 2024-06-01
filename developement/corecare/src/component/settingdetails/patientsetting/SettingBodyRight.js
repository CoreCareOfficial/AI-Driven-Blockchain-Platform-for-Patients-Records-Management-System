import React ,{useState} from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { PiNumberOneFill } from "react-icons/pi";
import { PiNumberSquareTwoFill } from "react-icons/pi";
import { PiNumberThreeFill } from "react-icons/pi";
import { TbTrashXFilled } from "react-icons/tb";
import { Card } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";

function SettingBodyRight({handleAddContact}){
    const icons =[
        {'num':<PiNumberOneFill/>},
        {'num':<PiNumberSquareTwoFill/>},
        {'num':<PiNumberThreeFill/>}
    ]
    const usercontact=[
        {id:1,'name':"ahmed qahtan"},
        {id:2,'name':"ahmed qahtan"},
        {id:3,'name':"ahmed qahtan"},
    ]

    return(
        <>
        <DynamicCard name = "SettingBodyRight">
            
            <DynamicCard name="UserContact">
            <Card.Title style={{color:'white',
            fontSize:'1.2em',
            fontWeight:'500',
            fontFamily:'DM Sans'
            }}>Emergency Contact</Card.Title>
            {
            usercontact.map((EmergencyContact) => (
                <div style={{
                    height:'40px',
                    display:'flex',
                    justifyContent:'space-between',
                    textAlign:'center',
                    alignItems:'center'
                }}>
                    <span>
                        
                        <PiNumberOneFill/>
                    </span>
                        <Card.Text>{EmergencyContact['name']}</Card.Text>
                    <span>
                        {/* event */}
                        <TbTrashXFilled/>
                    </span>
                </div>
                ))
            }
            <IoMdPersonAdd style={{
                color:'white',
                fontSize:'1.3em',
                cursor:'pointer',
                display: usercontact.length <= 2 ? 'block' : 'none'
                }} onClick={usercontact.length <= 2 && handleAddContact} />

            </DynamicCard>

        </DynamicCard>
        </>
    );
    
}
export default SettingBodyRight;