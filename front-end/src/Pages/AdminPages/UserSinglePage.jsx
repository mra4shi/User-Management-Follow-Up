import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminRequest } from "../../axios";
import { Link } from "react-router-dom";
import moment from 'moment';

function UserSinglePage() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [followup, setFollowup] = useState("");

  const dateString = followup.follow_up_date

  const date = moment(dateString);
  const formattedDate = date.format('YYYY-MM-DD / HH:mm');

  useEffect(() => {
    adminRequest({
      url: `/api/admin/followup-status/${id}`,
      method: "GET",
    }).then((response) => {
      console.log(response, "followup");
      setFollowup(response.data.rows[0]);
    });
  }, []);

  useEffect(() => {
    adminRequest({
      url: `/api/admin/user/${id}`,
      method: "GET",
    }).then((response) => {
      console.log(response.data.rows[0]);
      setUser(response.data.rows[0]);
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
              <Link to={""} class="nav-item nav-link active">
                Dashboard
              </Link>
              <Link to={"/admin/userlist"} class="nav-item nav-link">
                Users
              </Link>
              <Link to={""} class="nav-item nav-link">
                Messages
              </Link>
              <Link to={""} class="nav-item nav-link disabled" tabindex="-1">
                Reports
              </Link>
            </div>
            <div class="navbar-nav ms-auto">
              <Link to={"/admin/login"} class="nav-item nav-link">
                LogOut
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section class="vh-100" style={{ backgroundColor: "#eee" }}>
        <div class="container">
          <div class="row">
            <div class="col-md-12 ">
              <div class="card" style={{ borderRadius: "6%" }}>
                <div class="card-body text-center">
                  <div class="mt-3 mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      class="rounded-circle img-fluid"
                      style={{ width: "100px" }}
                    />
                  </div>
                  <h4 class="mb-2">{user.name}</h4>
                  <p class="text-muted mb-4">
                    {user.graduation} <span class="mx-2">|</span>{" "}
                    <Link to={""}>{user.email}</Link>
                  </p>
                  <div class="mb-4 pb-2">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-floating"
                    >
                      <i class="fab fa-facebook-f fa-lg"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-floating"
                    >
                      <i class="fab fa-twitter fa-lg"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-floating"
                    >
                      <i class="fab fa-skype fa-lg"></i>
                    </button>
                  </div>
                  <Link to={`/admin/follow-up/${user.id}`}>
                    {" "}
                    <button
                      type="button"
                      class="btn btn-primary btn-rounded btn-lg"
                    >
                      Follow Up
                    </button>
                  </Link>

                  <div class="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <p class="mb-2 h5">{user.age}</p>
                      <p class="text-muted mb-0">Age</p>
                    </div>
                    <div class="px-3">
                      <p class="mb-2 h5">{user.gender}</p>
                      <p class="text-muted mb-0">Gender</p>
                    </div>
                    <div>
                      <p class="mb-2 h5">{user.mobile}</p>
                      <p class="text-muted mb-0">Mobile</p>
                    </div>
                  </div>  
                  <div className="row">
                    <div className="col">
                      <h1>Follow Up Status : {followup.status}</h1>
                      <h1>Follow Up Date : {formattedDate}</h1>
                      <Link to={`/admin/followup-edit/${user.id}`}>
                       <button className="btn btn-primary">Edit</button>
                       </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserSinglePage;
