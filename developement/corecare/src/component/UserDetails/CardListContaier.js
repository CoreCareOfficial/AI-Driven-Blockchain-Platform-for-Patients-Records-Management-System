import "../../css/UserPageStyle/profile.css"
function CardListContaier(props) {
    return (
        <div className="card-list-container">
            <h5>{props.title ? props.title : "Unknown"}</h5>
            <div className="card-list-container-list">
                <ul>
                    {props.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CardListContaier;

