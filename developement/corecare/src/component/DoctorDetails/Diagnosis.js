import { useRef, useState } from 'react';
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
import { Toast } from 'primereact/toast';
import dotenv from 'dotenv';
dotenv.config();
const SERVER_URL = process.env.SERVER_URL;

const Diagnosis = ({ patientid, keyuser, handleLabClick, handleXrayClick, handlePrescriptionClick }) => {
    const [healthInfo, setHealthInfo] = useRecoilState(userHealthInfo);
    const resetState = useResetRecoilState(userHealthInfo);
    const [diagnosis, setDiagnosis] = useState(healthInfo.diagnosis);
    const [notes, setNotes] = useState(healthInfo.notes);
    const [dateOfNextVisit, setDateOfNextVisit] = useState(healthInfo.dateOfNextVisit);
    const [reasonOfNextVisit, setReasonOfNextVisit] = useState(healthInfo.reasonOfNextVisit);
    const navigate = useNavigate();
    const toast = useRef(null);


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
    const handleVisitDateChange = (e) => {
        setHealthInfo(prevDiagnosis => {
            return {
                ...prevDiagnosis,
                dateOfNextVisit: e,
            };
        });
        setDateOfNextVisit(e)
    };
    const handleVisitReasonChange = (e) => {
        setHealthInfo(prevDiagnosis => {
            return {
                ...prevDiagnosis,
                reasonOfNextVisit: e,
            };
        });
        setReasonOfNextVisit(e)
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
        setDateOfNextVisit('');
        setReasonOfNextVisit('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!patientid) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a patient first' });
            return;
        }
        if (!keyuser) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login again' });
            return;
        }
        const formData = {
            patientid,
            doctorid: keyuser,
            diagnosis,
            notes,
            prescribedMedicine: healthInfo.prescription,
            prescribedLabTests: healthInfo.labTests.selectedList,
            prescribedXrays: healthInfo.radiology.selectedList,
            radiologyNotes: healthInfo.radiology.notes,
            labTestsNotes: healthInfo.labTests.notes,
            nextVisitDate: dateOfNextVisit,
            nextVisitReason: reasonOfNextVisit
        };
        // Send formData to the backend
        console.log(formData);
        try {
            const response = await fetch(`${SERVER_URL}/diagnosis`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred' });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Diagnosis submitted successfully' });
            Reset();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred' });
            console.error(error.message);
        }
        // navigate(-1);
    };

    return (
        <>
            <Toast ref={toast} />
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
                        date={dateOfNextVisit}
                        reason={reasonOfNextVisit}
                        onDateChange={(e) => handleVisitDateChange(e.target.value)}
                        onReasonChange={(e) => handleVisitReasonChange(e.target.value)}
                    />

                    <Button label="Submit" icon="pi pi-check-circle" className="bg-[#3146FF] my-2 mx-5 font-bold text-white rounded-[10px] p-2 w-1/6 self-end" />
                </div>
            </form>
        </>
    );
}

export default Diagnosis;
