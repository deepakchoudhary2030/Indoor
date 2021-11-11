import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import user from '../Images/user.png';
import Worker from '../Images/worker.png';
import './UserWorkerProfile.css';
import Popup from '../Popup/Popup';
function UserWorkerProfile(props) {
  let history = useHistory();
  let token = localStorage.getItem('token')
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  let id = props.location.state.id
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [comment, setComment] = useState("");
  const [ratting, setE] = useState(1);

  const getUsers = async () => {
    await fetch(`https://anonymousunknown.pythonanywhere.com/user/worker/${id}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response)=>{
      return response.json()
    }).then((response)=>{
      setItems(response)
    }).catch((error)=>{
      console.log(error)
      history.push('/')
    })
   
  }
  useEffect(() => {
    getUsers();
  }, [])


  const Appoint = async()=> {
    let data = { "worker": id }
    await fetch('https://anonymousunknown.pythonanywhere.com/user/worker/book/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then((result) => {
      result.json()
    }).catch((error) => {
      console.log(error)
    })
  }



  const getFeedback = async () => {
    await fetch(`https://anonymousunknown.pythonanywhere.com/user/worker/reviews/${id}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((result) => {
      result.json().then((response) => {
        setFeedback(response)
      })
    })
  }
  useEffect(() => {
    getFeedback();
  }, [])


  const Feedback = async()=> {
    let data = {
      "worker": id,
      "rating": ratting,
      "feedback": comment
    }
    await fetch(`https://anonymousunknown.pythonanywhere.com/user/worker/reviews/${id}/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then((response) => {
      response.json();
      history.push('/userbookings')
    }).catch((error) => {
      alert(error)
    })
  }
  return (
    <div>
      <Header />

      <div className="container WorkProfile ">
        <div className="comment3">
          <section className="form mb-3 d-flex justify-content-center" >
            <div className="row d-flex">
              {items.map((elem) => {
                const { worker, service } = elem;
                return (
                  <div className="card work" key={worker.id}>
                    <div className="work-img2"><img src={Worker} className="img-fluid bg-dark" alt="" /></div>
                    <div className="main-text">
                      <h2>{worker.user.first_name} {worker.user.last_name}</h2>
                      <h6 className="text-muted my-2">{ }</h6>
                      <h6 className="text-muted">{service[0].name}</h6>
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
                          <h6>{worker.pincode}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="main-text">
                      <button className="work-button" onClick={Appoint}>Appoint</button>
                      <button className="work-button mx-2 my-1" onClick={togglePopup}>Ratting</button>

                    </div>
                    <div className="container-fluid fcontainer1">
                      <div className="row mx-3 ">
                        <div className="col-md-5">
                          <h5>Phone</h5>
                          <h6 className="text-muted">{worker.mobile}</h6>
                        </div>
                        <div className="col-md-5">
                          <h5>Address</h5>
                          <h6 className="text-muted">{worker.address}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div>
          </section>
          <section className="chatbox">
            <section className="chat-window">
              {feedback.map((elem) => {
                const { customer, rating, date, feedback } = elem;
                let Date =date.substr(0,10);
                return (
                  <div>
                    <article className="msg-container msg-remote" id="msg-0">
                      <div className="msg-box">
                        <img className="user-img" id="user-0" src={user} alt="" />
                        <div className="flr">
                          <div className="messages">
                            <p className="msg" id="msg-0">
                              {feedback}<br />

                              {(() => {
                                if (rating === 1) {

                                  return (
                                    <div>
                                      <span className="fa fa-star checked "></span>
                                    </div>
                                  )
                                }
                                if (rating === 2) {

                                  return (
                                    <div>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                    </div>
                                  )
                                }
                                if (rating === 3) {
                                  return (
                                    <div>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                    </div>
                                  )
                                }
                                if (rating === 4) {
                                  return (
                                    <div>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                    </div>
                                  )
                                }
                                if (rating === 5) {
                                  return (
                                    <div>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>
                                      <span className="fa fa-star checked "></span>

                                    </div>
                                  )
                                }
                              })()}
                            </p>
                          </div>
                          <span className="timestamp"><span className="username">{customer.user.first_name} {customer.user.last_name}</span>•<span className="posttime">{Date}</span></span>
                        </div>
                      </div>
                    </article>

                  </div>)
              })
            }

            </section>
          </section>
          {isOpen && <Popup
            content={<div>
              <b>Give Your Ratting </b><br />
              <form>
                <span className="rating-star">
                  <input type="radio" name="rating" defaultValue={5} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                  <input type="radio" name="rating" defaultValue={4} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                  <input type="radio" name="rating" defaultValue={3} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                  <input type="radio" name="rating" defaultValue={2} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                  <input type="radio" name="rating" defaultValue={1} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                </span><br />
                <input type="text" autoComplete="on" placeholder="Type a message" value={comment} onChange={(e) => { setComment(e.target.value) }} />
              </form>
              <button className="btn btn-primary mt-2" type="button" onClick={Feedback} >Submit</button>
            </div>}
            handleClose={togglePopup}
          />}
        </div>
      </div>

    </div>
  );
}
export default UserWorkerProfile;







