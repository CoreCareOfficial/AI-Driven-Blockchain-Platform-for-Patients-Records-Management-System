import React ,{ useState } from "react";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Card,Container} from "react-bootstrap";
import { IconContext } from "react-icons";
import RecordesMenu from './RecordesMenu';
import { BsThreeDotsVertical } from "react-icons/bs";
import H1 from '../H1';
import P from '../P';

function RecordesGride(props){

    const [idSelected, setIdSelected] = useState(0);
    const [isOpen , setIsOpen] = useState(false);
        // =================================
    const handleMenuClick = ((e) => {
    setIdSelected(e.target.id);
    console.log(e.target.id);
    setIsOpen(!isOpen);
        });
        // =================================

    return(
        <>
        <div className="Recordes_result">
            <H1 name="result_title" title="All Records"/>
            <P name="result_text"  title={props.RecordsResult}/>
        </div>
        <Container className = "RecordesGride">
        {Object.keys(props.allRecords).map((record) => (
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
                isOpen&&idSelected==props.allRecords[record]['id'] &&
                <RecordesMenu id={idSelected}  open = {true}/>
                }
            </DynamicCard>
        ))} 
        </Container>
        </>
    );
}
export default RecordesGride;