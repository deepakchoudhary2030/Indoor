import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Worker from '../Images/worker.png';
import { Link } from 'react-router-dom';
import './Bookings.css';

function Bookings() {
    let token = localStorage.getItem('token')
    const [items, setItems] = useState([]);
    const getUsers = async () => {
        await fetch(`https://anonymousunknown.pythonanywhere.com/user/bookings/`, {
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            setItems(response)
        })
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div>
            <Header />
            <div className="jumbotron-fluid jumb ">
                <h1>My Bookings</h1>
                <div className="container ">
                    <div className="row">
                        {items.map((elem) => {
                            const { booking_date, accepted, worker, acceptance_date } = elem;
                            let Book = booking_date.substr(0, 10);
                            let Accept = acceptance_date;
                            return (
                                <div className="col-md-4 col-lg-4 my-4 text-center" >
                                    <div className="H" >
                                        <img src={Worker} className=" bd-placeholder-img rounded-circle mx-auto m-3 mb-1 bg-dark " alt="" width="150em" height="150em" /><br />
                                        <div className="card-body">
                                            <h5 className="small text-uppercase text-muted">{worker.user.first_name} {worker.user.last_name}</h5>
                                            <h5 className="small text-uppercase text-muted">Booking Date: {Book}</h5>
                                            
                                            {/* ///////////////////////////////// Accepted Or Not \\\\\\\\\\\\\\\\\\\\\\\\  */}
                                            
                                            {(() => {
                                                if (Accept === null) {
                                                    return (<div>   </div>)
                                                }
                                                else {
                                                    return (
                                                        <div>
                                                            <h5 className="small text-uppercase text-muted">Acceptance Date: {Accept.substr(0, 10)} </h5>
                                                        </div>
                                                    )
                                                }
                                            })()}

                                            {/* ///////////////////////////////// Approved Or Not\\\\\\\\\\\\\\\\\\\\\\\\ */}
                                            {(() => {
                                                if (accepted === true) {
                                                    return (
                                                        <div>
                                                            <Link to={{
                                                                pathname: '/userworkerprofile',
                                                                state: { id: worker.id }
                                                            }}>
                                                            <button className="button2">Profile</button></Link>
                                                            <button className="Approved">Approved</button>
                                                        </div>
                                                    )
                                                }
                                                if (accepted === false) {
                                                    return (
                                                        <div>
                                                            <Link to={{
                                                                pathname: '/userworkerprofile',
                                                                state: { id: worker.id }
                                                            }}>
                                                            <button className="button2">Profile</button></Link>
                                                            <button className="pending">Pending</button>
                                                        </div>
                                                    )
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Bookings;

