import "../../css/UserPageStyle/sidebtn.css"

function SideBtn(props) {
    return (
        <button className={props.name} id={props.id} onClick={props.onClick}>
            <p className="icon">{props.icon}</p>
            <p className="text">{props.text}</p>
            {props.display ? <p className="notification">{props.numofnotification}</p> : null}
            
        </button>
    );
}

export default SideBtn;