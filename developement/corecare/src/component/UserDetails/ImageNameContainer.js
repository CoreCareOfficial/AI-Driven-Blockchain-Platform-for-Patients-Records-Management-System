import "../../css/UserPageStyle/profile.css"
function ImageNameContainer(props) {
    return (
        <div className={`image-name-container ${props.incname}`}>
                    <div className={`image-container ${props.icname}`}>
                        <img className="image" src={props.image} alt="Profile" />
                    </div>
                    <div className={`name-container ${props.ncname}`}>
                        <p>{props.username}</p>
                        <p>{props.name}</p>
                        <p>{props.gender}, {props.age} years old</p>
                    </div>
                </div>
    )
}

export default ImageNameContainer


