import React from "react";
import CardTitle from'../bootcomponent/CardTitle';
import Image from 'react-bootstrap/Image';
import computer_image from '../../assets/computer.png';

function Section1(){
    const h1Title=<h1>Organize your<br/>healthcare records and keep them safe,everywhere!</h1>
    return(
        <>
        <section className="H_section1">
            <div className="my_container">
            <CardTitle 
            name="H_section1_card"
            title={h1Title}
            desc="'We offer secure storage, ensuring all your data is protected
            from unauthorized access."
            btn="Get Started"
            />
            <div className="img_div">
                <Image style={{maxWidth:'100%'}} src={computer_image} rounded/>
            </div>
            </div>
        </section>
        </>
        );
}
export default Section1;