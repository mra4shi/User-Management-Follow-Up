import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [graduation, setGraduation] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

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
            navigate("/success");
            toast.success("Submission success");
          } 
        }).catch((error)=>{
          console.log(error)
          toast.error("Email or Mobile Number Already Registered...");
        })
    } catch (error) {
      toast.error("Something went wrong");
     
    }
  };

  return (
    <div>
      <section className="vh-100%" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100%">
            <div className="col-lg-12 col-xl-11  mt-5">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Register
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleRegister}>
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
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
