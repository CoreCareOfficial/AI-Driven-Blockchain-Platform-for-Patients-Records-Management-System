import React, { useState } from 'react';
import ProfileHeaderIcon from'../component/UserDetails/ProfileHeaderIcon';
import RecordesSearch from "../component/recordesdetails/RecordesSearch";
import RecordesTable from '../component/recordesdetails/RecordesTable';
import RecordesGride from '../component/recordesdetails/RecordesGride';
import ahmed from '../assets/ahmed.jpg';
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FaXRay } from "react-icons/fa6";
import { FaFilePrescription } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";

function RecordesPage(){

    const [view, setView] = useState(true);
    const handleViewClick = () => {
        setView(!view);
            };
//========================================
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
        "Date Of Upload":"22/5/2024"
    },
    secondRow:{
        "id":2,
        "fav":true,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    thirdRow:{
        "id":3,
        "Name Of Record":"oooooooooooooooooooooooooooo",
        "Type":"Summary",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    fourthRow:{
        "id":4,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    fifthRow:{
        "id":5,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Lab test",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    sixRow:{
        "id":6,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Prescripation",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    sevenRow:{
        "id":7,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    eightRow:{
        "id":8,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    nineRow:{
        "id":9,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    tenRow:{
        "id":10,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    elevRow:{
        "id":11,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
    twelRow:{
        "id":12,
        "Name Of Record":"Report-12 of patient's heart.form",
        "Type":"Ray",
        "Name Of Health Provider":"Dr : Ahmed Fahed Al-mojahed",
        "Date Of Upload":"22/5/2024"
    },
}

const Result =  Object.keys(allRecords).length;
const RecordsResult ="Showing "+Result+" Records Result";
// =================================
    return(
        <>
        <div style={{width:'100%', height:'100px', padding:'10px'}}>
            <ProfileHeaderIcon image={ahmed}/>
        </div>
        <RecordesSearch view={view} handleViewClick={handleViewClick}/>

        {view ? <RecordesTable
        RecordsResult={RecordsResult}
        icons={icons}
        allRecords={allRecords}
        />  :
        <RecordesGride 
            RecordsResult={RecordsResult}
            icons={icons}
            allRecords={allRecords}
        />
}
        </>
    );
}
export default RecordesPage;