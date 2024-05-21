function ImageNameContainer(props) {
    return (
        <div className="image-name-container">
                    <div className="image-container">
                        <img className="image" src={props.image} alt="Profile" />
                    </div>
                    <div className="name-container">
                        <p>{props.username}</p>
                        <p>{props.name}</p>
                        <p>{props.gender}, {props.age} years old</p>
                    </div>
                </div>
    )
}

export default ImageNameContainer


