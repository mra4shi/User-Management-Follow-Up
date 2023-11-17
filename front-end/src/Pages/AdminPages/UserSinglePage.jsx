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

 

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  const sortedFollowups = followups?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
 
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
 
        const toggleEditMode = () => {
          setEditMode(!editMode);
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

    if ( !/^[1-9][0-9]*$/.test(form.age) || form.age < 18 || form.age > 70) {
      toast.error("Please enter a valid age (18-70).");
      return;
    }

    if (!form.graduation || !form.graduation.length || !/^[a-zA-Z\s]+$/.test(form.graduation)) {
      toast.error("Please enter a valid graduation.");
      return;
    }

    if ( form.name.length < 2 || form.name.length > 50 || !/^[a-zA-Z\s]+$/.test(form.name)) {
      toast.error("Please enter a valid name (2-50 characters, letters and spaces only).");
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
  console.log(dateString)
  const date = moment(dateString);
  const formattedDate = date.format("YYYY-MM-DD / HH:mm");
  console.log(formattedDate)

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



  const [showMenu, setShowMenu] = useState(true);
  const handleMenuToggle = () => {
    setShowMenu((prevState) => !prevState);
  };

  //followup

  
  const [forms, setForms] = useState({
    username:"",
    followup:"",
    status :"",
    date : ""
  });

 
  const formateddatefollowup= forms.date
  console.log(formateddatefollowup)

  const handleChanges = (evt) => {
    const { name, value } = evt.target;
    setForms({
      ...forms,
      [name]: value,
    });
  };



   

  

 const followuphandleSubmit = async (e) => {
  e.preventDefault();

  
  if (!forms.followup || !forms.status || !forms.date) {
    toast.error("Please fill all fields");
    return;
  }

 
  if (forms.followup.length < 5 || forms.followup.length > 255) {
    toast.error("Followup must be between 10 and 255 characters");
    return;
  }


  if (!forms.status) {
    toast.error("Status cannot be empty");
    return;
  }
 
 
  if (!/^\d{4}-\d{2}-\d{2}$/.test(forms.date)) {
    toast.error("Invalid date format");
    return;
  }

 
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("followup", forms.followup);
    formDataToSend.append("status", forms.status);
    formDataToSend.append("date", formateddatefollowup);

    const response = await adminRequest({
      url: `/api/admin/follow-up/${id}`,
      method: "POST",
      data: formDataToSend,
    });

    if (response.data) {
      console.log(response);
      toast.success("Followup submitted successfully");
      navigate(window.location.reload());
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again later");
  }
};

  return (
    <div className="flex">
    {/* Left Side Navigation */}

    <div className="w-1/4 bg-gray-800  text-white py-6 px-4">
      <div className="mt-6">
        <button
          className="block py-2 px-4 rounded  bg-gray-700"
          onClick={handleMenuToggle}
        >
          Menu
        </button>
        {showMenu && (
          <ul className="mt-2">
            <Link
            to={'/admin/userlist'}>
            <button
              
              className={`block py-2 px-4 rounded ${
                "/admin/"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-700"
              }`}
              >
              Users List
            </button>
                </Link>

            <Link to={"/admin/home"}>
              <button
                className={`block py-2 px-4 rounded ${
                  "/admin/home"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
              >
                Dashboard
              </button>
            </Link>


            <Link to={"/admin/notification"}>
              <button
                className={`block py-2 px-4 rounded ${
                  "/admin/home"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
              >
               Notification
               <span class=" top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 rounded-full text-xs text-white">
                      {notificationcount}
                    </span>
                     
              </button>
            </Link>

          </ul>
        )}
      </div>
    </div>
    <div className="w-3/4 bg-gray-100 p-6">
  
            <div class=" flex flex-wrap   items-center justify-between ">
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
                                  
                                  name="gender"
                                  value={form.gender}
                                  onChange={handleChange}
                                  id="form3Example4cd"
                           
                                  className=" form-control bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
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
                                  left: "50px",
                                  top: "-70px",
                                  height: "36px",
                                  width: "60px",
                                }}
                                onClick={toggleEditMode}
                              >
                                Edit
                              </button>
                              <label
                                id="name"
                                class="text-sm font-medium leading-none text-gray-800"
                              >
                                username
                              </label>
                              <h1
                                name="name"
                                
                                aria-labelledby="tet"
                                class="bg-gray-200 border rounded  text-xs font-medium  text-gray-800 py-3 w-full pl-3 mt-2"
                              > {user.name} </h1>
                              <div>
                                <label
                                  id="graduation"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Graduation
                                </label>
                                <h1
                                  type="text"
                                  placeholder="graduation"
                                  name="graduation"
                                
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                >{user.graduation} </h1>
                              </div>

                              <div>
                                <label
                                  id="email"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  E-Mail
                                </label>
                                <h1
                                  type="email"
                                  placeholder="email"
                                  name="email"
                                  
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                >{user.email}</h1>
                              </div>
                              <div>
                                <label
                                  id="email"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Gender
                                </label>
                                <h1
                                  type="text"
                                  placeholder="Gender"
                                  name="gender"
                                  
                                  aria-labelledby="tet"
                                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                >{user.gender}</h1>
                              </div>
                              <div class="mt-6  w-full">
                                <label
                                  for="pass"
                                  class="text-sm font-medium leading-none text-gray-800"
                                >
                                  Age
                                </label>
                                <div class="relative flex items-center justify-center">
                                  <h1
                                    type="Number"
                                    placeholder="Age"
                                    name="age"
                                  
                                    id="text"
                                    class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                  > {user.age}</h1>
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
                                  <h1
                                    type="Number"
                                    placeholder="Mobile"
                                    name="mobile"
                                   
                                    id="text"
                                    class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                  > {user.mobile} </h1>
                                </div>
                              </div>
                              

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
                style={{ position: "relative", right: "106px", top: "0px" }}
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
                    <textarea
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
                    left: "275px",
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

           
              {sortedFollowups?.map((items) => (
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
    
      </div>
      </div>
    
   
  );
}

export default UserSinglePage;
