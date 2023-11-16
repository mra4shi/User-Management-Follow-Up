import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../AdminPages/popup.css";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [graduation, setGraduation] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [seen, setSeen] = useState(false);

  function togglepop() {
    setSeen(!seen);
  }

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
            navigate("/admin/success");
            toast.success("Submission success");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Email or Mobile Number Already Registered...");
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <br />
      <br />
      <h1 className="flex items-center justify-center">Register</h1>
      <section className="popup">
        <div className="popup-inner ">
          <form className="mt-5" onSubmit={handleRegister}>
              <div className="float-right">
                X{seen ? <Register toggle={togglepop} /> : null}
              </div>

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
              <button type="submit" className="btn btn-primary btn-lg">
                Register
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
