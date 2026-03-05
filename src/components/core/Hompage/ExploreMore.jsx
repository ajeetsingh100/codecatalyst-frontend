
import { useState } from "react"
import { HomePageExplore } from "../../../data/homepage-explore"
import CTAButton from "./CTAButton"
const tabsName=[
    'Free',
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
function ExploreMore(){

    const [currentTab,setTabsName]=useState(tabsName[0])
    const [currentCourse,setCurrentCourse]=useState(HomePageExplore[0].courses)
    function setMyCard(element){
        setTabsName(element)
        const activeTab=HomePageExplore.filter((item)=>item.tag===element)
         setCurrentCourse(activeTab[0].courses)
       
    }
return(
    <div>
        <div className="d-flex justify-content-center  gap-3">
        <div className="bg-dark mt-2 text-white d-flex  rounded-5 ">
            {
            tabsName.map((element)=>
                <div className={`btn ${element===currentTab?'btn-warning  text-nowrap text-dark':'btn-dark  text-white text-nowrap'}  flex- rounded-5`} onClick={()=>setMyCard(element)}>{element}</div>
            )
             }   
        </div>
        </div>
        <div className="mt-4 ">
            <div className="d-flex justify-content-between gap-2 flex-column flex-lg-row" style={{height:"13rem"}}>
                {
                currentCourse.map((course, index) => (
                    <div key={course.id || index} 
                        className={`py-2 px-3 ${index === 0 ? "bg-warning" : "bg-dark text-white"}`} >
                            <div>{course.heading}</div>
                            <div className="mt-3">{course.description}</div>
                            <div className="d-flex justify-content-between mt-5">
                                <div><i class="bi bi-bar-chart-fill"></i> {course.level}</div>
                                <div><i class="bi bi-journals"></i> {course.lessionNumber}</div>
                            </div>
                    </div>
                ))}
            </div>
        </div>
            
        <div className="mt-5 d-flex justify-content-center gap-3">
            <CTAButton active={true} link_to={'/signup'}>Explore Full Catalog</CTAButton>
            <CTAButton link_to={'/signup'}>Learn More</CTAButton>
        </div>

        
    </div >
)

}
export default ExploreMore
