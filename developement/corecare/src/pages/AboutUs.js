import React from "react";
import Section1 from "../component/aboutdetails/AboutSection1";
import Section2 from "../component/aboutdetails/AboutSection2";
import Section3 from "../component/aboutdetails/AboutSection3";
import Section4 from "../component/aboutdetails/AboutSection4";
import FormFooter from "../component/FormFooter";
import Header from '../component/Header';

function AboutUsPage(){
    return(
        <>
        <Header />
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <FormFooter/>
        </>
    );
}
export default AboutUsPage;