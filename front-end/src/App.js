import "./App.css";
import "../src/Pages/AdminPages/DashBoard.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/UserPages/Home";
import Register from "./Pages/AdminPages/Register";
import Success from "./Pages/UserPages/Success";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import UsersList from "./Pages/AdminPages/UsersList";
import Dashbord from "./Pages/AdminPages/AdminDashboard";
import PublicAdminRoute from "./Pages/AdminPages/AdminPublicRoute";
import ProtectAdminRoute from "./Pages/AdminPages/AdminProtectedRoute";
import SingleUser from "./Pages/AdminPages/UserSinglePage";
import AddFollowUp from "./Pages/AdminPages/FollowUp";
import EditFollowup from "./Pages/AdminPages/EditFollowup";
import Notification from "./Pages/AdminPages/Notification";
import ErrorPage from "./Pages/UserPages/ErrorPage";
import AdminErrorPage from "./Pages/AdminPages/AdminError";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />

      <Routes>
        <Route path="/admin/success" element={<Success />} />

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
          path="/admin/register"
          element={
      
              <Register />

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

        <Route
          path="/admin/notification"
          element={
            <ProtectAdminRoute>
              <Notification />
            </ProtectAdminRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />

        <Route path="/admin/*" element={<AdminErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
