import React from "react";
// import image5 from '../../assets/image5.png';
// import H1 from "../H1";
// import P from "../P";
import CardTitle from "../bootcomponent/CardTitle";
import CardStep from "../bootcomponent/CardStep";
function Section5(){
    return(
        <>
        <section className="H_section5">
            <div className="H_container5_div">

                {/* <Image name="img5" path={image5}/> */}

                <div className="my_container">

                <CardTitle
                name="H_section5_card"
                title="How to sign-up in our project"
                desc="Just 4 simple steps to optimize your company operations."
                btn="sign up now"
                />

                <CardStep
                name="H_section5_card"
                title="How to sign-up in our project"
                desc="Just 4 simple steps to optimize your company operations."
                />

                {/* <div className="div1">
                    <span> </span>
                    <H1 name="H_title" title="How to sign-up in our project"/>
                    <P title="Just 3 simple steps to optimize your company operations."/>
                    <Button title="sign up now"/>
                </div> */}

                {/* <div className="div2">
                    <SignupStep title="Step 1" disc="Reach out to one of our specialists, and have short introduction session."/>
                    <SignupStep title="Step 2" disc="Our specialist will prepare personalized package suitable for your needs."/>
                    <SignupStep title="Step 3" disc="Poof! You are ready to work smart with optimized operations."/>
                    <SignupStep title="Step 4" disc="Poof! You are ready to work smart with optimized operations."/>
                </div> */}
                </div>

            </div>
        </section>
        </>
    );
}
export default Section5;