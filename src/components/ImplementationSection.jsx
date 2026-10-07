import React from 'react';

// Data definitions for easy maintainability
const PILLARS = [
  {
    id: 1,
    icon: 'fa-solid fa-circle-check',
    text: 'Zero Operation Downtime',
  },
  {
    id: 2,
    icon: 'fa-solid fa-database',
    text: 'Complete Data Integrity',
  },
  {
    id: 3,
    icon: 'fa-solid fa-users-gear',
    text: 'Hands-On Team Training',
  },
  {
    id: 4,
    icon: 'fa-solid fa-headset',
    text: 'Dedicated Migration Engineers',
  },
];

const ROADMAP_STEPS = [
  {
    number: '01',
    title: 'Understand your operation',
    description:
      'We review your current processes, staff responsibilities, existing software or spreadsheets, and the specific operational challenges you want to solve.',
    deliverables:
      'Operational audit, current bottleneck mapping & workflow objectives.',
    delayClass: '',
  },
  {
    number: '02',
    title: 'Define the scope',
    description:
      'Together, we identify the relevant Wizzo One modules, required automation workflows, supported devices (terminals, mobiles, POS) and customisation needs.',
    deliverables:
      'Module blueprint, user access roles, device checklist & milestones.',
    delayClass: 'reveal-delay-1',
  },
  {
    number: '03',
    title: 'Prepare the setup',
    description:
      'Configuration is planned around your agreed business structure. Product catalogs, opening balances, customer records and vendor databases are verified before migration.',
    deliverables:
      'Data cleansing, master dataset import & company system setup.',
    delayClass: 'reveal-delay-2',
  },
  {
    number: '04',
    title: 'Check real working scenarios',
    description:
      'Your team reviews the configured processes using representative business scenarios, testing everyday edge-cases before daily live operations commence.',
    deliverables:
      'Simulated test runs, invoice and billing audits & workflow fine-tuning.',
    delayClass: 'reveal-delay-3',
  },
  {
    number: '05',
    title: 'Train the users',
    description:
      'Targeted training focuses on the specific tasks each department needs to perform, with dedicated time to answer questions and clarify team responsibilities.',
    deliverables:
      'Departmental walkthroughs, user reference guides & practice sessions.',
    delayClass: 'reveal-delay-4',
  },
  {
    number: '06',
    title: 'Support the launch',
    description:
      'We help your staff work smoothly through the transition, standing by with instant technical and operational assistance as Wizzo One enters active production.',
    deliverables:
      'Go-live standby support, priority helpdesk & 30-day post-launch check.',
    delayClass: 'reveal-delay-5',
  },
];

const FAQS = [
  {
    id: 1,
    question: 'How long does a typical implementation take?',
    answer:
      'Depending on the business scale and module count, standard implementations take between 7 to 21 business days. Fast-track deployments for single stores or core accounting can be completed in just a few days.',
    delayClass: '',
  },
  {
    id: 2,
    question: 'Can our existing data be migrated?',
    answer:
      'Yes. We support automated and template-assisted imports for product catalogues, customer ledgers, supplier balances, historical invoices, and raw material inventories from Excel, Tally, or legacy ERPs.',
    delayClass: 'reveal-delay-1',
  },
  {
    id: 3,
    question: 'Will our daily business stop during setup?',
    answer:
      'No. We run parallel setup and testing in a sandbox environment. Your active business continues unaffected until final cutoff, ensuring zero operational downtime or missed customer orders.',
    delayClass: 'reveal-delay-2',
  },
  {
    id: 4,
    question: 'What kind of ongoing support is provided after launch?',
    answer:
      'Our dedicated support engineers assist via direct phone lines, WhatsApp helpdesk, and screen-sharing sessions. Regular updates and user refreshers are provided as your business scales.',
    delayClass: 'reveal-delay-3',
  },
];

