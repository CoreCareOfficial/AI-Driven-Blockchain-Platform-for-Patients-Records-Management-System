import React from "react";
import Section1 from "../component/searchdetails/SearchSection1";
import Section2 from "../component/searchdetails/SearchSection2";
import FormFooter from "../component/FormFooter";
import Header from '../component/Header';
function SearchPage(){
    return(
        <>
        <Header/>
        <Section1/>
        <Section2/>
        <FormFooter/>
        </>
    );
}
export default SearchPage;