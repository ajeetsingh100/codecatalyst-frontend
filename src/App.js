import { Route,Routes} from "react-router-dom";
import Home from './pages/Home'
import Navbar from "./components/common/Navbar";
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ErrorPage from "./pages/ErrorPage";
import About from './pages/About'
import Dashboard from "./pages/Dashboard";
import EnrolledCourses from "./components/core/Dasboard/Student/EnrolledCourses";
import MyProfile from "./components/core/Dasboard/MyProfile";
import AddCourse from "./components/core/Dasboard/Instructor/AddCourse/AddCourse";
import MyCourses from "./components/core/Dasboard/Instructor/MyCourses";
import Settings from "./components/core/Dasboard/Settings/Settings";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { apiconnector } from "./services/apiconnector";
import Wishlist from "./components/core/Dasboard/Student/Wishlist";
import Catelog from "./pages/Catelog";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseVideo from "./components/core/ViewCourse/CourseVideo";
import ViewCourse from "./components/core/Dasboard/Student/ViewCourse";
import MyDashboard from "./components/core/Dasboard/Instructor/MyDashboard";
import ContactUs from "./pages/ContactUs";

function App() {
  const {user}=useSelector((state)=>state.profile)
  const {token}=useSelector(state=>state.auth)
  const fetchUser=async()=>{
        const response=await apiconnector('GET','https://code-catalyst-wkk9.onrender.com/api/v1/profile/get-user-details')
        console.log(response)
        console.log('app.js',response.data.userDetails)
        localStorage.setItem('user',JSON.stringify(response.data.userDetails))
  }
  useEffect(()=>{
    if(token){
       fetchUser()
    }
  
  },[user])

  return (
    <div >
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar/>



      <Routes>
        <Route path='/' element={<Home/>}/>
	      <Route path='/login' element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path='/view-course/:courseID' element={<ViewCourse/>}>
          <Route path=':sectionID/:index/:subSectionID/' element={<CourseVideo/>}/>
        </Route>
              
        <Route path="/dashboard" element={<Dashboard />} >
          { user&&user.accountType==='student'&&<>
           <Route index element={<MyProfile/>} />
           <Route path="enrolled-courses" element={<EnrolledCourses/>} />
           <Route path='wishlist' element={<Wishlist/>}/>
           <Route path='settings' element={<Settings/>}/>
           
          </>          
          }
          { user &&user.accountType==='instructor'&&<>
           <Route index element={<MyProfile/>} />           
           <Route path='add-course' element={<AddCourse/>}/>
           <Route path='my-dashboard' element={<MyDashboard/>}/>
           <Route path='my-courses' element={<MyCourses/>}/>
           <Route path='settings' element={<Settings/>}/></>
          }
        </Route>
        <Route path='catelog/:categoryName' element={<Catelog/>}/>
        <Route path='course/:courseID' element={<CourseDetailPage/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='update-password/:token' element={<UpdatePassword/>}/>   
        <Route path='verify-email' element={<VerifyEmail/>}/>           
        <Route path="*" element={<ErrorPage />} />
      </Routes>      
    </div>
  );
}

export default App;
