import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import './Bookings.css';
function Table() {
  const [items, setItems] = useState([]);
  let token = localStorage.getItem('token')

  /////////////////////// For Get Users \\\\\\\\\\\\\\\\\\\
  const getUsers = async () => {
    await fetch(`https://anonymousunknown.pythonanywhere.com/worker/bookings/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => {
      return response.json()
    })
      .then((response) => {
        setItems(response)
      }).catch((error) => { console.warn(error); })
  }
  useEffect(() => {
    getUsers();
  }, []);

  ///////////////////// For Accept Request \\\\\\\\\\\\\\\\\\\
  const Approved = async (id) => {
    await fetch(`https://anonymousunknown.pythonanywhere.com/worker/customer/book/${id}/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },

    }).then((response) => {
      response.json()

    }).catch((error) => {
      console.warn(error);
    })
  }

  return (
    <div>
      <Header />

      <div className="container booking">
        <table className="table" >
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Acceptence Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody >
            {
              items.map((elem) => {
                const { id, customer, booking_date, acceptance_date } = elem;
                let Book = booking_date.substr(0, 10);
                let Accept = acceptance_date;
                return (
                  <tr className="red" key={id}>
                    <th scope="row">{id}</th>
                    <td><Link className="red" to={{
                      pathname: '/userprofile',
                      state: { id: 1 }
                    }}>{customer.user.first_name} {customer.user.last_name}</Link></td>
                    <td>{Book}</td>
                    {(() => {
                      if (Accept === null) {
                        return (
                          <div>
                            <td>NOT ACCEPTED</td>
                          </div>
                        )
                      }
                      else {
                        return (
                          <div>
                            <td>{Accept.substr(0, 10)}</td>
                          </div>
                        )
                      }
                    })()}

                    <td>
                      <button className="btn btn-success" type="button" onClick={() => Approved(id)} >&#10004;</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Table;






