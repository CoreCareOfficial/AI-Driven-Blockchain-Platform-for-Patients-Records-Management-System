
function Submit(props) {
    return (
        <>
            <button style={{
                color: "#ffffff",
                backgroundColor: '#3146FF',
                width: '100%',
                minWidth: '40px',
                height: '34px',
                borderRadius: '50PX',
                fontFamily: 'DM Sans',
                margin: "14px 0 6px 0"
            }}
                type="submit" value={props.name}>
                {props.name}
            </button>
        </>
    );
};

export default Submit;