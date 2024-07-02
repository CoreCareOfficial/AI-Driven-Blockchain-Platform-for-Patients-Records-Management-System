import React from "react";
import H1 from "../H1";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Flex_Container from "../bootcomponent/flex_Container";
import { BsCrosshair ,BsCalendar3  } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import SettingCountry from '../settingdetails/SettingCountrySelector'
function Section1(){
const defaultProps = {
        label: 'Specialty / Doctor / Hospital',
        values: [
            'Dentist',
            'General Practitioner',
            'Psychologist',
            'Neurologist',
        ],
};
    return(
        <>
        <section className="S_section1 Search_sec">
            <H1 name="H_title" title="Search for Healthcare Providers or by Specialization"/>
            <Container style={{
                backgroundColor:'#272c34',
                borderRadius:'15px',
                width:'70%',
                marginBottom:'10px',
                }}>

                <Form >
                <Form.Group  className="mb-2" controlId="exampleForm.ControlInput1">
                    <div className="input_div_search">
                    <Form.Control type="text" placeholder="Search"
                    style={{marginLeft:'0px'}}/>
                    <span className="Search_sec_SI"><AiOutlineSearch /></span>
                    </div>
                <Flex_Container>
                <select defaultValue="">
                    <option value="" disabled hidden>{defaultProps.label}</option>
                        {(defaultProps.values).map((value) => (
                    <option value={value} key={value}>{value}</option>
                        ))}
                </select>
                {/* <div className="input_div" >
                    <Form.Control type="text" placeholder="Location"/>
                    <span className="Search_sec_dotI"><BsCrosshair /></span>
                </div> */}
                <SettingCountry label="Country:"/>

                <div className="input_div">
                    <Form.Control type="date" placeholder="Date" />
                    {/* <span className="Search_sec_calI"><BsCalendar3 /></span> */}
                </div>
                    <Button variant="primary" style={{transition: '0.7s ease'}}>search</Button>{' '}
                </Flex_Container>
                </Form.Group>
                </Form>
            </Container>
        </section>
        </>
    );
}
export default Section1;