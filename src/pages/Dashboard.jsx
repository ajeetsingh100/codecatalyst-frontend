import { Outlet } from "react-router-dom"
import SideBar from "../components/core/Dasboard/SideBar"


function Dashboard(){
    
    return(
        <div className="container-fluid ">
           <div className="row">
                <div className=" col-2 py-0 px-0 "  > 
                    <SideBar/>
               </div> 
                <div className="col-10 border-4 px-0"> 
                    <Outlet/>
                </div>
           </div>
        </div>
    )
}
export default Dashboard