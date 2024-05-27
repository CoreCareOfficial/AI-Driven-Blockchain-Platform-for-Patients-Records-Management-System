import CardListContaier from "../UserDetails/CardListContaier";

function MediCondiContainer() {
    return (
        <div className="w-full h-fit border-b border-[#272C34]">
            <div className="flex flex-row justify-between m-5 gap-[10%]">
                <CardListContaier title="Current Medications :" items={['Medicine 1', 'Medicine 2', 'Medicine 3', '....']} />
                <CardListContaier title="Past Illnessess and Conditions :" items={['Condition 1', 'Condition 2', 'Condition 3', ' ...']} />
            </div>
        </div>
    );
}
export default MediCondiContainer;