import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';
function MyCarousel(props) {
    return (
    <Carousel data-bs-theme="dark">
            {props.children}
    </Carousel>
);
}

export default MyCarousel;