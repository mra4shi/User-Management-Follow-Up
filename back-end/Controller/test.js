//followups toggle fucntion

function toggleTodayFollowUps() {
    setSeenfollowup(!seenfollowup);
  }






  <div className="container">
  <div className="row">
    {searchResult?.length > 0
      ? searchResult?.map((item) => (
          <ul className="list-group list-group-light" key={item.id}>
            <li
              className="list-group-item  d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#FFE4C4", top: "30px" }}
            >
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
        ))
      : currentUsers?.map((item) => (
          <>
            <ul className="list-group list-group-light" key={item.id}>
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#FFE4C4", top: "30px" }}
              >
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
          </>
        ))}



{seenfollowup ? (
  <>
    <section className="popup">
      <div className="popup-inner ">
        <button
          onClick={toggleTodayFollowUps}
          className="float-right"
        >
          X
        </button>
        {todafollowup?.map((item) => (
          <>
            <ul className="list-group list-group-light" key={item.id}>
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#FFE4C4", top: "30px" }}
              >
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{item.username}</p>
                    <p className="text-muted mb-0">{item.followup}</p>
                    <p className="text-muted mb-0">{item.status}</p>
                  </div>
                </div>
                <Link to={`/admin/user/${item.userid}`} role="button">
                  <button className="btn text-white bg-danger btn-rounded btn-sm">
                    View
                  </button>
                </Link>
              </li>
            </ul>
          </>
        ))}
      </div>
    </section>
  </>
) : null}