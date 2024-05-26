import Osama from "../../assets/osama.jpg"
import HeaderContainer from "./HaederContainer";
import NewNotificationContainer from "./NewNotificationContainer";
import PatientsTable from "./PatientsTable";




function PatientAccessManagement() {
    const notifications = {
        notf1: {
            sender: "Ahmed",
            accessKey: "7gkjksdfhgdflkgjdfkl"
        },
        notf2: {
            sender: "osama",
            accessKey: "iredfldkhjfflkgjdfkl"
        },
        notf3: {
            sender: "Muthanna",
            accessKey: "jyiojytjtgdflkgjdfkl"
        },
        notf4: {
            sender: "Azooz",
            accessKey: "otnjrlkjntrpojtrdftf"
        },
    };

    const patients = {
        patient1: {
            id: "123456789",
            name: "Ahmed",
            diagnosis: "General",
            nextVisit: "2024-01-01",
            accessed: "2024-01-01",
        },
        patient2: {
            id: "213456789",
            name: "Ahmed",
            diagnosis: "General",
            nextVisit: "2024-01-01",
            accessed: "2024-01-01",
        },
        patient3: {
            id: "321456789",
            name: "Ahmed",
            diagnosis: "General",
            nextVisit: "2024-01-01",
            accessed: "2024-01-01",
        },
        patient4: {
            id: "423156789",
            name: "Ahmed",
            diagnosis: "General",
            nextVisit: "2024-01-01",
            accessed: "2024-01-01",
        },
    }

    return (

        <div className="main-container flex flex-col justify-between">
            <HeaderContainer image={Osama} />
            <NewNotificationContainer notifications={notifications} />
            <PatientsTable patients={patients} />

        </div>

    );
}

export default PatientAccessManagement