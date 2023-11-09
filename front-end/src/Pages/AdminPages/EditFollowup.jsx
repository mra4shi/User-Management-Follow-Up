import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function EditFollowup() {
  const { id } = useParams();
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
    });
  };

  return (
    <div>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link to={""} class="navbar-brand">
            Kentra Edu
          </Link>
          <button
            type="button"
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
              <Link to={"/admin/home"} class="nav-item nav-link active ">
                Dashboard
              </Link>
              <Link to={"/admin/userlist"} class="nav-item nav-link">
                Users
              </Link>
              <Link to={"/admin/notification"} class="nav-item nav-link">
                Notification
              </Link>
             
            </div>
            <div class="navbar-nav ms-auto">
              <button onClick={handleLogout} class="nav-item nav-link">
                LogOut
              </button>
            </div>
          </div>
        </div>
      </nav>


      <div className="container text-center">
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
