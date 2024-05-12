import React from "react";
import Card from 'react-bootstrap/Card';
import Flex_Container from "./flex_Container";
function CardRisk(props) {
    // const desc=<p>{props.desc}</p>
    const name=props.name;
    return (
    <Card className={name} style={{ width: '30rem'}}>
        <Card.Body>
        <Flex_Container>
        <Card.Img variant="top" src={props.path} />
        <Card.Title>{props.title}</Card.Title>
        </Flex_Container>
        </Card.Body>
    </Card>
    );
}
export default CardRisk;