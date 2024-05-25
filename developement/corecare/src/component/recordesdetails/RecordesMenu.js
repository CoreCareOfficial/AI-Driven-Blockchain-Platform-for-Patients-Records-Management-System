import React ,{useState} from "react";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineFileOpen } from "react-icons/md";
import { MdOutlineSummarize } from "react-icons/md";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { IoClose } from "react-icons/io5";


function RecordesMenu(props){
    // const place = props.id;

    const [isOpen , setIsOpen] = useState(props.open);

    const handleClickOutside = ((e) => {
            setIsOpen(false)
            });

    return(
        <>
        <div className="RecordesMen" style={{top:`${props.top}px`,
        right:`${props.right}px`,
        display: `${isOpen ? 'block' : 'none'}`}}>
            
        <DynamicCard name="RecordesMen_card">
            <span onClick={handleClickOutside} className="RecordesMen_close"><IoClose /></span>
            
            <Link to="" className="link_route">
                <Button variant="" style={{transition: '0.7s ease'}}>
                    <span className="span"><MdOutlineFileOpen /></span> Open
                </Button>{' '}
            </Link>
            <Link to="" className="link_route">
                <Button variant="" style={{transition: '0.7s ease'}}>
                    <span className="span"><MdOutlineSummarize /></span> Summarize
                </Button>{' '}
            </Link>
            <Link to="" className="link_route">
                <Button variant="" style={{transition: '0.7s ease'}}>
                    <span className="span"><MdOutlineLocalPrintshop /></span> Print
                </Button>{' '}
            </Link>
            <Link to="" className="link_route">
                <Button variant="" style={{transition: '0.7s ease'}}>
                    <span className="span"><MdOutlineNoteAlt /></span> Write Note
                </Button>{' '}
            </Link>
            <Link to="" className="link_route">
                <Button variant="" style={{transition: '0.7s ease'}}>
                    <span className="span"><MdOutlineStarBorder /></span> Stars
                </Button>{' '}
            </Link>
        </DynamicCard>
        </div>
        </>
    );
}
export default RecordesMenu;