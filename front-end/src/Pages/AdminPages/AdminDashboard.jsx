import React from 'react'
import axios from 'axios'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()




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


        
    </div>
  )
}

export default AdminDashboard