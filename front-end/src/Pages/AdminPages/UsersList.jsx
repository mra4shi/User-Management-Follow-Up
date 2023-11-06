import React from "react";

function UsersList() {
  return (
    <div>
      <div className="container">
        <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
      </div>

      <div className="container">
        <div className="row">
          <ul class="list-group list-group-light">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ height: "45px", width: "45px" }}
                  class="rounded-circle"
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">John Doe</p>
                  <p class="text-muted mb-0">john.doe@gmail.com</p>
                </div>
              </div>
              <a class="btn btn-link btn-rounded btn-sm" href="#" role="button">
                View
              </a>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                  class="rounded-circle"
                  alt=""
                  style={{ height: "45px", width: "45px" }}
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">Alex Ray</p>
                  <p class="text-muted mb-0">alex.ray@gmail.com</p>
                </div>
              </div>
              <a class="btn btn-link btn-rounded btn-sm" href="#" role="button">
                View
              </a>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                  class="rounded-circle"
                  alt=""
                  style={{ height: "45px", width: "45px" }}
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">Kate Hunington</p>
                  <p class="text-muted mb-0">kate.hunington@gmail.com</p>
                </div>
              </div>

              <a class="btn btn-link btn-rounded btn-sm" href="#" role="button">
                View
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
