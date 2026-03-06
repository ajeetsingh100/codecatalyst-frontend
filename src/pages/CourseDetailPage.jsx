import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../services/operations/paymentAPI";
import { apiconnector } from "../services/apiconnector";
import CourseContent from "../components/core/CourseDetail/CourseContent";
import Footer from "../components/common/Footer";
import { addToCart } from "../slices/cartSlice";
import ReviewSlider from "../components/core/Catelog/ReviewSlider";

const CourseDetailPage = () => {

  const [courseID,setCourseID] = useState()
  const [courseDetails,setCourseDetails] = useState(null)

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.profile)

  function buyCourse(){
    if(courseDetails){
      createOrder([courseDetails],navigate,dispatch,user)
    }
  }

  async function loadCourseDetails(){
    const response = await apiconnector(
      "POST",
      "https://code-catalyst-backend.onrender.com/api/v1/course/get-course-details",
      {courseID:courseID}
    )
    setCourseDetails(response.data.courseDetails)
  }

  useEffect(()=>{
    setCourseID(location.pathname.split("/").at(-1))
  },[])

  useEffect(()=>{
    if(courseID){
      loadCourseDetails()
    }
  },[courseID])

  function addCourseToCart(){
    dispatch(addToCart(courseDetails))
  }

  return (
    <div>

      {/* HERO */}
      <section className="container-fluid bg-richblack-900 text-white py-5">

        <div className="container">

          <div className="row g-4">

            {/* Course Info */}
            <div className="col-12 col-lg-8 d-flex flex-column gap-3">

              <h2>{courseDetails?.courseName}</h2>

              <div className="fs-5 fw-light">
                {courseDetails?.courseDescription}
              </div>

              {/* bestseller fix */}
              <div className="badge bg-warning text-dark align-self-start">
                Bestseller
              </div>

              <div>
                Created by{" "}
                {courseDetails?.instructor?.firstName}{" "}
                {courseDetails?.instructor?.lastName}
              </div>

              <div className="d-flex flex-wrap gap-4">

                <div>
                  <span className="bi bi-info-circle me-1"></span>
                  Last Updated{" "}
                  {courseDetails?.updatedAt?.split("T")?.[0]}
                </div>

                <div>
                  <span className="bi bi-globe me-1"></span>
                  English
                </div>

              </div>

            </div>

            {/* Purchase Card */}
            <div className="col-12 col-lg-4">

              <div className="sticky-lg-top" style={{top:"90px"}}>

                <div className="card shadow">

                  <img
                    src={courseDetails?.thumbnail}
                    className="card-img-top img-fluid"
                    alt=""
                  />

                  <div className="card-body">

                    <div className="fs-4 fw-bold">
                      ₹{courseDetails?.price}
                    </div>

                  </div>

                  <div className="d-flex flex-column gap-2 px-3 pb-3">

                    <button
                      className="btn btn-outline-primary"
                      onClick={addCourseToCart}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-warning"
                      onClick={buyCourse}
                    >
                      Buy Course
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MAIN CONTENT */}
      <section className="container py-4">

        <div className="row">

          <div className="col-12 col-lg-8 d-flex flex-column gap-4">


            {/* What you will learn */}
            <div className="border border-secondary-subtle p-4">

              <h5>What You'll Learn</h5>

              <ul className="list-unstyled">

                <li className="d-flex gap-3">

                  <span className="bi bi-check-lg"></span>

                  <div>{courseDetails?.whatYouWillLearn}</div>

                </li>

              </ul>

            </div>


            {/* course includes */}
            <div>

              <h5 className="mb-3">This course includes:</h5>

              <ul className="list-unstyled row g-2">

                <li className="col-12 col-md-6">
                  <span className="bi bi-play-circle me-2"></span>
                  {courseDetails?.totalCourseDuration} on-demand videos
                </li>

                <li className="col-12 col-md-6">
                  <span className="bi bi-trophy me-2"></span>
                  Certificate of Completion
                </li>

                <li className="col-12 col-md-6">
                  <span className="bi bi-phone me-2"></span>
                  Access on mobile and TV
                </li>

              </ul>

            </div>


            {/* Course Content */}
            <CourseContent courseDetails={courseDetails}/>


            {/* Requirements */}
            <div>

              <h5>Requirements</h5>

              <ul>

                {courseDetails?.instructions?.map((item,index)=>(
                  <li key={index}>{item}</li>
                ))}

              </ul>

            </div>


            {/* Instructor */}
            <div>

              <h5>Instructor</h5>

              <div className="card border-0 shadow-sm p-3">

                <h6 className="mb-3">

                  <u>
                    {courseDetails?.instructor?.firstName}{" "}
                    {courseDetails?.instructor?.lastName}
                  </u>

                </h6>

                <p className="text-muted">

                  {courseDetails?.instructor?.additionalDetails?.about}

                </p>

                <div className="d-flex gap-4 align-items-center flex-wrap">

                  {/* instructor image fixed size */}
                  <img
                    src={courseDetails?.instructor?.image}
                    alt=""
                    className="rounded-circle"
                    style={{
                      width:"100px",
                      height:"100px",
                      objectFit:"cover"
                    }}
                  />

                  <ul className="list-unstyled mb-0">

                    <li>
                      <span className="bi bi-star-fill me-2"></span>
                      4.7 Instructor Rating
                    </li>

                    <li>
                      <span className="bi bi-award me-2"></span>
                      56,838 Reviews
                    </li>

                    <li>
                      <span className="bi bi-people me-2"></span>
                      333,668 Students
                    </li>

                    <li>
                      <span className="bi bi-play-circle-fill me-2"></span>
                      {courseDetails?.instructor?.courses?.length} Courses
                    </li>

                  </ul>

                </div>

              </div>

            </div>


            {/* Reviews */}
            <div>

              <h5 className="mb-3">Students Reviewed</h5>

              <ReviewSlider course={courseDetails}/>

            </div>

          </div>

        </div>

      </section>


      <Footer/>

    </div>
  )
}

export default CourseDetailPage