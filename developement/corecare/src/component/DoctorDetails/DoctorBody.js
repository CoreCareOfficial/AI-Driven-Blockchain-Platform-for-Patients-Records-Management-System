
import DoctorBodyLeft from "./DoctorBodyLeft";
import Osama from '../../assets/osama.jpg'
import MediCondiContainer from "./MediCondiContainer";
import { useState } from "react";
import DoctorNavContainer from "./DoctorNavContainer";



function DoctorBody() {
    const [active, setActive] = useState('records')

    const handleRecordslClick = () => {
        setActive('records');
    }

    const handleDiagnosisClick = () => {
        setActive('diagnosis');
    }

    const handleLabClick = () => {
        setActive('lab');
    }

    const handleXrayClick = () => {
        setActive('xray');
    }

    const handlePrescriptionClick = () => {
        setActive('prescription');
    }

    return (
        <div className="flex flex-row text-white justify-between">
            <DoctorBodyLeft image={Osama} username="osama" name="Osama Alathwari" gender="Male" age="29" />
            <div className="flex flex-col w-full">
                <MediCondiContainer />
                <DoctorNavContainer
                    active={active}
                    handleRecordslClick={handleRecordslClick}
                    handleDiagnosisClick={handleDiagnosisClick}
                    handleLabClick={handleLabClick}
                    handleXrayClick={handleXrayClick}
                    handlePrescriptionClick={handlePrescriptionClick}
                />
                {active === 'records' ? <div>records</div>
                    : active === 'diagnosis' ? <div>diag</div>
                        : active === 'lab' ? <div>lab</div>
                            : active === 'xray' ? <div>ray</div>
                                : <div>prescription</div>
                }
            </div>
        </div>
    );
}

export default DoctorBody