import React from "react";
import ProfileHeaderIcon from'../component/UserDetails/ProfileHeaderIcon';
import RecordesSearch from "../component/recordesdetails/RecordesSearch";
import RecordesTable from '../component/recordesdetails/RecordesTable';
import RecordesGride from '../component/recordesdetails/RecordesGride';
import ahmed from '../assets/ahmed.jpg';
function RecordesPage(){
    return(
        <>
        <div style={{width:'100%', height:'100px', padding:'10px'}}>
            <ProfileHeaderIcon image={ahmed}/>
        </div>
        <RecordesSearch/>
        {/* <RecordesTable/>  */}
        <RecordesGride/>
        </>
    );
}
export default RecordesPage;