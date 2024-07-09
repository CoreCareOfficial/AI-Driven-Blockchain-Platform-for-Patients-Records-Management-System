import { AddAccountForm, CreateAccessSelect, SearchToAccessInput } from "../settingdetails/TextFormSetting";
import React from "react";
import Slider from "react-slick";
import img from '../../assets/ahmed.jpg';

function CreateAccessKey() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <>
            <section style={{
                maxWidth: '100%',
                minHeight: '100vh',
                height: '100%',
                padding: '10px',
                overflow: 'hidden',
                backgroundColor: '#272c34',
            }}>

                <div
                    style={{
                        backgroundColor: '#3f4652',
                        boxShadow: '0px 0px 13px gray',
                        width: '45%',
                        height: '100%',
                        minHeight: '90vh',
                        margin: '15px auto',
                        borderRadius: '15px',
                        padding: '10px',
                    }}>
                    <AddAccountForm label="Add User">
                        <h1 style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: '1.4em',
                            fontWeight: 'bold',
                        }}>Create Access Key</h1>
                        <CreateAccessSelect items={['Doctor', 'Hospital', 'Laboratory', 'Radiology', 'Pharmacy']} value="Select Healthcare Provider" />
                        <SearchToAccessInput name="" value="" type="text" placeholder="search.." />
                        <div style={{
                            backgroundColor: '#272c34',
                            width: '99%',
                            height: '100%',
                            minHeight: '42vh',
                            margin: '15px auto',
                            borderRadius: '15px',
                            padding: '10px',
                        }}>

                            <Slider {...settings} >

                                <div className="AccessKeyCards">
                                    <img className="AccessKeyCards-img" src={img} alt="error" />
                                    <h1 className="AccessKeyCards-h1">ahmed qahtan</h1>
                                    <p className="AccessKeyCards-p">Taiz-Yemen</p>
                                </div>

                                <div className="AccessKeyCards">
                                    <img className="AccessKeyCards-img" src={img} alt="error" />
                                    <h1 className="AccessKeyCards-h1">ahmed qahtan</h1>
                                    <p className="AccessKeyCards-p">Taiz-Yemen</p>
                                </div>

                            </Slider>

                        </div>
                    </AddAccountForm>


                </div>

            </section>
        </>
    );
}
export default CreateAccessKey;