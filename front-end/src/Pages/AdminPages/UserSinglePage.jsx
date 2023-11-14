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
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

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
        navigate(`/admin/followup-edit/${user.id}`);
      }
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
      console.log(response, "followup");
      setFollowup(response.data.followups);
    });
  }, []);

  useEffect(() => {
    adminRequest({
      url: `/api/admin/user/${id}`,
      method: "GET",
    })
      .then((response) => {
        console.log(response.data.rows[0]);
        setUser(response.data.rows[0]);
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
      setNotificationcount(response.data.notification.length);
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

  console.log(followup.length,"follow up length")


  

  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/admin/home"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap">
              KentraEdu
            </span>
          </Link>
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
                <Link
                  to="/admin/userlist"
                  class="block py-2 px-3 text-black  rounded md:bg-white md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500"
                >
                  User List
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/register"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/notification"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Notification{" "}
                  <span class=" top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 rounded-full text-xs text-white">
                    {notificationcount}
                  </span>
                </Link>
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
                          <h4 class="mb-2">{user.name}</h4> <br/>
                          <p class="text-muted mb-4">
                            Graduation :{user.graduation}{" "} <br/>
                            <span class="mx-2">|</span>{" "}
                            <label>Mobile : {user.mobile}</label> <br/>
                          </p>

                          
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
                          

                          <div class="d-flex text-center justify-content-between ">
                            <div>
                              <p class="mb-2 h4">{user.age}</p>
                              <p class="h1 text-muted mb-0">Age</p>
                            </div>
                            <div class="px-3">
                              <p class="mb-2 h4">{user.gender}</p>
                              <p class="text-muted h1 mb-0">Gender</p>
                            </div>
                            <div>
                              <p class="mb-2 h4"> {user.email}</p>
                              <p class="text-muted h1 mb-0">Email</p>
                            </div>
                          </div> <br/>

                          <Link to={`/admin/edituser/${id}`}>
                          <button  className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                          Update
                          </button>
                          </Link>
                          <div className="row">
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div class="">
              <h1 className="flex items-center justify-center">FollowUps</h1>
              {followups?.map((items) => (
                <div className="flex items-center justify-center">
                  <div
              
                    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      UserName : {items?.username}
                    </h2>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                    FollowUp Status : {items.status}
                    </p>

                    <p class="font-normal text-gray-700 dark:text-gray-400">
                    FollowUp Note : {items.followup}
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
