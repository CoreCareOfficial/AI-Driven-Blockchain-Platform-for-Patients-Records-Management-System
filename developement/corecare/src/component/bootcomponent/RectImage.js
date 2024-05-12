import Image from 'react-bootstrap/Image';

function RectImage(props) {
    return (
    <Image src={props.path} fluid />
);
}
export default RectImage;