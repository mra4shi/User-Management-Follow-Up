import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";

function FollowUp() {
  const { id } = useParams();
  // const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    status: "",
  });
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin/login");
  };

  const handleChange = (evt) => {
    const { name , value } = evt.target
    setForm(({
      ...form,
      [name] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form.status);
      const formDataToSend = new FormData();
      formDataToSend.append(form.status,"status");
      console.log(formDataToSend,"sending data");
      const response = await adminRequest({
        url: `/api/admin/follow-up/${id}`,
        method: "POST",
        data: formDataToSend,
       
      });
      if (response.data) {
        console.log(response);
        navigate("/admin/home");

        toast.success("followup success");
      }
    } catch (error) {
      console.log(error);
      toast.error("followup failed");
    }
  };

  return (
    <div class="container">


<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link to={""} class="navbar-brand">
            Brand
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
      <div class="row justify-content-center">
        <div class="col-md-6">
          <section>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="status" className="text-gray-600">
                  Status
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  name="status"
              
                  onChange={handleChange}
                  className="form-control w-full"
                />
              </div>

              <input
                type="submit"
                value="Save"
                className="btn btn-primary btn-block"
              />
              <Link to={`/admin/user/${id}`} className="btn btn-link btn-block">
                Go Back
              </Link>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FollowUp;