export default function ImplementationSection({ onOpenContactModal }) {
  const handleContactClick = (e) => {
    if (onOpenContactModal) {
      e?.preventDefault?.();
      onOpenContactModal();
    }
  };

  return (
    <>
      {/* ═══ 1. HERO SECTION ═══ */}
      <header className="impl-hero-section">
        {/* Ambient Glow Mesh Background */}
        <div className="hero-glow-mesh" aria-hidden="true">
          <div className="glow-orb glow-cyan-top" />
          <div className="glow-orb glow-lime-right" />
          <div className="glow-orb glow-cyan-left" />
          <div className="hero-grid-pattern" />
        </div>

        <div className="container container--wide">
          <span
            className="section-label reveal"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}
          >
            <i className="fa-solid fa-route" style={{ color: 'var(--cyan-dark)' }} />
            IMPLEMENTATION &amp; MIGRATION
          </span>

          <h1 className="impl-hero-title reveal reveal-delay-1">
            A thoughtful start makes{' '}
            <span className="text-gradient">everyday use easier.</span>
          </h1>

          <p className="impl-hero-desc reveal reveal-delay-2">
            Moving to business software is a change in how people work. We help you plan
            that change around your priorities, your existing information and the team
            who will use the system.
          </p>

          {/* Key Assurance Pillars Strip */}
          <div className="impl-pillars-strip reveal reveal-delay-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.id} className="impl-pillar-badge">
                <i className={pillar.icon} />
                <span>{pillar.text}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ═══ 2. 6-STEP ROADMAP SECTION ═══ */}
      <section className="section-pad" style={{ paddingTop: '1rem' }}>
        <div className="container container--wide">
          <div className="split-heading">
            <div>
              <span className="section-label reveal">OUR STRUCTURED PROCESS</span>
              <h2
                className="reveal reveal-delay-1"
                style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', margin: '6px 0 0' }}
              >
                The 6-Step Migration <span className="text-gradient">Roadmap</span>
              </h2>
            </div>
            <p
              className="reveal reveal-delay-2"
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-muted)',
                maxWidth: '420px',
                lineHeight: '1.65',
              }}
            >
              Every migration follows a proven sequence to safeguard your active records
              while tailoring configurations to your everyday operations.
            </p>
          </div>

          {/* 6 Step Cards Grid */}
          <div className="impl-page-grid">
            {ROADMAP_STEPS.map((step) => (
              <div
                key={step.number}
                className={`impl-page-card reveal ${step.delayClass}`.trim()}
              >
                <div className="impl-page-num">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="impl-deliverables">
                  <strong>Key Deliverables:</strong>
                  {step.deliverables}
                </div>
              </div>
            ))}
          </div>

          {/* Banner Callout Card */}
          <div className="impl-banner-card reveal">
            <div className="impl-banner-text">
              <h3>Ready to plan your implementation roadmap?</h3>
              <p>
                Speak with our senior implementation consultants. We will review your
                current systems, establish a clear rollout timeline, and outline
                requirements for a smooth transition.
              </p>
            </div>
            <div className="impl-banner-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={handleContactClick}
              >
                Discuss Implementation <i className="fa-solid fa-arrow-right" />
              </button>
              <a
                href="https://wa.me/919037703237?text=Hi%20Wizzo%20Technologies%2C%20I%20want%20to%20discuss%20the%20implementation%20roadmap."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  borderColor: '#25D366',
                  color: '#0f5132',
                  background: '#ffffff',
                }}
              >
                <i
                  className="fa-brands fa-whatsapp"
                  style={{ color: '#25D366', fontSize: '1.1rem' }}
                />{' '}
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* ═══ 3. FREQUENTLY ASKED QUESTIONS ═══ */}
          <div className="impl-faq-section">
            <div
              className="features-header"
              style={{
                textAlign: 'center',
                maxWidth: '680px',
                margin: '0 auto 2.5rem',
              }}
            >
              <span className="section-label reveal">QUESTIONS &amp; CLARITY</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
              >
                What to expect during <span className="text-gradient">migration</span>
              </h2>
              <p
                className="section-subtitle reveal reveal-delay-2"
                style={{ margin: '6px auto 0' }}
              >
                Answers to common questions regarding deployment timelines, data transition
                and everyday operations.
              </p>
            </div>

            <div className="impl-faq-grid">
              {FAQS.map((faq) => (
                <div
                  key={faq.id}
                  className={`impl-faq-card reveal ${faq.delayClass}`.trim()}
                >
                  <h4>
                    <i className="fa-solid fa-circle-question" /> {faq.question}
                  </h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
