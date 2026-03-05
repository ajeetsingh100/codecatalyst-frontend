import { Link } from "react-router-dom"
import HighlightText from '../components/core/Hompage/HighlightText'
import CTAButton from '../components/core/Hompage/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import image1 from'../assets/Images/image1.png'
import ExploreMore from '../components/core/Hompage/ExploreMore'
import Footer from "../components/common/Footer"
import TimelineSection from "../components/core/Hompage/TimelineSection"
import InstructorSection from "../components/core/Hompage/InstructorSection"
function Home(){
    return(
        <div>
            <div className="d-flex container align-items-center flex-column  mt-5 ">
                <Link to='#' className="text-decoration-none text-white fw-bold">
                    <div>
                    <div className="btn btn-dark d-flex rounded-5 fw-bold">
                        <p className="mb-0 ">Become Instructor</p>
                        <span className="bi bi-chevron-right  "></span>
                    </div>
                </div>
                </Link>
                <div className="fs-1 fw-bold text-center">Empower Your Future With <HighlightText text={'Coding Skills'}/></div>
                <div className=' mt-2 text-center text-thin w-75'>With our online coding courses, you can learn at our own pace, form anywhere in the world, and get access to a wealth
                    of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>
                <div className="d-flex gap-4 mt-4">
                <CTAButton active={true} link_to={'/signup'}>Learn More</CTAButton>
                <CTAButton active={false} link_to={'/signup'}>Book a Demo</CTAButton>
             </div>             
                <video className="mt-4 w-75 h-75" src={Banner} autoPlay loop muted></video>
                {/*unlock your coding potential*/}
                <div className=" mt-4 row row-gap-4">
                    <div className="col-12 col-lg-6">
                        <div className="fs-3 fw-bold " >Unlock your <HighlightText text='coding potential'/> with our online courses.</div>
                        <div className="text-thin">Our courses are desinged and taught by industry experts who have years of experience in coding and are 
                            passionate about sharing their knowledge with you.        
                        </div>
                        <div className=" mt-2 d-flex gap-3">
                            <CTAButton active={true} link_to={'/signup'}>Try it Yourself</CTAButton>
                            <CTAButton active={false} link_to={'/signup'}>Learn More</CTAButton>
                        </div>
                    </div>
                        <div className="col-12 col-lg-6 ">
                            <img src={image1} alt=""  className="img-fluid " />
                        </div>
                     <div>

                    </div>
                </div>
                {/*Power of code*/}
                <div className="mt-4 d-flex flex-column container ">
                    <div className="fs-3 fw-bold text-center">Unlock the <HighlightText text='Power of Code'/></div>
                    <div className="text-mute text-center">Learn to build anything you Imagine</div>
                    <ExploreMore/>
                </div>
                <div className="mt-5 mb-2">
                      <div className='row mb-4'>
                    <div className=' col-6 fs-2  '>
                       <div className="">
                             Get the Skills you need for a 
                        <HighlightText color={'text-primary'} text={" Job that is in demand"} />
                       </div>
                    </div>

                    <div className='col-6 d-flex flex-column gap-3 '>
                        <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>

                </div>
                    <TimelineSection/>
                </div>  
                <div>
                    <InstructorSection/>
                </div>           
             </div>
             <Footer/>
        </div>
    )
}
export default Home