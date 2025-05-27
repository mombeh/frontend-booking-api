import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">📅 EasyBook</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
      </>
    )
}
export default Navbar