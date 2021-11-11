import React, { useState, useEffect } from 'react';
import Header from '../Header';
import logo from '../Images/in.png';
import profile from '../Images/user.png';
import './UserProfile.css';
function UserProfile() {
  let token = localStorage.getItem('token')
  const [items, setItems] = useState([]);
  const [user, setUsers] = useState([]);
  const getUsers = async () => {
    await fetch('https://anonymousunknown.pythonanywhere.com/user/profile/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response) => { return response.json() })
      .then((response) => {
        setItems(response)
         setUsers(response.user)
      }).catch((error) => { alert(error + 'please try again!!!!!') })
  }
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div>
      <Header />
      <div className="container UserProfile ">
        <section className="form  d-flex justify-content-center" >
          <div className="row d-flex">
            <div className=" col-md-5">
              <div className="card car">
                <div className="img1"><img src={logo} className="img-fluid" alt="" /></div>
                <div className="img2"><img src={profile} className="img-fluid bg-dark" alt="" /></div>
                <div>
                  <div className="main-text">
                    <h2>{user.username}</h2>
                  </div>
                  <div className="container-fluid">
                    <div className="fcontainer">
                      <div className="row mx-3">
                        <div className="col-md-4 col-lg-7">
                          <h6>Name - {user.first_name} {user.last_name}</h6>
                          <h6>Phone - {items.mobile}</h6>
                          <h6>Address -{items.address} </h6>
                        </div>
                        <div className="col-md-4 col-lg-5">
                          <h6>Pincode - {localStorage.getItem('pincode')}</h6>
                          <h6>City - { }</h6>
                          <h6>State - { }</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default UserProfile;







