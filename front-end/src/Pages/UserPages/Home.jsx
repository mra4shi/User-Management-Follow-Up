import React from "react";
import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <h1 class="navbar-brand">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/403/516/original/modern-company-logo-design-vector.jpg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          ORGANISATION
        </h1>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                class="card-img-top"
                src="https://techstory.in/wp-content/uploads/2015/02/ms-dhoni-3.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h1 class="card-title">Abhijith Raj</h1>
                <h4 class="card-title">Placed @ Milton Prvt Lmtd</h4>
                <p class="card-text">Gained His Passion With High Package</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                class="card-img-top"
                src="https://techstory.in/wp-content/uploads/2015/02/ms-dhoni-3.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h1 class="card-title">Abhijith Raj</h1>
                <h4 class="card-title">Placed @ Milton Prvt Lmtd</h4>
                <p class="card-text">Gained His Passion With High Package</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                class="card-img-top"
                src="https://techstory.in/wp-content/uploads/2015/02/ms-dhoni-3.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h1 class="card-title">Abhijith Raj</h1>
                <h4 class="card-title">Placed @ Milton Prvt Lmtd</h4>
                <p class="card-text">Gained His Passion With High Package</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12 text-center">
              <Link to={'/register'}>
              <button className="btn btn-primary"> Register </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
