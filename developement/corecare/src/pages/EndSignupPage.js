import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import '../fonts/caladea.css';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import Submit from '../component/loginDetails/Submit';
import { Link } from 'react-router-dom';

function EndSignupPage() {

    const styleBody = {
        width: '34%',
        minWidth: '320px',
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '30px'
    }
    const styleP = {
        color: 'white',
        fontFamily: 'Caladea',
        fontWeight: 700,
        // paddingTop: '5px'
    };

    return (
        <section style={{ alignContent: 'center', backgroundColor: '#181a1f' }}>
            <div className='' style={styleBody}>
                <p style={styleP}>Core-care</p>
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#ffffff', width: '60px', height: '60px', margin: 'auto' }} />
                <TitlePage title='Your account has been successfully created' />
                <TextPage text='Please keep your private key and your password to log into your account and manage your health records.' />
                <div style={{ width: '70%' }}><Link to='/login'><Submit name='Go to Login' /></Link></div>
            </div>
        </section>
    );
};

export default EndSignupPage;