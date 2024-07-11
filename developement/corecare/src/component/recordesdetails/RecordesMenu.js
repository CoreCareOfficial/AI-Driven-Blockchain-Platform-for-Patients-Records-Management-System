import React from "react";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineFileOpen } from "react-icons/md";
import { MdOutlineSummarize } from "react-icons/md";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import queryString from 'query-string';

function RecordesMenu(props) {

    const selectedFile = props.file || { id: '', type: '' };

    // const navigate = useNavigate();

    const handleOpenFile = async () => {
        if (selectedFile.id === '') {
            alert('No file selected');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/records/getresult/${selectedFile.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            console.log(`Success loading :`, jsonData);

            const byteCharacters = atob(jsonData.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const fileUrl = URL.createObjectURL(blob);
            const query = queryString.stringify({ pdfUrl: fileUrl });
            window.open(`/read-pdf?${query}`, '_blank');
        } catch (err) {
            console.error("Error:", err);
        }

        // alert(`Open file ${selectedFile.id} of type ${selectedFile.type}`);
        // if (!file) {
        //     console.log('No file selected');
        //     return
        // };

        // const fileUrl = URL.createObjectURL(file);
        // navigate('/pdf');
    }

    return (
        <>
            <div className="RecordesMen" style={{
                top: `${props.top}px`,
                right: `${props.right}px`,
                display: `${props.open ? 'block' : 'none'}`
            }}>

                <DynamicCard name="RecordesMen_card">
                    <span onClick={props.handleMenuClick} className="RecordesMen_close"><IoClose /></span>

                    {/* <Link to="" className="link_route"> */}
                    <Button variant="" style={{ transition: '0.7s ease' }} onClick={handleOpenFile}>
                        <span className="span"><MdOutlineFileOpen /></span> Open
                    </Button>{' '}
                    {/* </Link> */}
                    <Link to="" className="link_route">
                        <Button variant="" style={{ transition: '0.7s ease' }}>
                            <span className="span"><MdOutlineSummarize /></span> Summarize
                        </Button>{' '}
                    </Link>
                    <Link to="" className="link_route">
                        <Button variant="" style={{ transition: '0.7s ease' }}>
                            <span className="span"><MdOutlineLocalPrintshop /></span> Print
                        </Button>{' '}
                    </Link>
                    <Link to="" className="link_route">
                        <Button variant="" style={{ transition: '0.7s ease' }}>
                            <span className="span"><MdOutlineNoteAlt /></span> Write Note
                        </Button>{' '}
                    </Link>
                    <Link to="" className="link_route">
                        <Button variant="" style={{ transition: '0.7s ease' }}>
                            <span className="span"><MdOutlineStarBorder /></span> Stars
                        </Button>{' '}
                    </Link>
                </DynamicCard>
            </div>
        </>
    );
}
export default RecordesMenu;