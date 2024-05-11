import React from "react";
import Card from 'react-bootstrap/Card';

function CardIcon(props) {
    const name=props.name;
    return (
    <Card className={name} style={{ width: '20rem'}}>
        <Card.Body>
        <div className='my_container'>
        <Card.Img variant="top" src={props.path} />
        <Card.Title>{props.title}</Card.Title>
        </div>
        <Card.Text>{props.disc}</Card.Text>
        </Card.Body>
    </Card>
    );
}
export default CardIcon;