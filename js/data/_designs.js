/* ==========================================================================
   js/data/_designs.js
   Designs section data. Consumed by js/data.js aggregator.

   Portrait mobile (thumbVariant "portrait"):
     gdrive-redesign, cardbank-redesign, clinica-design,
     poea-design-mobile, lume-design.

   Landscape desktop (default):
     chairable-design, pila-pets-design, lynville-design,
     dental-design, poea-design-desktop.
   ========================================================================== */

(function () {
  "use strict";

  window.__portfolioData_designs = [
    {
      id: "gdrive-redesign",
      name: "Google Drive Mobile Re-Design",
      type: "Mobile UI / UX",
      description: "A mobile re-design concept for the Google Drive app, exploring a cleaner folder grid, a simplified bottom navigation, and a more accessible file-management flow. Part of a UI/UX coursework assignment that required selecting an existing app and re-designing its core screens.",
      date: "2025",
      images: [
        "assets/images/designs/gdrive-redesign-1.png",
        "assets/images/designs/gdrive-redesign-2.png",
        "assets/images/designs/gdrive-redesign-3.png",
        "assets/images/designs/gdrive-redesign-4.png",
        "assets/images/designs/gdrive-redesign-5.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/gdrive-redesign-1.png",
      figmaUrl: "https://www.figma.com/design/CaXty4fmgF2vcNu3UIVEFq/google-drive--re-design-?node-id=0-1&t=KGMPRU4dVTsKT3A4-1"
    },
    {
      id: "chairable-design",
      name: "Chairable — E-Commerce Web App",
      type: "Web UI / UX",
      description: "High-fidelity design for Chairable, my first full-stack e-commerce system for furniture and home decor. This was also my first project with a synchronized mobile app — products added to the cart on mobile appear instantly in the web cart, using a shared backend. Though the system wasn't deployed publicly, we presented the working prototype including the mobile-web synchronization feature. The design covers the full user journey: landing, shop, product detail, cart sidebar, product comparison, cart, checkout, and contact.",
      date: "2024",
      images: [
        "assets/images/designs/chairable-1-home.png",
        "assets/images/designs/chairable-2-shop.png",
        "assets/images/designs/chairable-3-product.png",
        "assets/images/designs/chairable-4-cart-sidebar.png",
        "assets/images/designs/chairable-5-comparison.png",
        "assets/images/designs/chairable-6-cart.png",
        "assets/images/designs/chairable-7-checkout.png",
        "assets/images/designs/chairable-8-contact.png"
      ],
      thumb: "assets/images/designs/chairable-1-home.png",
      figmaUrl: "https://www.figma.com/design/RBocDFtirCyUKh9PEgnbVq/chairable?node-id=0-1&t=MpueN9x1vE6B4YOf-1"
    },
    {
      id: "pila-pets-design",
      name: "Pila Pets — Pet & Resident Registry",
      type: "Web UI / UX",
      description: "High-fidelity design for Pila Pets, a barangay pet and resident registry system for Pila, Laguna. The design explores an admin dashboard with live metrics and charts, a searchable pet grid, a resident management table, and a public-facing webpage that tells the community story. The design directly inspired the working CodeIgniter 4 system I later built — you can see the code in the Projects section.",
      date: "2025",
      images: [
        "assets/images/designs/pila-pets-1-dashboard.png",
        "assets/images/designs/pila-pets-2-pets.png",
        "assets/images/designs/pila-pets-3-residents.png",
        "assets/images/designs/pila-pets-4-webpage.png"
      ],
      thumb: "assets/images/designs/pila-pets-1-dashboard.png",
      figmaUrl: "https://www.figma.com/design/agVQI1RvTZctGFOEtc9IRF/PAWS---Pila?node-id=0-1&t=HbXkrsKluCGOjG5O-1"
    },
    {
      id: "cardbank-redesign",
      name: "Card Bank Mobile App Re-Design",
      type: "Mobile UI / UX",
      description: "An academic UI/UX re-design for a fictional digital banking app called Card Bank. The design covers the core user journey — splash and onboarding, sign-in, dashboard, transaction history, transfer flow, and card management. The visual language uses a warm yellow-and-green palette with clean typography to convey approachability and trust.",
      date: "2025",
      images: [
        "assets/images/designs/cardbank-1-splash.png",
        "assets/images/designs/cardbank-2-signin.png",
        "assets/images/designs/cardbank-3-dashboard.png",
        "assets/images/designs/cardbank-4-history.png",
        "assets/images/designs/cardbank-5-transfer.png",
        "assets/images/designs/cardbank-6-card.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/cardbank-1-splash.png",
      figmaUrl: "https://www.figma.com/design/tN6tLGgckMtgt7J9aXAiX7/card-bank-mobile?node-id=0-1&t=sEI2HZaVjThxYZZA-1"
    },
    {
      id: "lynville-design",
      name: "Lynville Homes 8 — HOA Management System",
      type: "Web UI / UX",
      description: "High-fidelity design for a client-driven capstone project — a web-based HOA management system built for Lynville Homes 8. The design went through multiple iterations with the HOA president, my thesis adviser, and a system expert, and covers role-based experiences for Admin, PR Officer, Auditor, Treasurer, and Committee members. This is a mid-development design snapshot; the working system (in the Projects section) includes additional features developed after this design pass, such as application submission and NLP-assisted processing.",
      date: "2025",
      images: [
        "assets/images/designs/lynville-1-signin.png",
        "assets/images/designs/lynville-2-changepassword.png",
        "assets/images/designs/lynville-3-dashboard.png",
        "assets/images/designs/lynville-4-announcements.png",
        "assets/images/designs/lynville-5-activities.png",
        "assets/images/designs/lynville-6-projects.png",
        "assets/images/designs/lynville-7-project-details.png",
        "assets/images/designs/lynville-8-payments.png",
        "assets/images/designs/lynville-9-pr-announcements.png",
        "assets/images/designs/lynville-10-auditor-finances.png"
      ],
      thumb: "assets/images/designs/lynville-3-dashboard.png",
      figmaUrl: "https://www.figma.com/design/PZoNGFQpO3zXCqjacTylce/hoa-management-system?node-id=0-1&t=OgYKoBkJS6Vo8wQv-1"
    },
    {
      id: "dental-design",
      name: "Dental Clinic Management System",
      type: "Web UI / UX",
      description: "UI/UX design for a full dental clinic management platform — designed and led by me as part of a team project with interns. The system serves four roles: Dentist, Patient, Staff, and Admin (plus a Super Admin tier), and covers appointment scheduling, patient records, billing and invoicing, earnings tracking, inventory management, and admin user controls. This was my first experience designing and directing a multi-role enterprise application, coordinating the design system across team members.",
      date: "2025",
      images: [
        "assets/images/designs/dental-1-landing.png",
        "assets/images/designs/dental-2-login.png",
        "assets/images/designs/dental-3-dentist-dashboard.png",
        "assets/images/designs/dental-4-dentist-appointments.png",
        "assets/images/designs/dental-5-dentist-earnings.png",
        "assets/images/designs/dental-6-patient-profile.png",
        "assets/images/designs/dental-7-patient-appointments.png",
        "assets/images/designs/dental-8-staff-patients.png",
        "assets/images/designs/dental-9-staff-billing.png",
        "assets/images/designs/dental-10-admin-users.png"
      ],
      thumb: "assets/images/designs/dental-3-dentist-dashboard.png",
      figmaUrl: "https://www.figma.com/design/nzaFmmLpToDIMR8bhyaoK9/Batch-3-Dental-Clinic?node-id=0-1&t=ZOxxdTbiS3D7HGEK-1"
    },
    {
      id: "clinica-design",
      name: "Clinica — Dental Clinic Mobile App",
      type: "Mobile UI / UX",
      description: "Academic UI/UX exercise: a mobile app design for a dental clinic, produced as a LinkedIn design challenge and graded by my professor. The design covers the full patient journey — splash, onboarding, sign-in, profile setup, appointment booking, confirmation, and medical records — with a focus on clean typography, generous whitespace, and a friendly medical aesthetic. A central part of the exercise was exploring the same core screens across multiple color palettes (brown, green, dark green variants alongside the default blue) to demonstrate a themable design system.",
      date: "2025",
      images: [
        "assets/images/designs/clinica-1-splash.png",
        "assets/images/designs/clinica-2-onboarding.png",
        "assets/images/designs/clinica-3-login.png",
        "assets/images/designs/clinica-4-appointments.png",
        "assets/images/designs/clinica-5-confirmation.png",
        "assets/images/designs/clinica-6-profile-brown.png",
        "assets/images/designs/clinica-7-profile-green.png",
        "assets/images/designs/clinica-8-profile-darkgreen.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/clinica-1-splash.png",
      figmaUrl: "https://www.figma.com/design/7xVr9SpQ1rHjJNbVO9ZvX7/clinic-mobile?node-id=0-1&t=VEOK4a6UgQ00TVaR-1"
    },
    {
      id: "poea-design-desktop",
      name: "POEA Website Redesign — Desktop",
      type: "Web UI / UX",
      description: "Academic UI/UX exercise: a full desktop redesign of the POEA (Philippine Overseas Employment Administration) government website. The redesign restructures information architecture, modernizes the visual language, and makes key services — OFW support, LRA licensing, contact, and agency information — easier to find. The 5 selected pages cover the homepage, both major service categories, contact information, and the agency's mission and functions.",
      date: "2025",
      images: [
        "assets/images/designs/poea-1-frontpage.png",
        "assets/images/designs/poea-2-ofw-services.png",
        "assets/images/designs/poea-3-lra-services.png",
        "assets/images/designs/poea-4-contact.png",
        "assets/images/designs/poea-5-about.png"
      ],
      thumb: "assets/images/designs/poea-1-frontpage.png",
      figmaUrl: "https://www.figma.com/design/Mfm4FYo5bFc6JNC9lug9LH/poea-redesign-web-mobile?node-id=0-1&t=RDaPTR9wy7qfseX0-1"
    },
    {
      id: "poea-design-mobile",
      name: "POEA Website Redesign — Mobile Web",
      type: "Mobile Web UI / UX",
      description: "The mobile web counterpart to the POEA redesign — a responsive adaptation that preserves the same information architecture and content while optimizing for small screens. Shows how the desktop layout collapses gracefully: simplified navigation, stacked content cards, and touch-friendly controls.",
      date: "2025",
      images: [
        "assets/images/designs/poea-6-mobile-frontpage.png",
        "assets/images/designs/poea-7-mobile-services.png",
        "assets/images/designs/poea-8-mobile-ira.png",
        "assets/images/designs/poea-9-mobile-about.png",
        "assets/images/designs/poea-10-mobile-contacts.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/poea-6-mobile-frontpage.png",
      figmaUrl: "https://www.figma.com/design/Mfm4FYo5bFc6JNC9lug9LH/poea-redesign-web-mobile?node-id=0-1&t=RDaPTR9wy7qfseX0-1"
    },
    {
      id: "lume-design",
      name: "Lume — Coffee Shop Mobile App",
      type: "Mobile UI / UX",
      description: "A mobile app design for Lume, a specialty coffee shop. The design covers the full customer journey — splash, immersive hero, home with featured items, search results, product detail with customization, cart, and live order tracking. A central part of the exercise was exploring the same core screens across four named color palettes (Monochrome, Complementary, Analogous, and Triadic) to demonstrate a themable design system grounded in color theory.",
      date: "2025",
      images: [
        "assets/images/designs/lume-1-splash.png",
        "assets/images/designs/lume-2-hero.png",
        "assets/images/designs/lume-3-home.png",
        "assets/images/designs/lume-4-search.png",
        "assets/images/designs/lume-5-product.png",
        "assets/images/designs/lume-6-cart.png",
        "assets/images/designs/lume-7-tracking.png",
        "assets/images/designs/lume-8-home-complimentary.png",
        "assets/images/designs/lume-9-home-triadic.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/lume-1-splash.png",
      figmaUrl: "https://www.figma.com/design/3hoEkYbBu5whMy7hxrMebq/lume-coffee-mobile?node-id=0-1&t=LW9j9BxAVLd7vIMZ-1"
    }
  ];
})();