import React from "react";
import HomeSection1 from'../component/homedetails/HomeSection1';
import HomeSection2 from'../component/homedetails/HomeSection2';
import HomeSection3 from'../component/homedetails/HomeSection3';
import HomeSection4 from'../component/homedetails/HomeSection4';
import HomeSection5 from'../component/homedetails/HomeSection5';
import FormFooter from "../component/FormFooter";
// import Header from "../component/Header";
function HomePage(){
    return(
        <>
        {/* <Header/> */}
        <HomeSection1/>
        <HomeSection2/>
        <HomeSection3/>
        <HomeSection4/>
        <HomeSection5/>
        <FormFooter/>
        
        </>
    );
}
export default HomePage;