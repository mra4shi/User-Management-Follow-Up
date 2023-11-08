import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";
import moment from "moment";

function Notification() {
  const navigate = useNavigate();
  const { notificationId } = useParams()
  const [notification, setNotification] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

  const Getdata = () => {
    adminRequest({
      url: "/api/admin/notification",
      method: "GET",
    }).then((response) => {
      setNotification(response.data.notification);
    });
  };

  const handleclick = (notificationId) => {

    adminRequest({
      url : `/api/admin/updatenotification/${notificationId}`,
      method : 'put',
    }).then((response)=>{
      console.log(response)
      if (response.data) {
        toast.success("Message Readed")
        window.location.reload()
      }
    })
  }

  useEffect(() => {
    Getdata();
  }, []);


  
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
              <Link to={"/admin/home"} className="nav-item nav-link active">
                Dashboard
              </Link>
              <Link to={"/admin/userlist"} className="nav-item nav-link">
                Users
              </Link>
              <Link to={"/admin/notification"} className="nav-item nav-link">
                Notification
              </Link>
            
            </div>
            <div className="navbar-nav ms-auto">
              <Link to={handleLogout} className="nav-item nav-link">
                LogOut
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        {notification?.map((value) => (
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">New User Registration</h5>
              <h6 class="card-subtitle mb-2 text-muted">See User</h6>
              <p class="card-text">
                Mr/Ms {value.username} Registered With {value.email} 
              </p>

              <button onClick={() => handleclick (value._id,'Readed')} class="card-link">
                Mark as Read
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
