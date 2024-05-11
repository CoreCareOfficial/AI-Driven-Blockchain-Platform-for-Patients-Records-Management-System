import Card from 'react-bootstrap/Card';

function CardStep(props) {
  const name=props.name;
  return (
    <Card className={name} style={{ width: '30rem'}}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.desc}</Card.Text>
        <hr/>
      </Card.Body>
    </Card>
  );
}
export default CardStep;