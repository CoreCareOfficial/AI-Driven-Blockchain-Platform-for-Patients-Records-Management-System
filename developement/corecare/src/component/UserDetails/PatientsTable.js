import H1 from '../H1';
import P from '../P';


function PatientsTable(props) {


    return (
        <>
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
                        <th style={{ width: '13%' }}> Next Visit Date</th>
                    </tr>
                </thead>

                <tbody>

                    {Object.keys(props.patients).map((patient) => (
                        <tr className="tbody_tr" key={props.patients[patient].id}>
                            <td>{props.patients[patient].name}</td>
                            <td>{props.patients[patient].accessed}</td>
                            <td>{props.patients[patient].diagnosis}</td>
                            <td>{props.patients[patient].nextVisit}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    );
}
export default PatientsTable;