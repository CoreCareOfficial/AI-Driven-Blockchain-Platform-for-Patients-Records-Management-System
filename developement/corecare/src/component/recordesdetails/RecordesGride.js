import React, { useState } from "react";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Card, Container } from "react-bootstrap";
import { IconContext } from "react-icons";
import RecordesMenu from './RecordesMenu';
import { BsThreeDotsVertical } from "react-icons/bs";
import H1 from '../H1';
import P from '../P';

function RecordesGride(props) {

    const [idSelected, setIdSelected] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    // =================================
    const handleMenuClick = ((e) => {
        setIdSelected(e.target.id);
        console.log(e.target.id);
        setIsOpen(!isOpen);
    });
    // =================================
    const handleRecordsResult = () => {
        let count = 0;
        if (props.tableTitle !== "All Records") {
            Object.keys(props.allRecords).forEach((record) => {
                if (props.tableTitle === props.allRecords[record]["Type"]) {
                    count = count + 1;
                }
            });
            return count;
        } else {
            return Object.keys(props.allRecords).length;
        }
    };
    // ===================================
    const recStyle = {
        color: '#fff',
        fontWeight:'600',
        alignContent:'center',
        margin:'0px 35px',
    }
    return (
        <>
            <div className="Recordes_result">
                <H1 name="result_title" title={props.tableTitle} />
                <P name="result_text" title={`Showing ${handleRecordsResult()} Records Results`} />
            </div>

            <div style={{ 
                padding: '5px', 
                width: '100%', 
                height: '8vh',
                display: 'flex', 
                justifyContent: 'space-between',
                borderTop:'1px solid #272c34',
                borderBottom:'1px solid #272c34',
                }}>
                
                <h2 style={recStyle}>Records Name</h2>
                <h3 style={recStyle}>Date Of Records</h3>
            </div>
            <Container className="RecordesGride">
                {Object.keys(props.allRecords).map((record) => (
                    props.tableTitle !== "All Records" ?
                        props.tableTitle === props.allRecords[record]["Type"] &&
                        <>
                            <DynamicCard name="RecordesGride_card" key={props.allRecords[record]['id']}>
                                <DynamicCard name="RecordesGride_innerCard">
                                    <span className="RecordesGride_Ic_menu" >
                                        <IconContext.Provider value={{ className: "RecordesGride_Ic", size: "1.3rem" }}>
                                            <BsThreeDotsVertical id={props.allRecords[record]['id']} onClick={handleMenuClick} />
                                        </IconContext.Provider>
                                    </span>
                                    {/* ======================== */}
                                    <span className="RecordesGride_icon">
                                        {props.icons[props.allRecords[record]["Type"]]}
                                    </span>
                                </DynamicCard>
                                <Card.Text>{props.allRecords[record]["Name Of Record"]}</Card.Text>
                                {
                                    isOpen && idSelected == props.allRecords[record]['id'] &&
                                    <RecordesMenu id={idSelected} open={true} handleMenuClick={handleMenuClick} />
                                }
                            </DynamicCard>
                        </>
                        :
                        <>
                            <DynamicCard name="RecordesGride_card" key={props.allRecords[record]['id']}>
                                <DynamicCard name="RecordesGride_innerCard">
                                    <span className="RecordesGride_Ic_menu" >
                                        <IconContext.Provider value={{ className: "RecordesGride_Ic", size: "1.3rem" }}>
                                            <BsThreeDotsVertical id={props.allRecords[record]['id']} onClick={handleMenuClick} />
                                        </IconContext.Provider>
                                    </span>
                                    {/* ======================== */}
                                    <span className="RecordesGride_icon">
                                        {props.icons[props.allRecords[record]["Type"]]}
                                    </span>
                                </DynamicCard>
                                <Card.Text>{props.allRecords[record]["Name Of Record"]}</Card.Text>
                                {
                                    isOpen && idSelected == props.allRecords[record]['id'] &&
                                    <RecordesMenu id={idSelected} open={true} handleMenuClick={handleMenuClick} />
                                }
                            </DynamicCard>
                        </>

                ))}
            </Container>
        </>
    );
}
export default RecordesGride;