import React, { useState } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import H1 from '../H1';
import P from '../P';
import RecordesMenu from './RecordesMenu';

function RecordesTable(props) {

    const [idSelected, setIdSelected] = useState();
    const [itemTop, setItemTop] = useState(270);
    const [isOpen, setIsOpen] = useState(false);
    const itemRight = 35;

    // =================================
    const handleMenuClick = ((e) => {
        setIdSelected(e.target.id);
        const newTop = (Number(e.target.id) * 50) + 220;
        setItemTop(newTop);
        setIsOpen(!isOpen);
    });
    // =================================================================================

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

    return (
        <>
            <div className="Recordes_result">
                <H1 name="result_title" title={props.tableTitle} />
                <P name="result_text" title={`Showing ${handleRecordsResult()} Records Results`} />
            </div>
            <table className="records_table">

                <thead className="records_thead">
                    <tr className="thead_tr">
                        <th></th>
                        <th></th>
                        <th style={{ width: '39%' }}>Name Of Record</th>
                        <th style={{ width: '10%' }}> Type</th>
                        <th>Name Of Health Provider</th>
                        <th> Date Of Upload</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {Object.keys(props.allRecords).map((record) => (
                        props.tableTitle !== "All Records" ?
                            props.tableTitle === props.allRecords[record]["Type"] &&


                            <tr className="tbody_tr" key={props.allRecords[record]['id']}>
                                <td><span style={{ display: `${props.allRecords[record]["fav"] ? 'block' : 'none'}` }}>
                                    <IoStarSharp /></span></td>
                                <td><span>{props.icons[props.allRecords[record]["Type"]]}</span></td>
                                <td>{props.allRecords[record]["Name Of Record"]}</td>
                                <td>{props.allRecords[record]["Type"]}</td>
                                <td>{props.allRecords[record]["Name Of Health Provider"]}</td>
                                <td>{props.allRecords[record]["Date Of Upload"]}</td>
                                <td><span style={{ cursor: 'pointer' }}
                                ><MdMoreHoriz id={props.allRecords[record]['id']} onClick={handleMenuClick} /></span></td>
                            </tr>
                            : <tr className="tbody_tr" key={props.allRecords[record]['id']}>
                                <td><span style={{ display: `${props.allRecords[record]["fav"] ? 'block' : 'none'}` }}>
                                    <IoStarSharp /></span></td>
                                <td><span>{props.icons[props.allRecords[record]["Type"]]}</span></td>
                                <td>{props.allRecords[record]["Name Of Record"]}</td>
                                <td>{props.allRecords[record]["Type"]}</td>
                                <td>{props.allRecords[record]["Name Of Health Provider"]}</td>
                                <td>{props.allRecords[record]["Date Of Upload"]}</td>
                                <td><span style={{ cursor: 'pointer' }}
                                ><MdMoreHoriz id={props.allRecords[record]['id']} onClick={handleMenuClick} /></span></td>
                            </tr>

                    ))}

                </tbody>
                {isOpen && <RecordesMenu id={idSelected} top={itemTop} right={itemRight} open={true} handleMenuClick={handleMenuClick} />}
            </table>
        </>
    );
}
export default RecordesTable;