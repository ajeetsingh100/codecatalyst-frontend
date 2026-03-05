import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer class="bg-dark text-light pt-5 mt-4">
    <div class="container">
      <div class="row">

      
        <div class="col-md-4 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">About Us</h6>
          <p class="fs-6 text-secondary">
            We provide high quality courses for web development, AI & ML,
            and software engineering.
          </p>
        </div>

     
        <div class="col-md-4 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">Quick Links</h6>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="#" class="text-decoration-none text-secondary">Home</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none text-secondary">Courses</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none text-secondary">About</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none text-secondary">Contact</a></li>
          </ul>
        </div>

     
        <div class="col-md-4 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">Contact</h6>
          <ul class="list-unstyled text-secondary">
            <li>Email: support@example.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>

      </div>

      <hr class="border-secondary" />

      
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3">
        <p class="mb-2 mb-md-0 fs-6 text-secondary">
          © 2026 CodeCatalyst. All rights reserved.
        </p>

        <ul class="d-flex gap-3 list-unstyled mb-0">
          <li><a href="#" class="text-secondary text-decoration-none">Privacy</a></li>
          <li><a href="#" class="text-secondary text-decoration-none">Terms</a></li>
          <li><a href="#" class="text-secondary text-decoration-none">Support</a></li>
        </ul>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer