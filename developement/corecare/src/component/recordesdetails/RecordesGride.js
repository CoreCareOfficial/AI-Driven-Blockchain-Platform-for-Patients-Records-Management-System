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
import { IoStarSharp } from 'react-icons/io5';

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

    const [fileSelected, setFileSelected] = useState({ id: '', data: {} });
    const [isOpen, setIsOpen] = useState(false);
    // =================================
    const handleMenuClick = (e, data) => {
        setFileSelected({ id: e.target.id, data: data });
        setIsOpen(!isOpen);
    };
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

    const title = props.tableTitle === "All Records" ? "Records" : `${props.tableTitle}s`;
    return (
        <>
            <div className="Recordes_result">
                <H1 name="result_title" title={`All ${title}`} />
                <P name="result_text" title={`Showing ${recordsList.length} ${title} Results`} />
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
                                                <span style={{ display: child.data["star"] ? 'block' : 'none', position: 'absolute', left: '10px', top: '10px', color: '#fff', fontSize: '1.1rem' }}><IoStarSharp /></span>
                                                <span className="RecordesGride_Ic_menu" >
                                                    <IconContext.Provider value={{ className: "RecordesGride_Ic", size: "1.3rem" }}>
                                                        <BsThreeDotsVertical id={child.key} onClick={(e) => handleMenuClick(e, child.data)} />
                                                    </IconContext.Provider>
                                                </span>
                                                <span className="RecordesGride_icon">
                                                    {props.icons[child.data["type"]]}
                                                </span>
                                            </DynamicCard>
                                            <Card.Text>{child.data["name"]}</Card.Text>
                                            {
                                                isOpen && fileSelected.id === child.key &&
                                                <RecordesMenu file={fileSelected} open={true} handleMenuClick={() => setIsOpen(!isOpen)} />
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
                                    <span style={{ display: child.data["star"] ? 'block' : 'none', position: 'absolute', left: '10px', top: '10px', color: '#fff', fontSize: '1.1rem' }}><IoStarSharp /></span>
                                    <span className="RecordesGride_Ic_menu" >
                                        <IconContext.Provider value={{ className: "RecordesGride_Ic", size: "1.3rem" }}>
                                            <BsThreeDotsVertical id={child.key} onClick={(e) => handleMenuClick(e, child.data)} />
                                        </IconContext.Provider>
                                    </span>
                                    <span className="RecordesGride_icon">
                                        {props.icons[child.data["type"]]}
                                    </span>
                                </DynamicCard>
                                <Card.Text>{child.data["name"]}</Card.Text>
                                {
                                    isOpen && fileSelected.id === child.key &&
                                    <RecordesMenu file={fileSelected} open={true} handleMenuClick={() => setIsOpen(!isOpen)} />
                                }
                            </DynamicCard>
                        )
                        )}
                    </Container>
                )
            }
        </>
    );
}
export default RecordesGride;