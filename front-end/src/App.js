 
import './App.css';
import { BrowserRouter , Routes , Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./Pages/UserPages/Home"
import Register from './Pages/UserPages/Register';
import Success from './Pages/UserPages/Success';
import AdminLogin from './Pages/AdminPages/AdminLogin';
import UsersList from './Pages/AdminPages/UsersList';

function App() {
  return (
   <BrowserRouter>
   
   <ToastContainer position='top-center'/>

   <Routes>

    <Route exact path='/' element={<Home/>} />


    <Route path='/register' element={<Register/>}/>

    <Route path='/success' element={<Success/>}/>

 


 {/* ADMIN SECTION */}

   <Route path='/admin/login' element={<AdminLogin/>} />


<Route path='/admin/userlist' element={<UsersList/>} />
 

   </Routes>
   
   </BrowserRouter>
  );
}

export default App;
