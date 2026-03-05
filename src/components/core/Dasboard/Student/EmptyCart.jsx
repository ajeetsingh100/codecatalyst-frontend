
import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function EmptyCart({
  title = "Your cart is empty",
  message = "Looks like you haven't added anything yet.",
  ctaText = "Start Shopping",
  onShopClick,
}) {
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="row shadow-lg rounded-4 overflow-hidden bg-white" style={{ maxWidth: "900px", width: "100%" }}>

        {/* Illustration Section */}
        <div className="col-md-6 d-flex justify-content-center align-items-center p-4 bg-light border-end">
          <div className="p-4 bg-white rounded-4 shadow-sm">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="Empty Cart"
              className="img-fluid"
              style={{ width: "260px" }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <div className="d-flex align-items-center mb-3">
            <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3" style={{ width: "50px", height: "50px" }}>
              <ShoppingCart size={22} />
            </div>
            <h3 className="m-0 fw-semibold">{title}</h3>
          </div>

          <p className="text-muted mb-4">{message}</p>

          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
              onClick={onShopClick}
            >
              {ctaText}
            </button>

            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => window.location.reload()}
            >
              Browse Deals
            </button>
          </div>

          <small className="text-muted mt-3 d-block">Tip: Add items from the product page or wishlist for later.</small>
        </div>
      </div>
    </div>
  );
}
