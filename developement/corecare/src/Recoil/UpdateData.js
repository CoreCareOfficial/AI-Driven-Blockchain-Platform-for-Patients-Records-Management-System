import { atom } from 'recoil';

export const updateUserInfo = atom({
    key: 'updateUserInfo',
    default:
    {
        address: '',
        bloodtype: '',
        country: '',
        dateofbirth: '',
        fullname: '',
        phonenumber: '',
        job: '',
        patientid: '',
        personalphoto: null,
        sex: '',
        status: '',
        username: '',
        weight: '',
        height: '',
        allergies: '',
        practicelocation: '',
        affiliations: '',
        practicehours: '',
        languagesspoken: '',
        name: '',
    }
}
);
