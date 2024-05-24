import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FaXRay } from "react-icons/fa6";
import { FaFilePrescription } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import H1 from '../H1';
import P from '../P';
import RecordesMenu from './RecordesMenu';

function RecordesTable(){

    const [dateTime, setDateTime] = useState(new Date());
// ========================================
const icons = {
    "Repotr": <MdOutlineReceiptLong />,
    "Summary": <FaRegFileLines />,
    "Ray":<FaXRay />,
    "Prescripation":<FaFilePrescription />,   
    "Lab test":<FaFileLines />
};

const allRecords={
    firstRow:{
        "id":1,
        "fav":true,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Repotr",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    secondRow:{
        "id":2,
        "fav":true,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    thirdRow:{
        "id":3,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Summary",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    fourthRow:{
        "id":4,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    fifthRow:{
        "id":5,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Lab test",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    sixRow:{
        "id":6,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Prescripation",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    sevenRow:{
        "id":7,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    eightRow:{
        "id":8,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    nineRow:{
        "id":9,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    tenRow:{
        "id":10,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    elevRow:{
        "id":11,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
    twelRow:{
        "id":12,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":`${dateTime.toLocaleString()}`
    },
}

const Result =  Object.keys(allRecords).length;
const RecordsResult ="Showing "+Result+" Records Result";


const [idSelected, setIdSelected] = useState();
const [itemTop, setItemTop] = useState(270);
const [isOpen , setIsOpen] = useState(false);


const handleMenuClick = ((e) => {
    setIdSelected(e.target.id);
    console.log(e.target.id);
    const newTop = (Number(e.target.id) * 50 ) + 220;
    setItemTop(newTop);
    console.log(itemTop);
    setIsOpen(!isOpen);
});

useEffect(() => {
const intervalId = setInterval(() => {
    setDateTime(new Date());
}, 1000); // Update every second

return () => clearInterval(intervalId); // Cleanup function to prevent memory leaks
}, []); 

    return(
        <>
        <div className="Recordes_result">
            <H1 name="result_title" title="All Records"/>
            <P name="result_text"  title={RecordsResult}/>
        </div>
        <table className="records_table">

            <thead className="records_thead">
                <tr className="thead_tr">
                    <th></th>
                    <th></th>
                    <th style={{width:'39%'}}>Name Of Record</th>
                    <th style={{width:'10%'}}> Type</th>
                    <th>Name Of Health Provider</th>
                    <th> Date Of Upload</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                
                {Object.keys(allRecords).map((record) => (
                    <tr className="tbody_tr"  key={allRecords[record]['id']}>
                    <td><span style={{ display: `${allRecords[record]["fav"] ? 'block' : 'none'}` }}>
                        <IoStarSharp /></span></td>
                    <td><span>{icons[allRecords[record]["Type"]]}</span></td>
                    <td>{allRecords[record]["Name Of Record"]}</td>
                    <td>{allRecords[record]["Type"]}</td>
                    <td>{allRecords[record]["Name Of Health Provider"]}</td>
                    <td>{allRecords[record]["Date Of Upload"]}</td>
                    <td><span><MdMoreHoriz id={allRecords[record]['id']} onClick={handleMenuClick} /></span></td>
                </tr>
                ))}   

            </tbody>
        {isOpen&&<RecordesMenu id={idSelected} top={itemTop} open = {true}/>}
        </table>
        </>
    );
}
export default RecordesTable;