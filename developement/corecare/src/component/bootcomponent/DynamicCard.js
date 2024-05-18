import React from "react";
import { Card,CardBody } from "react-bootstrap";
function DynamicCard(props){
    const name = props.name
    return(
        <Card className={name}>
            <CardBody>
            {props.children}
            </CardBody>
        </Card>
    );
}
export default DynamicCard;