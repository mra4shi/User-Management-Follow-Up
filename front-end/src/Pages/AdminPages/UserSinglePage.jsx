import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { adminRequest } from '../../axios'
import { Link } from 'react-router-dom'

function UserSinglePage() {
  const {id} = useParams()
  const [user , setUser] =useState([])

  useEffect(()=>{
    adminRequest({
      url : `/api/admin/user/${id}`,
      method : 'GET',
    })
    .then((response)=>{
      console.log(response.data.rows[0])
      setUser(response.data.rows[0])
    })
  },[])

  return (
    <div>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <Link to={""} class="navbar-brand">Brand</Link>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
                <Link to={""} class="nav-item nav-link active">Dashboard</Link>
                <Link to={"/admin/userlist"} class="nav-item nav-link">Users</Link>
                <Link to={""} class="nav-item nav-link">Messages</Link>
                <Link to={""} class="nav-item nav-link disabled" tabindex="-1">Reports</Link>
            </div>
            <div class="navbar-nav ms-auto">
                <Link to={"/admin/login"} class="nav-item nav-link">LogOut</Link>
            </div>
        </div>
    </div>
</nav>

<section class="vh-100" style={{backgroundColor :"#eee"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-12 col-xl-4">

        <div class="card" style={{borderRadius:"15%"}}>
          <div class="card-body text-center">
            <div class="mt-3 mb-4">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                class="rounded-circle img-fluid" style={{width :"100px"}} />
            </div>
            <h4 class="mb-2">{user.name}</h4>
            <p class="text-muted mb-4">{user.graduation} <span class="mx-2">|</span> <Link
                to={""}>{user.email}</Link></p>
            <div class="mb-4 pb-2"> 
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-facebook-f fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-twitter fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-skype fa-lg"></i>
              </button>
            </div>
            <button type="button" class="btn btn-primary btn-rounded btn-lg">
              Follow Up
            </button>
            <div class="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p class="mb-2 h5">{user.age}</p>
                <p class="text-muted mb-0">Age</p>
              </div>
              <div class="px-3">
                <p class="mb-2 h5">{user.gender}</p>
                <p class="text-muted mb-0">Gender</p>
              </div>
              <div>
                <p class="mb-2 h5">{user.mobile}</p>
                <p class="text-muted mb-0">Mobile</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default UserSinglePage