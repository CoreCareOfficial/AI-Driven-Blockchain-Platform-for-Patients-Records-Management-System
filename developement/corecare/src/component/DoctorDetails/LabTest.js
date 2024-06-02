import { Checkbox } from "primereact/checkbox";
import DynamicCheckboxes from "./DynamicCheckboxes";
import TextareaField from "./TextareaField";
import { useState } from "react";


function LabTest() {

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
        { name: 'Neutrophil', key: 'N' },
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

    return (
        <div className="row justify-content-evenly" style={{ marginTop: '4px', padding: '10px' }}>
            <div className="col-3" style={styleCol}>
                <div style={styleDiv}>
                    <DynamicCheckboxes categories={Hematology} title='Hematology' key='H' />
                </div>
            </div>
            <div className="col-3" style={styleCol}>
                <div style={styleDiv}>
                    <DynamicCheckboxes categories={Boichemistry} title='Boichemistry' key='B' />
                </div>
            </div>
            <div className="col-3" style={styleCol}>
                <div style={styleDiv}>
                    <div className="flex align-items-center ml-2 pt-2">
                        <Checkbox inputId="Serology" name='Serology' value='Serology' />
                        <label htmlFor="Serology" className="ml-1"
                            style={{ color: '#ffffff', marginTop: '-8px', fontSize: '16px' }}>Serology</label>
                    </div>
                    <div style={{ width: '90%', margin: "auto" }}>
                        <DynamicCheckboxes categories={WIDALTest} title='WIDALTest :' key='W' />
                        <DynamicCheckboxes categories={BRUCELLOSIOD} title='BRUCELLOSIOD :' key='BRUCELLOSIOD' />
                        <DynamicCheckboxes categories={ToxoplasmaAg} title='Toxoplasma Ag :' key='TA' />
                        <DynamicCheckboxes categories={Serology} key='S' />
                    </div>
                </div>
            </div>
            <div className="col-3" style={styleCol}>
                <div style={styleDiv}>
                    <div className="flex align-items-center ml-2 pt-2">
                        <Checkbox inputId="Stool" name='Stool' value='Stool' />
                        <label htmlFor="Stool" className="ml-1"
                            style={{ color: '#ffffff', marginTop: '-8px', fontSize: '16px' }}>Stool</label>
                    </div>
                    <DynamicCheckboxes categories={Urine} title='Urine' key='U' />
                    <DynamicCheckboxes categories={Semen} title='Semen' key='SE' />
                    <div className="flex align-items-center ml-2 pt-2">
                        <Checkbox inputId="AntibioticsSensetivity" name='AntibioticsSensetivity' value='Antibiotics Sensetivity' />
                        <label htmlFor="AntibioticsSensetivity" className="ml-1"
                            style={{ color: '#ffffff', marginTop: '-8px', fontSize: '16px' }}>Antibiotics Sensetivity</label>
                    </div>
                    <TextareaField
                        label="Notes"
                        placeholder="Write your notes"
                        rows={13}
                        name="notes"
                        id="notes"
                        required
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        cname="mx-0 bg-[#272C34]"
                    />
                </div>
            </div>
        </div>
    );
};

export default LabTest;