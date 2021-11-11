import React, { useState, useEffect } from 'react';
import Header from '../Header';
import {Link, useHistory } from 'react-router-dom';
import plumber from '../Images/plumber.png';
import './UserRegister.css';
function UserRegister() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [Phone, setPhone] = useState("");
  const [last, setLast] = useState("");
  const [username, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      alert("You Need to LogOut");
      history.push("/")
    }

  }, [])

  async function saveData() {
    let data = {
      "user": {
        "username": username,
        "first_name": name,
        "last_name": last,
        "password": password
      },
      "mobile": Phone,
      "address": address
    }

    await fetch('https://anonymousunknown.pythonanywhere.com/account/register/customer/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      setStatus(response.status)   
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <Header />
      <div className="container usec">
        {(() => {
          if (status === 208) {
            return (
              <div className="alert alert-danger" role="alert">
                Some Fields Are Already Exist
              </div>
            )
          }
          if(status===201|| status ===200) {
            return (
              <div className="alert alert-success" role="alert">
                User Registred Sucessfully <Link to="/userlogin">Login</Link>
              </div>
            )
          }
        })()}
        <div className="usec1">
          <img src={plumber} className="bd-placeholder-img rounded-circle m-2 bg-dark " width="100em" height="100em" alt="" />
          <h4>User Register</h4>
        </div>
        <section className="form ">
          <div className="row d-flex justify-content-center">

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="First Name" required="required" value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="Last Name" required="required" value={last} onChange={(e) => { setLast(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="User Name" required="required" value={username} onChange={(e) => { setUser(e.target.value) }} />
            </div>

            {/* <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="Email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div> */}

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="number" placeholder="Phone Number" required="required" value={Phone} onChange={(e) => { setPhone(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <textarea className="form-control my-2 p-2" type="text" placeholder="Enter your Address" rows="3" required="required" value={address} onChange={(e) => { setAddress(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="password" placeholder="Password" required="required" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>

            <div className="usec1">
              <button className="btn1 my-3 mb-5 p-2" type="button" onClick={saveData} >Register</button>
            </div>

          </div>
        </section>
      </div>


    </div>
  );
}
export default UserRegister;







