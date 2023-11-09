import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";
import moment from "moment";
import Badge from "react-bootstrap/Badge";

function Notification() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 3;
  const [notification, setNotification] = useState();
  const [notificationcount, setNotificationcount] = useState(null);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notification?.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
      console.log(response);
      setNotification(response.data.notification);
      setNotificationcount(response.data.notification.length);
    }).catch((error) => {
      toast.error("something is wrong login again");
      localStorage.removeItem("admin_Secret");
      navigate("/admin/login");
    });
  };

  const handleclick = (notificationId) => {
    adminRequest({
      url: `/api/admin/updatenotification/${notificationId}`,
      method: "put",
    }).then((response) => {
      if (response.data.success) {
        window.location.reload();
        toast.success("Message Readed");
      }
    });
  };

  useEffect(() => {
    Getdata();
  }, []);
  var datenot = null;
  var SetDate = null;

  console.log(notification);
  notification?.map((value) => {
    datenot = value.date;
    SetDate = moment(datenot).format("YYYY-MM-DD / HH:mm");
    console.log(SetDate);
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand">Kentra Edu</Link>
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
                <Badge bg="secondary">{notificationcount}</Badge>
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

      <div className="container ">
        {currentNotifications?.map((value) => (
          <div className="card" key={value._id} style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">New User Registration</h5>
              <h6 className="card-subtitle mb-2 text-muted">User Info.</h6>
              <p className="card-text">
                Mr/Ms {value.username} Registered With <br /> Mobile :{" "}
                {value.mobile} <br /> Email : {value.email}
              </p>
              <h4>{SetDate}</h4>

              <button
                onClick={() => handleclick(value._id, "Readed")}
                className="card-link"
              >
                Mark as Read
              </button>
            </div>
          </div>
        ))}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({
              length: Math.ceil(notification?.length / notificationsPerPage),
            }).map((_, index) => (
              <li
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
                key={index}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(notification?.length / notificationsPerPage)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Notification;
