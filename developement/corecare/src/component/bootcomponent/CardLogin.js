import Card from 'react-bootstrap/Card';
import '../../fonts/caladea.css';
import BackButton from '../loginDetails/BackButton';
import { Link } from 'react-router-dom';

function CardLogin(props) {
    const styleCard = {
        maxWidth: '35%',
        minWidth: '320px',
        minHeight: '95vh',
        borderRadius: '64px',
        backgroundColor: '#272c34',
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        flexDirection: 'column',
        verticalAlign: 'center'
    }
    const styleStep = {
        fontFamily: 'DM Sans',
        color: '#ffffff',
        fontSize: '12px',

    };
    const stepN = props.step;
    return (
        <section style={{ alignContent: 'center', backgroundColor: '#181a1f' }}>
            <Card className='' style={styleCard}>
                <div className="container text-center mt-8">
                    <div className='row justify-content-md-center'>
                        <div className='col col-lg-3' style={{ padding: '9px 0px 0px 30px' }}><BackButton backPath={props.backPath} /></div>
                        <Link to='/' className='col col-lg-6' style={{
                            color: 'white',
                            fontFamily: 'Caladea',
                            fontWeight: 700,
                            paddingTop: '5px',
                            position: 'relative'
                        }}>
                            Core-Care
                        </Link>
                        <div style={styleStep} className='col col-lg-3'>
                            {
                                stepN ? `Step ${props.step}/6` : ''
                            }
                        </div>
                    </div>
                </div>

                {props.children}

            </Card>
        </section>
    );
};

export default CardLogin;
