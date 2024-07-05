function DoctorNavContainer({
    userType, active,
    handleRecordslClick,
    handleDiagnosisClick,
    handleLabClick,
    handleXrayClick,
    handlePrescriptionClick,
    handleUpdateClick,
    handleLaboratoryClick,
    handleRadiologyClick,
    handlePharmacyClick }) {

    return (

        <div className="flex flex-row text-white gap-3 justify-center min-w-full">
            {userType === "Doctor" ? (
                <>
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
                        Radiology
                    </div>

                    <div
                        className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'prescription' ? 'border-blue-700' : 'border-transparent'}`}
                        onClick={handlePrescriptionClick}
                    >
                        Prescriptions
                    </div>
                </>

            )
                : userType === "Hospital" ? (
                    <>
                        <div
                            className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'laboratory' ? 'border-blue-700' : 'border-transparent'}`}
                            onClick={handleLaboratoryClick}
                        >
                            Laboratory Test
                        </div>

                        <div
                            className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'radiology' ? 'border-blue-700' : 'border-transparent'}`}
                            onClick={handleRadiologyClick}
                        >
                            Radiology Test
                        </div>
                        <div
                            className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'pharmacy' ? 'border-blue-700' : 'border-transparent'}`}
                            onClick={handlePharmacyClick}
                        >
                            Prescription
                        </div>

                        <div
                            className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'update' ? 'border-blue-700' : 'border-transparent'}`}
                            onClick={handleUpdateClick}
                        >
                            Update Health Information
                        </div>

                    </>
                )
                    : userType === "Pharmacy" ? (
                        <>
                            <div
                                className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'pharmacy' ? 'border-blue-700' : 'border-transparent'}`}
                                onClick={handlePharmacyClick}
                            >
                                Prescription
                            </div>

                            <div
                                className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'update' ? 'border-blue-700' : 'border-transparent'}`}
                                onClick={handleUpdateClick}
                            >
                                Update Health Information
                            </div>
                        </>
                    )
                        : userType === "Laboratory" ? (
                            <>
                                <div
                                    className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'laboratory' ? 'border-blue-700' : 'border-transparent'}`}
                                    onClick={handleLaboratoryClick}
                                >
                                    Laboratory Test
                                </div>
                                <div
                                    className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'update' ? 'border-blue-700' : 'border-transparent'}`}
                                    onClick={handleUpdateClick}
                                >
                                    Update Health Information
                                </div>
                            </>
                        )
                            : userType === "Radiology" ? (
                                <>
                                    <div
                                        className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'radiology' ? 'border-blue-700' : 'border-transparent'}`}
                                        onClick={handleRadiologyClick}
                                    >
                                        Radiology Test
                                    </div>
                                    <div
                                        className={`p-2 border-b-2 duration-700 cursor-pointer ${active === 'update' ? 'border-blue-700' : 'border-transparent'}`}
                                        onClick={handleUpdateClick}
                                    >
                                        Update Health Information
                                    </div>
                                </>
                            ) : null
            }

        </div>
    );
}

export default DoctorNavContainer;
