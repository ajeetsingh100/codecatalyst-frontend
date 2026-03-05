import React from 'react'
import HighlightText from '../components/core/Hompage/HighlightText'
import banner1 from '../assets/Images/aboutus1.webp'
import banner2 from '../assets/Images/aboutus2.webp'
import banner3 from '../assets/Images/aboutus3.webp'
import banner4 from '../assets/Images/FoundingStory.png'
import ContactForm from '../components/common/ContactForm'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div>
        {/* section-1 */}
        <section className='container d-flex flex-column text-center align-items-center gap-4'>
            <header className='mt-4 w-75'>
                <h2 className=' lh-1 text-title'>Driving Innovation in Online Education for a</h2>
                <h2><HighlightText text={"Brighter Future"} color={"text-success"}/></h2>
                <p className='text-justify text-thin'>Studynotion is at the forefront of driving innvoation in online education. We're passionate about creating a 
                    brighter future by offering cutting-edge courses, leveraging, emerging technologies, and nurturing a vibrant
                    communication.
                </p>
            </header>
            <div className='row row-gap-3 '>
                <div className='col-md-4 col-6'><img src={banner1} alt="" className='img-fluid' loading='lazy'/></div>
                <div className='col-md-4 col-6'><img src={banner2} alt="" className='img-fluid'loading='lazy'/></div>
                <div className='col-md-4 col-6 d-none d-md-block'><img src={banner3} alt="" className='img-fluid'loading='lazy'/></div>
            </div>

        </section>

        {/* section-2 */}
        <section className='container d-flex flex-column align-items-center text-center mt-4'>
            <div className='p-2'>
                <h2 className='text-title '>
                    We are passionate about revolutionizing the way we learn. Our innovative
                    platform <HighlightText text={'combines technology'} color={'text-success'}/>,
                    <HighlightText text={'expertise'} color={'text-warning'}/>, and community create an <HighlightText text={'unpararlled educational experience'} color={'text-primary'}/>.
                </h2>
            </div>
        </section>

        {/* section-3 */}
        <section className='container'>
            <div className='row'>
                <div className="col-6">
                    <div className='fw-bold text-danger fs04'>
                        Our founding Story
                    </div>
                    <div className='mt-4 text-thin'>
                        <div >
                            Our e-learning platform was born out of a shared vision and passion for
                            transforming education. It's all began with a group of educators, technologies,
                            and lifelone learner who recoginized the need for accessible, flexible, and high 
                            quality learning opportunites in a repeadily evolving 
                            digital world.
                        </div>
                        <div className='mt-2 '>
                            As experienced educators, ourselvs, we witnessed firsthand the limitation and challenges of traditional
                            education systems. We believed that educations should not be confined to the  walls of classform restricted by
                            geographical boundaries. We plaform that could bridge these gaps to empower individuals from all walks in life to unlock their full potential
                        </div>

                        
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <img src={banner4} alt=""  className='img-fluid'/>
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <div className='fw-bold text-warning  mt-4'>
                            Our Vision
                        </div>
                        <div className='mt-4 text-thin'>
                            With this vision in mind, we set out on a journey to create an
                            e-learning plafform that would revolutionize the way people
                            learn. Our team of dedicated experts worked tirelessly to 
                            develop a robust and intuittive platform tht combines cutting
                            edge tehnology with engaging content fostering a dynamic and interactive learning experience.
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <div className='text-success fw-bold mt-4 text-thin'>
                            Our Mission
                        </div>
                        <div className='mt-4 text-thin'>
                            Our mission goes beyond just delievering courses online. We
                            wanted to create a vibrant community of learners, where
                            individuals can connect, collaborate, and learn from one
                            another. We believe that knowledge thrives in an environment
                            of sharing and dialogue, and we foster this spirit of 
                            collaboration through forums, live sessions, and networking
                            opportunites.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* section-5 */}
        <section className='container-fluid mt-4 bg-dark'>
            <div className='container py-5 text-white fw-bold fs-4 d-flex justify-content-around'>
                <div>5K Active Students</div>
                <div>10+ Mentors</div>
                <div>200+ Courses</div>
                <div>50+ Awards</div>
            </div>
        </section>
        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default About