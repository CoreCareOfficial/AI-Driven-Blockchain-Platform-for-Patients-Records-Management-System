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
        password: '',
        newPassword: '',
        confirmPassword: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        whatsapp: '',
        academicDegree: '',
        specialization: '',
        yearsOfExperience: '',
        locationOfWork: '',
        clinicNumber: '',
        medschool: '',
        internships: '',
        residencies: '',
        fellowships: '',
        departments: [],
        newDepartment: '',
        services: [],
        newService: '',
        hospitalName: '',
        workDays: '',
        DayworkHours: '',
        DayworkHoursFrom: '',
        DayworkHoursTo: '',
        NightworkHours: '',
        NightworkHoursFrom: '',
        NightworkHoursTo: '',
        hospitalNameVisit: '',
        visitDays: '',
        DayvisitHours: '',
        DayvisitHoursFrom: '',
        DayvisitHoursTo: '',
        NightvisitHours: '',
        NightvisitHoursFrom: '',
        NightvisitHoursTo: '',
    }
}
);