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

  return (
    <div>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/admin/home" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">KentraEdu</span>
    </Link>
    <div class=" w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        
      <li>
          <Link to="/admin/home" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent " aria-controls="navbar-default" aria-expanded="true">Home</Link>
        </li>

        <li>
          <Link to="/admin/userlist" class="block py-2 px-3 text-black  rounded md:bg-white md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500" >User List</Link>
        </li>
      
        <li>
          <Link to="/admin/notification" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Notification <span class=" top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 rounded-full text-xs text-white">
                {notificationcount}
            </span>
         
          </Link>
        </li>
        
        <li>
          <button onClick={handleLogout} class="block py-2 px-3 text-gray-900 rounded hover:bg-black md:border-0 hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">LogOut</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <div className="container ">
        {currentNotifications?.map((value) => (
          <div
            className="card d-flex justify-content-between align-items-center" 
            key={value._id}
            style={{ width: "18rem" , backgroundColor : '#FAFAD2' }}
          >
            <div className="card-body">
              <h5 className="card-title">Today FollowUp User</h5>
              <h6 className="card-subtitle mb-2 text-muted">User Info.</h6>
              <p className="card-text">
                Mr/Ms : {value.username}  <br /> 
              </p>
              <h4>{SetDate}</h4>
              <Link to={`/admin/user/${value.userid}`}>

              <button
                onClick={() => handleclick(value._id, "Readed")}
                className="card-link"
                >
                Mark as Read
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
  );
}

export default Notification;
