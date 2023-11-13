import React, { useEffect, useState } from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { adminRequest } from "../../axios";
import Badge from "react-bootstrap/Badge";
import { toast } from "react-toastify";

function UsersList() {
  const [search, setSearch] = useState("");
  const [notificationcount, setNotificationcount] = useState(null);
  const [followup, setFollowup] = useState(null);
  const [nonfollowup, setNonfollowup] = useState(null);
  const [showFollowup, setShowFollowup] = useState(true);
  const [showaccepted, setShowaccepted] = useState(false);
  const [acceptedusers, setAccepteduser] = useState(null);
  const [rejectedusers, setRejecteduser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
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
      url: "/api/admin/getuserwithoutfollowup",
      method: "GET",
    })
      .then((response) => {
        setNonfollowup(response.data);
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
      url: "/api/admin/getaccepteduser",
      method: "GET",
    }).then((response) => {
      setAccepteduser(response.data);
    });
  }, []);

  useEffect(() => {
    adminRequest({
      url: "/api/admin/getrejecteduser",
      method: "GET",
    }).then((response) => {
      setRejecteduser(response.data);
    });
  }, []);


  const userList = showFollowup ? followup : nonfollowup ;

 

  

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

      <div className="container">
        <nav className=" navbar navbar-light bg-light">
          <form className="form-inline ">
            <input
            style={{backgroundColor :'#FFF8DC'}}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              type="button"
              class="navbar-toggler mt-2"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              onClick={() => setShowFollowup(true)}
            >
              Follow-up Users
            </button>

            <button
              type="button"
              class="navbar-toggler mt-2"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              onClick={() => setShowFollowup(false)}
            >
              Non Follow-up Users
            </button>

           
          </form>
        </nav>
      </div>

      <div className="container">
        <div className="row">
          {userList
            ?.filter((users) =>
              search.toLowerCase() === ""
                ? true
                : users.name.toLowerCase().includes(search.toLowerCase())
            )
            ?.map((item) => (
              <ul className="list-group list-group-light" key={item.id}>
                <li className="list-group-item d-flex justify-content-between align-items-center" style={{backgroundColor : '#FFE4C4'}}>
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
            ))}
        </div>
      </div>
    </div>
  );
}

export default UsersList;
