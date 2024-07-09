import React from "react";
import Flex_Container from '../bootcomponent/flex_Container';
import Form from 'react-bootstrap/Form';
import { MdGridView } from "react-icons/md";
import { MdSummarize } from "react-icons/md";
import { HiPlus } from "react-icons/hi2";
import DynamicCard from "../bootcomponent/DynamicCard";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdViewList } from "react-icons/md";

function RecordesSearch({view,handleViewClick}){

    return(
        <>
        <DynamicCard name="RecordesSearch">
        <Flex_Container>
            <Form className="RecordesSearch_form">
                <Form.Group  className="mb-0" controlId="exampleForm.ControlInput1">
                <div className="RecordesSearch_form_div">
                <span className="record_sec_SI"><AiOutlineSearch /></span>
                    <Form.Control type="text" placeholder="" style={{ backgroundColor: '#272c34' }}/>
                </div>
                </Form.Group>
            </Form>

            <div className="RecordesSearch_button">
                {/* <Link to="" className="link_route"> */}
                    <Button variant="dark" style={{transition: '0.7s ease'}}
                    onClick={handleViewClick}>
                    <span>{view ? <MdGridView />:<MdViewList />}</span>
                        View
                    </Button>{' '}
                {/* </Link> */}

                <Link to="">
                    <Button variant="light" style={{transition: '0.7s ease',color:'#3146ff'}}>
                    <span style={{color:'#3146ff'}}><MdSummarize /></span>
                        Summarize
                    </Button>{' '}
                </Link>

                <Link to="">
                    <Button variant="primary" style={{transition: '0.7s ease'}}>
                    <span><HiPlus /></span>
                        Create
                    </Button>{' '}
                </Link>

            </div>
        </Flex_Container>
        </DynamicCard>
        </>
    );
}
export default RecordesSearch;