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
            <li>Models</li>
            <li>Technology</li>
            <li>Motorsports</li>
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