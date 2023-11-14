import React, { useEffect, useState } from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { adminRequest } from "../../axios";
import Register from "./Register";
import axios from "axios";

function UsersList() {
  const [notificationcount, setNotificationcount] = useState(null);
  const [users, setFollowup] = useState([]);
  const [seen, setSeen] = useState(false);

  function togglepop() {
    setSeen(!seen);
  }
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
      url: "/api/admin/notification",
      method: "GET",
    }).then((response) => {
      setNotificationcount(response.data.notification.length);
    });
  }, []);
  const [searchTerm, setSearchterm] = useState("");
  const [searchResult, setSearchresult] = useState([]);
  const handleSearch = async () => {
    const response = await axios.post("/api/admin/search", { searchTerm });
    setSearchresult(response.data);
    console.log(response.data);
  };

  const [selectedListOption, setSelectedListOption] = useState("");

  const handleListOptionChange = (event) => {
    const value = event.target.value;
    setSelectedListOption(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filteredUsers = selectedListOption
    ? users.slice(0, parseInt(selectedListOption, 10))
    : searchResult.length > 0
    ? searchResult
    : users;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
                <Link class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  <button onClick={togglepop}>Register</button>{" "}
                  {seen ? <Register toggle={togglepop} /> : null}{" "}
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
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchterm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="container">
        <nav className="float-right navbar navbar-light bg-light">
          <label
            htmlFor="countries_multiple"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Select List option
          </label>
          <select
            onChange={handleListOptionChange}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose List</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </nav>
      </div>

      <div className="container">
        <div className="row">
          {searchResult.length > 0
            ? searchResult?.map((item) => (
                <ul className="list-group list-group-light" key={item.id}>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "#FFE4C4" }}
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
                      style={{ backgroundColor: "#FFE4C4" }}
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

          <nav className="float-right navbar navbar-light mt-5 bg-light">
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(filteredUsers.length / itemsPerPage),
              }).map((_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
