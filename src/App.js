import React, { useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
// import bigBanner from './images/banner-big.png';
import './App.css';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

function App() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [referral, setReferral] = useState("");

  const handleFirstNameChanged = (e) => {
    setFirstname(e.target.value);
  }

  const handleLastnameChanged = (e) => {
    setLastname(e.target.value);
  }

  const handlePhoneNumberChanged = (e) => {
    setPhoneNumber(e.target.value);
  }

  const handleEmailAddressChanged = (e) => {
    setEmailAddress(e.target.value);
  }

  const handleReferralChanged = (e) => {
    setReferral(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    instance.post(process.env.REACT_APP_API_URL + 'register', {
      firstname: firstname,
      lastname: lastname,
      phone_number: phoneNumber,
      email_address: emailAddress,
      referral: referral
    }).then(function(response){
      console.log(response);
    }).catch(function(error){
      console.log(error);
    });
  }

  return (
    <div className={"container"}>
      <div className="header">
        <img src={logo} className="logo" alt="TeamHyk Logo" />
        <p>...all round adventure</p>
      </div>
      <div className={"card"}>
        <div className={"card-image card-size"}></div>
        <div className={"card-image-mobile"}></div>
        <div className={"card-content card-size"}>
          <form className="form" method="POST" onSubmit={ (e) => handleSubmit(e) }>
            <div className="form-row">
              <div className="form-column">
                <input type="text" name="firstname" placeholder="Firstname" value={firstname} className="form-input" onChange={ (e) => handleFirstNameChanged(e) }/>
              </div>
              <div className="form-column">
                <input type="text" name="lastname" placeholder="Lastname" value={lastname} className="form-input" onChange={ (e) => handleLastnameChanged(e) }/>
              </div>
            </div>
            <div className="form-group">
              <input type="phone" name="phone" placeholder="Phone Number" value={phoneNumber} className="form-input" onChange={ (e) => handlePhoneNumberChanged(e) }/>
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address" value={emailAddress} className="form-input" onChange={ (e) => handleEmailAddressChanged(e) }/>
            </div>
            <div className="form-group">
              <select className="form-input" value={referral} onChange={ (e) => handleReferralChanged(e) }>
                <option value="">How did you hear about us?</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google</option>
              </select>
            </div>
            <div className="form-group">
              <input type="submit" value="Register" className="form-button" />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
