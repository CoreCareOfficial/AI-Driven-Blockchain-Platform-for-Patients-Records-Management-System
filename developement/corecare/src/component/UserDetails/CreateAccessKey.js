import { AddAccessKeyInput, AddAccountForm, AddAccountInput, CreateAccessSelect, SearchToAccessInput } from "../settingdetails/TextFormSetting";
import { Button } from "primereact/button";
import React, { useState } from "react";
import Slider from "react-slick";
import img from '../../assets/ahmed.jpg';
import '../../css/UserPageStyle/createaccesskey.css';
import { IoMdCloseCircle } from "react-icons/io";

function CreateAccessKey({ handleCreateAccessKeyClick }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    const times = [
        { id: 1, time: '5 Minutes' },
        { id: 2, time: '10 Minutes' },
        { id: 3, time: '15 Minutes' },
        { id: 4, time: '30 Minutes' },
        { id: 5, time: '45 Minutes' },
        { id: 6, time: '1 Hour' },
        { id: 7, time: '1:15 Hour' },
        { id: 8, time: '1:30 Hour' },
        { id: 9, time: '2 Hours' },
        { id: 10, time: '6 Hours' },
        { id: 11, time: '12 Hours' },
        { id: 12, time: '1 day' },
    ];

    const [isOpen, setIsOpen] = useState(true);

    const handleMenuClick = () => {
        handleCreateAccessKeyClick();
        setIsOpen(!isOpen);
    };

    const [isShow, setIsShow] = useState(false);

    const handleIsShowClick = () => {
        setIsShow(!isShow);
    };

    const [isBorder, setIsBorder] = useState({});

    const handleIsBorderClick = (id) => {
        setIsBorder((prevState) => {
            // Reset all to false except for the clicked one
            const newState = {};
            times.forEach(time => {
                newState[time.id] = false;
            });
            newState[id] = true;
            return newState;
        });
    };

    return (
        <>
            <section className="CreateAccessKey-section" style={{ display: isOpen ? 'block' : 'none', }}>
                <span style={{
                    fontSize: '3em',
                    color: '#000',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                }}>
                    <IoMdCloseCircle onClick={handleMenuClick} />
                </span>
                <div
                    style={{
                        position: 'relative',
                        backgroundColor: '#3f4652',
                        boxShadow: '0px 0px 13px gray',
                        width: '45%',
                        height: 'max-content',
                        minHeight: '92vh',
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
                                paddingLeft: '10px',

                            }}>
                            {/*===== time div====== */}

                            {times.map(itemList => {
                                const isBorderState = !!isBorder[itemList.id];
                                return (
                                    <div key={itemList.id} className="time-div"
                                        style={{
                                            minWidth: '95px',
                                            width: 'fit-content',
                                            height: '5vh',
                                            backgroundColor: '#3f4652',
                                            margin: '5px',
                                            padding: '5px',
                                            borderRadius: '5px',
                                            textAlign: 'center',
                                            border: isBorderState ? '2px solid #3146ff' : 'none',

                                        }} onClick={() => handleIsBorderClick(itemList.id)}>
                                        {console.log('item', itemList.time)}
                                        <h3 style={{
                                            fontWeight: 'bold', color: '#fff',
                                        }}>{itemList.time}</h3>
                                    </div>
                                );
                            })}
                            {/* ===========other div================== */}
                            <div className="time-div"
                                style={{
                                    minWidth: '95px',
                                    width: 'fit-content',
                                    height: '5vh',
                                    backgroundColor: '#3f4652',
                                    margin: '5px',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                }} onClick={handleIsShowClick}>
                                <h3 style={{
                                    fontWeight: 'bold', color: '#fff',
                                }}>Other</h3>
                            </div>

                            {/*=============== input div=========== */}
                            <div style={{ marginTop: '5px', width: 'calc(100% - 115px)', height: '5vh' }}>
                                <AddAccessKeyInput isShow={isShow} name="" value="" type="datetime-local" placeholder="ddddddddd" />
                            </div>

                        </div>


                    </AddAccountForm>
                </div>

            </section>
        </>
    );
}
export default CreateAccessKey;