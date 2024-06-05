import { useEffect, useState } from "react";
import DynamicCheckboxes from "./DynamicCheckboxes";
import TextareaField from "./TextareaField";
import { Button } from "primereact/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userHealthInfo } from "../../Recoil/Atom";

function Radiology(props) {
    const styleCol = {
        height: 'fitContent',
        padding: '10px'
    };
    const styleDiv = {
        backgroundColor: '#3F4652',
        height: '100%',
        width: '100%',
        borderRadius: '15px',
    };

    const XRay = [
        { name: 'Radiography', key: 'XRR' },
        { name: 'Mammograp-hy', key: 'XM' },
        { name: 'Fluoroscopy', key: 'XF' },
        { name: 'Contrast radiography', key: 'XC' },
        { name: 'Arthrography', key: 'XA' },
        { name: 'Dexa Scan', key: 'XD' },
        { name: 'Upper GI', key: 'XU' }
    ];

    const ComputedTomography = [
        { name: 'Abdomen', key: 'CTAB' },
        { name: 'Appendix', key: 'CTAP' },
        { name: 'Bladder', key: 'CTBL' },
        { name: 'Brain', key: 'CTBRA' },
        { name: 'Breast', key: 'CTBRE' },
        { name: 'Chest', key: 'CTCH' },
        { name: 'Cervix', key: 'CTCE' },
        { name: 'Kidney', key: 'CTK' },
        { name: 'Lungs', key: 'CTL' },
        { name: 'Pancreas', key: 'CTP' },
        { name: 'Esophegous', key: 'CTE' },
    ];

    const PositronEmissionTomography = [
        { name: 'Oncology', key: 'PETO' },
        { name: 'Neuro Imaging', key: 'PETN' },
        { name: 'Cardiology', key: 'PETC' },
        { name: 'Infected Tissues', key: 'PETI' },
        { name: 'Pharmacokinetics', key: 'PETP' },
        { name: 'Small animal imaging', key: 'PETS' },
        { name: 'Musculoskeletal', key: 'PETM' },
    ];

    const MagneticResonantImaging = [
        { name: 'Neuro Imaging', key: 'MRIN' },
        { name: 'Cardiovascular', key: 'MRIC' },
        { name: 'Musculosketel', key: 'MRIM' },
        { name: 'Liver', key: 'MRIL' },
        { name: 'Gastrointestinal', key: 'MRIG' },
        { name: 'Functional', key: 'MRIF' },
        { name: 'Oncology', key: 'MRIO' },
        { name: 'Phase Contrast', key: 'MRIP' },
    ];

    const Ultrasound = [
        { name: 'Transrectal', key: 'UT1' },
        { name: 'Breast', key: 'UB' },
        { name: 'Doppler', key: 'UD' },
        { name: 'Abdominal', key: 'UA' },
        { name: 'Transandominal', key: 'UT2' },
        { name: 'Cranial', key: 'UC' },
        { name: 'Gallbladder', key: 'UG' },
        { name: 'Spleen', key: 'US' },
    ];

    const HybridModalities = [
        { name: 'PET-CT', key: 'HMPC' },
        { name: 'PET-MRI', key: 'HMPM' },
        { name: 'SPECT-CT', key: 'HMSC' },
        { name: 'MRI-SPECT', key: 'HMMS' },
        { name: 'MRI-CT', key: 'HMMC' },
        { name: 'Ultrasound-MRI', key: 'HMUM' },
        { name: 'Ultrasound-CT', key: 'HMUC' },
    ];

    const [notes, setNotes] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const setUserHealthInfoRadiology = useSetRecoilState(userHealthInfo);
    const userHealthInfoRadiology = useRecoilValue(userHealthInfo);

    const handleChange = (s) => {
        setSelectedCategories(prevCategories => [...prevCategories, s]);
    }

    const handleChangeRemove = (s) => {
        setSelectedCategories(prevCategories => prevCategories.filter(category => category.key !== s.key));
    }

    const handleSubmitRadiology = (event) => {
        event.preventDefault();
        setUserHealthInfoRadiology((prevUserInfo) => {
            const updatedRadiology = prevUserInfo.radiology;
            const updatedSelectedList = [
                ...(Array.isArray(updatedRadiology.selectedList) ? updatedRadiology.selectedList : []),
                ...selectedCategories
            ];

            return {
                ...prevUserInfo,
                radiology: {
                    ...updatedRadiology,
                    selectedList: updatedSelectedList,
                    notes: notes
                }
            };

        });
        props.handleDiagnosisClick();
    };

    useEffect(() => {
        console.log('==========================================================');
        console.log(`all radiology : ${userHealthInfoRadiology.radiology.selectedList}`);
        console.log('==========================================================');
    }, [userHealthInfoRadiology]);

    return (
        <>
            <div className="row justify-content-evenly" style={{ marginTop: '4px', padding: '10px' }}>
                <div className="col-4" style={styleCol}>
                    <div style={styleDiv}>
                        <DynamicCheckboxes categories={ComputedTomography} title={{ name: 'Computed Tomography (CT)', key: 'CT' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                        <DynamicCheckboxes categories={PositronEmissionTomography} title={{ name: 'Positron Emission Tomography (PET)', key: 'PET' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                    </div>
                </div>
                <div className="col-4" style={styleCol}>
                    <div style={styleDiv}>
                        <DynamicCheckboxes categories={MagneticResonantImaging} title={{ name: 'Magnetic Resonant Imaging (MRI)', key: 'MRI' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                        <DynamicCheckboxes categories={Ultrasound} title={{ name: 'Ultrasound', key: 'U' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                    </div>
                </div>
                <div className="col-4" style={styleCol}>
                    <div style={styleDiv}>
                        <DynamicCheckboxes categories={XRay} title={{ name: 'X-Ray', key: 'XR' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                        <DynamicCheckboxes categories={HybridModalities} title={{ name: 'Hybrid Modalities', key: 'HM' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                    </div>
                </div>
            </div>
            <div className="row justify-content-evenly" style={{ padding: '10px', width: '100%', marginLeft: '2px' }}>
                <TextareaField
                    label="Notes"
                    placeholder="Write your notes or Other Radiologies ......"
                    rows={3}
                    name="notes"
                    id="notes"
                    required
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    cname="mx-0 rounded-[25px] bg-[#3F4652] flex-row"
                />
            </div>
            <Button label="Submit" icon="pi pi-check-circle" className="bg-[#3146FF] my-2 mx-5 font-bold text-white rounded-[10px] p-2 w-1/6 self-end" onClick={handleSubmitRadiology} />
        </>
    );
};

export default Radiology;
