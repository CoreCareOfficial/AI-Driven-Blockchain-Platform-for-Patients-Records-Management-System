import React from "react";
import Card from 'react-bootstrap/Card';

function CardRisk(props) {
    // const desc=<p>{props.desc}</p>
    const name=props.name;
    return (
    <Card className={name} style={{ width: '30rem'}}>
        <Card.Body>
        <div className='my_container'>
        <Card.Img variant="top" src={props.path} />
        <Card.Title>{props.title}</Card.Title>
        </div>
        </Card.Body>
    </Card>
    );
}
export default CardRisk;