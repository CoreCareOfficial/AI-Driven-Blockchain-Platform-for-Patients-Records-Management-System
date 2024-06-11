
function TitlePage(props) {

    return (
        <div style={{
            color: '#ffffff',
            fontSize: '30px',
            fontFamily: 'DM Sans',
            fontWeight: 700,
            // lineHeight: '52px',
            textAlign: 'center',
            marginBottom: '12px'
        }}>
            {props.title}
        </div>
    );
};

export default TitlePage;