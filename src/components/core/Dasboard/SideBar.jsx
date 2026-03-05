import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'

const SideBar = () => {
    const {user}=useSelector((state)=>state.profile)
    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
        
   
  return (
    <div>
        <div className=' p-0'>
            <div>
                <ul className='nav flex-column mb-0 '>                            
                    {
                        sidebarLinks.map((link)=>{
                        if(link.type&& user?.accountType!==link.type) return null
                        return (<li  className={`${matchRoute(link.path)?`bg-warning`:`bg-white`} nav-item px-md-4 px-sm-2 px-0  `}><Link to={link.path} class='nav-link' >{link.name}</Link></li>)
                    })}
                    <li className='nav-item px-md-4 px-sm-2 px-0'>
                        <Link to="settings" className='nav-link'>Settings</Link>                        
                    </li>
                    <li onClick={()=>dispatch(logout(navigate))} className='nav-item px-md-4 px-sm-2 px-0'>
                         <Link to='' className='nav-link'>Logout</Link>                   
                    </li>
                </ul>
            </div>           
        </div>
    </div>
  )
}

export default SideBar


 