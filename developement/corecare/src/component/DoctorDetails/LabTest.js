import DynamicCheckboxes from "./DynamicCheckboxes";
import TextareaField from "./TextareaField";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userHealthInfo } from "../../Recoil/Atom";

function LabTest(props) {

    const styleCol = {
        height: 'fitContent',
        padding: '10px'
    };
    const styleDiv = {
        backgroundColor: '#3F4652',
        height: '100%',
        width: '100%',
        minWidth: '200px',
        borderRadius: '10px',
    };

    const WIDALTest = [
        { name: 'S.typhi O', key: 'SO' },
        { name: 'S.typhi H', key: 'SH' },
        { name: 'S.paratyphi A', key: 'SA' },
        { name: 'Neutrophil', key: 'NE' },
    ];

    const BRUCELLOSIOD = [
        { name: 'B.abroutus', key: 'BA' },
        { name: 'B.meltiensis', key: 'BM' },
    ];

    const ToxoplasmaAg = [
        { name: 'IgG', key: 'IgG' },
        { name: 'IgM', key: 'IgM' },
    ];

    const Semen = [
        { name: 'Wet Mount', key: 'WM' },
        { name: 'Gram Stain', key: 'GS' },
    ];

    const Urine = [
        { name: 'Pregancy Test', key: 'PT' },
    ];

    const Serology = [
        { name: 'H.pylori : Ab', key: 'HPAB' },
        { name: 'H.pylori :Ag', key: 'HPAG' },
        { name: 'A.S.O', key: 'ASO' },
        { name: 'C.R.P', key: 'CRP' },
        { name: 'RF', key: 'RF' },
        { name: 'HBsAG', key: 'HBsAG' },
        { name: 'H.C.V', key: 'HCV' },
        { name: 'H.I.V', key: 'HTV' },
        { name: 'HAV', key: 'HAV' },
        { name: 'DENGUE FEVER', key: 'DF' },
        { name: 'Anti schistosoma IgG', key: 'ASI' },
        { name: 'S.pregnancy test', key: 'SPT' },
    ];


    const Hematology = [
        { name: 'HB', key: 'HB' },
        { name: 'PCV', key: 'PCV' },
        { name: 'RBC', key: 'RBC' },
        { name: 'WBC', key: 'WBC' },
        { name: 'Neutrophil', key: 'N' },
        { name: 'Lymphocyte', key: 'L' },
        { name: 'Monocyte', key: 'M' },
        { name: 'Basophil', key: 'B' },
        { name: 'CT ( lee white )', key: 'CT' },
        { name: 'ESR', key: 'ESR' },
        { name: 'Plts', key: 'p' },
        { name: 'Blood Group & Rh', key: 'BGR' },
        { name: 'Skin Lieshmaniasis', key: 'SL' },
        { name: 'Sickling Test', key: 'ST' },
        { name: 'BLOOD FILM Show', key: 'BFS' },
        { name: 'MALARIA', key: 'MALARIA' },
        { name: 'MPS Ag', key: 'MPSAg' },
    ];

    const Boichemistry = [
        { name: 'F.Glucose', key: 'FG' },
        { name: 'R.Glucose', key: 'RG' },
        { name: 'Urea', key: 'U' },
        { name: 'Creatinine', key: 'CR' },
        { name: 'Uric acid', key: 'UA' },
        { name: 'T.Bilirubin', key: 'TB' },
        { name: 'D.Bilirubin', key: 'DB' },
        { name: 'GPT', key: 'GPT' },
        { name: 'GOT', key: 'GOT' },
        { name: 'ALK. Phos', key: 'AP' },
        { name: 'T.Protine', key: 'TP' },
        { name: 'Albumin', key: 'A' },
        { name: 'Ca', key: 'Ca' },
        { name: 'Cholesterol', key: 'CH' },
        { name: 'Triglyceride', key: 'T' },
        { name: 'HDL', key: 'HDL' },
        { name: 'LDL', key: 'LDL' },
        { name: 'Phosphorus', key: 'PH' },
        { name: 'Sodium', key: 'S' },
        { name: 'Potassium', key: 'PO' },
        { name: 'HBA1C', key: 'HBA1C' },
    ];

    const [notes, setNotes] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const setUserHealthInfoLab = useSetRecoilState(userHealthInfo);
    const userHealthInfoLab = useRecoilValue(userHealthInfo);

    const handleChange = (s) => {
        setSelectedCategories(prevCategories => [...prevCategories, s]);
    };

    const handleChangeRemove = (s) => {
        setSelectedCategories(prevCategories => prevCategories.filter(category => category.key !== s.key));
    };

    const handleSubmitRadiology = (event) => {
        event.preventDefault();
        setUserHealthInfoLab((prevUserInfo) => {
            const updatedLab = prevUserInfo.labTests;
            const updatedSelectedList = [
                ...(Array.isArray(updatedLab.selectedList) ? updatedLab.selectedList : []),
                ...selectedCategories
            ];

            return {
                ...prevUserInfo,
                labTests: {
                    ...updatedLab,
                    selectedList: updatedSelectedList,
                    notes: notes
                }
            };

        });
        props.handleDiagnosisClick();
    };

    useEffect(() => {
        console.log('==========================================================');
        console.log(`all radiology : ${userHealthInfoLab.labTests.selectedList}`);
        console.log('==========================================================');
    }, [userHealthInfoLab]);

    return (
        <>
            <div className="row justify-content-evenly" style={{ marginTop: '4px', padding: '10px' }}>
                <div className="col-3" style={styleCol}>
                    <div style={styleDiv}>
                        <DynamicCheckboxes categories={Hematology} title={{ name: 'Hematology', key: 'H' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                    </div>
                </div>
                <div className="col-3" style={styleCol}>
                    <div style={styleDiv}>
                        <DynamicCheckboxes categories={Boichemistry} title={{ name: 'Boichemistry', key: 'B' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                    </div>
                </div>
                <div className="col-3" style={styleCol}>
                    <div style={styleDiv}>
                        <DynamicCheckboxes categories={WIDALTest} title={{ name: 'WIDALTest :', key: 'W' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                        <DynamicCheckboxes categories={BRUCELLOSIOD} title={{ name: 'BRUCELLOSIOD :', key: 'BRUCELLOSIOD' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                        <DynamicCheckboxes categories={ToxoplasmaAg} title={{ name: 'Toxoplasma Ag :', key: 'TA' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                        <DynamicCheckboxes categories={Serology} title={{ name: '', key: 'S' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                    </div>
                </div>
                <div className="col-3" style={styleCol}>
                    <div style={styleDiv}>
                        <DynamicCheckboxes categories={Urine} title={{ name: 'Urine', key: 'U' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                        <DynamicCheckboxes categories={Semen} title={{ name: 'Semen', key: 'SE' }} onSelectionChange={handleChange} onRemoveSelect={handleChangeRemove} />
                        <TextareaField
                            label="Notes"
                            placeholder="Write your notes"
                            rows={11}
                            name="notes"
                            id="notes"
                            required
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            cname="mx-0 bg-[#3F4652]"
                        />
                    </div>
                </div>
            </div>
            <Button label="Submit" icon="pi pi-check-circle" className="bg-[#3146FF] my-2 mx-5 font-bold text-white rounded-[10px] p-2 w-1/6 self-end" onClick={handleSubmitRadiology} />
        </>
    );
};

export default LabTest;