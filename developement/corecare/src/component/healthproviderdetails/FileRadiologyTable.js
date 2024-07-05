import React, { useState } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import H1 from '../H1';
import P from '../P';
import RecordesMenu from '../recordesdetails/RecordesMenu';

function FileRadiologyTable(props) {

    const [idSelected, setIdSelected] = useState();
    const [itemTop, setItemTop] = useState(270);
    const [isOpen, setIsOpen] = useState(false);
    const itemRight = 35;

    // =================================
    const handleMenuClick = ((e) => {
        setIdSelected(e.target.id);
        const newTop = (Number(e.target.id) * 50) + 520;
        setItemTop(newTop);
        setIsOpen(!isOpen);
    });
    // =================================================================================

    return (
        <>
            <input type="text" autoFocus className="bg-transparent border-[0px] border-transparent outline-none w-0 h-0" />
            <div className="Recordes_result">
                <H1 name="result_title" title="Shared Records" />
                <P name="result_text" title={props.RecordsResult} />
            </div>
            <table className="records_table">

                <thead className="records_thead">
                    <tr className="thead_tr">
                        <th></th>
                        <th style={{ width: '39%' }}>Name Of Record</th>
                        {/* <th style={{ width: '10%' }}> Type</th> */}
                        <th>Name Of Health Provider</th>
                        <th> Date Of Upload</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {Object.keys(props.allRecords).map((record) => (
                        <tr className="tbody_tr" key={props.allRecords[record]['id']}>
                            <td><span>{props.icons[props.allRecords[record]["Type"]]}</span></td>
                            <td>{props.allRecords[record]["Name Of Record"]}</td>
                            {/* <td>{props.allRecords[record]["Type"]}</td> */}
                            <td>{props.allRecords[record]["Name Of Health Provider"]}</td>
                            <td>{props.allRecords[record]["Date Of Upload"]}</td>
                            <td><span style={{ cursor: 'pointer' }}
                            ><MdMoreHoriz id={props.allRecords[record]['id']} onClick={handleMenuClick} /></span></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {isOpen && <RecordesMenu id={idSelected} top={itemTop} right={itemRight} open={true} handleMenuClick={handleMenuClick} />}
        </>
    );
}
export default FileRadiologyTable;