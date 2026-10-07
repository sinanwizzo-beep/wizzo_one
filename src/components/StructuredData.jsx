import React, { useEffect } from 'react';

/**
 * Structured Data (JSON-LD) Component for Wizzo.One
 * Injects valid Schema.org structured data (Organization, WebSite, SoftwareApplication, and FAQPage)
 * to qualify for Google Rich Results.
 */
export default function StructuredData({ faqs = [] }) {
  useEffect(() => {
    const siteUrl = 'https://wizzo.one';

    // 1. Organization & Brand Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Wizzo.One',
      alternateName: 'Wizzo Technologies',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/og-image.jpg`,
      description:
        'Wizzo.One is a unified cloud business management ecosystem connecting accounts, inventory, production, CRM, HRMS, and specialized industry operations.',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-90377-03237',
          contactType: 'customer support',
          areaServed: ['IN', 'AE', 'SA', 'QA', 'OM', 'KW'],
          availableLanguage: ['English', 'Malayalam', 'Arabic', 'Hindi'],
        },
      ],
      sameAs: [
        'https://wa.me/919037703237',
        'https://linkedin.com/company/wizzo-technologies',
      ],
    };

    // 2. WebSite Schema
    const webSiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Wizzo.One',
      url: siteUrl,
      description: 'One business platform for connected workflows and enterprise clarity.',
      publisher: {
        '@type': 'Organization',
        name: 'Wizzo.One',
      },
    };

    // 3. SoftwareApplication Schema
    const softwareSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Wizzo.One',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android, Windows, macOS',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Schedule a tailored live demo and trial',
      },
      featureList: [
        'Core Business Accounts & Finance',
        'Real-time Multi-Warehouse Inventory Management',
        'Customer Relationship Management (CRM)',
        'Human Resource Management (HRMS)',
        'Manufacturing & Production Scheduling (SMMS)',
        'Specialist Industry Modules for Retail, Hospitality, Education & Logistics',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '128',
      },
    };

    // 4. FAQPage Schema (if FAQs are present)
    const faqEntities =
      faqs && faqs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }
        : null;

    // Helper to insert or update script tag
    const injectJsonLd = (id, data) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(data);
    };

    injectJsonLd('schema-org', organizationSchema);
    injectJsonLd('schema-website', webSiteSchema);
    injectJsonLd('schema-software', softwareSchema);
    if (faqEntities) {
      injectJsonLd('schema-faq', faqEntities);
    }

    return () => {
      ['schema-org', 'schema-website', 'schema-software', 'schema-faq'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, [faqs]);

  return null;
}
