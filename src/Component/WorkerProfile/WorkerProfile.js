import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Worker from '../Images/worker.png';
import './WorkerProfile.css';
import Popup from '../Popup/Popup';
import Popup1 from '../Popup/Popup1';
function WorkerProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const [isOpen1, setIsOpen1] = useState(false);
  const togglePopup2 = () => {
    setIsOpen1(!isOpen1);
  }
  const [service, setService] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [profession, setProffesion] = useState([]);
  let token = localStorage.getItem('token')

  ////////////////////////////////FOR GET USER PROFILE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const getUsers = async () => {
    await fetch(`https://anonymousunknown.pythonanywhere.com/worker/profile/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response) => {
      return response.json()
    }).then((response) => {
      setItems(response)
      setUser(response.user)
    }).catch((error) => { console.warn(error) })
  }
  useEffect(() => {
    getUsers();
  }, []);

  ////////////////////////////////FOR ADD USER PROFESSION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const AddProfession = async () => {
    await fetch(`https://anonymousunknown.pythonanywhere.com/worker/services/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response) => {
      return response.json()
    }).then((response) => {
      setProffesion(response)

    }).catch((error) => { console.warn(error) })
  }
  useEffect(() => {
    AddProfession();
  }, []);

  ////////////////////////////////FOR GET PROFESSION ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  let arr = [];
  function Create(id) {
    arr.push(id);
  }

  ////////////////////////////////FOR CREATE USER PROFESSION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const CreateProfession = async () => {
    let data = {
      "worker": items.id,
      "service": arr,
    }
    await fetch(`https://anonymousunknown.pythonanywhere.com/worker/services/create/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    window.location.reload();
  }
  /////////////////////////////// FOR GET DB ID OF USER PROFESSION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const [I, setI] = useState("")
  const GET = async () => {
    await fetch(`https://anonymousunknown.pythonanywhere.com/worker/myservices/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response) => {
      return response.json()
    }).then((response) => {
      setService(response.service)
      setI(response.id)

    }).catch((error) => { console.warn(error) })
  }
  useEffect(() => {
    GET();
  }, []);

  /////////////////////////////// FOR UPDATE USER PROFESSION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const UpdateProfession = async () => {
    let data = {
      "worker": items.id,
      "service": arr,
    }
    await fetch(`https://anonymousunknown.pythonanywhere.com/worker/services/${I}/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    window.location.reload();

  }


  return (
    <div>
      <Header />
      <div className="container WorkProfile ">
        <section className="form mb-3 d-flex justify-content-center" >
          <div className="row d-flex">
            <div className="card work" key={items.id}>
              <div className="work-img2"><img src={Worker} className="img-fluid bg-dark" alt="" /></div>
              <div className="main-text">
                <h2>{user.username}</h2>
                <h6 className="text-muted my-2">{user.first_name} {user.last_name}</h6>
                {service.map((elem) => <h6 className="text-muted">{elem.name}</h6>)}
              </div>
              <div className="container">
                <div className="flu1">
                  <div className="flu">
                    <h6>City</h6>
                    <h6>{ }</h6>
                  </div>
                  <div className="flu">
                    <h6>State</h6>
                    <h6>{ }</h6>
                  </div>
                  <div className="flu">
                    <h6>Pincode</h6>
                    <h6>{items.pincode}</h6>
                  </div>
                </div>
              </div>
              <div className="container-fluid fcontainer1">
                <div className="row mx-3 ">
                  <div className="col-md-5">
                    <h5>Phone</h5>
                    <h6 className="text-muted">{items.mobile}</h6>
                  </div>
                  <div className="col-md-5">
                    <h5>Address</h5>
                    <h6 className="text-muted">{items.address}</h6>
                  </div>
                </div>
                <div className="main-text">
                  <button className="work-button" type="button" onClick={togglePopup}>Add Profession</button>
                  <button className="work-button mx-1" type="button" onClick={togglePopup2}>Update Profession</button>
                </div>
              </div>
            </div>
          </div>
          {isOpen && <Popup
            content={<div>
              <b>Select your Profession </b><br />
              <form className="done">
                {
                  profession.map((elem) => {
                    const { name, id } = elem
                    return (
                      <div key={id}>
                        <button className="profession mx-1 " value={id} type="button" onClick={() => Create(id)}>{name}</button>
                      </div>)
                  })
                }
              </form>
              <button className="btn btn-primary mt-3 mb-1" onClick={CreateProfession} >Done</button>
            </div>}
            handleClose={togglePopup}
          />}
          {isOpen1 && <Popup1
            content={<div>
              <b>Update your Profession </b><br />
              <form className="done">
                {
                  profession.map((elem) => {
                    const { name, id } = elem
                    return (
                      <div key={id}>
                        <button className="profession mx-1 " value={id} type="button" onClick={() => Create(id)}>{name}</button>
                      </div>)
                  })
                }

              </form>
              <button className="btn btn-primary mt-3 mb-1" onClick={UpdateProfession} >Done</button>
            </div>}
            handleClose1={togglePopup2}
          />}
        </section>
      </div>
    </div>
  );
}
export default WorkerProfile;







