import "../../css/UserPageStyle/sidebtn.css"

function SideBtn(props) {
    return (
        <button className={props.name}>
            <p className="icon">{props.icon}</p>
            <p className="text">{props.text}</p>
        </button>
    );
}

export default SideBtn;