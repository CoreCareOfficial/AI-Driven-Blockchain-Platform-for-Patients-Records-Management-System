import { useState } from 'react';
import '../../css/DoctorPageStyle/diagonsis.css';
import { MdOutlineVaccines } from "react-icons/md";
import { FaVial, FaXRay } from "react-icons/fa";
import { Button } from "primereact/button";
import InputField from './InputField';
import TextareaField from './TextareaField';
import PrescribedItem from './PrescribedItem';
import NextVisit from './NextVisit';
import { useRecoilValue } from 'recoil';
import { userHealthInfo } from '../../Recoil/Atom';

const Diagnosis = ({ handleLabClick, handleXrayClick, handlePrescriptionClick }) => {
    const healthInfo = useRecoilValue(userHealthInfo);
    const [diagnosis, setDiagnosis] = useState('');
    const [notes, setNotes] = useState('');
    const [nextVisit, setNextVisit] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            diagnosis,
            notes,
            prescribedMedicine: healthInfo.prescription,
            prescribedLabTests: healthInfo[0].labTests.selectedList,
            prescribedXrays: healthInfo[0].radiology.selectedList,
            nextVisit
        };

        // Send formData to the backend
        console.log(formData);
    };

    return (
        <form id="main" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-around gap-2 h-full">
                <InputField
                    label="Diagnosis"
                    placeholder="Write your diagnosis"
                    type="text"
                    name="diagnosis"
                    id="diagnosis"
                    autoFocus
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    cname="mx-5 my-2 bg-[#3F4652]"
                />

                <TextareaField
                    label="Notes"
                    placeholder="Write your notes"
                    rows={13}
                    name="notes"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    cname="mx-5 bg-[#3F4652]"
                />

                <div className="doctor-body-bottom flex flex-row gap-5 justify-between mx-5 my-3">
                    <PrescribedItem
                        icon={<MdOutlineVaccines />}
                        title="The Prescribed Medicine"
                        items={healthInfo.prescription}
                        handleClick={handlePrescriptionClick}
                    />
                    <PrescribedItem
                        icon={<FaVial />}
                        title="The Prescribed Lab Test"
                        items={healthInfo[0].labTests.selectedList}
                        handleClick={handleLabClick}
                    />
                    <PrescribedItem
                        icon={<FaXRay />}
                        title="The Prescribed X-rays"
                        items={healthInfo[0].radiology.selectedList}
                        handleClick={handleXrayClick}
                    />
                </div>

                <NextVisit
                    value={nextVisit}
                    onChange={(e) => setNextVisit(e.target.value)}
                />

                <Button label="Submit" icon="pi pi-check-circle" className="bg-[#3146FF] my-2 mx-5 font-bold text-white rounded-[10px] p-2 w-1/6 self-end" />
            </div>
        </form>
    );
}

export default Diagnosis;
