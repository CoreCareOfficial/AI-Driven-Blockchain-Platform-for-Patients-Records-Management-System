import DynamicCheckboxes from "./DynamicCheckboxes";


function Radiology() {
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
        { name: 'Radiography', key: 'R' },
        { name: 'Mammograp-hy', key: 'M' },
        { name: 'Fluoroscopy', key: 'F' },
        { name: 'Contrast radiography', key: 'C' },
        { name: 'Arthrography', key: 'A' },
        { name: 'Dexa Scan', key: 'D' },
        { name: 'Upper GI', key: 'U' }
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


    return (
        <div className="row justify-content-evenly" style={{ marginTop: '4px', padding: '10px' }}>
            <div className="col-4" style={styleCol}>
                <div style={styleDiv}>
                    <DynamicCheckboxes categories={ComputedTomography} title='Computed Tomography (CT)' />
                    <DynamicCheckboxes categories={PositronEmissionTomography} title='Positron Emission Tomography (PET)' />
                </div>
            </div>
            <div className="col-4" style={styleCol}>
                <div style={styleDiv}>
                    <DynamicCheckboxes categories={MagneticResonantImaging} title='Magnetic Resonant Imaging (MRI)' />
                    <DynamicCheckboxes categories={Ultrasound} title='Ultrasound' />
                </div>
            </div>
            <div className="col-4" style={styleCol}>
                <div style={styleDiv}>
                    <DynamicCheckboxes categories={XRay} title='X-Ray' />
                    <DynamicCheckboxes categories={HybridModalities} title='Hybrid Modalities' />
                </div>
            </div>
        </div>
    );
};

export default Radiology;