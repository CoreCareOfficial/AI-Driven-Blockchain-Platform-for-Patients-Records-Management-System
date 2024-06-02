import React, { useState } from "react";
import { Container } from "react-bootstrap";
import '../../css/prescriptionStyle/prescription.css';
import DynamicCard from '../bootcomponent/DynamicCard';
import { DynamicForm, SettingInput } from '../settingdetails/TextFormSetting';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

function Prescription({handleDiagnosisClick}) {
    const [cards, setCards] = useState([{ id: 1, medname: '', dosage: '', notes: '' }]);

    const handleInputChange = (index, field, value) => {
        console.log(`Updating card ${index} field ${field} with value ${value}`);
        const updatedCards = [...cards];
        updatedCards[index][field] = value;
        setCards(updatedCards);
    };

    const addCard = () => {
        const lastCard = cards[cards.length - 1];
        console.log("Last card values:", lastCard);
        if (lastCard.medname && lastCard.dosage) {
            setCards([...cards, { id: cards.length + 1, medname: '', dosage: '', notes: '' }]);
            console.log("Card added:", cards);
        } else {
            alert('Please fill all fields before adding a new card.');
        }
    };

    const removeCard = (index) => {
        console.log(`Removing card ${index}`);
        setCards(cards.filter((_, i) => i !== index));
    };

    return (
        <>
            <Container className="prescriptionPage" style={{ backgroundColor: '#181a1f' }}>

                <DynamicForm name="prescriptionForm" btn="Submit" cards={cards} handleDiagnosisClick={handleDiagnosisClick}>

                    {cards.map((card, index) => (
                        <DynamicCard key={card.id} name="prescriptionCard">
                            <SettingInput
                                class_name="prescriptionInput"
                                name="name"
                                label="Name"
                                type="text"
                                value={card.medname}
                                onChange ={(e) => handleInputChange(index, 'medname', e.target.value)}
                                placeholder=""
                            />
                            <SettingInput
                                class_name="prescriptionInput"
                                name="dosage"
                                label="Dosage"
                                type="text"
                                value={card.dosage}
                                onChange={(e) => handleInputChange(index, 'dosage', e.target.value)}
                                placeholder=""
                            />
                            <SettingInput
                                class_name="prescriptionInput"
                                name="notes"
                                label="Notes"
                                type="text"
                                value={card.notes}
                                onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
                                placeholder=""
                            />
                            {index === cards.length - 1 && (
                                <CiCirclePlus
                                    style={{ fontSize: '1.6em', color: 'white', position: 'absolute', right: '10px', cursor: 'pointer' }}
                                    onClick={addCard}
                                />
                            )}
                            {cards.length > 1 && (
                                <CiCircleMinus
                                    style={{ fontSize: '1.6em', color: 'red', position: 'absolute', right: '40px', cursor: 'pointer' }}
                                    onClick={() => removeCard(index)}
                                />
                            )}
                        </DynamicCard>
                    ))}
                </DynamicForm>
            </Container>
        </>
    );
}

export default Prescription;
