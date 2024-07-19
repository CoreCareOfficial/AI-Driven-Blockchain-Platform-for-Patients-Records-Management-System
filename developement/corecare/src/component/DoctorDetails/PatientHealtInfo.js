import HealthCard from "../UserDetails/HealthCard";
import blood from "../../assets/blood.png";
import sugar from "../../assets/suger.png";
import weight from "../../assets/weight.png";
import height from "../../assets/height.png";
import pressure from "../../assets/pressure.png";
import respiratory from "../../assets/respiratory.png";
import heart from "../../assets/heart.png";
import allergies from "../../assets/allergies.png";
import { FormatRelativeTime } from "../../utiles/FormatRelativeTime";

function PatientHealtInfo(props) {
    return (
        <div className="my-4">
            <h4>Health Information :</h4>
            {props.healthInfo &&
                <div className="flex flex-col my-1">
                    <HealthCard image={blood} title="Blood (HP) :" date={FormatRelativeTime(props.healthInfo.blooddate)} value={props.healthInfo.blood} />
                    <HealthCard image={sugar} title="Blood Sugar :" date={FormatRelativeTime(props.healthInfo.bloodsugardate)} value={props.healthInfo.bloodsugar} />
                    <HealthCard image={pressure} title="Blood Pressure :" date={FormatRelativeTime(props.healthInfo.bloodpressuredate)} value={props.healthInfo.bloodpressure} />
                    <HealthCard image={heart} title="Heart Rate (Pulse):" date={FormatRelativeTime(props.healthInfo.heartratedate)} value={props.healthInfo.heartrate ? `${props.healthInfo.heartrate}/m` : ''} />
                    <HealthCard image={respiratory} title="Respiratory Rate :" date={FormatRelativeTime(props.healthInfo.respiratoryratedate)} value={props.healthInfo.respiratoryrate ? `${props.healthInfo.respiratoryrate}/m` : ''} />
                    <HealthCard image={allergies} title="Allergies :" date={FormatRelativeTime(props.allergies.allergiesdate)} value={props.allergies.allergyname} />
                    <HealthCard image={weight} title="Weight :" date={FormatRelativeTime(props.healthInfo.weightdate)} value={props.healthInfo.weight ? `${props.healthInfo.weight} kg` : ''} />
                    <HealthCard image={height} title="Height :" date={FormatRelativeTime(props.healthInfo.heightdate)} value={props.healthInfo.height ? `${props.healthInfo.height} cm` : ''} />
                </div>
            }
        </div>
    );
}
export default PatientHealtInfo;