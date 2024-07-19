import defaultPic from '../assets/user_signup.png'
import { atom } from 'recoil';

export const userInfo = atom({
    key: 'userInfo',
    default:
    {
        typeUser: 'Patient',
        firstName: '',
        secondName: '',
        thirdName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        sex: '',
        country: '',
        phoneNumber: '',
        job: '',
        address: '',
        status: '',
        photo: null,
        idType: 'National',
        id: '',
        bloodType: '',
        FIdCardPhoto: null,
        BIdCardPhoto: null,
        passportType: '',
        passportCountryCode: '',
        passportPhoto: null,
        userName: '',
        password: '',
        medicalSpecialization: '',
        academicDegree: '',
        licenseNumber: '',
        licenseDocument: null,
        locationOfWork: '',
        PublicWalletAddress: '',
        isForgetton: false
    }
});

export const GeneralData = atom({
    key: 'GeneralData',
    default: {
        password: '',
        confirmedPassword: '',
        steps: 0,
        isForgetton: false,
    }
});

export const loginInfo = atom({
    key: 'loginInfo',
    default: {
        login: sessionStorage.getItem('email'),
        photo: defaultPic,
        userName: '',
        email: '',
        password: '',
        patientId: '',
        providerId: '',
        notificationsCount: 0,
    }
})

export const HealthcareFacilityInfo = atom({
    key: 'HealthcareFacilityInfo',
    default: {
        facilityType: '',
        userName: '',
        name: '',
        country: '',
        address: '',
        phoneNumber: '',
        email: '',
        licenseNumber: '',
        licenseDocument: null,
        password: '',
        type: 'Government',
        facilityPhoto: null,
        PublicWalletAddress: ''
    }
})

export const userHealthInfo = atom({
    key: 'userHealthInfo',
    default:
    {
        radiology: {
            selectedList: [],
            notes: ''
        },

        labTests: {
            selectedList: [],
            notes: ''
        },
        prescription: [],
        diagnosis: '',
        notes: '',
        dateOfNextVisit: '',
        reasonOfNextVisit: '',
    }

});


