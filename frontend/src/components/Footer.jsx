import "../css/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Subaru</h3>
          <p>
            Designed for safety, performance, and confidence on every journey.
          </p>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>Models</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: rubheshanv@gmail.com</p>
          <p>Phone: 017 571 7920</p>
          <p>Call me</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Subaru. Educational project only.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
