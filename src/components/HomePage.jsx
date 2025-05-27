import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <>
         {/* Hero Section */}
      <section className="hero">
        <h1>Book Appointments with Ease</h1>
        <p>Your time matters. Let’s make booking stress-free.</p>
        <Link to="/register" className="cta-btn">Get Started</Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>🎯 Simple Booking</h3>
            <p>Book appointments in just a few clicks.</p>
          </div>
          <div className="feature-item">
            <h3>✅ Verified Providers</h3>
            <p>Work with trusted and verified service providers.</p>
          </div>
          <div className="feature-item">
            <h3>⏰ Flexible Time Slots</h3>
            <p>Choose time slots that suit your schedule.</p>
          </div>
        </div>
      </section>
        </>
    )
    
}

export default HomePage