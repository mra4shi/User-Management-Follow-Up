import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { adminRequest } from "../../axios";
import Badge from "react-bootstrap/Badge";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";

function AdminDashboard() {
  const navigate = useNavigate();
  const [usercount, setUsercount] = useState("");
  const [followupusercount, setFollowupusercount] = useState("");
  const [nonfollowupusercount, setNonfollowupusercount] = useState("");
  const [notificationcount, setNotificationcount] = useState(null);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

  useEffect(() => {
    adminRequest({
      url: "/api/admin/notification",
      method: "GET",
    }).then((response) => {
      setNotificationcount(response.data.notification.length);
    });
  }, []);

  useEffect(() => {
    adminRequest({
      url: `/api/admin/dashboard`,
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        setUsercount(response.data.totalusers.rowCount);
        setFollowupusercount(response.data.followupusers.rowCount);
        setNonfollowupusercount(response.data.nonfollowupusers.rowCount);
      })
      .catch((error) => {
        toast.error("something is wrong login again");
        localStorage.removeItem("admin_Secret");
        navigate("/admin/login");
      });
  }, []);

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
          <Link to={"/admin/register"} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
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


    

      <div class="container">
        <div class="row mt-5">
          <div class="col">
            <Card className="cardClass" style={{ backgroundColor: "#E6E6FA" }}>
              <div style={{ textAlign: "center" }}>
                <Card.Img
                  src="https://querysprout.com/wp-content/uploads/2022/01/Untitled-design-41-1.jpg"
                  className="card-image"
                  variant="top"
                />
              </div>

              <Card.Body>
                <div className="card-text-body">
                  <Card.Title>Total Users</Card.Title>
                  <Card.Text>Count : {usercount}</Card.Text>
                  <Card.Text className="card-description">
                    Total Registered Users
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div class="col">
            <Card className="cardClass" style={{ backgroundColor: "#E6E6FA" }}>
              <div style={{ textAlign: "center" }}>
                <Card.Img
                  src="data:image/png;base64,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"
                  className="card-image"
                  variant="top"
                />
              </div>

              <Card.Body>
                <div className="card-text-body">
                  <Card.Title>User FollowUp Updated</Card.Title>
                  <Card.Text>
                    FollowUp Updated User : {followupusercount}
                  </Card.Text>
                  <Card.Text className="card-description">
                    Contacted Candidates
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div class="col">
            <Card className="cardClass" style={{ backgroundColor: "#E6E6FA" }}>
              <div style={{ textAlign: "center" }}>
                <Card.Img
                  src="https://visualpharm.com/assets/525/ID%20Not%20Verified-595b40b75ba036ed117d9e37.svg"
                  className="card-image"
                  variant="top"
                />
              </div>

              <Card.Body>
                <div className="card-text-body">
                  <Card.Title>User Followup Not Updated</Card.Title>
                  <Card.Text>
                    Followup Not Updated User : {nonfollowupusercount}
                  </Card.Text>
                  <Card.Text className="card-description">
                    Not Updated Candidates
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
