import { Link } from "react-router-dom"; // <--- 1. Import Link
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>SUBARU</h3>
          <p>Confidence in Motion.</p>
        </div>

        <div className="footer-section">
          <h4>EXPLORE</h4>
          <ul>
            {/* 2. Update the List Items to use Link */}
            <li><Link to="/About">About</Link></li>
            <li><Link to="/compare">Compare</Link></li>
            <li><Link to="/merch">Merchandise</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>CONTACT</h4>
          <p>concierge@subaru.com</p>
          <p>017 571 7920</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Subaru Corporation. Educational Project.</p>
      </div>
    </footer>
  );
}

export default Footer;