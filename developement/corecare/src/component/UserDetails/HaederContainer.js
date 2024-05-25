import ProfileHeaderIcon from "./ProfileHeaderIcon"

function HeaderContainer(props) {
    return (

        <div className="header-conntainer flex flex-col justify-between border-b border-slate-500 gap-1">
            <ProfileHeaderIcon image={props.image} />
            <div className="bg-[#272C34]  p-10 rounded-xl w-1/2 mx-14 mb-3">
            </div>
        </div>

    )
}

export default HeaderContainer

