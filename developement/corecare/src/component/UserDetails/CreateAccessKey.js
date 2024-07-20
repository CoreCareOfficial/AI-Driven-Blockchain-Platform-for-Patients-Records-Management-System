import { AddAccessKeyInput, CreateAccessForm, CreateAccessSelect, SearchToAccessInput } from "../settingdetails/TextFormSetting";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import '../../css/UserPageStyle/createaccesskey.css';
import { IoMdCloseCircle } from "react-icons/io";
import defaultPic from '../../assets/user_signup.png'
import { Toast } from "primereact/toast";
import { loginInfo } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";

function CreateAccessKey({ handleCreateAccessKeyClick, selectedPatientId }) {
    const toast = useRef(null);
    const hasEffectRun = useRef(false);
    const [providers, setProviders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [filteredProviders, setFilteredProviders] = useState(providers);
    const [period, setPeriod] = useState('');
    const [timeOther, setTimeOther] = useState('');
    const [keyuser, setKeyUser] = useState('');
    const userInfoValue = useRecoilValue(loginInfo);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await fetch('http://192.168.137.1:5000/accesskey/getproviders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setProviders(jsonData);
                setFilteredProviders(jsonData);
                console.log('Success:', jsonData);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (!hasEffectRun.current) {
            fetchProviders();
            hasEffectRun.current = true;
        }
    }, []);

    useEffect(() => {
        const filtered = providers.filter(provider => {
            const matchesType = selectedType === 'All' || provider.type === selectedType;
            const matchesName = provider.name && provider.name.toLowerCase().startsWith(searchTerm.toLowerCase());
            return matchesType && matchesName;
        });
        console.log('filtered:', filtered);
        setFilteredProviders(filtered);
    }, [searchTerm, selectedType, providers]);

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
        handleIsBorderClick(20, '');
    };

    const [isBorder, setIsBorder] = useState({});

    const handleIsBorderClick = (id, time) => {
        setPeriod(time);
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
    const [isBorderDiv, setIsBorderDiv] = useState({});

    const handleIsBorderDivClick = (id) => {
        setKeyUser(id);
        setIsBorderDiv((prevState) => {
            const newState = {};
            filteredProviders.forEach(provider => {
                newState[provider.id] = false;
            });
            newState[id] = true;
            return newState;
        });
    };

    const handleSubmit = async () => {
        console.log('priod', period);
        console.log('timeother', timeOther);
        console.log('keyuser', keyuser);

        if (keyuser === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the Provider' });
            return;
        }
        if (period === '' && timeOther === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select the period' });
            return;
        }
        if (userInfoValue.patientId === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login First' });
            return;
        }

        const data = {
            patientid: selectedPatientId ? selectedPatientId : userInfoValue.patientId,
            keyuser: keyuser,
            period: period,
            specificDateTime: timeOther,
        }
        try {
            const response = await fetch('http://192.168.137.1:5000/accesskey/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to create access key' });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Access key created successfully' });
            // handleMenuClick();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to create access key' });
        }
    }
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
                <Toast ref={toast} />
                <div
                    style={{
                        position: 'relative',
                        backgroundColor: '#3f4652',
                        boxShadow: '0px 0px 13px gray',
                        width: '45%',
                        height: 'fit-content',
                        // minHeight: '92vh',
                        margin: '15px auto',
                        borderRadius: '15px',
                        padding: '0px',
                    }}>
                    <CreateAccessForm label="Create" onSubmit={handleSubmit}>
                        <h1 style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: '1.4em',
                            fontWeight: 'bold',
                        }}>Create Access Key</h1>

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <CreateAccessSelect value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                items={['All', 'Doctor', 'Hospital', 'Laboratory', 'Radiology', 'Pharmacy']}
                            />
                            <SearchToAccessInput
                                name=""
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e)}
                            />
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
                                {
                                    filteredProviders && filteredProviders.map((provider) => {
                                        const isBorderState = !!isBorderDiv[provider.id];
                                        return (
                                            <div key={provider.id}
                                                className={`AccessKeyCards ${isBorderState && 'AccessKeyCardsBorder'}`}
                                                onClick={() => handleIsBorderDivClick(provider.id)}
                                            >
                                                <img className="AccessKeyCards-img" src={provider.personalphoto ? `data:image/jpeg;base64,${provider.personalphoto}` : defaultPic} alt="error" />
                                                <h1 className="AccessKeyCards-h1">{provider.name}</h1>
                                                <p className="AccessKeyCards-p">{provider.specialization}</p>
                                            </div>
                                        )
                                    }
                                    )
                                }
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
                                padding: '5px'

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

                                        }} onClick={() => handleIsBorderClick(itemList.id, itemList.time)}>
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
                                <AddAccessKeyInput isShow={isShow} name="" value="" type="datetime-local" placeholder="ddddddddd" onChange={(e) => setTimeOther(e)} />
                            </div>

                        </div>


                    </CreateAccessForm>
                </div>

            </section>
        </>
    );
}
export default CreateAccessKey;