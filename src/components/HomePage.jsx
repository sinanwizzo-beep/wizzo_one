import React, { useState, useMemo, useEffect } from 'react';
import SEO from './SEO';
import StructuredData from './StructuredData';
import ImplementationSection from './ImplementationSection';
import {
  solutions,
  featuredSlugs,
  categoryIcons,
  workflows,
} from '../data/solutionsData';

export default function HomePage({ onNavigateImplementation }) {
  // Navigation, Scroll & Modal States
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Solutions Filter & Search States
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Workspace Interactive Tab State
  const [activeWorkflowTab, setActiveWorkflowTab] = useState('overview');

  const categories = [
    { label: 'All solutions', value: 'all' },
    { label: 'Business', value: 'Business Operations' },
    { label: 'Commerce', value: 'Commerce & Retail' },
    { label: 'Manufacturing & services', value: 'Manufacturing & Services' },
    { label: 'Hospitality', value: 'Travel & Hospitality' },
    { label: 'Institutions', value: 'Institutions & Community' },
    { label: 'Apps & workforce', value: 'Apps & Workforce Tools' },
    { label: 'AI solutions', value: 'AI Solutions' },
  ];

  // Filtered Solutions Calculation
  const filteredSolutions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return solutions.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        !q ||
        [
          item.name,
          item.card,
          item.category,
          item.hero || '',
          item.intro || '',
          item.flow || '',
          JSON.stringify(item.features || []),
        ]
          .join(' ')
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Visible Solutions (6 featured initially if no search & "all", or all matching)
  const isOverview = activeCategory === 'all' && !searchQuery.trim();
  const visibleSolutions = useMemo(() => {
    if (isOverview && !isExpanded) {
      return featuredSlugs
        .map((slug) => solutions.find((s) => s.slug === slug))
        .filter(Boolean);
    }
    return filteredSolutions;
  }, [isOverview, isExpanded, filteredSolutions]);

  const openContactModal = (e) => {
    if (e) e.preventDefault();
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const openSolutionModal = (slug) => {
    const item = solutions.find((s) => s.slug === slug || s.id === slug);
    if (item) {
      setSelectedSolution(item);
    }
  };

  const closeSolutionModal = () => {
    setSelectedSolution(null);
  };

  const handleEcoNodeClick = (label) => {
    setSearchQuery(label);
    setActiveCategory('all');
    setIsExpanded(true);
    const el = document.getElementById('solutions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const resetSearchAndFilter = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setIsExpanded(false);
  };

  const currentWorkflowData = workflows[activeWorkflowTab] || workflows.overview;

  return (
    <div className="home-page-wrapper">
      {/* ═══ SVG ICON LIBRARY DEFS ═══ */}
      <svg
        className="icon-library"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <symbol id="i-grid" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </symbol>
          <symbol id="i-box" viewBox="0 0 24 24">
            <path d="m12 3 9 5v8l-9 5-9-5V8l9-5Zm0 10v8M3 8l9 5 9-5M8 5l9 5" />
          </symbol>
          <symbol id="i-chart" viewBox="0 0 24 24">
            <path d="M4 3v17h17M8 15v-4m5 4V7m5 8V4" />
          </symbol>
          <symbol id="i-layers" viewBox="0 0 24 24">
            <path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />
          </symbol>
          <symbol id="i-phone" viewBox="0 0 24 24">
            <rect x="6" y="2" width="12" height="20" rx="3" />
            <path d="M10 5h4m-3 14h2" />
          </symbol>
          <symbol id="i-users" viewBox="0 0 24 24">
            <circle cx="9" cy="8" r="3" />
            <path d="M3 21v-3a6 6 0 0 1 12 0v3m2-17a3 3 0 0 1 0 6m1 5a5 5 0 0 1 3 5" />
          </symbol>
          <symbol id="i-check" viewBox="0 0 24 24">
            <path d="m5 12 4 4L19 6" />
          </symbol>
          <symbol id="i-search" viewBox="0 0 24 24">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </symbol>
          <symbol id="i-close" viewBox="0 0 24 24">
            <path d="m6 6 12 12M6 18 18 6" />
          </symbol>
          <symbol id="i-file" viewBox="0 0 24 24">
            <path d="M14 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9Zm0 0v7h7M7 13h10M7 17h7" />
          </symbol>
          <symbol id="i-cog" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" />
          </symbol>
        </defs>
      </svg>

      {/* Dynamic SEO & Google Rich Results Structured Data */}
      <SEO
        title="Wizzo.One | One Business · Connected Workflows"
        description="Wizzo.One brings your entire business together. Connect accounts, inventory, CRM, HRMS, production, and custom industry workflows with clarity and precision."
        canonical="/"
        keywords="Wizzo.One, business management software, cloud ERP, accounts software, inventory management, CRM, HRMS, workflow automation, SME software, manufacturing ERP"
        ogImage="/og-image.jpg"
      />
      <StructuredData
        faqs={[
          {
            question: 'What is Wizzo.One?',
            answer:
              'Wizzo.One is a unified cloud business management platform that connects accounts, inventory, production, CRM, HRMS, and specialized industry workflows into one seamless operating ecosystem.',
          },
          {
            question: 'How does Wizzo.One handle multi-department operations?',
            answer:
              'A customer order automatically updates stock, triggers production jobs, reserves raw materials, and initiates an invoice—eliminating disconnected silos and redundant manual entries.',
          },
          {
            question: 'Can Wizzo.One support my specific industry?',
            answer:
              'Yes. Wizzo.One offers tailored solutions for retail & distribution, furniture & manufacturing, hotels & lodges, restaurants, schools & colleges, travel, and logistics.',
          },
          {
            question: 'How do I get started with a demo or trial?',
            answer:
              'You can book an interactive live demo directly through the platform or connect with our solutions team via WhatsApp or phone at +91 90377 03237.',
          },
        ]}
      />

      {/* Ambient Grid Background */}
      <div className="bg-grid" aria-hidden="true" />

      {/* ═══ 1. NAVBAR ═══ */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container container--wide">
          <a href="#" className="nav-logo" id="nav-logo" aria-label="Wizzo.One - One Business Connected Workflows">
            <img
              src="/logo.png"
              alt="Wizzo.One - One Business Connected Workflows"
              className="brand-logo-img"
              width="160"
              height="38"
            />
          </a>
          <div className={`nav-links ${isNavOpen ? 'open' : ''}`} id="navLinks">
            <a href="#ecosystem" onClick={() => setIsNavOpen(false)}>
              Platform
            </a>
            <a href="#solutions" onClick={() => setIsNavOpen(false)}>
              Solutions
            </a>
            <a href="#industries" onClick={() => setIsNavOpen(false)}>
              Industries
            </a>
            <a href="#workspace" onClick={() => setIsNavOpen(false)}>
              Workflows
            </a>
            {/* <a href="#implementation" onClick={() => setIsNavOpen(false)}>
              Implementation
            </a> */}
            <a
              href="#contact"
              onClick={(e) => {
                setIsNavOpen(false);
                openContactModal(e);
              }}
            >
              Contact
            </a>
          </div>
          <div className="nav-actions">
            <button
              type="button"
              className="btn-nav-pill"
              onClick={openContactModal}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="btn-nav-arrow"
              aria-label="Book a Demo"
              onClick={openContactModal}
            >
              <i className="fa-solid fa-arrow-right" />
            </button>
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

      {/* ═══ 2. HERO SECTION (VitalityCare Model - IMAGE 2) ═══ */}
      <section className="hero-vitality" id="hero">
        {/* Ambient Glow Mesh */}
        <div className="hero-glow-mesh" aria-hidden="true">
          <div className="glow-orb glow-cyan-top" />
          <div className="glow-orb glow-lime-right" />
          <div className="glow-orb glow-cyan-left" />
          <div className="hero-grid-pattern" />
        </div>

        {/* Prototype Floating Feature Cards */}
        <div className="float-card float-finance" aria-hidden="true">
          <div className="mini-icon">
            <i className="fa-solid fa-chart-line" />
          </div>
          <span
            className="micro"
            style={{
              fontSize: '0.7rem',
              color: '#727a83',
              margin: '8px 0 4px',
              display: 'block',
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            BUSINESS ESSENTIALS
          </span>
          <strong>Accounts &amp; Finance</strong>
          <div className="mini-divider" />
          <span className="float-small">A clearer view of your numbers.</span>
        </div>

        <div className="float-card float-inventory" aria-hidden="true">
          <div className="floating-label">
            <div className="mini-icon">
              <i className="fa-solid fa-boxes-stacked" />
            </div>
            <span
              className="micro"
              style={{
                fontSize: '0.7rem',
                color: '#727a83',
                fontWeight: 800,
                letterSpacing: '0.08em',
              }}
            >
              INVENTORY
            </span>
          </div>
          <strong>
            Know your stock.
            <br />
            Plan your next move.
          </strong>
          <div className="mini-bars">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Top Headline Group */}
        <div className="hero-header-block">
          <div className="hero-eyebrow">
            <span className="tiny-mark">W</span>
            <span>THE WIZZO ONE ECOSYSTEM</span>
          </div>

          <h1 className="hero-vitality-title">
            Your business.
            <br />
            <span className="cyan-text">One connected</span> ecosystem.
          </h1>

          <p className="hero-vitality-sub">
            Business software. Mobile applications. AI solutions.
            <br />
            One ecosystem for the way your business works.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-hero-cyan"
              onClick={openContactModal}
            >
              Book a demo <i className="fa-solid fa-arrow-right" />
            </button>
            <a href="#solutions" className="btn-hero-outline">
              Explore solutions
            </a>
          </div>

          <div className="hero-note">
            <i className="fa-solid fa-check" />
            <span>Start with what you need. Connect more as you grow.</span>
          </div>
        </div>

        {/* Curved Parabolic Arc with Interactive Nodes */}
        <div className="hero-curve-wrap" id="heroCurveWrap">
          <svg className="hero-curve-svg" viewBox="0 0 1080 190">
            <path className="curve-path-base" d="M 60,30 Q 540,210 1020,30" />
          </svg>

          {/* Node 1: Top-Left (Inventory) */}
          <div
            className="curve-node"
            style={{ left: '6%', top: '16%', cursor: 'pointer' }}
            onClick={() => openSolutionModal('inventory-management')}
          >
            <div className="curve-node-circle">
              <i className="fa-solid fa-boxes-stacked" />
            </div>
            <span className="curve-node-tag">Inventory</span>
          </div>

          {/* Node 2: Mid-Left (Accounts) */}
          <div
            className="curve-node"
            style={{ left: '27%', top: '58%', cursor: 'pointer' }}
            onClick={() => openSolutionModal('accounts-finance')}
          >
            <div className="curve-node-circle">
              <i className="fa-solid fa-chart-line" />
            </div>
            <span className="curve-node-tag">Accounts</span>
          </div>

          {/* Node 3: Center Bottom Apex (SMMS Production) */}
          <div
            className="curve-node active"
            style={{ left: '50%', top: '88%', cursor: 'pointer' }}
            onClick={() => openSolutionModal('smms')}
          >
            <div
              className="curve-node-circle"
              style={{ background: 'var(--cyan)', color: 'var(--ink)' }}
            >
              <i className="fa-solid fa-industry" />
            </div>
            <span
              className="curve-node-tag"
              style={{ color: 'var(--cyan-dark)', fontWeight: 800 }}
            >
              SMMS Production
            </span>
          </div>

          {/* Node 4: Mid-Right (Stay Suite) */}
          <div
            className="curve-node"
            style={{ left: '73%', top: '58%', cursor: 'pointer' }}
            onClick={() => openSolutionModal('stay-suite')}
          >
            <div className="curve-node-circle">
              <i className="fa-solid fa-hotel" />
            </div>
            <span className="curve-node-tag">Stay Suite</span>
          </div>

          {/* Node 5: Top-Right (Travel) */}
          <div
            className="curve-node"
            style={{ left: '94%', top: '16%', cursor: 'pointer' }}
            onClick={() => openSolutionModal('travel-management')}
          >
            <div className="curve-node-circle">
              <i className="fa-solid fa-plane-departure" />
            </div>
            <span className="curve-node-tag">Travel</span>
          </div>
        </div>

        {/* Floating Bottom Pill Dock */}
        <div className="hero-dock">
          <a href="#workspace" className="dock-pill">
            <span className="dock-equalizer">
              <span />
              <span />
              <span />
            </span>
            <span>Connected Workflows</span>
          </a>

          <a href="#solutions" className="dock-pill">
            <i
              className="fa-solid fa-cubes"
              style={{ color: 'var(--brand-green)', fontSize: '0.9rem' }}
            />
            <span>34 Connected Modules</span>
          </a>

          <div className="dock-search-group">
            <div className="dock-thumb-stack">
              <div
                className="dock-thumb-item"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80')",
                  cursor: 'pointer',
                }}
                title="Inventory Management"
                onClick={() => openSolutionModal('inventory-management')}
              />
              <div
                className="dock-thumb-item"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&q=80')",
                  cursor: 'pointer',
                }}
                title="SMMS Manufacturing"
                onClick={() => openSolutionModal('smms')}
              />
              <div
                className="dock-thumb-item"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=120&q=80')",
                  cursor: 'pointer',
                }}
                title="Stay Suite"
                onClick={() => openSolutionModal('stay-suite')}
              />
            </div>
            <div className="dock-search-box">
              <span className="dock-search-dot" />
              <input
                type="text"
                id="heroQuickSearch"
                placeholder="Ask anything / Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsExpanded(true);
                }}
                onFocus={() => {
                  const el = document.getElementById('solutions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. MARQUEE BANNER ═══ */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          <div className="marquee-group">
            <span className="marquee-item">
              SMMS <span className="sep" />
            </span>
            <span className="marquee-item">
              Stay Suite <span className="sep" />
            </span>
            <span className="marquee-item">
              Accounts &amp; Finance <span className="sep" />
            </span>
            <span className="marquee-item">
              Inventory Management <span className="sep" />
            </span>
            <span className="marquee-item">
              Supply Chain (SCM) <span className="sep" />
            </span>
            <span className="marquee-item">
              HRMS <span className="sep" />
            </span>
            <span className="marquee-item">
              Travel Management <span className="sep" />
            </span>
            <span className="marquee-item">
              Booking Management <span className="sep" />
            </span>
            <span className="marquee-item">
              Warehouse Management <span className="sep" />
            </span>
            <span className="marquee-item">
              Van Sales App <span className="sep" />
            </span>
            <span className="marquee-item">
              iOS-Based POS <span className="sep" />
            </span>
          </div>
          <div className="marquee-group" aria-hidden="true">
            <span className="marquee-item">
              SMMS <span className="sep" />
            </span>
            <span className="marquee-item">
              Stay Suite <span className="sep" />
            </span>
            <span className="marquee-item">
              Accounts &amp; Finance <span className="sep" />
            </span>
            <span className="marquee-item">
              Inventory Management <span className="sep" />
            </span>
            <span className="marquee-item">
              Supply Chain (SCM) <span className="sep" />
            </span>
            <span className="marquee-item">
              HRMS <span className="sep" />
            </span>
            <span className="marquee-item">
              Travel Management <span className="sep" />
            </span>
            <span className="marquee-item">
              Booking Management <span className="sep" />
            </span>
            <span className="marquee-item">
              Warehouse Management <span className="sep" />
            </span>
            <span className="marquee-item">
              Van Sales App <span className="sep" />
            </span>
            <span className="marquee-item">
              iOS-Based POS <span className="sep" />
            </span>
          </div>
        </div>
      </div>

      {/* ═══ 4. ECOSYSTEM WHEEL & PLATFORM ARCHITECTURE ═══ */}
      <section className="ecosystem-section section-pad" id="ecosystem">
        <div className="container container--wide">
          <div className="ecosystem-wrapper">
            <div className="eco-visual">
              <div className="eco-hub">
                {/* Ambient Radar Glow & Pulse Rings */}
                <div className="eco-hub-pulse-ring eco-pulse-1" aria-hidden="true" />
                <div className="eco-hub-pulse-ring eco-pulse-2" aria-hidden="true" />
                <div className="eco-hub-pulse-ring eco-pulse-3" aria-hidden="true" />

                {/* Center Hub */}
                <div
                  className="eco-center"
                  onClick={() => {
                    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Click to explore solutions"
                >
                  <div className="eco-center-badge">
                    <span className="eco-center-dot" /> LIVE
                  </div>
                  <span>WIZZO</span>
                  <span>ONE</span>
                </div>

                {/* Rotating Orbit Ring */}
                <div className="eco-ring">
                  <div
                    className="eco-node"
                    style={{ '--i': 0, cursor: 'pointer' }}
                    data-color="accent"
                    data-label="Accounts"
                    onClick={() => handleEcoNodeClick('Accounts')}
                    title="Explore Accounts & Finance"
                  >
                    <div className="eco-node-inner">
                      <i className="fa-solid fa-chart-line" />
                      <span>Accounts</span>
                    </div>
                  </div>
                  <div
                    className="eco-node"
                    style={{ '--i': 1, cursor: 'pointer' }}
                    data-color="sky"
                    data-label="Inventory"
                    onClick={() => handleEcoNodeClick('Inventory')}
                    title="Explore Inventory"
                  >
                    <div className="eco-node-inner">
                      <i className="fa-solid fa-boxes-stacked" />
                      <span>Inventory</span>
                    </div>
                  </div>
                  <div
                    className="eco-node"
                    style={{ '--i': 2, cursor: 'pointer' }}
                    data-color="purple"
                    data-label="Documents"
                    onClick={() => handleEcoNodeClick('Document')}
                    title="Explore Documents"
                  >
                    <div className="eco-node-inner">
                      <i className="fa-solid fa-file-lines" />
                      <span>Documents</span>
                    </div>
                  </div>
                  <div
                    className="eco-node"
                    style={{ '--i': 3, cursor: 'pointer' }}
                    data-color="amber"
                    data-label="Education"
                    onClick={() => handleEcoNodeClick('Education')}
                    title="Explore Education"
                  >
                    <div className="eco-node-inner">
                      <i className="fa-solid fa-graduation-cap" />
                      <span>Education</span>
                    </div>
                  </div>
                  <div
                    className="eco-node"
                    style={{ '--i': 4, cursor: 'pointer' }}
                    data-color="coral"
                    data-label="SMMS"
                    onClick={() => handleEcoNodeClick('SMMS')}
                    title="Explore SMMS Manufacturing"
                  >
                    <div className="eco-node-inner">
                      <i className="fa-solid fa-industry" />
                      <span>SMMS</span>
                    </div>
                  </div>
                  <div
                    className="eco-node"
                    style={{ '--i': 5, cursor: 'pointer' }}
                    data-color="accent"
                    data-label="Commerce"
                    onClick={() => handleEcoNodeClick('Commerce')}
                    title="Explore Commerce"
                  >
                    <div className="eco-node-inner">
                      <i className="fa-solid fa-cart-shopping" />
                      <span>Commerce</span>
                    </div>
                  </div>
                  <div
                    className="eco-node"
                    style={{ '--i': 6, cursor: 'pointer' }}
                    data-color="amber"
                    data-label="Travel"
                    onClick={() => handleEcoNodeClick('Travel')}
                    title="Explore Travel"
                  >
                    <div className="eco-node-inner">
                      <i className="fa-solid fa-plane-departure" />
                      <span>Travel</span>
                    </div>
                  </div>
                  <div
                    className="eco-node"
                    style={{ '--i': 7, cursor: 'pointer' }}
                    data-color="sky"
                    data-label="SCM"
                    onClick={() => handleEcoNodeClick('SCM')}
                    title="Explore SCM"
                  >
                    <div className="eco-node-inner">
                      <i className="fa-solid fa-truck-fast" />
                      <span>SCM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="eco-info">
              <span
                className="section-label"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: 'fit-content',
                }}
              >
                <i className="fa-solid fa-circle-nodes" style={{ color: 'var(--cyan-dark)' }} />
                ONE BUSINESS · CONNECTED WORKFLOWS
              </span>
              <h2 className="eco-info-title">
                Bring every part of your{' '}
                <span className="text-gradient">business closer.</span>
              </h2>
              <p className="eco-info-desc">
                A sale changes your stock. A confirmed order starts production. A
                completed service leads to an invoice. Wizzo One connects these operations,
                helping teams move forward with clarity and fewer disconnected steps.
              </p>

              {/* High-Standard Interactive Feature Cards */}
              <div className="eco-features">
                <div
                  className="eco-feature-card card-core"
                  onClick={() => {
                    setActiveCategory('Business Operations');
                    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Click to view Core Business Management solutions"
                >
                  <div className="eco-feature-icon-box">
                    <i className="fa-solid fa-layer-group" />
                  </div>
                  <div className="eco-feature-body">
                    <div className="eco-feature-header">
                      <h4>Core Business Management</h4>
                      <span className="eco-feature-badge">8 Core Modules</span>
                    </div>
                    <p>
                      Accounts, inventory, CRM, HRMS, documents, assets and supply chain
                      functions provide the foundation for everyday operations.
                    </p>
                  </div>
                  <i className="fa-solid fa-arrow-right eco-feature-arrow" />
                </div>

                <div
                  className="eco-feature-card card-industry"
                  onClick={() => {
                    setActiveCategory('Manufacturing & Services');
                    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Click to view Specialist Industry solutions"
                >
                  <div className="eco-feature-icon-box">
                    <i className="fa-solid fa-industry" />
                  </div>
                  <div className="eco-feature-body">
                    <div className="eco-feature-header">
                      <h4>Specialist Industry Workflows</h4>
                      <span className="eco-feature-badge">Tailored Stages</span>
                    </div>
                    <p>
                      Specialist solutions add the detail your business needs, from
                      manufacturing stages and room bookings to restaurant operations.
                    </p>
                  </div>
                  <i className="fa-solid fa-arrow-right eco-feature-arrow" />
                </div>

                <div
                  className="eco-feature-card card-apps"
                  onClick={() => {
                    setActiveCategory('Apps & Workforce Tools');
                    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Click to view Focused Applications"
                >
                  <div className="eco-feature-icon-box">
                    <i className="fa-solid fa-mobile-screen-button" />
                  </div>
                  <div className="eco-feature-body">
                    <div className="eco-feature-header">
                      <h4>Focused Applications</h4>
                      <span className="eco-feature-badge">Mobile &amp; POS</span>
                    </div>
                    <p>
                      Mobile and task-specific applications extend selected workflows to
                      owners, field teams, stock teams and front-line users.
                    </p>
                  </div>
                  <i className="fa-solid fa-arrow-right eco-feature-arrow" />
                </div>
              </div>
            </div>
          </div>

          {/* 3 Layers Architecture Cards */}
          <div className="layers-grid">
            <div className="layer-card">
              <span className="layer-badge">Layer 01</span>
              <h3>Business Management</h3>
              <p>
                Bring finance, inventory, customers, employees, documents and assets into
                a more organised working environment.
              </p>
              <ul className="layer-list">
                <li>
                  <i className="fa-solid fa-check" /> Accounts &amp; Cloud Finance
                </li>
                <li>
                  <i className="fa-solid fa-check" /> Stock &amp; Warehouse Visibility
                </li>
                <li>
                  <i className="fa-solid fa-check" /> Centralized Workforce Records
                </li>
              </ul>
            </div>

            <div className="layer-card">
              <span className="layer-badge">Layer 02</span>
              <h3>Industry Solutions</h3>
              <p>
                Choose workflows shaped around manufacturing, retail, hospitality,
                education, services and other specialist operations.
              </p>
              <ul className="layer-list">
                <li>
                  <i className="fa-solid fa-check" /> SMMS Production Tracking
                </li>
                <li>
                  <i className="fa-solid fa-check" /> Stay Suite Room Management
                </li>
                <li>
                  <i className="fa-solid fa-check" /> Service &amp; Job Order Routing
                </li>
              </ul>
            </div>

            <div className="layer-card">
              <span className="layer-badge">Layer 03</span>
              <h3>Connected Applications</h3>
              <p>
                Extend selected business tasks to the people doing the work, with focused
                applications for owners, sales teams, and point of sale.
              </p>
              <ul className="layer-list">
                <li>
                  <i className="fa-solid fa-check" /> Executive Owner's App
                </li>
                <li>
                  <i className="fa-solid fa-check" /> Van Sales Field Mobility
                </li>
                <li>
                  <i className="fa-solid fa-check" /> iOS Touch-Optimized POS
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. FIND YOUR SOLUTION ═══ */}
      <section
        className="section solutions-section"
        id="solutions"
        aria-labelledby="solutions-title"
      >
        <div className="container container--wide">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">02 / FIND YOUR SOLUTION</span>
              <h2 id="solutions-title">
                Different needs.
                <br />
                One place to start.
              </h2>
            </div>
            <p>
              Explore the tools that fit your business today—and the workflows you want to
              connect next.
            </p>
          </div>

          <div className="solutions-controls">
            <div
              className="filter-list"
              role="group"
              aria-label="Filter solutions by category"
            >
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  className={`filter ${activeCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.value)}
                  aria-pressed={activeCategory === cat.value}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <label className="solution-search">
              <i className="fa-solid fa-magnifying-glass search-icon-sm" />
              <input
                id="solution-search"
                type="search"
                placeholder="Find a solution"
                aria-label="Search solutions"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>

          {/* Solutions Grid */}
          <div id="solution-grid" className="solution-grid">
            {visibleSolutions.length === 0 ? (
              <div className="empty-state">
                <div
                  style={{
                    fontSize: '2rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem',
                    color: 'var(--ink)',
                  }}
                >
                  Let's find the right fit.
                </h3>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    maxWidth: '460px',
                    margin: '0 auto 1.5rem',
                    lineHeight: 1.6,
                  }}
                >
                  No solutions match this search. Try another term or ask our team about
                  your workflow.
                </p>
                <button
                  className="button-outline"
                  type="button"
                  onClick={resetSearchAndFilter}
                >
                  Show all solutions
                </button>
              </div>
            ) : (
              visibleSolutions.map((item) => (
                <div
                  key={item.slug}
                  className="solution-card"
                  onClick={() => openSolutionModal(item.slug)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${item.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openSolutionModal(item.slug);
                    }
                  }}
                >
                  <div className="solution-icon">
                    <svg className="icon" aria-hidden="true">
                      <use href={`#${categoryIcons[item.category] || 'i-grid'}`} />
                    </svg>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.card}</p>
                  <span className="card-cta">Explore solution</span>
                </div>
              ))
            )}
          </div>

          {/* Results count & View all toggle */}
          <div className="solutions-bottom">
            <p id="result-count" className="result-count" aria-live="polite">
              {!visibleSolutions.length
                ? 'No matching solutions'
                : isOverview && !isExpanded
                  ? `6 featured solutions · ${solutions.length} ways to shape your setup`
                  : `${visibleSolutions.length} solution${visibleSolutions.length === 1 ? '' : 's'
                  } ${activeCategory === 'all'
                    ? 'found'
                    : 'in ' + activeCategory.toLowerCase()
                  }`}
            </p>
            {isOverview && (
              <button
                id="show-all"
                className="button button-outline"
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show 6 featured solutions' : 'View all 39 solutions'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ═══ 6. CONNECTED WORKFLOW WORKSPACE ═══ */}
      <section className="workspace-section section-pad" id="workspace">
        <div className="container container--wide">
          <div
            className="workspace-section-header"
            style={{
              textAlign: 'center',
              maxWidth: '820px',
              margin: '0 auto 3.5rem',
            }}
          >
            <span className="section-label">
              <i className="fa-solid fa-network-wired" /> THE BIGGER PICTURE
            </span>
            <h2 className="section-title">
              Your work, <span className="text-gradient">connected.</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A customer order updates your stock. An approved job starts production. A
              delivered order triggers an invoice. Experience how Wizzo One brings
              everyday operations into a unified workflow.
            </p>
          </div>

          <div className="workspace-shell-outer">
            <div className="workspace-shell">
              <div className="workspace-window">
                <div className="workspace-top">
                  <div className="window-brand">
                    <span className="window-mark">W</span>
                    <span className="window-title">Wizzo One</span>
                    <span className="workspace-label">/ Workspace</span>
                  </div>
                  <span className="preview-label">Illustrative interface</span>
                </div>

                <div className="workspace-content">
                  <div className="workspace-sidebar" id="workspaceSidebar">
                    <button
                      type="button"
                      className={`side-tab ${activeWorkflowTab === 'overview' ? 'active' : ''}`}
                      onClick={() => setActiveWorkflowTab('overview')}
                    >
                      <i className="fa-solid fa-table-cells-large" /> Overview
                    </button>
                    <button
                      type="button"
                      className={`side-tab ${activeWorkflowTab === 'accounts' ? 'active' : ''}`}
                      onClick={() => setActiveWorkflowTab('accounts')}
                    >
                      <i className="fa-solid fa-chart-line" /> Accounts
                    </button>
                    <button
                      type="button"
                      className={`side-tab ${activeWorkflowTab === 'inventory' ? 'active' : ''}`}
                      onClick={() => setActiveWorkflowTab('inventory')}
                    >
                      <i className="fa-solid fa-boxes-stacked" /> Inventory
                    </button>
                    <button
                      type="button"
                      className={`side-tab ${activeWorkflowTab === 'production' ? 'active' : ''}`}
                      onClick={() => setActiveWorkflowTab('production')}
                    >
                      <i className="fa-solid fa-industry" /> Production
                    </button>
                  </div>

                  <div className="workspace-main">
                    <div className="workspace-heading">
                      <div>
                        <span className="micro">THE BIGGER PICTURE</span>
                        <h3 id="workspaceFlowTitle">{currentWorkflowData.title}</h3>
                      </div>
                      <span className="workspace-tag">Example workflow</span>
                    </div>

                    <div className="workspace-steps" id="workspaceSteps">
                      {currentWorkflowData.steps.map((s) => (
                        <div key={s.num} className="step-card">
                          <span className="step-number">{s.num}</span>
                          <div className="step-icon-wrap">
                            <i className={`fa-solid ${s.icon}`} />
                          </div>
                          <strong>{s.title}</strong>
                          <span className={`status ${s.statusClass}`}>{s.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="workspace-badge">
                <span className="badge-symbol">✳</span>
                <span>
                  Built around
                  <br />
                  <strong>your workflow.</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. INDUSTRIES WE SERVE ═══ */}
      <section className="features-section section-pad" id="industries">
        <div className="container container--wide">
          <div className="features-header">
            <span className="section-label">
              <i className="fa-solid fa-briefcase" /> Industries We Serve
            </span>
            <h2 className="section-title">
              Your industry has its{' '}
              <span className="text-gradient">own way of working.</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              The details matter: how an order is confirmed, how work is assigned, how
              stock is handled and how completion is recorded. Wizzo One brings those
              details into a practical software conversation.
            </p>
          </div>

          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fa-solid fa-cart-flatbed" />
              </div>
              <h3>Retail &amp; Distribution</h3>
              <p>
                Bring product movement, sales activity, customer records and financial
                oversight into a more connected working process.
              </p>
              <div className="industry-solutions-tag">
                Relevant:{' '}
                <strong>
                  Inventory, Accounts, Warehouse, SCM, E-Commerce, Van Sales
                </strong>
              </div>
            </div>

            <div className="industry-card">
              <div
                className="industry-icon"
                style={{ background: 'var(--purple-glow)', color: 'var(--purple)' }}
              >
                <i className="fa-solid fa-couch" />
              </div>
              <h3>Furniture &amp; Manufacturing</h3>
              <p>
                Follow a customer order through quotation, job creation, production
                planning, process execution and delivery.
              </p>
              <div className="industry-solutions-tag">
                Relevant: <strong>SMMS, Inventory, Documents, Accounts</strong>
              </div>
            </div>

            <div className="industry-card">
              <div
                className="industry-icon"
                style={{ background: 'var(--amber-glow)', color: 'var(--amber)' }}
              >
                <i className="fa-solid fa-hotel" />
              </div>
              <h3>Hotels, Lodges &amp; Accommodation</h3>
              <p>
                Organise room availability, reservations and guest movement through
                check-in and check-out.
              </p>
              <div className="industry-solutions-tag">
                Relevant: <strong>Stay Suite, Booking Management, Accounts</strong>
              </div>
            </div>

            <div className="industry-card">
              <div
                className="industry-icon"
                style={{ background: 'var(--coral-glow)', color: 'var(--coral)' }}
              >
                <i className="fa-solid fa-utensils" />
              </div>
              <h3>Restaurants &amp; Food Businesses</h3>
              <p>
                Build a clearer connection between order handling, billing and the stock
                processes selected for your operation.
              </p>
              <div className="industry-solutions-tag">
                Relevant: <strong>Restaurant Management, Inventory, iOS POS</strong>
              </div>
            </div>

            <div className="industry-card">
              <div
                className="industry-icon"
                style={{ background: 'var(--sky-glow)', color: 'var(--sky)' }}
              >
                <i className="fa-solid fa-graduation-cap" />
              </div>
              <h3>Schools, Colleges &amp; Training</h3>
              <p>
                Bring institutional administration, people and day-to-day records into a
                structured digital environment.
              </p>
              <div className="industry-solutions-tag">
                Relevant:{' '}
                <strong>Education Management, Attendance, HRMS, Accounts</strong>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-icon">
                <i className="fa-solid fa-van-shuttle" />
              </div>
              <h3>Travel &amp; Transport</h3>
              <p>
                Organise travel bookings, trip activity, transportation assignments and
                related business records.
              </p>
              <div className="industry-solutions-tag">
                Relevant: <strong>Travel Management, Trip, Transportation, Accounts</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8. IMPLEMENTATION & MIGRATION ROADMAP ═══ */}
      {/* <section id="implementation">
        <ImplementationSection onOpenContactModal={openContactModal} />
      </section> */}

      {/* ═══ 9. FOOTER ═══ */}
      <footer className="footer" id="footer">
        <div className="container container--wide">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="footer-logo-link" aria-label="Wizzo.One - One Business Connected Workflows">
                <img
                  src="/logo.png"
                  alt="Wizzo.One - One Business Connected Workflows"
                  className="brand-logo-img footer-logo-img"
                  width="160"
                  height="38"
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
              <a
                href="#solutions"
                onClick={() => openSolutionModal('smms')}
              >
                SMMS Manufacturing
              </a>
              <a
                href="#solutions"
                onClick={() => openSolutionModal('stay-suite')}
              >
                Stay Suite Hospitality
              </a>
              <a
                href="#solutions"
                onClick={() => openSolutionModal('accounts-finance')}
              >
                Accounts &amp; Finance
              </a>
              <a
                href="#solutions"
                onClick={() => openSolutionModal('inventory-management')}
              >
                Inventory &amp; SCM
              </a>
            </div>

            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#ecosystem">Architecture</a>
              <a href="#solutions">All 39 Solutions</a>
              <a href="#workspace">Connected Workflows</a>
              {/* <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                }}
                onClick={() => {
                  if (onNavigateImplementation) onNavigateImplementation();
                }}
              >
                Implementation Roadmap
              </button> */}
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
              <a href="#hero">
                Back to top <i className="fa-solid fa-arrow-up" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ MODAL 1: SOLUTION DETAILS MODAL ═══ */}
      {selectedSolution && (
        <div
          className="modal-backdrop open"
          id="solutionModal"
          onClick={closeSolutionModal}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Close dialog"
              onClick={closeSolutionModal}
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <div id="solutionModalBody">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    className="solution-icon"
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      margin: 0,
                      background: 'var(--cyan-pale)',
                      color: 'var(--cyan-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      className="icon"
                      style={{ width: '24px', height: '24px' }}
                      aria-hidden="true"
                    >
                      <use
                        href={`#${categoryIcons[selectedSolution.category] || 'i-grid'
                          }`}
                      />
                    </svg>
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--cyan-dark)',
                        background: 'var(--cyan-pale)',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        marginBottom: '4px',
                      }}
                    >
                      {selectedSolution.category}
                    </span>
                    <h2
                      style={{
                        fontSize: '1.6rem',
                        color: 'var(--ink)',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                      }}
                    >
                      {selectedSolution.name}
                    </h2>
                  </div>
                </div>
              </div>

              {selectedSolution.hero && (
                <h3
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-hero)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    lineHeight: 1.4,
                  }}
                >
                  {selectedSolution.hero}
                </h3>
              )}

              {selectedSolution.intro && (
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem',
                  }}
                >
                  {selectedSolution.intro}
                </p>
              )}

              {selectedSolution.flow && (
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      color: 'var(--cyan-dark)',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}
                  >
                    Connected Workflow
                  </div>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--ink)',
                      lineHeight: 1.6,
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                    }}
                  >
                    {selectedSolution.flow}
                  </p>
                </div>
              )}

              {selectedSolution.features && selectedSolution.features.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4
                    style={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      marginBottom: '0.65rem',
                      fontWeight: 700,
                    }}
                  >
                    Key Capabilities
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    {selectedSolution.features.map((f, idx) => {
                      const title = Array.isArray(f) ? f[0] : f;
                      const desc = Array.isArray(f) ? f[1] : '';
                      return (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(255,255,255,0.7)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '10px',
                            padding: '1rem',
                          }}
                        >
                          <h5
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              color: 'var(--ink)',
                              marginBottom: '0.25rem',
                            }}
                          >
                            {title}
                          </h5>
                          {desc && (
                            <p
                              style={{
                                fontSize: '0.88rem',
                                color: 'var(--text-muted)',
                                margin: 0,
                                lineHeight: 1.5,
                              }}
                            >
                              {desc}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedSolution.benefit && (
                <div
                  style={{
                    background: 'rgba(16, 197, 220, 0.06)',
                    borderLeft: '3px solid var(--cyan-dark)',
                    borderRadius: '0 8px 8px 0',
                    padding: '0.85rem 1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--ink)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    <strong>Value:</strong> {selectedSolution.benefit}
                  </p>
                </div>
              )}

              {selectedSolution.related && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem',
                      fontWeight: 700,
                    }}
                  >
                    Related In Ecosystem
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {selectedSolution.related.split(';').map((r, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.76rem',
                          padding: '4px 12px',
                          borderRadius: '999px',
                          background: '#ffffff',
                          border: '1px solid #dfe4e8',
                          color: 'var(--text-main)',
                          fontWeight: 500,
                        }}
                      >
                        {r.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    closeSolutionModal();
                    setIsContactModalOpen(true);
                  }}
                >
                  {selectedSolution.cta
                    ? selectedSolution.cta
                    : `Request Demo for ${selectedSolution.name}`}{' '}
                  <i className="fa-solid fa-arrow-right" />
                </button>
                <a
                  href={`https://wa.me/919037703237?text=Hi%20Wizzo%20Technologies%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                    selectedSolution.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ borderColor: '#25D366', color: '#0f5132' }}
                >
                  <i
                    className="fa-brands fa-whatsapp"
                    style={{ color: '#25D366', fontSize: '1.1rem' }}
                  />{' '}
                  WhatsApp
                </a>
                <a href="tel:+919037703237" className="btn-secondary">
                  <i className="fa-solid fa-phone" /> +91 90377 03237
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MODAL 2: DIRECT CONTACT ACCESS DIRECTORY ═══ */}
      {isContactModalOpen && (
        <div
          className="modal-backdrop active open"
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
                Direct lines to our dedicated teams. Reach out directly for sales
                inquiries, live demos, or technical support.
              </p>

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

              {/* Customer Support */}
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

              {/* CEO / Executive Line */}
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

      {/* ═══ FLOATING WHATSAPP BUTTON ═══ */}
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
