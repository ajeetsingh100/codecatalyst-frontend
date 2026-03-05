import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
   return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{minHeight:"550px"}}>
      <div className="text-center p-5 shadow-lg rounded-4 bg-white" style={{ maxWidth: "450px" }}>
        
        <h1 className="display-1 fw-bold text-primary">404</h1>

        <h4 className="fw-semibold mb-3">Oops! Page Not Found</h4>

        <p className="text-muted">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="error icon"
          className="img-fluid mb-3"
          style={{ width: "150px" }}
        />

        <Link to="/" className="btn btn-primary px-4 py-2 mt-2">
          ⬅ Go Back Home
        </Link>
      </div>
    </div>
  );
};



export default ErrorPage