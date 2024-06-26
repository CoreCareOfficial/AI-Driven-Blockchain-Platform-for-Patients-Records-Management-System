import "../../css/UserPageStyle/profile.css"
import defaultPic from '../../assets/user_signup.png'
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile(props) {
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);

    let userType = '';
    if (props.userType !== "Patient" && props.userType !== "Doctor") {
        userType = "healthcare_provider"
    }

    else {
        userType = props.userType + 's'
    }

    console.log(userType);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/${userType}`, {
                    params: { email: 'osamaz1x13@gmail.com' }
                });
                setPatient(response.data);
            } catch (err) {
                setError(err.response ? err.response.data : err.message);
                console.error('Error:', err);
            }
        };

        // if (patient.patientid) {
        //     try {
        //         const response = await axios.get(`http://localhost:5000/socialmedia`, {
        //             params: {patientid: patient.patientid}
        //         });
        //     } catch (err) {
        //         setError(err.response ? err.response.data : err.message);
        //         console.error('Error:', err);
        //     }
        // }

        fetchPatientData();
    }, []);

    console.log('patient:', patient);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <ProfileHeader
                userType={props.userType}
                location={patient.address}
                image={patient.personalphoto ? `data:image/jpeg;base64,${patient.personalphoto}` : defaultPic}
                username={patient.username}
                name={`${patient.firstname} ${patient.lastname}`}
                gender={patient.sex}
                age={calculateAge(patient.dateofbirth)}
            // Add other social media props if available in patient data
            />
            <ProfileBody userType={props.userType} patient={patient} />
        </div>
    )
}

// Helper function to calculate age
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export default Profile;
