import "../../css/UserPageStyle/profile.css"

function HealthCard(props) {
    return (
        <div className="flex flex-row justify-between border-b border-slate-500">
            <div className="my-2 bg-slate-600 mr-2 rounded-xl">
                <img src={props.image} alt={props.title} className="w-10 h-auto md:w-20 md:h-auto md:rounded-none rounded-full"></img>
            </div>
            <div className="flex flex-col text-white my-auto mr-auto">
                <h5 className="font-bold">{props.title ? props.title : "Unknown"}</h5>
                <p className="text-slate-500">{props.date ? props.date : "unknown"}</p>
            </div>
            <div className="my-auto ml-auto text-white p-2">{props.value ? props.value : "null"}</div>
        </div>
    );
}

export default HealthCard;

