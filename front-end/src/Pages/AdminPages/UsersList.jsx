import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

function UsersList() {
  const [notificationcount, setNotificationcount] = useState(null);
  const [users, setFollowup] = useState([]);
  const [seen, setSeen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedListOption, setSelectedListOption] = useState(10);
  const [selectOptions, setSelectOptions] = useState([]);
  const [seenfollowup, setSeenfollowup] = useState(false);
  const [todafollowup, setTodayfollowup] = useState([]);
  
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuToggle = () => {
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    adminRequest({
      url: "/api/admin/currentfollowups",
      method: "GET",
    }).then((response) => {
      setTodayfollowup(response.data?.FollowUps);
    });
  }, []);
  console.log(todafollowup);

  function toggleTodayFollowUps() {
    setSeenfollowup(!seenfollowup);
  }

  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

  const showSwal = () => {
    Swal.fire({
      title: "Are you sure To Add New User?",
      text: "You can be able to Update this User later!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        function togglepop() {
          setSeen(!seen);
        }

        togglepop();
      }
    });
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
      url: "/api/admin/notification",
      method: "GET",
    }).then((response) => {
      setNotificationcount(response.data?.notification?.length);
    });
  }, []);

  //Searching Section

  const [searchTerm, setSearchterm] = useState("");
  const [searchResult, setSearchresult] = useState([]);
  const handleSearch = async () => {
    const response = await axios.post("/api/admin/search", { searchTerm });
    setSearchresult(response.data);
    console.log(response.data);
  };

  //Pagination and selection Section

  useEffect(() => {
    const userCount = users?.length;

    const totalPages = Math.ceil(userCount / itemsPerPage);

    const options = Array.from({ length: totalPages }, (_, index) => ({
      value: (index + 1) * itemsPerPage,
      label:` ${(index + 1) * itemsPerPage}`,
    }));

    setSelectOptions(options);
  }, [users, itemsPerPage]);

  const handleListOptionChange = (event) => {
    const value = event.target.value;
    setSelectedListOption(value);

    setItemsPerPage(parseInt(value,10))

 
    setCurrentPage(1);

    setTimeout(() => {}, 0);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filteredUsers = searchResult?.length > 0 ? searchResult : users;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  //User Adding section

  const [name, setName] = useState("");
  const [graduation, setGraduation] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  function togglepop() {
    setSeen(!seen);
  }

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      if (!name || !graduation || !email || !mobile || !age || !gender) {
        toast.error("Please fill in all fields.");
        return;
      }

      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        toast.error("Please enter a valid 10-digit mobile number.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("graduation", graduation);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("age", age);
      formData.append("gender", gender);

      axios
        .post("http://localhost:5000/api/admin/register", formData)
        .then((response) => {
          if (response.data.success) {
            navigate("/admin/success");
            toast.success("Submission success");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Email or Mobile Number Already Registered...");
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="flex">
        {/* Left Side Navigation */}
        <div className="w-1/4 bg-gray-800  text-white py-6 px-4">
          <div className="mt-6">
            <button
              className="block py-2 px-4 rounded text-gray-400 hover:bg-gray-700"
              onClick={handleMenuToggle}
            >
              Menu
            </button>
            { showMenu && (
              <ul className="mt-2">
                <button
                  className={`block py-2 px-4 rounded ${
                    "/admin/home"
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  Home
                </button>
             
                  
                <button 
              
                  onClick={toggleTodayFollowUps}
                  className={`block py-2 px-4 rounded ${
                    "/company-list"
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  User List
                </button>
               

                <button
                  onClick={toggleTodayFollowUps}
                  className={`block py-2 px-4 rounded ${
                    "/admin/project-management"
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  FollowUp
                </button>
              </ul>
            )  }
          </div>
        </div>
        <div className="w-3/4 bg-gray-100 p-6">
          <nav class="float-right bg-white border-gray-200 dark:bg-gray-800">
            <div class=" flex flex-wrap items-center justify-between ">
              <ul class="font-medium flex flex-col md:p-0 mb-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
                <li>
                  <button
                    onClick={handleLogout}
                    class="block py-2 px-3 text-gray-900 rounded hover:bg-black md:border-0 hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    LogOut
                  </button>
                </li>
                <li>
                  <Link
                    to="/admin/notification"
                    class="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <span class=" top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 rounded-full text-xs text-white">
                      {notificationcount}
                    </span>
                    <img
                      style={{ width: "29px", height: "26px" }}
                      src="https://static.thenounproject.com/png/194977-200.png"
                      alt=""
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="col">
              <button
                class="bg-success float-right top-10px relative rounded-2 text-white "
                style={{ position: "relative", top: "90px", left: "96px" }}
                onClick={showSwal}
              >
                ADD USER
              </button>{" "}
              <label
          style={{ position: "relative", top: "58px", left: "706px" }}
          htmlFor="itemsPerPage"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Items Per Page
        </label>
        <select
          style={{ position: "relative", top: "22px", left: "155px" }}
          onChange={handleListOptionChange}
          id="itemsPerPage"
          className="bg-gray-50 border float-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedListOption}
        >
          {selectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
            </div>
          </div>
          

          {seen ? (
            <>
              <section className="popup">
                <div className="popup-inner ">
                  <form className="mt-5" onSubmit={handleRegister}>
                    <button onClick={togglepop} className="float-right">
                      X
                    </button>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          value={name}
                          name="name"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          id="form3Example1c"
                          className="form-control"
                        />
                        <label className="form-label" for="form3Example1c">
                          Your Name
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          name="graduation"
                          value={graduation}
                          onChange={(e) => {
                            setGraduation(e.target.value);
                          }}
                          id="form3Example3c"
                          className="form-control"
                        />
                        <label className="form-label" for="form3Example3c">
                          Graduation
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          id="form3Example3c"
                          className="form-control"
                        />
                        <label className="form-label" for="form3Example3c">
                          Your Email
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="number"
                          name="mobile"
                          onChange={(e) => {
                            setMobile(e.target.value);
                          }}
                          value={mobile}
                          id="form3Example4c"
                          className="form-control"
                        />
                        <label className="form-label" for="form3Example4c">
                          Mobile Number
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="Number"
                          name="age"
                          value={age}
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                          id="form3Example4cd"
                          className="form-control"
                        />
                        <label className="form-label" for="form3Example4cd">
                          Age
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          name="gender"
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                          value={gender}
                          id="form3Example4cd"
                          className="form-control"
                        />
                        <label className="form-label" for="form3Example4cd">
                          Gender
                        </label>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </>
          ) : null}

          <input
            type="text"
            value={searchTerm}
            class="relative left-5 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setSearchterm(e.target.value)}
          />
          <button
            className="relative bottum-5 left-5 bg-black text-white rounded-2"
            onClick={handleSearch}
          >
            Search
          </button>

          <div className="container">
            <div className="row">
             



{seenfollowup ? (
            <>
              
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
             
            </>
          ) : (
            <>

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
            
            
              <nav className="relative justify-content-center navbar navbar-light mt-5 bg-light">
                <ul className="pagination">
                  <li key="prev" className="page-item">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      className="page-link"
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                  </li>
                  {Array.from({
                    length: Math.ceil(filteredUsers?.length / itemsPerPage),
                  }).map((_, index) => (
                    <li key={index} className="page-item">
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`page-link ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li key="next" className="page-item">
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      className="page-link"
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
      </div>
    </>
  );
}

export default UsersList;
