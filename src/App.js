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

  const [errorNotes, setErrorNotes] = useState({
    firstname: '',
    lastname: '',
    phone_number: '',
    email_address: '',
    referral: '',
  });

  const[isSubmitting, setIsSubmitting] = useState(false);
  const[formError, setFormError] = useState(false);
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
    setIsSubmitting(true);

    instance.post('/eventattendees/create', {
      firstname: firstname,
      lastname: lastname,
      phone_number: phoneNumber,
      email_address: emailAddress,
      referral: referral
    }).then(function(response){
      setFormError(false);
      setFormSuccess(true);

      setFirstname("");
      setLastname("");
      setPhoneNumber("");
      setEmailAddress("");
      setReferral("");

      setIsSubmitting(false);
      
    }).catch(function(error){
      console.log(error);
      if('firstname' in error.response.data.messages){
        setFirstnameError(true);
        setFormError(true);
        setErrorNotes(prevState => {
          return { ...prevState, firstname : error.response.data.messages.firstname }
        });
      }else{
        setFirstnameError(false);
        // setFormError(false);
        setErrorNotes(prevState => {
          return { ...prevState, firstname : '' }
        });
      }

      if('lastname' in error.response.data.messages){
        setLastnameError(true); 
        setFormError(true);
        setErrorNotes(prevState => {
          return { ...prevState, lastname : error.response.data.messages.lastname }
        });
      }else{
        setLastnameError(false); 
        // setFormError(false);
        setErrorNotes(prevState => {
          return { ...prevState, lastname : '' }
        });
      }

      if('phone_number' in error.response.data.messages){
        setPhoneNumberError(true); 
        setFormError(true);
        setErrorNotes(prevState => {
          return { ...prevState, phone_number : error.response.data.messages.phone_number }
        });
      }else{
        setPhoneNumberError(false); 
        // setFormError(false);
        setErrorNotes(prevState => {
          return { ...prevState, phone_number : '' }
        });
      }

      if('email_address' in error.response.data.messages){
        setEmailAddressError(true);
        setFormError(true);
        setErrorNotes(prevState => {
          return { ...prevState, email_address : error.response.data.messages.email_address }
        });
      }else{
        setEmailAddressError(false);
        // setFormError(false);
        setErrorNotes(prevState => {
          return { ...prevState, email_address : '' }
        });
      }

      if('referral' in error.response.data.messages){
        setReferralError(true);
        setFormError(true);
        setErrorNotes(prevState => {
          return { ...prevState, referral : error.response.data.messages.referral }
        });
      }else{
        setReferralError(false);
        // setFormError(false);
        setErrorNotes(prevState => {
          return { ...prevState, referral : '' }
        });
      }

      setIsSubmitting(false);
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

            <div className={ formError === true ? "info-card" : "hide"}>
              <div className="info-card-contents info-card-error">
                { errorNotes.firstname !== "" ? <p>{ errorNotes.firstname }</p> : "" }
                { errorNotes.lastname !== "" ? <p>{ errorNotes.lastname }</p> : "" }
                { errorNotes.phone_number !== "" ? <p>{ errorNotes.phone_number }</p> : "" }
                { errorNotes.email_address !== "" ? <p>{ errorNotes.email_address }</p> : "" }
                { errorNotes.referral !== "" ? <p>{ errorNotes.referral }</p> : "" }
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
                <option value="whatsapp">WhatsApp</option>
                <option value="friend">Friend</option>
              </select>
            </div>
            <div className="form-group">
              <input type="submit" value={ isSubmitting ? "Submitting..." : "Register" } className="form-button" disabled={ isSubmitting }/>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
