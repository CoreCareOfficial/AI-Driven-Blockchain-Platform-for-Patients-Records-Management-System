function SubBtn(props) {
    return (
        <div className={`sub-buttons ${props.expanded ? 'show' : 'hide'}`}>
            <button>Button 1</button>
            <button>Button 2</button>
        </div>
    );
}

export default SubBtn;