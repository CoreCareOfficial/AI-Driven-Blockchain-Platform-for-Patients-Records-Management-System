import React from "react";
import H1 from "../H1";
import DynamicCard from '../bootcomponent/DynamicCard';
import { Card } from "react-bootstrap";

function Section2(){
    return(
        <>
        <section className="H_section2">
            <H1 name="H_title" title="#Overview"/>
            <DynamicCard name="H_section2_card">
                <Card.Text>
                The overarching goal of the project is to develop an AI-driven blockchain platform
                that revolutionizes the management of patient records within the healthcare industry.
                The primary focus of the project is to achieve the following objectives:
                </Card.Text>
                <ol >
                    <ol>
                        1- Secure and Decentralized Platform:
                        <li>
                        Develop a secure and decentralized platform for the storage
                        and management of patient records, leveraging the capabilities
                        of blockchain technology.
                        </li>
                        <li>
                        Utilize blockchain to ensure data integrity, transparency, 
                        and resistance to unauthorized tampering.
                        </li>
                    </ol>

                    <ol >
                    2- Integration of AI Algorithms:
                    <li>
                    Integrate advanced AI algorithms into the platform to analyze patient 
                    data comprehensively.
                    </li>
                    <li>
                    Extract valuable insights from the data to enhance diagnostic accuracy 
                    and treatment effectiveness.
                    </li>
                    <li>
                    Provide personalized healthcare recommendations based on AI-driven analysis.
                    </li>
                    </ol>

                    <ol>
                    3- Robust Access Control Mechanism:
                    <li>
                    Implement a robust access control mechanism to safeguard patient data 
                    privacy and confidentiality.
                    </li>

                    <li>
                    Utilize blockchain-based smart contracts and cryptographic techniques to 
                    enforce stringent access controls.
                    </li>
                    </ol>

                    <ol>
                    4- Facilitate Seamless Data Sharing:
                    <li>
                    Establish mechanisms for seamless data sharing between healthcare providers.
                    </li>
                    <li>
                    Enhance interoperability to promote effective coordination of care among different
                    </li>
                    </ol>
                </ol>

            </DynamicCard>
        </section>
        </>
    );
}
export default Section2;