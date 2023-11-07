import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/UserPages/Home";
import Register from "./Pages/UserPages/Register";
import Success from "./Pages/UserPages/Success";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import UsersList from "./Pages/AdminPages/UsersList";
import Dashbord from "./Pages/AdminPages/AdminDashboard";
import PublicAdminRoute from "./Pages/AdminPages/AdminPublicRoute";
import ProtectAdminRoute from "./Pages/AdminPages/AdminProtectedRoute";
import SingleUser from "./Pages/AdminPages/UserSinglePage";
import AddFollowUp from "./Pages/AdminPages/FollowUp";
import EditFollowup from "./Pages/AdminPages/EditFollowup";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/success" element={<Success />} />

        {/* ADMIN SECTION */}

        <Route
          path="/admin/login"
          element={
            <PublicAdminRoute>
              <AdminLogin />
            </PublicAdminRoute>
          }
        />

        <Route
          path="/admin/userlist"
          element={
            <ProtectAdminRoute>
              <UsersList />
            </ProtectAdminRoute>
          }
        />

        <Route
          path="/admin/home"
          element={
            <ProtectAdminRoute>
              <Dashbord />
            </ProtectAdminRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectAdminRoute>
              <SingleUser />
            </ProtectAdminRoute>
          }
        />

        <Route
          path="/admin/follow-up/:id"
          element={
            <ProtectAdminRoute>
              <AddFollowUp />
            </ProtectAdminRoute>
          }
        />

        <Route
          path="/admin/followup-edit/:id"
          element={
            <ProtectAdminRoute>
              <EditFollowup />
            </ProtectAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
