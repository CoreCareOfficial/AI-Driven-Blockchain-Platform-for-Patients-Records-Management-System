import React, { useEffect, useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { BrowserProvider, ethers } from 'ethers';
import { GeneralData, userInfo } from '../Recoil/Atom';
import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { RadioField } from '../component/loginDetails/TextInputField';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toast } from "primereact/toast";


function SignupPage1() {
    const hasUseEffect = useRef(false);
    const toast = useRef(null);
    const setUserInfo = useSetRecoilState(userInfo);
    const setGeneralData = useSetRecoilState(GeneralData);
    const [selectedType, setSelectedType] = useState('Patient');
    const [steps, setSteps] = useState(0);
    const [isConnecting, setIsConnecting] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {

        const stepsN =
            selectedType === "Patient" ? 5
                : selectedType === "Doctor" ? 6
                    : selectedType === "Hospital" ? 4
                        : selectedType === "Radiology Center" ? 4
                            : selectedType === "Laboratory" ? 4
                                : selectedType === "Pharmacy" ? 4
                                    : selectedType === "Researcher" ? 0 : 0;
        setSteps(stepsN)
    }, [selectedType]);

    useEffect(() => {
        if (!hasUseEffect.current) {
            if (typeof window.ethereum === 'undefined') {
                console.log(window.ethereum);
                toast.current.show({ severity: 'info', summary: 'MetaMask Not Installed', detail: 'Please install MetaMask and then come back to this page and Refresh.', life: 3000 });
                hasUseEffect.current = true;
            }
            else {
                connectToMetaMask();
            }
        }
    }, []);

    const connectToMetaMask = async () => {
        setIsConnecting(true);
        if (typeof window.ethereum !== 'undefined') {
            try {
                console.log('eth');
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    PublicWalletAddress: address,
                }));
                setIsConnecting(false);
                setIsInstalled(true);
            } catch (error) {
                console.error("MetaMask connection error:", error);
                setIsConnecting(false);
                toast.current.show({ severity: 'error', summary: 'MetaMask Connection Error', detail: 'You have to connect to metamask to continue' });
            }
        } else {
            if (!isInstalled) {
                window.open('https://metamask.io/download.html', '_blank', 'noreferrer, noopener');
                toast.current.show({ severity: 'info', summary: 'MetaMask Not Installed', detail: 'Please install MetaMask and then come back to this page and Refresh.', life: 3000 });
                setIsConnecting(false)
                setIsInstalled(true);
            }
            else {
                window.location.reload();
            }
        }
    }

    const handleChangeUserType = (e) => {
        setSelectedType(e.target.value);
    };

    const navigate = useNavigate();

    const nextPage =
        selectedType === "Patient" ? '/signup/step-1'
            : selectedType === "Doctor" ? '/signup/step-1'
                : selectedType === "Hospital" ? '/signup/HealthcareFacility-step-1'
                    : selectedType === "Radiology Center" ? '/signup/HealthcareFacility-step-1'
                        : selectedType === "Laboratory" ? '/signup/HealthcareFacility-step-1'
                            : selectedType === "Pharmacy" ? '/signup/HealthcareFacility-step-1'
                                : selectedType === "Researcher" ? '' : '';

    const handleContinue = () => {
        if (walletAddress !== '') {
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                typeUser: selectedType,
            }));
            setGeneralData((prevUserInfo) => ({
                ...prevUserInfo,
                steps: steps,
                isForgetton: false
            }));
            navigate(nextPage); // Redirect on successful submission
        } else {
            toast.current.show({ severity: 'error', summary: 'MetaMask Wallet not Connected', detail: 'Please connect to Metamask', life: 3000 });

        }
    };

    return (
        <CardLogin>
            <Toast ref={toast} />
            <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <FormLogin buttonName='Continue' onContinue={handleContinue}>
                    <div style={{ height: '200px', padding: '20px', backgroundColor: '#3F4652', borderRadius: '25px' }}>
                        <TextPage text='Sign up as' />
                        <div style={{ marginBottom: '12px' }}></div>
                        <RadioField label1='Patient' label2='Hospital' name='users' onSelected={handleChangeUserType} selectedTypeValue={selectedType} />
                        <RadioField label1='Doctor' label2='Laboratory' name='users' onSelected={handleChangeUserType} selectedTypeValue={selectedType} />
                        <RadioField label1='Researcher' label2='Pharmacy' name='users' onSelected={handleChangeUserType} selectedTypeValue={selectedType} />
                        <RadioField label1='Radiology Center' name='users' onSelected={handleChangeUserType} selectedTypeValue={selectedType} />
                    </div>
                </FormLogin>
                <button className='bg-[#3146FF] text-white rounded-[50px] w-[85%] min-w-[40px] h-[34px] mx-0 mt-[14] mb-[16]' onClick={connectToMetaMask}>
                    {isConnecting ? 'Connecting...' : 'Connect to MetaMask'}
                </button>
                <SignOrLogin goSign={false} />
            </div>
            <Outlet />
        </CardLogin>
    );
}

export default SignupPage1;