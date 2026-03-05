import { matchPath, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../services/operations/authAPI"
import { Link } from "react-router-dom"
function ProfileDropdown(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
    const {user}=useSelector((state)=>state.profile)
    function handleLogout(){
        dispatch(logout(navigate))
    }
    return(
        <div>
            
            <div class="dropdown">
                <div className='btn dropdown-toggle d-flex gap-1  align-items-center'data-bs-toggle="dropdown">                    
                    <div className=" rounded-5 overflow-hidden" style={{height:"35px", width:"35px"}}><img src={user?.image} className="img-fluid" /></div>
                </div>
                <ul class="dropdown-menu dropdown-menu-dark" >
                    <li class="dropdown-item">{matchRoute('/dashboard')?<Link to='/' className="text-white text-decoration-none">Home</Link>:<Link to='/dashboard' className="text-white text-decoration-none">Dashboard</Link>}</li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#" onClick={handleLogout}><i class="bi bi-box-arrow-left"></i> Logout</a></li>
                </ul>
            </div>
      </div>     
    )
}
export default ProfileDropdown