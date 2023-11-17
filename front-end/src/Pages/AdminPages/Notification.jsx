import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";
import moment from "moment";
import Badge from "react-bootstrap/Badge";

function Notification() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState();
  const [notificationcount, setNotificationcount] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 2;
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
    })
      .then((response) => {
        console.log(response);
        setNotification(response.data.notification);
        setNotificationcount(response.data.notification.length);
      })
      .catch((error) => {
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

  const [showMenu, setShowMenu] = useState(true);
  const handleMenuToggle = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <div className="flex">
        {/* Left Side Navigation */}

        <div className="w-1/4 bg-gray-800  text-white py-6 px-4">
          <div className="mt-6">
            <button
              className="block py-2 px-4 rounded  bg-gray-700"
              onClick={handleMenuToggle}
            >
              Menu
            </button>
            {showMenu && (
              <ul className="mt-2">
                <Link
                to={'/admin/userlist'}>
                <button
                
                className={`block py-2 px-4 rounded ${
                  "/admin/project-management"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-700"
                }`}
                >
                 Users List
                </button>
                  </Link>

                <Link to={"/admin/home"}>
                  <button
                    className={`block py-2 px-4 rounded ${
                      "/admin/home"
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>

                <Link to={"/admin/notification"}>
              <button
                className={`block py-2 px-4 rounded ${
                  "/admin/home"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
              >
               Notification
               <span class=" top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 rounded-full text-xs text-white">
                      {notificationcount}
                    </span>
                     
              </button>
            </Link>
              </ul>
            )}
          </div>
        </div>
        <div className="w-3/4 bg-gray-100 p-6">

      <div className="container ">
        {currentNotifications?.map((value) => (
          <div
            className="card d-flex justify-content-between align-items-center" 
            key={value._id}
            style={{ width: "18rem" , backgroundColor : '#FAFAD2' }}
          >
            <div className="card-body">
              <h5 className="card-title">Today FollowUp User</h5>
             
               
              <h4>{value.date}</h4>
              <Link to={`/admin/user/${value.userid}`}>

              <button
                onClick={() => handleclick(value._id, "Readed")}
                className="card-link"
                >
                Mark as Read / View User
              </button>
                </Link>
            </div>
          </div>
        ))}

        { notification?.length ===0 ? (
<h1 className="relative justify-content-center ">No Notifications</h1>

        ) : (
          <>

        <nav
          aria-label="Page navigation example d-flex"
          className="d-flex justify-content-center mb-5"
          >
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

                </>
        )}
      </div>
    </div>
    </div>

  );
}

export default Notification;
