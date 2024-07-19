import { useRef } from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import { Button } from 'primereact/button';
import { MdKey } from "react-icons/md";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/UserPageStyle/newnotificationcontainer.css'

function NewNotificationContainer(props) {
    const notifications = props.notifications || [];
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
            {(notifications && notifications.length > 0) ?
                <Slider ref={sliderRef} {...settings}>
                    {
                        notifications.map((notification, index) => (
                            <div className="new-notif-container flex flex-col justify-between bg-[#3F4652] p-1 my-3 rounded-xl max-w-full" key={index}>
                                <div className="flex flex-row justify-center gap-9 px-2 text-white">
                                    <div className="w-full">
                                        <h6 className="text-center">You Have Received a New Access Key From {notification.patientName}</h6>
                                    </div>
                                    <div className="py-[2px] px-[5px] font text-[12px] bg-[#3146FF] rounded-[10%]">{notifications.length}</div>
                                </div>

                                <div className="flex flex-row-reverse bg-[#272C34] mx-auto my-2  rounded-xl p-2 justify-around gap-2 w-3/4">
                                    <div className="border-1 border-[#545864] text-white p-2 w-full rounded-xl">
                                        <p className="text-center">{notification.accesskey}</p>
                                    </div>
                                    <div className="text-white text-center align-middle text-xl m-auto cursor-pointer"><MdKey /></div>
                                </div>
                                <div className="flex flex-row justify-end gap-4 m-4">
                                    <Link to="/doctor" className='w-[13%]' state={{ patientid: notification.patientid, keyuser: notification.keyuser, userType: props.userType }}>
                                        <Button label="Accept" icon="pi pi-check" className="bg-[#3146FF] text-white rounded-[10px] p-2 w-full" />
                                    </Link>
                                    <Button label="Ignore" icon="pi pi-times" className="bg-[#3146FF] text-white rounded-[10px] p-2 w-[13%]" onClick={handleIgnoreClick} />
                                </div>
                            </div>
                        ))
                    }
                </Slider> : <div className='new-notif-container flex flex-row justify-center bg-[#3F4652] p-4 my-3 rounded-xl max-w-full text-white'>
                    <div className=''>You Have No notifications</div>
                </div>
            }

        </div>
    );
}

export default NewNotificationContainer;
