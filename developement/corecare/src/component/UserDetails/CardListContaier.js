import "../../css/UserPageStyle/profile.css";

function CardListContainer(props) {
    const items = Array.isArray(props.items) ? props.items : [];

    return (
        <div className="card-list-container">
            <h5>{props.title ? props.title : "Unknown"}</h5>
            <div className="card-list-container-list">
                <ul>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <li key={index}>{item.conditionname ? item.conditionname : item.medname}</li>
                        ))
                    ) : (
                        <li>No items to display</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default CardListContainer;
