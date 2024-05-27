import ProfileHeaderIcon from "../UserDetails/ProfileHeaderIcon"
import ahmed from "../../assets/ahmed.jpg"
import H1 from "../H1"

function DoctorHeader() {
    return (
        <div className="flex flex-row justify-between border-b border-[#272C34]">
            <H1 name="text-cennter my-auto pl-3 font-poston " title='Core Care' />
            <ProfileHeaderIcon image={ahmed} />
        </div>
    );
}

export default DoctorHeader;