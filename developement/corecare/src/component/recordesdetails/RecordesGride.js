import React from "react";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Card,Container} from "react-bootstrap";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FaXRay } from "react-icons/fa6";
import { FaFilePrescription } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import H1 from '../H1';
import P from '../P';

function RecordesGride(){
    const icons = [
        {name:"Repotr",val: <MdOutlineReceiptLong />},
        {name:"Summary",val: <FaRegFileLines />},
        {name:"Ray",val: <FaXRay />},
        {name:"Prescripation",val: <FaFilePrescription />},
        {name:"Lab test",val:<FaFileLines />},

        {name:"Repotr",val: <MdOutlineReceiptLong />},
        {name:"Summary",val: <FaRegFileLines />},
        {name:"Ray",val: <FaXRay />},
        {name:"Prescripation",val: <FaFilePrescription />},
        {name:"Lab test",val:<FaFileLines />},
        {name:"Repotr",val: <MdOutlineReceiptLong />},
        {name:"Summary",val: <FaRegFileLines />},
        {name:"Ray",val: <FaXRay />},
        {name:"Prescripation",val: <FaFilePrescription />},
        {name:"Lab test",val:<FaFileLines />},
        {name:"Repotr",val: <MdOutlineReceiptLong />},
        {name:"Summary",val: <FaRegFileLines />},
        {name:"Ray",val: <FaXRay />},
        {name:"Prescripation",val: <FaFilePrescription />},
        {name:"Lab test",val:<FaFileLines />},
    ];

    const Result =  Object.keys(icons).length;
    const RecordsResult ="Showing "+Result+" Records Result";

    return(
        <>
        <div className="Recordes_result">
            <H1 name="result_title" title="All Records"/>
            <P name="result_text"  title={RecordsResult}/>
        </div>
        <Container className = "RecordesGride">
        {icons.map((icon) => (
            <DynamicCard name="RecordesGride_card">
                <DynamicCard name="RecordesGride_innerCard">
                    <span className="RecordesGride_Ic_menu"><BsThreeDotsVertical /></span>
                    <span className="RecordesGride_icon">
                    {icon.val}
                    </span>
                </DynamicCard>
                <Card.Text>DR. AHMED ALSHAMERIDR. AHMED ALSHAMERIDR. AHMED ALSHAMERI</Card.Text>
            </DynamicCard>
        ))}
        </Container>
        </>
    );
}
export default RecordesGride;