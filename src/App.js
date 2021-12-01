import React, { useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
// import bigBanner from './images/banner-big.png';
import './App.css';

const instance = axios.create({
  baseURL: !process.env.REACT_APP_API_URL ? 'https://api.teamhyk.org/' : process.env.REACT_APP_API_URL
});

function App() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [referral, setReferral] = useState("");

  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [referralError, setReferralError] = useState(false);

  // const [hasError, setHasError] = useState({
  //   firstname: false,
  //   lastname: false,
  //   phone_number: false,
  //   email_address: false,
  //   referral: false,
  // });

  const[formSuccess, setFormSuccess] = useState(false);

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

    instance.post('/eventattendees/create', {
      firstname: firstname,
      lastname: lastname,
      phone_number: phoneNumber,
      email_address: emailAddress,
      referral: referral
    }).then(function(response){
      setFormSuccess(true);

      setFirstname("");
      setLastname("");
      setPhoneNumber("");
      setEmailAddress("");
      setReferral("");
      
    }).catch(function(error){
      console.log(error);
      if('firstname' in error.response.data.messages){
        setFirstnameError(true);
      }

      if('lastname' in error.response.data.messages){
        setLastnameError(true); 
      }

      if('phone_number' in error.response.data.messages){
        setPhoneNumberError(true); 
      }

      if('email_address' in error.response.data.messages){
        setEmailAddressError(true);
      }

      if('referral' in error.response.data.messages){
        setReferralError(true);
      }
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
            <div className={ formSuccess === true ? "info-card" : "hide"}>
              <div className="info-card-contents info-card-success">
                <p>Registration Successful</p>
              </div>
            </div>
          <form className="form" method="POST" onSubmit={ (e) => handleSubmit(e) }>
            
            <div className="form-row">
              <div className="form-column">
                <input type="text" name="firstname" placeholder="Firstname" value={firstname} className={ firstnameError ? 'form-input form-input-error': 'form-input' } onChange={ (e) => handleFirstNameChanged(e) }/>
              </div>
              <div className="form-column">
                <input type="text" name="lastname" placeholder="Lastname" value={lastname} className={ lastnameError ? 'form-input form-input-error': 'form-input' } onChange={ (e) => handleLastnameChanged(e) }/>
              </div>
            </div>
            <div className="form-group">
              <input type="phone" name="phone" placeholder="Phone Number" value={phoneNumber} className={ phoneNumberError ? 'form-input form-input-error': 'form-input' } onChange={ (e) => handlePhoneNumberChanged(e) }/>
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address" value={emailAddress} className={ emailAddressError ? 'form-input form-input-error': 'form-input' } onChange={ (e) => handleEmailAddressChanged(e) }/>
            </div>
            <div className="form-group">
              <select className={ referralError ? 'form-input form-input-error': 'form-input' } value={referral} onChange={ (e) => handleReferralChanged(e) }>
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
