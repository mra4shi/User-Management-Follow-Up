import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { adminRequest } from "../../axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [usercount, setUsercount] = useState("");
  const [followupusercount, setFollowupusercount] = useState("");
  const [nonfollowupusercount, setNonfollowupusercount] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

  useEffect(() => {
    adminRequest({
      url: `/api/admin/dashboard`,
      method: "GET",
    }).then((response) => {
      console.log(response);
      setUsercount(response.data.totalusers.rowCount)
      setFollowupusercount(response.data.followupusers.rowCount)
      setNonfollowupusercount(response.data.nonfollowupusers.rowCount)

    });
  }, []);

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link to={""} class="navbar-brand">
            Brand
          </Link>
          <button
            type="button"
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
              <Link to={"/admin/home"} class="nav-item nav-link active ">
                Dashboard
              </Link>
              <Link to={"/admin/userlist"} class="nav-item nav-link">
                Users
              </Link>
              <Link to={"/admin/notification"} class="nav-item nav-link">
                Notification
              </Link>
             
            </div>
            <div class="navbar-nav ms-auto">
              <button onClick={handleLogout} class="nav-item nav-link">
                LogOut
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row mt-5">
          <Card style={{ width: "18rem" }}>
            <Card.Body className="text-center">
              <Card.Title>Total User Registration</Card.Title>
              <Card.Text>Total User Registered</Card.Text>
              <Button variant="primary" className="mt-5">{usercount}</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body className="text-center">
              <Card.Title>Total Followup User Count</Card.Title>
              <Card.Text>
               Follow Up Assaigned To New Registered User 
              </Card.Text>
              <Button variant="primary" className="mt-5">{followupusercount}</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body className="text-center">
              <Card.Title>Total NonFollowup User Count</Card.Title>
              <Card.Text>
              Follow Up Not Assaigned To New Registered User 
              </Card.Text>
              <Button variant="primary" className="mt-5">{nonfollowupusercount}</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
