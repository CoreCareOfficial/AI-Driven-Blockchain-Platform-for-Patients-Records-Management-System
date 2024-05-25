import "../../css/UserPageStyle/sidebar.css"
import "../../css/UserPageStyle/icon.css"


function SideBar(props) {
    return (
        <div className="Container">
            <div className="Wrapper top-0">
                {props.children}
            </div>
        </div>


    );
}

export default SideBar;