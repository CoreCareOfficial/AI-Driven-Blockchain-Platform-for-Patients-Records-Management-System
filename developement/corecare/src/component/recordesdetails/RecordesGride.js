import React, { useEffect, useState } from "react";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Card, Container } from "react-bootstrap";
import { IconContext } from "react-icons";
import RecordesMenu from './RecordesMenu';
import { BsThreeDotsVertical } from "react-icons/bs";
import H1 from '../H1';
import P from '../P';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import "../../css/UserPageStyle/dropdownbutton.css";

function RecordesGride(props) {

    const allRecords = props.records || [];
    const reports = props.reports || [];
    const labTests = props.labTests || [];
    const radiologies = props.radiologies || [];
    const prescriptons = props.prescriptons || [];
    const [recordsList, setRecordsList] = useState([]);
    useEffect(() => {
        switch (props.tableTitle) {
            case "Report":
                setRecordsList(reports);
                break;
            case "Lab test":
                setRecordsList(labTests);
                break;
            case "Radiology":
                setRecordsList(radiologies);
                break;
            case "Prescription":
                setRecordsList(prescriptons);
                break;
            default:
                setRecordsList(allRecords);
                break;
        }
    }, [props.tableTitle, reports, labTests, radiologies, prescriptons, allRecords]); // Include dependencies here

    const [idSelected, setIdSelected] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    // =================================
    const handleMenuClick = ((e) => {
        setIdSelected(e.target.id);
        console.log(e.target.id);
        setIsOpen(!isOpen);
    });
    // =================================
    // const handleRecordsResult = () => {
    //     let count = 0;
    //     if (props.tableTitle !== "All Records") {
    //         Object.keys(props.allRecords).forEach((record) => {
    //             if (props.tableTitle === props.allRecords[record]["Type"]) {
    //                 count = count + 1;
    //             }
    //         });
    //         return count;
    //     } else {
    //         return Object.keys(props.allRecords).length;
    //     }
    // };
    // ===================================
    const recStyle = {
        color: '#fff',
        fontWeight: '600',
        alignContent: 'center',
        margin: '0px 35px',
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [expanded, setExpanded] = useState({});

    const handleClick = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    return (
        <>
            <div className="Recordes_result">
                <H1 name="result_title" title={`${props.tableTitle}s`} />
                <P name="result_text" title={`Showing ${recordsList.length} Records Results`} />
            </div>

            {props.tableTitle === "All Records" ? (
                allRecords.map((record) => {
                    const isExpanded = !!expanded[record.key];
                    return (
                        <>
                            <div style={{
                                padding: '5px',
                                width: '100%',
                                height: '8vh',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderTop: '1px solid #272c34',
                                borderBottom: '1px solid #272c34',
                            }}>
                                <div style={{ display: 'flex' }}>
                                    <div className="dropdown-button" onClick={() => handleClick(record.key)}>
                                        <p><span style={{ fontSize: '25px' }}>
                                            {isExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                                        </span></p>
                                    </div>
                                    <h2 style={recStyle}>{record.data["name"]}</h2>
                                </div>
                                <h3 style={recStyle}>{formatDate(record.data["date"])}</h3>
                            </div>
                            <Container className="RecordesGride" style={{ paddingLeft: '50px' }}>
                                {
                                    isExpanded && record.children && record.children.map((child) => (
                                        <DynamicCard name="RecordesGride_card" key={child.key}>
                                            <DynamicCard name="RecordesGride_innerCard">
                                                <span className="RecordesGride_Ic_menu" >
                                                    <IconContext.Provider value={{ className: "RecordesGride_Ic", size: "1.3rem" }}>
                                                        <BsThreeDotsVertical id={child.key} onClick={handleMenuClick} />
                                                    </IconContext.Provider>
                                                </span>
                                                {/* ======================== */}
                                                <span className="RecordesGride_icon">
                                                    {props.icons[child.data["type"]]}
                                                </span>
                                            </DynamicCard>
                                            <Card.Text>{child.data["name"]}</Card.Text>
                                            {
                                                isOpen && idSelected === child.key &&
                                                <RecordesMenu id={idSelected} open={true} handleMenuClick={handleMenuClick} />
                                            }
                                        </DynamicCard>
                                    ))
                                }
                            </Container>
                        </>
                    )
                }))
                : (
                    <Container className="RecordesGride" style={{ paddingLeft: '50px' }}>
                        {recordsList.map((child) => (
                            <DynamicCard name="RecordesGride_card" key={child.key}>
                                <DynamicCard name="RecordesGride_innerCard">
                                    <span className="RecordesGride_Ic_menu" >
                                        <IconContext.Provider value={{ className: "RecordesGride_Ic", size: "1.3rem" }}>
                                            <BsThreeDotsVertical id={child.key} onClick={handleMenuClick} />
                                        </IconContext.Provider>
                                    </span>
                                    {/* ======================== */}
                                    <span className="RecordesGride_icon">
                                        {props.icons[child.data["type"]]}
                                    </span>
                                </DynamicCard>
                                <Card.Text>{child.data["name"]}</Card.Text>
                                {
                                    isOpen && idSelected === child.key &&
                                    <RecordesMenu id={idSelected} open={true} handleMenuClick={handleMenuClick} />
                                }
                            </DynamicCard>
                        )
                        )}
                    </Container>
                )
            }
            {/* <Container className="RecordesGride">
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
            </Container> */}
        </>
    );
}
export default RecordesGride;