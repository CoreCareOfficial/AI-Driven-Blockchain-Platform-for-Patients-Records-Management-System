import "../../css/UserPageStyle/profile.css"
function ImageNameContainer(props) {
    return (
        // <p>{props.username}</p>
        <div className={`image-name-container ${props.incname}`}>
                    <div className={`image-container ${props.icname}`}>
                        <img className="image" src={props.image} alt="Profile" />
                    </div>
                    <div className={`name-container ${props.ncname}`}>
                    {props.display ? <p>{props.username}</p> : null}
                        <p>{props.name}</p>
                        <p>{props.gender}, {props.age} years old</p>
                    </div>
                </div>
    )
}

export default ImageNameContainer


