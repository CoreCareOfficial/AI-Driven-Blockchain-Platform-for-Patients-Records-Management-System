import H1 from '../H1';
import P from '../P';


function PatientsTable(props) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className='flex flex-col flex-wrap'>
                <div className="Recordes_result">
                    <H1 name="result_title" title="Previous Patients" />
                    <P name="result_text" title={"Showing : " + Object.keys(props.patients).length + " patient records"} />
                </div>
                <table className="records_table" style={{ margin: '5px' }}>

                    <thead className="records_thead">
                        <tr className="thead_tr">
                            <th style={{ width: '37%' }}>Patient Name</th>
                            <th style={{ width: '13%' }}> Access Date</th>
                            <th style={{ width: '37%' }}>General Diagnosis</th>
                            <th style={{ width: props.userType === 'Doctor' && '13%', display: props.userType !== 'Doctor' && 'none' }}> {props.userType === 'Doctor' && 'Next Visit Date'}</th>
                        </tr>
                    </thead>

                    <tbody>

                        {props.patients && props.patients.map((patient) => (
                            <tr className="tbody_tr" key={patient.id}>
                                <td>{patient.patientName}</td>
                                <td>{formatDate(patient.accessdate)}</td>
                                <td>{patient.diagnosis}</td>
                                <td>{props.userType === 'Doctor' && formatDate(patient.nextvisitdate)}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    );
}
export default PatientsTable;