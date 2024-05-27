function DoctorNavContainer({ active, handleRecordslClick, handleDiagnosisClick, handleLabClick, handleXrayClick, handlePrescriptionClick }) {
    return (

        <div className="flex flex-row text-white gap-3 justify-center min-w-full">
            <div
                className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'records' ? 'border-blue-700' : 'border-transparent'}`}
                onClick={handleRecordslClick}
            >
                Shared Records
            </div>
            <div
                className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'diagnosis' ? 'border-blue-700' : 'border-transparent'}`}
                onClick={handleDiagnosisClick}
            >
                Diagnosis
            </div>
            <div
                className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'lab' ? 'border-blue-700' : 'border-transparent'}`}
                onClick={handleLabClick}
            >
                Lab Test
            </div>
            <div
                className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'xray' ? 'border-blue-700' : 'border-transparent'}`}
                onClick={handleXrayClick}
            >
                X-Ray
            </div>
            <div
                className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'prescription' ? 'border-blue-700' : 'border-transparent'}`}
                onClick={handlePrescriptionClick}
            >
                Prescriptions
            </div>
        </div>
    );
}

export default DoctorNavContainer;
