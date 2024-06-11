

function TextPage(props) {

    return (
        <div style={{
            color: '#eaeaea',
            fontSize: '18px',
            fontFamily: 'DM Sans',
            lineHeight: '23px',
            textAlign: 'center',
            width: '70%'
        }}>
            {props.text}
        </div>
    );
};

export default TextPage;