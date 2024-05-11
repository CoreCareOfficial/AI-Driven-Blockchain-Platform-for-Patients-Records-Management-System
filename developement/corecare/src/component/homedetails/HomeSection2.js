import React from "react";
import H1 from "../H1";
import P from "../P";

function Section2(){
    const disc=<p>
    The overarching goal of the project is to develop an AI-driven blockchain platform that revolutionizes the management of patient records within the healthcare industry. The primary focus of the project is to achieve the following objectives:
<br/>1- Secure and Decentralized Platform:<br/>
• Develop a secure and decentralized platform for the storage and management of patient records, leveraging the capabilities of blockchain technology.
<br/>• Utilize blockchain to ensure data integrity, transparency, and resistance to unauthorized tampering.
<br/>2- Integration of AI Algorithms:<br/>
• Integrate advanced AI algorithms into the platform to analyze patient data comprehensively.
<br/>• Extract valuable insights from the data to enhance diagnostic accuracy and treatment effectiveness.
<br/>• Provide personalized healthcare recommendations based on AI-driven analysis.
<br/>3- Robust Access Control Mechanism:<br/>
• Implement a robust access control mechanism to safeguard patient data privacy and confidentiality.
<br/>• Utilize blockchain-based smart contracts and cryptographic techniques to enforce stringent access controls.
<br/>4- Facilitate Seamless Data Sharing:<br/>
• Establish mechanisms for seamless data sharing between healthcare providers.
<br/>• Enhance interoperability to promote effective coordination of care among different
    </p>
    return(
        <>
        <section className="H_section2">
            <H1 name="H_title" title="#Overview"/>
            <div className="overview">
            <P title={disc}/>
            </div>
        </section>
        </>
    );
}
export default Section2;