import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminRequest } from "../../axios";
import { Link } from "react-router-dom";
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function UserSinglePage() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [followup, setFollowup] = useState("");
  const [followups, setFollowups] = useState(null);
  const [notificationcount, setNotificationcount] = useState(null);

  const [followupmode, setFollowupmode] = useState(false);

  function togglefollowup() {
    setFollowupmode(!followupmode);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  const sortedFollowups = followups?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  console.log(sortedFollowups, "dorted followups");
  const currentFollowups = sortedFollowups?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < followups?.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const [form, setForm] = useState({
    name: "",
    graduation: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

  const [editMode, setEditMode] = useState(false);
  const showSwal = () => {
    Swal.fire({
      title: "Are you sure To Edit This User?",
      text: "You can be able to revert this later!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        const toggleEditMode = () => {
          setEditMode(!editMode);
        };
        toggleEditMode();
      }
    });
  };

  function offedit() {
    setEditMode(!editMode);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.graduation ||
      !form.email ||
      !form.mobile ||
      !form.age ||
      !form.gender
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(form.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (form.age < 18 || form.age > 70) {
      toast.error("Age should be between 18 and 70.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", form.name);
      formDataToSend.append("graduation", form.graduation);
      formDataToSend.append("gender", form.gender);
      formDataToSend.append("email", form.email);
      formDataToSend.append("mobile", form.mobile);
      formDataToSend.append("age", form.age);
      const response = await adminRequest({
        url: `/api/admin/edituser/${id}`,
        method: "PUT",
        data: formDataToSend,
      });
      if (response.data) {
        toast.success("followup success");
        navigate(window.location.reload());
      }
    } catch (error) {
      toast.error("something is wrong login again");
      localStorage.removeItem("admin_Secret");
      navigate("/admin/login");
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const dateString = followup?.follow_up_date;
  const date = moment(dateString);
  const formattedDate = date.format("YYYY-MM-DD / HH:mm");

  useEffect(() => {
    adminRequest({
      url: `/api/admin/followup-status/${id}`,
      method: "GET",
    }).then((response) => {
      console.log(response.data, "followup");
      setFollowup(response.data.followups);
    });
  }, []);

  useEffect(() => {
    adminRequest({
      url: `/api/admin/user/${id}`,
      method: "GET",
    })
      .then((response) => {
        setUser(response.data.rows[0]);
        setForm({
          name: response.data.rows[0].name,
          graduation: response.data.rows[0].graduation,
          gender: response.data.rows[0].gender,
          email: response.data.rows[0].email,
          mobile: response.data.rows[0].mobile,
          age: response.data.rows[0].age,
        });
      })
      .catch((error) => {
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
      setNotificationcount(response.data.notification?.length);
    });
  }, []);

  useEffect(() => {
    adminRequest({
      url: `/api/admin/fetchfollowup/${id}`,
      method: "GET",
    }).then((response) => {
      setFollowups(response.data.followups);
    });
  }, []);



  //followup

  
  const [forms, setForms] = useState({
    username:"",
    followup:"",
    status :"",
    date : ""
  });

 

  const handleChanges = (evt) => {
    const { name, value } = evt.target;
    setForms({
      ...forms,
      [name]: value,
    });
  };

  const followuphandleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formDataToSend = new FormData();
      
   
      formDataToSend.append("followup", forms.followup);
      formDataToSend.append("status",forms.status)
      formDataToSend.append("date",forms.date)
      const response = await adminRequest({
        url: `/api/admin/follow-up/${id}`,
        method: "POST",
        data: formDataToSend,
      });
      if (response.data) {
        console.log(response);
        
        toast.success("followup success");
        navigate(window.location.reload());
      }
    } catch (error) {
      toast.error("something is wrong login again");
      localStorage.removeItem("admin_Secret");
      navigate("/admin/login");
    }
  };

  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
         
          <div class=" w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/admin/home"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                  aria-controls="navbar-default"
                  aria-expanded="true"
                >
                  Home
                </Link>
              </li>

              <li>
                <button
                  to="/admin/userlist"
                  class="block py-2 px-3 text-black  rounded md:bg-white md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500"
                >
                  User List
                </button>
              </li>

              <li>
                <button
                  to="/admin/notification"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Notification{" "}
                  <span class=" top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 rounded-full text-xs text-white">
                    {notificationcount}
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-black md:border-0 hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header>
        <section class="">
          <div class="grid h-screen grid-cols-2">
            <div class="">
              <section class="vh-100">
                <div class="container">
                  <div class="row">
                    <div class="col-md-12 ">
                      <div class="card" style={{ borderRadius: "6%" }}>
                        {editMode ? (
                          <div>
                            <button
                              className="float-right bg-black text-white rounded-2"
                              style={{
                                position: "relative",
                                left: "100px",
                                top: "18px",
                              }}
                              onClick={offedit}
                            >
                              CLOSE
                            </button>
                            <form onSubmit={handleSubmit}>
                              <div>
                                <label
                                  id="email"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  username
                                </label>
                                <input
                                  type="text"
                                  placeholder="name"
                                  name="name"
                                  value={form.name}
                                  onChange={handleChange}
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                />
                              </div>

                              <div>
                                <label
                                  id="graduation"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Graduation
                                </label>
                                <input
                                  type="text"
                                  placeholder="graduation"
                                  name="graduation"
                                  value={form.graduation}
                                  onChange={handleChange}
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                />
                              </div>

                              <div>
                                <label
                                  id="email"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  E-Mail
                                </label>
                                <input
                                  type="email"
                                  placeholder="email"
                                  name="email"
                                  value={form.email}
                                  onChange={handleChange}
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                />
                              </div>

                              <div>
                                <label
                                  id="gender"
                                  className="text-sm font-medium leading-none text-gray-800"
                                >
                                  Gender
                                </label>
                                <select
                                  id="gender"
                                  name="gender"
                                  value={form.gender}
                                  onChange={handleChange}
                                  className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                >
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>

                              <div class="mt-6  w-full">
                                <label
                                  for="pass"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Age
                                </label>
                                <div class="relative flex items-center justify-center">
                                  <input
                                    type="Number"
                                    placeholder="Age"
                                    name="age"
                                    value={form.age}
                                    onChange={handleChange}
                                    id="text"
                                    class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                  />
                                </div>
                              </div>

                              <div class="mt-6  w-full">
                                <label
                                  for="pass"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Mobile
                                </label>
                                <div class="relative flex items-center justify-center">
                                  <input
                                    type="Number"
                                    placeholder="Mobile"
                                    name="mobile"
                                    value={form.mobile}
                                    onChange={handleChange}
                                    id="text"
                                    class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                  />
                                </div>
                              </div>
                              <div class="mt-8">
                                <button
                                  onClick={handleSubmit}
                                  role="button"
                                  type="submit"
                                  class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                                >
                                  Update
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <>
                            <div class="card-body text-center">
                              {user?.gender == "female" ? (
                                <>
                                  <div class="mt-3 mb-4">
                                    <img
                                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                      class="rounded-circle img-fluid"
                                      style={{ width: "100px" }}
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div class="mt-5 mb-2">
                                    <img
                                      src="https://img.freepik.com/premium-vector/people-concept-about-man-design_25030-11530.jpg?size=626&ext=jpg"
                                      class="rounded-circle img-fluid"
                                      style={{ width: "100px" }}
                                    />
                                  </div>
                                </>
                              )}
                              <button
                                className="float-right bg-blue-500 text-white rounded-1"
                                style={{
                                  position: " relative",
                                  left: "100px",
                                  top: "-70px",
                                  height: "36px",
                                  width: "60px",
                                }}
                                onClick={showSwal}
                              >
                                Edit
                              </button>
                              <label
                                id="name"
                                class="text-sm font-medium leading-none text-gray-800"
                              >
                                username
                              </label>
                              <input
                                name="name"
                                value={user.name}
                                aria-labelledby="tet"
                                class="bg-gray-200 border rounded  text-xs font-medium  text-gray-800 py-3 w-full pl-3 mt-2"
                              />
                              <div>
                                <label
                                  id="graduation"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Graduation
                                </label>
                                <input
                                  type="text"
                                  placeholder="graduation"
                                  name="graduation"
                                  value={user.graduation}
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                />
                              </div>

                              <div>
                                <label
                                  id="email"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  E-Mail
                                </label>
                                <input
                                  type="email"
                                  placeholder="email"
                                  name="email"
                                  value={user.email}
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                />
                              </div>
                              <div>
                                <label
                                  id="email"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Gender
                                </label>
                                <input
                                  type="text"
                                  placeholder="Gender"
                                  name="gender"
                                  value={user.gender}
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                />
                              </div>
                              <div class="mt-6  w-full">
                                <label
                                  for="pass"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Age
                                </label>
                                <div class="relative flex items-center justify-center">
                                  <input
                                    type="Number"
                                    placeholder="Age"
                                    name="age"
                                    value={user.age}
                                    id="text"
                                    class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                  />
                                </div>
                              </div>
                              <div class="mt-6  w-full">
                                <label
                                  for="pass"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Mobile
                                </label>
                                <div class="relative flex items-center justify-center">
                                  <input
                                    type="Number"
                                    placeholder="Mobile"
                                    name="mobile"
                                    value={user.mobile}
                                    id="text"
                                    class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                  />
                                </div>
                              </div>
                              <>
                                {" "}
                                <Link to={`/admin/follow-up/${user.id}`}>
                                  {" "}
                                  <button
                                    type="button"
                                    class="btn btn-primary btn-rounded btn-lg"
                                  >
                                    Follow Up
                                  </button>
                                </Link>
                              </>

                              <div className="row"></div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div class="card" style={{ borderRadius: "0%" }}>
              <h1
                className="flex justify-center"
                style={{ position: "relative", right: "184px", top: "0px" }}
              >
                FollowUps
              </h1>

              <form
                style={{
                  position: "relative",
                  right: "144px",
                }}
                onSubmit={followuphandleSubmit}
              >
                <div class="mt-6  w-full">
                  <label
                    for="pass"
                    class="text-sm font-medium leading-none text-gray-800"
                  >
                    Follow Up Note
                  </label>
                  <div class="relative flex items-center justify-center">
                    <input
                      type="text"
                      placeholder="followup"
                      name="followup"
                      onChange={handleChanges}
                      id="text"
                      class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    />
                  </div>
                </div>
                <div>
                  <label
                    id="gender"
                    className="text-sm font-medium leading-none text-gray-800"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    onChange={handleChanges}
                    className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  >
                    <option value="">Select Option</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                  </select>
                </div>

                <div
                  style={{
                    position: "relative",
                    left: "333px",
                    bottom: "79px",
                  }}
                >
                  <label
                    id="email"
                    class="text-sm font-medium leading-none text-gray-800"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    placeholder="Date"
                    name="date"
                    onChange={handleChanges}
                    aria-labelledby="tet"
                    class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>

                <div class="mt-8">
                  <button
                    style={{ position: "relative", bottom: "65px" }}
                    role="button"
                    type="submit"
                    class="focus:ring-1 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-2 w-full"
                  >
                    Add FollowUp
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-center">
                {followup.length === 0 ? (
                  <>
                    <h1>NoFollowUps</h1>
                  </>
                ) : (
                  <>
                    {currentPage == 1 ? (
                      <></>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                          onClick={handlePreviousPage}
                        >
                          Previous FollowUp
                        </button>
                      </>
                    )}

                    <span className="mx-4">FollowUp {currentPage}</span>

                    {currentPage * pageSize >= followups?.length ? (
                      <></>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                          onClick={handleNextPage}
                        >
                          Next FollowUp Date
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
              {currentFollowups?.map((items) => (
                <div className="flex items-center justify-center">
                  <div class="mt-3 mb-4">
                                    <input
                                      value={items.date}
                                      class="rounded-circle img-fluid bg-black text-white"
                                      style={{ width: "100px" ,     height: "83px",
                                      width: "82px" }}
                                    />
                                  </div>
                  <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                      FollowUp Status : {items.status}
                    </p>

                    <p class="font-normal text-gray-700 dark:text-gray-400">
                      FollowUp Comment : {items.followup}
                    </p>

                    

                    <p class="font-normal text-gray-700 dark:text-gray-400">
                      FollowUp Date : {items.date}
                    </p>
                  </div>
                  <br />
                  <br />
                </div>
              ))}

            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default UserSinglePage;
