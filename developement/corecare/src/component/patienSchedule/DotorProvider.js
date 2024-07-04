import React from "react";
import "../../css/patienschedule/DotorProvider.css"
import { FaUserDoctor } from "react-icons/fa6";
import Osama from '../../assets/osama.jpg'
function DotorProvider() {
    return (
        <>
            <div className="continerDotor">
                <div className="hederDotor">
                    <div className="hederIcon"><FaUserDoctor /></div>
                    <div className="hederDctorprovider"><h6>Healthcare provider</h6></div>
                </div>
                <div className="photoDotor">
                    <div className="divimage">
                        <img className="imageDotor" src={Osama} alt="profile"></img>
                    </div>
                    <div className="PronName">
                        <div><h5>Osama</h5></div>
                        <div><p>Dentest  </p> </div>
                    </div>




                </div>
            </div>
        </>

    );
}

export default DotorProvider;