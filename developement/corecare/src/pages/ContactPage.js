import React from "react";
import  Section1 from '../component/contactdetails/ContactusSection1';
import  Section2 from '../component/contactdetails/ContactusSection';
import FormlessFooter from "../component/FormlessFooter";
function ContactPage(){
    return(
        <>
        <Section1/>
        <Section2/>
        <FormlessFooter mail="corecareofficial@gmail.com" 
        phoneNumber="+967 711 379 934" textLogo="@corecare 2024" 
        followText="Follow for more" />
        </>
    );
}
export default ContactPage;