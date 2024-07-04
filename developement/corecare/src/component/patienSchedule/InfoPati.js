import React from "react";
import "../../css/patienschedule/infoPati.css"
import Osama from '../../assets/osama.jpg'
function InfoPati() {
    return (
        <>

            <div className="continerP">

                <div className="Porinfo" >
                    <div className="photo">
                        <img className="image7" src={Osama} alt="profile"></img>
                    </div>
                    <div className="PronName">
                        <div><h6>Osama</h6></div>
                        <div>Male  , 29 years old </div>
                    </div>

                </div>
                <div className="Hethinfo" >
                    {/* <div className="Hethinfo"></div> */}
                    <div className="Hethinf1">
                        <div>Blood type</div>
                        <div> <h6>+O</h6></div>

                    </div>
                    <div className="Hethinf2">
                        <div>Hieght</div>
                        <div><h6>175</h6></div>
                    </div>
                    <div className="Hethinf3">
                        <div>Weight</div>
                        <div><h6>175</h6></div>
                    </div>
                    <div className="Hethinf4">
                        <div>Blood</div>
                        <div><h6>175</h6></div>
                    </div>

                </div>
            </div>

        </>

    );
}

export default InfoPati;