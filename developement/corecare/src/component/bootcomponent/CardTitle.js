import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardTitle(props) {
  const name=props.name;
  return (
    <Card className={name} style={{ width: '30rem'}}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.desc}</Card.Text>
        <Button variant="primary" style={{transition: '0.7s ease'}}>{props.btn}</Button>{' '}
      </Card.Body>
    </Card>
  );
}
export default CardTitle;