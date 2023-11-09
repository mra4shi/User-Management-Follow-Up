import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminRequest } from "../../axios";
import Badge from "react-bootstrap/Badge";
import { toast } from 'react-toastify';


function UsersList() {
  const [search, setSearch] = useState("");
  const [notificationcount, setNotificationcount] = useState(null);
  const [followup, setFollowup] = useState(null);
  const [nonfollowup, setNonfollowup] = useState(null);
  const [showFollowup, setShowFollowup] = useState(true);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

  useEffect(() => {
    adminRequest({
      url: "/api/admin/getuserwithfollowup",
      method: "GET",
    }).then((response) => {
      setFollowup(response.data);
    });
  }, []);

  useEffect(() => {
    adminRequest({
      url: "/api/admin/getuserwithoutfollowup",
      method: "GET",
    }).then((response) => {
      setNonfollowup(response.data);
    }).catch((error) => {
      toast.error("something is wrong login again");
      localStorage.removeItem("admin_Secret");
      navigate("/admin/login");
    });
  }, []);

  useEffect(() => {
    adminRequest({
      url: "/api/admin/notification",
      method: "GET",
    }).then((response) => {
      setNotificationcount(response.data.notification.length);
    });
  }, []);
  console.log(notificationcount);

  const userList = showFollowup ? followup : nonfollowup;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={""} className="navbar-brand">
            Kentra Edu
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

      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              onClick={() => setShowFollowup(true)}
            >
              Follow-up Users
            </button>

            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              onClick={() => setShowFollowup(false)}
            >
              Non Follow-up Users
            </button>
          </form>
        </nav>
      </div>

      <div className="container">
        <div className="row">
          {userList
            ?.filter((users) =>
              search.toLowerCase() === ""
                ? true
                : users.name.toLowerCase().includes(search.toLowerCase())
            )
            ?.map((item) => (
              <ul className="list-group list-group-light" key={item.id}>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{item.name}</p>
                      <p className="text-muted mb-0">{item.email}</p>
                    </div>
                  </div>
                  <Link to={`/admin/user/${item.id}`} role="button">
                    <button className="btn text-white bg-danger btn-rounded btn-sm">
                      View
                    </button>
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
