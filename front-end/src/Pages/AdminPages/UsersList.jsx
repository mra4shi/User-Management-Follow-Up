import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminRequest } from "../../axios";

function UsersList() {

  const [data , setData] =useState(null)


  const fetchdata = async () => {
    try {
      adminRequest({
        url:'/api/admin/userlist',
        method : 'GET'
      })
      .then((response) => {
        console.log(response.data.rows)
        setData(response.data.rows)
    
      })
      .catch((err)=>{
        console.log(err)
      }) 
    } catch (error) {
      console.log(error)
    }
  }
 

  useEffect(()=> {
    fetchdata()
  },[])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={""} className="navbar-brand">
            Brand
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
              <Link to={""} className="nav-item nav-link active">
                Dashboard
              </Link>
              <Link to={"/admin/userlist"} className="nav-item nav-link">
                Users
              </Link>
              <Link to={""} className="nav-item nav-link">
                Messages
              </Link>
              <Link to={""} className="nav-item nav-link disabled" tabIndex="-1">
                Reports
              </Link>
            </div>
            <div className="navbar-nav ms-auto">
              <Link to={"/admin/login"} className="nav-item nav-link">
                LogOut
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
      </div>

      <div className="container">
        <div className="row">
          {data?.map((item)=> (
          <ul className="list-group list-group-light">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                
                <div className="ms-3">
                  <p className="fw-bold mb-1">{item.name}</p>
                  <p className="text-muted mb-0">{item.email}</p>
                </div>
              </div>
              <Link className="btn btn-link btn-rounded btn-sm" to={`/admin/user/${item.id}`} role="button">
                View
              </Link>
            </li>
       
        
          </ul>
        ))}
        </div>
      </div>
    </div>
  );
}

export default UsersList;
