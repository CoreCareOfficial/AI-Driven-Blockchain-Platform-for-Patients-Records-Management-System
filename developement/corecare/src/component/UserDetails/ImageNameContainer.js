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

                        {props.userType !=="Hospital" && props.userType !=="Laboratory" && props.userType !=="Radiology" && props.userType !=="Pharmacy" ?( 
                        <p>{props.gender}, {props.age} years old</p>
                        ) : <p>{props.location}</p> }
                    </div>
                </div>
    )
}

export default ImageNameContainer


