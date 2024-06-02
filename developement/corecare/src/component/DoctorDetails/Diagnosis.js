import { useState } from 'react';
import '../../css/DoctorPageStyle/diagonsis.css';
import { MdOutlineVaccines } from "react-icons/md";
import { FaVial, FaXRay } from "react-icons/fa";
import { Button } from "primereact/button";
import InputField from './InputField';
import TextareaField from './TextareaField';
import PrescribedItem from './PrescribedItem';
import NextVisit from './NextVisit';

const Diagnosis = ({ handleLabClick, handleXrayClick, handlePrescriptionClick }) => {
    const [diagnosis, setDiagnosis] = useState('');
    const [notes, setNotes] = useState('');
    const [nextVisit, setNextVisit] = useState('');
    const prescribedItems = ['Augmen', 'Augmen', 'Augmen']; // Example items

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            diagnosis,
            notes,
            prescribedMedicine: prescribedItems, // This would come from your state
            prescribedLabTests: prescribedItems, // This would come from your state
            prescribedXrays: prescribedItems, // This would come from your state
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
                    required
                    autoFocus
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    cname='mx-5 my-3'
                />

                <TextareaField
                    label="Notes"
                    placeholder="Write your notes"
                    rows={13}
                    name="notes"
                    id="notes"
                    required
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    cname="mx-5"
                />

                <div className="doctor-body-bottom flex flex-row gap-5 justify-between mx-5 my-3">
                    <PrescribedItem
                        icon={<MdOutlineVaccines />}
                        title="The Prescribed Medicine"
                        items={prescribedItems}
                        handleClick={handlePrescriptionClick}
                    />
                    <PrescribedItem
                        icon={<FaVial />}
                        title="The Prescribed Lab Test"
                        items={prescribedItems}
                        handleClick={handleLabClick}
                    />
                    <PrescribedItem
                        icon={<FaXRay />}
                        title="The Prescribed X-rays"
                        items={prescribedItems}
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
