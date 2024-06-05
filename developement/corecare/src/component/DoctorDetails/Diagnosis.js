import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../../css/DoctorPageStyle/diagonsis.css';
import { MdOutlineVaccines } from "react-icons/md";
import { FaVial, FaXRay } from "react-icons/fa";
import { Button } from "primereact/button";
import InputField from './InputField';
import TextareaField from './TextareaField';
import PrescribedItem from './PrescribedItem';
import NextVisit from './NextVisit';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userHealthInfo } from '../../Recoil/Atom';

const Diagnosis = ({ handleLabClick, handleXrayClick, handlePrescriptionClick }) => {
    const [healthInfo, setHealthInfo] = useRecoilState(userHealthInfo);
    const resetState = useResetRecoilState(userHealthInfo);
    const [diagnosis, setDiagnosis] = useState(healthInfo.diagnosis);
    const [notes, setNotes] = useState(healthInfo.notes);
    const [nextVisit, setNextVisit] = useState(healthInfo.dateOfNextVisit);
    const navigate = useNavigate();

    const handleDiagnosisChange = (e) => {
        setHealthInfo(prevDiagnosis => {
            return {
                ...prevDiagnosis,
                diagnosis: e,
            };
        });
        setDiagnosis(e)
    };
    const handleNotesChange = (e) => {
        setHealthInfo(prevDiagnosis => {
            return {
                ...prevDiagnosis,
                notes: e,
            };
        });
        setNotes(e)
    };
    const handleVisitChange = (e) => {
        setHealthInfo(prevDiagnosis => {
            return {
                ...prevDiagnosis,
                dateOfNextVisit: e,
            };
        });
        setNextVisit(e)
    };

    const handleRemovePrescription = (index) => {
        setHealthInfo(prevInfo => {
            const updatedPrescriptions = [...prevInfo.prescription];
            updatedPrescriptions.splice(index, 1);
            return {
                ...prevInfo,
                prescription: updatedPrescriptions
            };
        });
    };
    const handleRemoveRadiology = (index) => {
        setHealthInfo(prevInfo => {
            const updatedRadiologys = [...prevInfo.radiology.selectedList];
            updatedRadiologys.splice(index, 1);
            return {
                ...prevInfo,
                radiology: {
                    ...prevInfo.radiology,
                    selectedList: updatedRadiologys
                }
            };
        });
    };

    const handleRemoveLabTest = (index) => {
        setHealthInfo(prevInfo => {
            const updatedLabTests = [...prevInfo.labTests.selectedList];
            updatedLabTests.splice(index, 1);
            return {
                ...prevInfo,
                labTests: {
                    ...prevInfo.labTests,
                    selectedList: updatedLabTests
                }
            };
        });
    };

    const Reset = () => {
        resetState();
        setDiagnosis('');
        setNotes('');
        setNextVisit('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            diagnosis,
            notes,
            prescribedMedicine: healthInfo.prescription,
            prescribedLabTests: healthInfo.labTests.selectedList,
            prescribedXrays: healthInfo.radiology.selectedList,
            nextVisit

        };

        // Send formData to the backend
        console.log(formData);
        Reset();
        // navigate(-1);

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
                    onChange={(e) => handleDiagnosisChange(e.target.value)}
                    cname="mx-5 my-2 bg-[#3F4652]"
                />

                <TextareaField
                    label="Notes"
                    placeholder="Write your notes"
                    rows={13}
                    name="notes"
                    id="notes"
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    cname="mx-5 bg-[#3F4652]"
                />

                <div className="doctor-body-bottom flex flex-row gap-5 justify-between mx-5 my-3">
                    <PrescribedItem
                        icon={<MdOutlineVaccines />}
                        title="The Prescribed Medicine"
                        items={healthInfo.prescription}
                        handleClick={handlePrescriptionClick}
                        handleRemove={handleRemovePrescription}
                        toshow={'medname'}
                    />
                    <PrescribedItem
                        icon={<FaVial />}
                        title="The Prescribed Lab Test"
                        items={healthInfo.labTests.selectedList}
                        handleClick={handleLabClick}
                        handleRemove={handleRemoveLabTest}
                        toshow={'name'}
                        mainKey={'mainKey'}

                    />
                    <PrescribedItem
                        icon={<FaXRay />}
                        title="The Prescribed X-rays"
                        items={healthInfo.radiology.selectedList}
                        handleClick={handleXrayClick}
                        handleRemove={handleRemoveRadiology}
                        toshow={'name'}
                        mainKey={'mainKey'}

                    />
                </div>

                <NextVisit
                    value={nextVisit}
                    onChange={(e) => handleVisitChange(e.target.value)}
                />

                <Button label="Submit" icon="pi pi-check-circle" className="bg-[#3146FF] my-2 mx-5 font-bold text-white rounded-[10px] p-2 w-1/6 self-end" />
            </div>
        </form>
    );
}

export default Diagnosis;
