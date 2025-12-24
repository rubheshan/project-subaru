import "../css/About.css";

function About() {
  return (
    <section className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <h1>About Subaru</h1>
        <p>
          Built on safety, driven by innovation, and trusted on every journey.
        </p>
      </div>

      {/* INTRO */}
      <div className="about-section">
        <p>
          Subaru is a globally recognized automotive brand known for its
          commitment to safety, performance, and engineering excellence.
          Designed to deliver confidence in every condition, Subaru vehicles
          are built to support both everyday driving and extraordinary
          adventures.
        </p>
      </div>

      {/* MISSION & VALUES */}
      <div className="about-section">
        <h2>Our Mission & Values</h2>
        <div className="about-grid">
          <div className="about-card">
            <h3>Safety First</h3>
            <p>Advanced safety technologies designed to protect every passenger.</p>
          </div>
          <div className="about-card">
            <h3>Engineering Excellence</h3>
            <p>Precision engineering focused on balance, control, and reliability.</p>
          </div>
          <div className="about-card">
            <h3>Built to Last</h3>
            <p>Durable vehicles designed for long-term ownership and trust.</p>
          </div>
        </div>
      </div>

      {/* KEY TECHNOLOGIES */}
      <div className="about-section light">
        <h2>Signature Technologies</h2>
        <div className="about-grid">
          <div className="about-card">
            <h3>Symmetrical All-Wheel Drive</h3>
            <p>
              Provides enhanced stability, traction, and control across all
              driving conditions.
            </p>
          </div>
          <div className="about-card">
            <h3>Boxer Engine</h3>
            <p>
              A low center of gravity design that improves balance and handling.
            </p>
          </div>
          <div className="about-card">
            <h3>EyeSight® Driver Assist</h3>
            <p>
              Advanced driver assistance systems designed to enhance safety and
              awareness.
            </p>
          </div>
        </div>
      </div>

      {/* SAFETY */}
      <div className="about-section">
        <h2>Commitment to Safety</h2>
        <p>
          Safety is at the core of Subaru’s philosophy. Every vehicle is
          engineered with a focus on accident prevention, occupant protection,
          and advanced driver-assistance technologies to help keep drivers and
          passengers safe on the road.
        </p>
      </div>

      {/* SUSTAINABILITY */}
      <div className="about-section light">
        <h2>Sustainability & Responsibility</h2>
        <p>
          Subaru is committed to responsible manufacturing and environmental
          stewardship. By focusing on efficiency, durability, and reduced
          environmental impact, Subaru strives to contribute to a more
          sustainable future.
        </p>
      </div>

      {/* GLOBAL PRESENCE */}
      <div className="about-section">
        <h2>Trusted Worldwide</h2>
        <p>
          Subaru vehicles are trusted by drivers across Asia, Europe, and the
          Americas, supporting a wide range of lifestyles and driving needs.
        </p>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <h2>Discover the Subaru Lineup</h2>
        <p>Explore vehicles designed for confidence, adventure, and safety.</p>
        <button>View Models</button>
      </div>

      {/* DISCLAIMER */} 
      <div className="about-disclaimer">
        <p>
            wtf is this supposed to be rubhy 
        </p>
      </div>

    </section>
  );
}

export default About;
