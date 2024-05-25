import Osama from "../../assets/osama.jpg"
import HeaderContainer from "./HaederContainer";
import NewNotificationContainer from "./NewNotificationContainer";




function PatientAccessManagement() {
    const notifications = {
        notf1 : {
            sender : "Ahmed",
            accessKey : "7gkjksdfhgdflkgjdfkl"
        },
        notf2 : {
            sender : "osama",
            accessKey : "iredfldkhjfflkgjdfkl"
        },
        notf3 : {
            sender : "Muthanna",
            accessKey : "jyiojytjtgdflkgjdfkl"
        },
        notf4 : {
            sender : "Azooz",
            accessKey : "otnjrlkjntrpojtrdftf"
        },
    };

    return (

        <div className="main-container flex flex-col justify-between">
            <HeaderContainer image={Osama} />
            <NewNotificationContainer notifications = {notifications} />

        </div>

    );
}

export default PatientAccessManagement