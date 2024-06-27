import Carousel from 'react-bootstrap/Carousel';
function MyCarousel(props) {
    return (
    <Carousel data-bs-theme="dark">
            {props.children}
    </Carousel>
);
}

export default MyCarousel;