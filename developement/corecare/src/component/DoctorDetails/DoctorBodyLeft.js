import { Button } from "primereact/button";
import ImageNameContainer from "../UserDetails/ImageNameContainer";
import PatientHealtInfo from "./PatientHealtInfo";
import { MdSummarize } from "react-icons/md";

function DoctorBodyLeft(props) {
    return (

        <div className="flex flex-col bg-[#272C34] rounded-2xl my-5 mx-3 p-2 ">
            <ImageNameContainer incname="flex-col" icname="m-auto" ncname="text-center" image={props.image} username={props.username} name={props.name} gender={props.gender} age={props.age} />
            <PatientHealtInfo />
            <Button label="Summarize Condition" icon={<MdSummarize />} className="bg-white text-[#3146FF] font-bold rounded-[10px] p-2 m-auto w-3/4" />
        </div>
    );
}

export default DoctorBodyLeft