import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";

function FollowUp() {
  const { id } = useParams();
  const [notificationcount, setNotificationcount] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username:"",
    followup:""
  });
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formDataToSend = new FormData();
      formDataToSend.append("username",form.username)
      formDataToSend.append("followup", form.followup);

      const response = await adminRequest({
        url: `/api/admin/follow-up/${id}`,
        method: "POST",
        data: formDataToSend,
      });
      if (response.data) {
        console.log(response);
        
        toast.success("followup success");
        navigate(`/admin/user/${id}`);
      }
    } catch (error) {
      toast.error("something is wrong login again");
      localStorage.removeItem("admin_Secret");
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    adminRequest({
      url: "/api/admin/notification",
      method: "GET",
    }).then((response) => {
      setNotificationcount(response.data.notification.length);
    });
  }, []);

  return (
    <div class="container">
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/admin/home" class="flex items-center space-x-3 rtl:space-x-reverse">
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

      <div class="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
        <div class="flex flex-col items-center justify-center">
          <div class="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
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
                 placeholder="username"
                 name="username"
                 onChange={handleChange}
                aria-labelledby="tet"
              
                class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div class="mt-6  w-full">
              <label
                for="pass"
                class="text-sm font-medium leading-none text-gray-800"
              >
                Follow Up
              </label>
              <div class="relative flex items-center justify-center">
                <input
                 type="text"
                 placeholder="followup"
                 name="followup"
                 onChange={handleChange}
                  id="text"
                
                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg"
                    alt="viewport"
                  />
                </div>
              </div>
            </div>
            <div class="mt-8">
              <button
                role="button"
                type="submit"
                class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
              >
                Create my account
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowUp;
