import CardListContaier from "../UserDetails/CardListContaier";

function MediCondiContainer(props) {
    return (
        <div className="w-full h-fit border-b border-[#272C34]">
            <div className="flex flex-row justify-between m-5 gap-[10%]">
                <CardListContaier title="Current Medications :" items={props.medication} />
                <CardListContaier title="Past Illnessess and Conditions :" items={props.pastCondition} />
            </div>
        </div>
    );
}
export default MediCondiContainer;