import ProfileHeaderIcon from "./ProfileHeaderIcon"
import InfoPati from "../patienSchedule/InfoPati";

function HeaderContainer(props) {
    return (

        <div className="header-conntainer flex flex-col justify-between border-b border-slate-500 gap-1">
            <ProfileHeaderIcon image={props.image} />
        </div>

    )
}

export default HeaderContainer

