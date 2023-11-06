import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [graduation, setGraduation] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");

  const handleRegister= async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('/api/user/register', 
      
       {
        name : name,
        graduation: graduation,
        email : email ,
        mobile : mobile ,
        age : age,
        gender : gender ,
        image :image
      })
      console.log(response)

      if (response.data) {

        toast.success("Registered")
      } else {
        toast.error("error registering")
       
      }

      
    } catch (error) {
      toast.error("smething went wrong")
      console.log(error)
    }
  }




  const navigate = useNavigate();
  const { id } = useParams();


 
  return (
    <div>
      <section className="vh-100%" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100%">
            <div className="col-lg-12 col-xl-11">
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
                              onChange={(e)=>{
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
                              onChange={(e)=>{
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
                              onChange={(e)=>{
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
                              onChange={(e)=>{
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
                              onChange={(e)=>{
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

                        <div>
                          <label htmlFor="image" className="text-gray-600">
                            Image
                          </label>
                        
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e)=>{
                              setImage(e.target.value);
                            }}
                          />
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">
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
