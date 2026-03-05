import React from 'react';



export default function EmptyEnrolledCourses({ onBrowse = () => {}, suggested = [] }) {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-50 py-5 bg-light">
      <div className="card shadow-sm border-0" style={{ maxWidth: 920, width: '95%' }}>
        <div className="row g-0">
          <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
            {/* Illustration + subtle background */}
            <div className="text-center w-100">
              <div
                style={{
                  width: 220,
                  height: 220,
                  margin: '0 auto 1rem',
                  borderRadius: 16,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
                  boxShadow: '0 8px 30px rgba(23, 63, 121, 0.06)',
                }}
              >
                {/* Simple book stack SVG */}
                <svg width="120" height="120" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="10" width="44" height="8" rx="1.5" fill="#e6f0ff" />
                  <rect x="6" y="22" width="44" height="8" rx="1.5" fill="#d7e9ff" />
                  <rect x="6" y="34" width="44" height="8" rx="1.5" fill="#cbe3ff" />
                  <path d="M54 6H10a2 2 0 00-2 2v2" stroke="#7aa7ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 52h44v2a2 2 0 01-2 2H12a2 2 0 01-2-2v-2z" stroke="#9fc0ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h5 className="mb-1 fw-bold">You are currently not enrolled in any course</h5>
              <p className="text-muted mb-3">Give it a start. Explore our suggested courses and choose the best suited for you</p>

              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <button className="btn btn-primary px-4" onClick={onBrowse}>
                  Browse Courses
                </button>
                <button className="btn btn-outline-secondary px-3" onClick={() => alert('Filters coming soon!')}>
                  Explore Categories
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
            <div>
              <h4 className="mb-2">Tips to get started</h4>
              <ul className="list-unstyled text-muted mb-4">
                <li className="mb-2">• Browse by category: Programming, Design, Business...</li>
                <li className="mb-2">• Filter by level: Beginner — Advanced</li>
                <li className="mb-2">• Try a short course to get momentum</li>
              </ul>

              <h6 className="mb-2">Recommended for you</h6>

              <div className="d-flex gap-2 flex-wrap">
                {suggested.length > 0 ? (
                  suggested.map((s, i) => (
                    <div key={i} className="card p-2 shadow-sm" style={{ minWidth: 160 }}>
                      <div className="d-flex align-items-start">
                        <div style={{ width: 46, height: 46, borderRadius: 8, background: '#f6fbff', display: 'grid', placeItems: 'center', marginRight: 10 }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6h16M4 12h10M4 18h16" stroke="#1b6bff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <div className="fw-semibold">{s.title}</div>
                          <div className="text-muted small">{s.meta}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Default suggestions (if none passed)
                  <>
                    <div className="card p-2 shadow-sm" style={{ minWidth: 160 }}>
                      <div className="fw-semibold">Intro to Python</div>
                      <div className="text-muted small">Beginner • 2 hr</div>
                    </div>
                    <div className="card p-2 shadow-sm" style={{ minWidth: 160 }}>
                      <div className="fw-semibold">UI Design Basics</div>
                      <div className="text-muted small">Beginner • 1.5 hr</div>
                    </div>
                    <div className="card p-2 shadow-sm" style={{ minWidth: 160 }}>
                      <div className="fw-semibold">Productivity Hacks</div>
                      <div className="text-muted small">Short • 45 min</div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 text-end">
                <a href="#" className="small text-decoration-none" onClick={(e)=>{e.preventDefault(); onBrowse();}}>
                  Browse all courses →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small inline styles for subtle animation */}
      <style>{`
        .card { border-radius: 14px; }
        .min-vh-50 { min-height: 60vh; }
        .card .shadow-sm { transition: transform .18s ease, box-shadow .18s ease; }
        .card:hover .shadow-sm { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(17, 48, 123, .08); }
      `}</style>
    </div>
  );
}
