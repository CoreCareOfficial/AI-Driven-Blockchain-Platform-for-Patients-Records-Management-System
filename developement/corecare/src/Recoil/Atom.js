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
        isForgetton: false
    }
});

export const GeneralData = atom({
    key: 'GeneralData',
    default: {
        password: '',
        confirmedPassword: '',
        steps: 0,
        isForgetton: false
    }
});

export const loginInfo = atom({
    key: 'loginInfo',
    default: {
        login: '',
        userName: '',
        email: '',
        password: ''
    }
})

export const HealthcareFacilityInfo = atom({
    key: 'HealthcareFacilityInfo',
    default: {
        facilityType: '',
        name: '',
        country: '',
        address: '',
        phoneNumber: '',
        email: '',
        licenseNumber: '',
        licenseDocument: null,
        password: '',
        type: 'Government'
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


