import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardTitle(props) {
  // const desc=<p>{props.desc}</p>
  const name=props.name;
  return (
    <Card className={name} style={{ width: '30rem'}}>
      {/* <Card.Img variant="top" src={props.path} /> */}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.desc}</Card.Text>
        <Button variant="primary">{props.btn}</Button>{' '}
      </Card.Body>
    </Card>
  );
}
export default CardTitle;