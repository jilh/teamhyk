import React, { useState } from 'react';

import logo from './logo.svg';
// import bigBanner from './images/banner-big.png';
import './App.css';

function App() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [referral, setReferral] = useState("");

  const handleFirstNameChanged = (e) => {
    setFirstname(e.target.value);
    console.log(firstname);
  }

  return (
    <div className={"container"}>
      <div className="header">
        <img src={logo} className="logo"/>
        <p>...all round adventure</p>
      </div>
      <div className={"card"}>
        <div className={"card-image card-size"}></div>
        <div className={"card-image-mobile"}></div>
        <div className={"card-content card-size"}>
          <form className="form">
            <div className="form-row">
              <div className="form-column">
                <input type="text" name="firstname" placeholder="Firstname" className="form-input" onChange={(e) => handleFirstNameChanged }/>
              </div>
              <div className="form-column">
                <input type="text" name="lastname" placeholder="Lastname" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <input type="phone" name="phone" placeholder="Phone Number" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address" className="form-input" />
            </div>
            <div className="form-group">
              <select className="form-input">
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
