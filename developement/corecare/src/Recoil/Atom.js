import { atom } from 'recoil';

export const userInfo = atom({
    key: 'userInfo',
    default: [
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
            confirmedPassword: '',
        }
    ],
});

export const userHealthInfo = atom({
    key: 'userHealthInfo',
    default: [
        {
            radiology: {
                id: '',
                selectedList: [],
                notes: ''
            },

            labTests: {
                id: '',
                selectedList: [],
                notes: ''
            },
            prescription: [],
        }
    ]
})
