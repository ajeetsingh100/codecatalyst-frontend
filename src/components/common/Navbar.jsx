import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { useSelector } from 'react-redux'
import ProfileDropdown from './ProfileDropdown'
import { useEffect, useState } from 'react'
import { apiconnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
function Navbar(){
    const {token}=useSelector((state)=>state.auth)
     const {user}=useSelector((state)=>state.profile)
      const {totalItems}=useSelector((state)=>state.cart)
      const [subLinks,setSubLinks]=useState([])
      async function fetchLinks(){
          
           try {
             const result=await apiconnector('GET',categories.CATOGORIES_API)
             console.log(result.data.allCategory)
             setSubLinks(result.data.allCategory)
            
        } catch (error) {
            console.log(error)
           }
        
      }
      useEffect(()=>{
        fetchLinks()
      },[])
      

    const location=useLocation()
    function checkPath(path){
       return matchPath(path,location.pathname)
    }
    
 
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-richblack-800">
                <div className='container'>
                    <Link to='/' className='navbar-brand'><img src={logo} alt='home logo'/></Link>
                    <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navLinks'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id='navLinks'>
                        <ul className='navbar-nav mx-auto  '>
                            {
                                NavbarLinks.map(links=>
                                    links.title==='Catalog'?
                                    <li className='nav-item dropdown'>
                                        <Link  className=' nav-link dropdown-toggle ' data-bs-toggle='dropdown'>{links.title}</Link>
                                        <div className='dropdown-menu'>
                                            {subLinks?.map(item=>
                                                <Link to={`catelog/${item.categoryName}`} className='dropdown-item' >{convertToTitleCase(item.categoryName)}</Link>
                                            )}
                                        </div>
                                    </li>
                                    :
                                    <li className='nav-item'>
                                        <Link to={links.path} className={`nav-link ${checkPath(links.path)?'text-warning':''}`}>{links.title}</Link>
                                    </li>
                                    
                                )
                            }
                           
                        </ul>
                         {
                            user&& user.accountType!=='instructor'&&(
                                
                               <button type="button" class="btn position-relative">
                                    <span className='bi bi-cart text-white '></span>
                                    <span class={`position-absolute top-10 start-60 translate-middle ${totalItems>0?`px-2 py-1`:`p-2`} bg-danger border border-light rounded-circle`} style={{fontSize:"10px"}}>
                                        <span class="visually-hidden">New alerts</span>
                                        {totalItems>0&&totalItems}
                                    </span>
                                </button>
                            )
                        }
                       {

                        token===null?
                        (
                            <div className='d-flex gap-2'>
                                <Link to='/login'>
                                    <div className='btn btn-dark border border-white opacity-50 rounded-3'>Login</div>
                                 </Link>
                                <Link to='/signup'>
                                    <div className='btn btn-dark border border-white opacity-50 rounded-3'>Signup</div>
                                </Link>
                            </div>
                        )
                        :
                        (
                        <ProfileDropdown/>
                        )
                       }

                    </div>
                   
                </div>    
                
            </nav>
        </div>
    )
}
export default Navbar

export const convertToTitleCase=(word)=>{
    let titleWord=word.split('-').map(word=>word.at(0).toUpperCase()+word.slice(1)).join(' ')
    return titleWord
}