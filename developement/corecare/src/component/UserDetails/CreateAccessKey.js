import { AddAccountForm, CreateAccessSelect, SearchToAccessInput } from "../settingdetails/TextFormSetting";
import React from "react";
import Slider from "react-slick";
import img from '../../assets/ahmed.jpg';
import '../../css/UserPageStyle/createaccesskey.css';

function CreateAccessKey() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    const times = [
        { time: '5 Minutes' },
        { time: '10 Minutes' },
        { time: '15 Minutes' },
        { time: '30 Minutes' },
        { time: '45 Minutes' },
        { time: '1 Hour' },
        { time: '1:15 Hour' },
        { time: '1:30 Hour' },
        { time: '2 Hours' },
        { time: '6 Hours' },
        { time: '12 Hours' },
        { time: '1 day' },
    ];

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
                    <AddAccountForm label="Create">
                        <h1 style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: '1.4em',
                            fontWeight: 'bold',
                        }}>Create Access Key</h1>

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <CreateAccessSelect items={['Doctor', 'Hospital', 'Laboratory', 'Radiology', 'Pharmacy']} value="Select Healthcare Provider" />
                            <SearchToAccessInput name="" value="" type="text" placeholder="search.." />
                        </div>

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

                        {/*========== Times Menu========= */}
                        <div className="TimesMenu"
                            style={{
                                backgroundColor: '#272c34',
                                width: '100%',
                                minHeight: '10vh',
                                borderRadius: '5px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                paddingLeft:'10px',
                                
                            }}>
                            {/*===== time div====== */}

                            {
                            times.map(itemList => (
                                <div className="time-div"
                                    style={{
                                        width: 'fit-content',
                                        height: '5vh',
                                        backgroundColor: '#fff',
                                        margin: '5px',
                                        padding:'5px',
                                        borderRadius:'5px',
                                    }}>
                                        {console.log('item', itemList.time)}
                                    <h3 style={{
                                        fontWeight:'bold',
                                    }}>{itemList.time}</h3>
                                </div>
                            ))}

                        </div>

                    </AddAccountForm>
                </div>

            </section>
        </>
    );
}
export default CreateAccessKey;