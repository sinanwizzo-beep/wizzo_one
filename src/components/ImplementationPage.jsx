import React, { useState, useEffect } from 'react';
import SEO from './SEO';
import StructuredData from './StructuredData';
import ImplementationSection from './ImplementationSection';

export default function ImplementationPage({ onNavigateHome }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openContactModal = (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  const closeContactModal = () => {
    setIsModalOpen(false);
  };

  const handleHomeClick = (e) => {
    if (e) e.preventDefault();
    if (onNavigateHome) onNavigateHome();
  };

  return (
    <div className="implementation-page-wrapper">
      {/* Dynamic SEO & Structured Data */}
      <SEO
        title="Implementation Roadmap & Migration | Wizzo.One"
        description="Explore Wizzo.One's 6-step implementation and migration methodology. Structured onboarding, continuous team training, and zero business disruption."
        canonical="/implementation"
        keywords="Wizzo.One implementation, ERP migration, software onboarding, business software training, zero downtime migration"
        ogImage="/og-image.jpg"
      />
      <StructuredData
        faqs={[
          {
            question: 'How long does a typical implementation take?',
            answer:
              'Depending on the business scale and module count, standard implementations take between 7 to 21 business days. Fast-track deployments for single stores or core accounting can be completed in just a few days.',
          },
          {
            question: 'Can our existing data be migrated?',
            answer:
              'Yes. We support automated and template-assisted imports for product catalogues, customer ledgers, supplier balances, historical invoices, and raw material inventories from Excel, Tally, or legacy ERPs.',
          },
          {
            question: 'Will our daily business stop during setup?',
            answer:
              'No. We run parallel setup and testing in a sandbox environment. Your active business continues unaffected until final cutoff, ensuring zero operational downtime or missed customer orders.',
          },
          {
            question: 'What kind of ongoing support is provided after launch?',
            answer:
              'Our dedicated support engineers assist via direct phone lines, WhatsApp helpdesk, and screen-sharing sessions. Regular updates and user refreshers are provided as your business scales.',
          },
        ]}
      />

      {/* Ambient Grid Background */}
      <div className="bg-grid" aria-hidden="true" />

      {/* ═══ 1. NAVBAR ═══ */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container container--wide">
          <a
            href="#"
            className="nav-logo"
            id="nav-logo"
            aria-label="Wizzo.One - One Business Connected Workflows"
            onClick={handleHomeClick}
          >
            <img
              src="/logo.png"
              alt="Wizzo.One - One Business Connected Workflows"
              className="brand-logo-img"
              width="160"
              height="38"
            />
          </a>

          <div className={`nav-links ${isNavOpen ? 'open' : ''}`} id="navLinks">
            <a href="#" onClick={handleHomeClick}>Platform</a>
            <a href="#" onClick={handleHomeClick}>Solutions</a>
            <a href="#" onClick={handleHomeClick}>Industries</a>
            <a href="#" onClick={handleHomeClick}>Workflows</a>
            <span
              className="active"
              style={{ color: 'var(--cyan-dark)', fontWeight: 700, padding: '0.5rem 0' }}
            >
              Implementation
            </span>
            <a href="#contact" onClick={openContactModal}>
              Contact
            </a>
          </div>

          <div className="nav-actions">
            <a href="#contact" className="btn-nav-pill" onClick={openContactModal}>
              Book a Demo
            </a>
            <a
              href="#contact"
              className="btn-nav-arrow"
              aria-label="Book a Demo"
              onClick={openContactModal}
            >
              <i className="fa-solid fa-arrow-right" />
            </a>
            <button
              type="button"
              className="nav-toggle"
              id="navToggle"
              aria-label="Toggle navigation"
              style={{ marginLeft: '8px' }}
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ 2. MAIN IMPLEMENTATION SECTION ═══ */}
      <main>
        <ImplementationSection onOpenContactModal={() => setIsModalOpen(true)} />
      </main>

      {/* ═══ 3. FOOTER ═══ */}
      <footer className="footer" id="footer">
        <div className="container container--wide">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="footer-logo-link" aria-label="Wizzo Technologies">
                <img
                  src="/logo.png"
                  alt="Wizzo Technologies"
                  className="brand-logo-img footer-logo-img"
                />
              </a>
              <p>One unified business ecosystem built around your operations.</p>
              <div className="footer-contact-compact">
                <a
                  href="https://wa.me/919037703237?text=Hello%20Wizzo%20Technologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#25D366', fontWeight: 600 }}
                >
                  <i className="fa-brands fa-whatsapp" /> +91 90377 03237
                </a>
                <span className="sep">•</span>
                <a href="https://wizzo.in" target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-globe" /> wizzo.in
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Solutions</h4>
              <a href="/#solutions">SMMS Manufacturing</a>
              <a href="/#solutions">Stay Suite Hospitality</a>
              <a href="/#solutions">Accounts &amp; Finance</a>
              <a href="/#solutions">Inventory &amp; SCM</a>
            </div>

            <div className="footer-col">
              <h4>Platform</h4>
              <a href="/#ecosystem">Architecture</a>
              <a href="/#solutions">All 39 Solutions</a>
              <a href="/#workspace">Connected Workflows</a>
              {/* <a
                href="/implementation"
                style={{ color: 'var(--cyan-dark)', fontWeight: 700 }}
              >
                Implementation Roadmap
              </a> */}
              <a href="#contact" onClick={openContactModal}>
                Contact Us
              </a>
            </div>

            <div className="footer-col footer-col-action">
              <h4>Get Started</h4>
              <p>Ready to connect your business workflows?</p>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={openContactModal}
              >
                Book a Demo <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; 2026 Wizzo Technologies. All rights reserved.</span>
            <div className="footer-bottom-links">
              <a href="#" onClick={handleHomeClick}>
                Back to Home <i className="fa-solid fa-arrow-left" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ 4. CONTACT MODAL ═══ */}
      {isModalOpen && (
        <div
          className="modal-backdrop active"
          id="contactModal"
          onClick={closeContactModal}
        >
          <div
            className="modal-dialog contact-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Close dialog"
              onClick={closeContactModal}
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="contact-modal-header">
              <span
                className="section-label"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.68rem',
                  padding: '3px 10px',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--cyan)',
                    display: 'inline-block',
                  }}
                />
                DIRECT ACCESS DIRECTORY
              </span>
              <h2>
                Let's connect your <span className="text-gradient">business today.</span>
              </h2>
              <p>
                Direct lines to our dedicated teams. Reach out directly for sales inquiries,
                live demos, or technical support.
              </p>

              {/* Quick Action Strip */}
              <div className="contact-quick-strip">
                <a href="mailto:info@wizzo.in" className="quick-pill">
                  <i className="fa-solid fa-envelope" /> info@wizzo.in
                </a>
                <a
                  href="https://wa.me/919037703237?text=Hi%20Wizzo%20Team%2C%20I%20would%20like%20to%20discuss%20Wizzo%20One%20software."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-pill quick-pill-wa"
                >
                  <i className="fa-brands fa-whatsapp" /> +91 90377 03237{' '}
                  <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>(Instant)</span>
                </a>
                <a
                  href="https://wizzo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-pill"
                >
                  <i className="fa-solid fa-globe" /> wizzo.in
                </a>
              </div>
            </div>

            {/* Department Cards Grid */}
            <div className="dept-grid">
              {/* Sales & Demos */}
              <div className="dept-card featured">
                <div className="dept-top">
                  <div className="dept-title-group">
                    <div className="dept-icon cyan">
                      <i className="fa-solid fa-handshake" />
                    </div>
                    <div className="dept-info">
                      <h4>Sales &amp; Demos</h4>
                      <span>Product Walkthroughs &amp; Pricing</span>
                    </div>
                  </div>
                  <span className="dept-badge">FASTEST RESPONSE</span>
                </div>
                <p className="dept-desc">
                  Schedule tailored live walkthroughs and custom module consultations.
                </p>
                <div className="dept-lines">
                  <div className="line-item">
                    <div className="line-detail">
                      <span className="line-tag">Sales Advisory</span>
                      <a href="tel:+917025773237" className="line-phone">
                        +91 70257 73237
                      </a>
                    </div>
                    <div className="line-actions">
                      <a
                        href="tel:+917025773237"
                        className="btn-mini-action call"
                        title="Call Sales Advisory"
                      >
                        <i className="fa-solid fa-phone" />
                      </a>
                      <a
                        href="https://wa.me/917025773237?text=Hello%20Sales%20Team%2C%20I%20want%20to%20book%20a%20Wizzo%20One%20demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-mini-action wa"
                        title="WhatsApp Sales"
                      >
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    </div>
                  </div>
                  <div className="line-item">
                    <div className="line-detail">
                      <span className="line-tag">Enterprise Consultation</span>
                      <a href="tel:+919037703237" className="line-phone">
                        +91 90377 03237
                      </a>
                    </div>
                    <div className="line-actions">
                      <a
                        href="tel:+919037703237"
                        className="btn-mini-action call"
                        title="Call Enterprise Consultation"
                      >
                        <i className="fa-solid fa-phone" />
                      </a>
                      <a
                        href="https://wa.me/919037703237?text=Hello%20Wizzo%20Consultation%2C%20I%20want%20to%20discuss%20a%20demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-mini-action wa"
                        title="WhatsApp Consultation"
                      >
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Support */}
              <div className="dept-card">
                <div className="dept-top">
                  <div className="dept-title-group">
                    <div className="dept-icon blue">
                      <i className="fa-solid fa-laptop-code" />
                    </div>
                    <div className="dept-info">
                      <h4>Technical Support</h4>
                      <span>System &amp; Engineering</span>
                    </div>
                  </div>
                </div>
                <p className="dept-desc">
                  Configuration assistance, server deployments, and API integrations.
                </p>
                <div className="dept-lines">
                  <div className="line-item">
                    <div className="line-detail">
                      <span className="line-tag">Engineering Helpdesk</span>
                      <a href="tel:+917994763501" className="line-phone">
                        +91 7994763501
                      </a>
                    </div>
                    <div className="line-actions">
                      <a
                        href="tel:+917994763501"
                        className="btn-mini-action call"
                        title="Call Tech Support"
                      >
                        <i className="fa-solid fa-phone" />
                      </a>
                      <a
                        href="https://wa.me/917994763501?text=Hi%20Technical%20Support%2C%20I%20need%20assistance."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-mini-action wa"
                        title="WhatsApp Tech Support"
                      >
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Support & Operations */}
              <div className="dept-card">
                <div className="dept-top">
                  <div className="dept-title-group">
                    <div className="dept-icon green">
                      <i className="fa-solid fa-headset" />
                    </div>
                    <div className="dept-info">
                      <h4>Customer Support</h4>
                      <span>Operations &amp; Onboarding</span>
                    </div>
                  </div>
                </div>
                <p className="dept-desc">
                  Operational queries, user onboarding, and continuous team training.
                </p>
                <div className="dept-lines">
                  <div className="line-item">
                    <div className="line-detail">
                      <span className="line-tag">Line 1 · Support Desk</span>
                      <a href="tel:+917994763212" className="line-phone">
                        +91 7994763212
                      </a>
                    </div>
                    <div className="line-actions">
                      <a
                        href="tel:+917994763212"
                        className="btn-mini-action call"
                        title="Call Line 1"
                      >
                        <i className="fa-solid fa-phone" />
                      </a>
                      <a
                        href="https://wa.me/917994763212?text=Hi%20Customer%20Support%20Team"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-mini-action wa"
                        title="WhatsApp Line 1"
                      >
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    </div>
                  </div>
                  <div className="line-item">
                    <div className="line-detail">
                      <span className="line-tag">Line 2 · Operations</span>
                      <a href="tel:+917994234500" className="line-phone">
                        +91 7994234500
                      </a>
                    </div>
                    <div className="line-actions">
                      <a
                        href="tel:+917994234500"
                        className="btn-mini-action call"
                        title="Call Line 2"
                      >
                        <i className="fa-solid fa-phone" />
                      </a>
                      <a
                        href="https://wa.me/917994234500?text=Hi%20Operations%20Support"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-mini-action wa"
                        title="WhatsApp Line 2"
                      >
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    </div>
                  </div>
                  <div className="line-item">
                    <div className="line-detail">
                      <span className="line-tag">Line 3 · Client Services</span>
                      <a href="tel:+918138999621" className="line-phone">
                        +91 81389 99621
                      </a>
                    </div>
                    <div className="line-actions">
                      <a
                        href="tel:+918138999621"
                        className="btn-mini-action call"
                        title="Call Line 3"
                      >
                        <i className="fa-solid fa-phone" />
                      </a>
                      <a
                        href="https://wa.me/918138999621?text=Hi%20Customer%20Support"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-mini-action wa"
                        title="WhatsApp Line 3"
                      >
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* CEO / Executive Leadership */}
              <div className="dept-card">
                <div className="dept-top">
                  <div className="dept-title-group">
                    <div className="dept-icon dark">
                      <i className="fa-solid fa-building-user" />
                    </div>
                    <div className="dept-info">
                      <h4>CEO / Leadership</h4>
                      <span>Executive Office</span>
                    </div>
                  </div>
                </div>
                <p className="dept-desc">
                  Enterprise partnerships, strategic collaborations, and leadership review.
                </p>
                <div className="dept-lines">
                  <div className="line-item">
                    <div className="line-detail">
                      <span className="line-tag">Executive Escalation</span>
                      <a href="tel:+919995166621" className="line-phone">
                        +91 99951 66621
                      </a>
                    </div>
                    <div className="line-actions">
                      <a
                        href="tel:+919995166621"
                        className="btn-mini-action call"
                        title="Call Executive Line"
                      >
                        <i className="fa-solid fa-phone" />
                      </a>
                      <a
                        href="https://wa.me/919995166621?text=Hello%20CEO%20Office%2C%20Wizzo%20Technologies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-mini-action wa"
                        title="WhatsApp Executive Line"
                      >
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ 5. FLOATING WHATSAPP BUTTON ═══ */}
      <a
        href="https://wa.me/919037703237?text=Hello%20Wizzo%20Technologies%2C%20I%20am%20interested%20in%20learning%20more%20about%20Wizzo%20One%20software."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-widget"
        id="whatsappFloat"
        aria-label="Chat with Wizzo Technologies on WhatsApp"
      >
        <div className="whatsapp-pill-badge">
          <span className="whatsapp-status-dot" />
          <span className="whatsapp-pill-text">Chat with us</span>
        </div>
        <div className="whatsapp-circle-btn">
          <div className="whatsapp-sonar-ring ring-1" />
          <div className="whatsapp-sonar-ring ring-2" />
          <div className="whatsapp-btn-core">
            <i className="fa-brands fa-whatsapp" />
          </div>
        </div>
      </a>
    </div>
  );
}
