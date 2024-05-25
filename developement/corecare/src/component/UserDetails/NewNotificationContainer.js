import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Button } from 'primereact/button';
import { MdContentCopy } from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/UserPageStyle/newnotificationcontainer.css'

function NewNotificationContainer(props) {
    const sliderRef = useRef(null);

    const handleIgnoreClick = () => {
        sliderRef.current.slickNext();
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,


    };

    return (
        <div className='mx-14'>
            <Slider ref={sliderRef} {...settings}>
                {Object.keys(props.notifications).map((notification, index) => (
                    <div className="new-notif-container flex flex-col justify-between bg-[#3F4652] p-1 my-3 rounded-xl max-w-full">
                        <div className="flex flex-row justify-center gap-9 px-2 text-white">
                            <div className="w-full">
                                <h6 className="text-center">You Have Received a New Access Key From {props.notifications[notification].sender}</h6>
                            </div>
                            <div className="py-[2px] px-[5px] font text-[12px] bg-[#3146FF] rounded-[10%]">{Object.keys(props.notifications).length}</div>
                        </div>

                        <div className="flex flex-row bg-[#272C34] mx-auto my-2  rounded-xl p-2 justify-around gap-2 w-3/4">
                            <div className="border-1 border-[#545864] text-white p-2 w-full rounded-xl">
                                <p className="text-center">{props.notifications[notification].accessKey}</p>
                            </div>
                            <div className="text-white text-center align-middle text-xl m-auto cursor-pointer"><MdContentCopy /></div>
                        </div>
                        <div className="flex flex-row justify-end gap-2 m-2">
                            <Button label="Accept" icon="pi pi-check" className="bg-[#3146FF] text-white rounded-[10px] p-2 " />
                            <Button label="Ignore" icon="pi pi-times" className="bg-[#3146FF] text-white rounded-[10px] p-2" onClick={handleIgnoreClick} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default NewNotificationContainer;
