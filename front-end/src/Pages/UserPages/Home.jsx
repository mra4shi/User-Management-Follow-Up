import React from "react";
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-gradient">
      <nav class="navbar navbar-light bg-light">
        <h1 class="navbar-brand">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/403/516/original/modern-company-logo-design-vector.jpg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          Kentra
        </h1>
      </nav>

      <div className="container" >
        <div className="row ">
          <div className="col-md-4">
            <div class="card " style={{ width: "20rem"}}>
              <img
              style={{height : '18rem' }}
                class="card-img-top"
                src="https://techstory.in/wp-content/uploads/2015/02/ms-dhoni-3.jpg"
                alt="Card image cap"
              />
              <div class="card-body" style={{height : '18rem' }}>
                <h1 class="card-title">Abhijith Raj</h1>
                <h4 class="card-title">Placed @ Milton Prvt Lmtd</h4>
                <p class="card-text">Gained His Passion With High Package</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div class="card" style={{ width: "18rem"}}>
              <img
              style={{height : '18rem' }}
                class="card-img-top"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Sachin-Tendulkar_%28cropped%29.jpg/330px-Sachin-Tendulkar_%28cropped%29.jpg"
                alt="Card image cap"
              />
              <div class="card-body  " style={{height : '18rem' }}>
                <h1 class="card-title">Akshay Kumar</h1>
                <h4 class="card-title">Placed @ Jupitor Prvt Ltd</h4>
                <p class="card-text">Fresher with High Package</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div class="card" style={{ width: "20rem" }}>
              <img
                style={{height : '18rem' }}
                class="card-img-top"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg/330px-Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg"
                alt="Card image cap"
              />
              <div class="card-body" style={{height : '18rem' }}>
                <h1 class="card-title">Rahul A</h1>
                <h4 class="card-title">Placed @ Nixon Prvt Ltd</h4>
                <p class="card-text">Achieved His True Goal With His Work Ethic</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <Link to={'/register'}>
              <button className="btn btn-primary"> Register </button>
              </Link>
            </div>
          </div>
          <div className="col">
            <h1>If You Want To Get Placed In A Good Company</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
