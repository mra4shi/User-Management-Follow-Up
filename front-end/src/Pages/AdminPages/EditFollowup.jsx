import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function EditFollowup() {
  const { id } = useParams();
  const [notificationcount, setNotificationcount] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };
  const [statusData, setStatusData] = useState({});
  const [formData, setFormdata] = useState({
    status: "",
  });

  const handleChange = (e) => {
    const { name , value } = e.target
    setFormdata({
      ...formData,
      [name] : value
    })
  }

  useEffect(() => {
    adminRequest({
      url: "/api/admin/notification",
      method: "GET",
    }).then((response) => {
      setNotificationcount(response.data.notification.length);
    });
  }, []);

  const Getdata = () => {
    adminRequest({
      url: `/api/admin/followup-status/${id}`,
      method: "GET",
    }).then((response) => {
      setStatusData(response.data.rows[0]);
      console.log(response.data.rows[0].status, "data");
      
    }).catch((error) => {
      toast.error("something is wrong login again");
      localStorage.removeItem("admin_Secret");
      navigate("/admin/login");
    });
  };

  useEffect(() => {
    Getdata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  const {status} = formData
    const NewformData = new FormData();
    NewformData.append("status", formData.status);
    console.log(formData);
    adminRequest({
      url: `/api/admin/followup-edit/${id}`,
     data : NewformData,
      method: "PUT",
    }).then((response) => {
      console.log(response);
      toast.success("follow up updated");
      navigate(`/admin/user/${id}`)
    });
  };

  return (
    <div>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/admin/home" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">KentraEdu</span>
    </Link>
    <div class=" w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        
      <li>
          <Link to="/admin/home" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent " aria-controls="navbar-default" aria-expanded="true">Home</Link>
        </li>

        <li>
          <Link to="/admin/userlist" class="block py-2 px-3 text-black  rounded md:bg-white md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500" >User List</Link>
        </li>
        <li>
          <Link to="/admin/register" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
        </li>
        <li>
          <Link to="/admin/notification" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Notification <span class=" top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 rounded-full text-xs text-white">
                {notificationcount}
            </span>
         
          </Link>
        </li>
        
        <li>
          <button onClick={handleLogout} class="block py-2 px-3 text-gray-900 rounded hover:bg-black md:border-0 hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">LogOut</button>
        </li>
      </ul>
    </div>
  </div>
</nav>


      <div className="container d-flex text-center justify-content-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="status" className="text-gray-600">
            Status
          </label>
          <input
            type="text"
            name="status"
            id="Example2text"
            placeholder="status"
            cols="30"
            rows="10"
            defaultValue={statusData?.status}
            onChange={handleChange}
          ></input>

          <input
            type="submit"
            value="Save"
            className="btn btn-primary btn-block"
          />
          <Link to={`/admin/user/${id}`} className="btn btn-link btn-block">
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditFollowup;
