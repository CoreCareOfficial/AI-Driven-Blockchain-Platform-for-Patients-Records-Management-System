import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdMoreHoriz } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import H1 from '../H1';
import P from '../P';
import RecordesMenu from '../recordesdetails/RecordesMenu';
import ConfirmedDialog from '../../utiles/ConfirmedDialog';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Toast } from 'primereact/toast';
// import { loginInfo } from '../../Recoil/Atom';
// import { useRecoilValue } from 'recoil';

function SharedRecords(props) {
    const allRecords = props.records || [];
    const reports = props.reports || [];
    const labTests = props.labTests || [];
    const radiologies = props.radiologies || [];
    const prescriptons = props.prescriptons || [];
    const GeneralReport = props.GeneralReport || [];
    const prescribedradiologytes = props.prescribedradiologytes || [];
    const prescribedlabtest = props.prescribedlabtes || [];
    const [recordsList, setRecordsList] = useState([]);
    const [fileSelected, setFileSelected] = useState({ id: '', data: {} });
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpenSummarize, setIsOpenSummarize] = useState(false);
    const [dataSummarize, setDataSummarize] = useState({ summary: '' });
    const itemRight = 50;

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
            case "General Report":
                setRecordsList(GeneralReport);
                break;
            case "prescribed radiology test":
                setRecordsList(prescribedradiologytes);
                break;
            case "prescribed lab test":
                setRecordsList(prescribedlabtest);
                console.log('prescribedlabtest', prescribedlabtest);
                break;
            default:
                setRecordsList(allRecords);
                break;
        }
    }, [props.tableTitle, reports, labTests, radiologies, prescriptons, allRecords, prescribedlabtest, prescribedradiologytes, GeneralReport]); // Include dependencies here

    const handleMenuClick = (e, data) => {
        console.log('data', data);
        const rect = e.target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setMenuPosition({ top: rect.top + scrollTop, left: rect.left });
        setFileSelected({ id: e.target.id, data: data });
        setIsOpen(!isOpen);
    };

    const handleSummarize = (data) => {
        setDataSummarize(data);
        setIsOpenSummarize(!isOpenSummarize);
    }

    // const userInfoValue = useRecoilValue(loginInfo);
    const handleSaveSummarize = async () => {
        if (props.patientid === '' && dataSummarize.summary === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login First' });
            return;
        }
        const data = {
            patientid: props.patientid,
            summary: dataSummarize.summary,
            recordid: dataSummarize.recordid,
            resultid: dataSummarize.resultid,
        }
        try {
            const response = await fetch(`https://corecare-server-qtw7.onrender.com/records/savesummary`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Summary Saved' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Summary Saved' });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Summary Saved' });
        }
        console.log('Save Summarize');
        setIsOpenSummarize(!isOpenSummarize);
    }

    const [expanded, setExpanded] = useState({});

    const handleClick = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    const [starred, setStarred] = useState({});
    const handleStarred = (id, state) => {
        console.log('id', id);
        setStarred((prevState) => ({
            ...prevState,
            [id]: state,
        }));
    };

    const parseRecordString = (recordString) => {
        let htmlContent = recordString
            .replace(/## (.*)/g, '<h2>$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\* (.*?)/g, '<li>$1</li>') // Replace bullet points with list items
            .replace(/\n/g, '<br>'); // Replace newlines with <br>

        // Wrap list items with <ul>
        htmlContent = htmlContent.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

        // Remove unnecessary <br> before <ul> and after </ul>
        htmlContent = htmlContent.replace(/<br><ul>/g, '<ul>').replace(/<\/ul><br>/g, '</ul>');

        return htmlContent;
    };

    const handleMenuVerticalClick = (e, data) => {
        console.log('e.id', e.target.id);
        const rect = e.target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        setMenuPosition({ top: rect.top + scrollTop, left: rect.left });
        setFileSelected({ id: e.target.id, data: data, handleStarred: () => handleStarred });
        setIsOpen2(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    let c = 0;

    const title = props.tableTitle === "All Records" ? "Records" : `${props.tableTitle}s`;

    const toast = useRef(null);
    const handleToast = (t) => {
        toast.current.show(t)
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="Recordes_result">
                <H1 name="result_title" title={`All ${title}`} />
                <P name="result_text" title={`Showing ${recordsList.length} ${title} Results`} />
            </div>
            <table className="records_table">
                <thead className="records_thead">
                    <tr className="thead_tr">
                        <th></th>
                        <th></th>
                        <th colSpan={2} style={{ width: '35%' }}>Name Of Record</th>
                        <th style={{ width: '16%' }}>Type</th>
                        <th>Name Of Health Provider</th>
                        <th>Date Of Upload</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.tableTitle === "All Records" ? (
                        allRecords.map((record) => {
                            const isExpanded = !!expanded[record.key];
                            let isStarred = false;
                            if ((record.data.star && !starred[record.key]) || (starred[record.key] && !record.data.star)) {
                                isStarred = true;
                            }
                            return (
                                <React.Fragment key={record.key}>
                                    <tr className={`tbody_tr ${c % 2 === 0 && "tr_color"}`}>
                                        <td>
                                            <div className="dropdown-button" onClick={() => handleClick(record.key)}>
                                                <p><span style={{ fontSize: '25px' }}>{isExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}</span></p>
                                            </div>
                                        </td>
                                        <td colSpan={3}>{record.data["name"]}</td>
                                        <td>{record.data["type"]}</td>
                                        <td>{record.data["Name Of Health Provider"]}</td>
                                        <td>{formatDate(record.data["date"])}</td>
                                        <td><span style={{ display: isStarred ? 'block' : 'none', fontSize: '16px' }}><IoStarSharp /></span></td>
                                        <td><span style={{ cursor: "pointer" }} >
                                            <BsThreeDotsVertical id={record.key} onClick={(e) => handleMenuVerticalClick(e, record.data)} />
                                        </span></td>
                                    </tr>
                                    <p style={{ display: 'none' }}>{c++}</p>
                                    {isExpanded && record.children && record.children.map((child) => {
                                        let isStarred = false;
                                        if ((child.data.star && !starred[child.key]) || (starred[child.key] && !child.data.star)) {
                                            isStarred = true;
                                        }
                                        const typeFile = child.data["type"] === "prescribed lab test" ? "Prescribed Lab" : child.data["type"] === "prescribed radiology test" ? "Prescribed Radiology" : child.data["type"];
                                        return (
                                            <>
                                                <tr className={`tbody_tr ${c % 2 === 0 && "tr_color"}`} key={child.key}>
                                                    <td></td>
                                                    <td><span style={{ display: isStarred ? 'block' : 'none', fontSize: '16px' }}><IoStarSharp /></span></td>
                                                    <td><span>{props.icons[child.data["type"]]}</span></td>
                                                    <td>{child.data["name"]}</td>
                                                    <td>{typeFile}</td>
                                                    <td>{child.data["Name Of Health Provider"]}</td>
                                                    <td>{formatDate(child.data["date"])}</td>
                                                    {console.log('child.data', child.data)}
                                                    <td><span style={{ cursor: 'pointer' }}><MdMoreHoriz id={child.key} onClick={(e) => handleMenuClick(e, child.data)} /></span></td>
                                                    <td></td>
                                                </tr>
                                                <p style={{ display: 'none' }}>{c++}</p>
                                            </>
                                        )
                                    }
                                    )}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        recordsList.map((record, i) => {
                            let isStarred = false;
                            if ((record.data.star && !starred[record.key]) || (starred[record.key] && !record.data.star)) {
                                isStarred = true;
                            }
                            const typeFile = record.data["type"] === "prescribed lab test" ? "Prescribed Lab" : record.data["type"] === "prescribed radiology test" ? "Prescribed Radiology" : record.data["type"];
                            return (
                                <tr className={`tbody_tr ${i % 2 === 0 && "tr_color"}`} key={record.key}>
                                    <td></td>
                                    <td><span style={{ display: isStarred ? 'block' : 'none', fontSize: '16px' }}><IoStarSharp /></span></td>
                                    <td><span>{props.icons[record.data["type"]]}</span></td>
                                    <td>{record.data["name"]}</td>
                                    <td>{typeFile}</td>
                                    <td>{record.data["Name Of Health Provider"]}</td>
                                    <td>{formatDate(record.data["date"])}</td>
                                    {console.log('child.data', record.data)}
                                    <td><span style={{ cursor: 'pointer' }}><MdMoreHoriz id={record.key} onClick={(e) => handleMenuClick(e, record.data)} /></span></td>
                                    <td></td>
                                </tr>
                            )
                        }
                        )
                    )}
                </tbody>
                <ConfirmedDialog show={isOpenSummarize} handleClose={() => setIsOpenSummarize(!isOpenSummarize)} message={parseRecordString(dataSummarize.summary)} handleOk={handleSaveSummarize} title='AI Summarizing' isSummary={true} />
                {isOpen && <RecordesMenu patientId={props.patientid} file={fileSelected} top={menuPosition.top} right={itemRight} toast={handleToast} open={true} handleMenuClick={() => setIsOpen(!isOpen)} refresh={handleStarred} handleSummarize={handleSummarize} />}
                {isOpen2 && <RecordesMenu patientId={props.patientid} file={fileSelected} top={menuPosition.top} right={itemRight} toast={handleToast} open={true} handleMenuClick={() => setIsOpen2(!isOpen2)} isRecord={true} handleExpanded={handleClick} refresh={handleStarred} handleSummarize={handleSummarize} />}
            </table >
        </>
    );

}
export default SharedRecords;