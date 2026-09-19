// Bilingual content for internal pages redesigned in the HomePage visual language.
// Source of truth for services/prices: docs/optimantra-services.md

export interface Feature { icon: string; title: string; body: string }
export interface Card { icon: string; title: string; body: string; href?: string }
export interface Step { title: string; body: string }
export interface Faq { q: string; a: string }
export interface TeamMember { name: string; cred: string; bio: string }
export interface RelatedLink { label: string; href: string }

export interface ServiceContent {
  hero: { eyebrow: string; title: string; lead: string; badges: string[]; note: string; image: string; imageAlt: string };
  intro: { heading: string; paras: string[] };
  services: { eyebrow: string; title: string; lead: string; cards: Feature[] };
  program: { eyebrow: string; title: string; price: string; cadence: string; body: string; bullets: string[]; note: string };
  integrated: { eyebrow: string; title: string; lead: string; cards: Card[] };
  why: { eyebrow: string; title: string; lead: string; features: Feature[]; points: string[] };
  team: { eyebrow: string; title: string; lead: string; members: TeamMember[] };
  steps: { eyebrow: string; title: string; items: Step[] };
  faq: { eyebrow: string; title: string; items: Faq[] };
  area: { eyebrow: string; title: string; lead: string; places: string[]; transportTitle: string; transportBody: string; transportAlt: string };
  related: { title: string; links: RelatedLink[] };
  cta: { title: string; lead: string };
}

const PHONE = "(813) 443-5370";

export const servicePages: Record<string, { en: ServiceContent; es: ServiceContent }> = {
  "primary-care": {
    en: {
      hero: {
        eyebrow: "Primary Care",
        title: "Your local primary care provider in Tampa",
        lead: "Extended visits, chronic condition management, and preventive care - coordinated with rehabilitation and wellness services, all under one roof in Tampa.",
        badges: ["Licensed providers", "Bilingual EN/ES", "Same-day visits"],
        note: "Most insurance accepted · Medicare · Free transportation for eligible patients",
        image: "/images/comprehensive-primary-care-that-works-with-your-body.webp",
        imageAlt: "A primary care provider greeting a patient at Palm Wellness Center in Tampa",
      },
      intro: {
        heading: "Primary care that sees the whole picture",
        paras: [
          "Palm Wellness Center provides integrated primary care that connects your everyday health, prevention, and chronic care with rehabilitation and wellness services - so nothing falls through the cracks.",
          "Visits are unhurried. Your first appointment is typically a full hour and follow-ups run 30-45 minutes, so your provider has time to listen, explain, and build a plan with you.",
        ],
      },
      services: {
        eyebrow: "Our Primary Care Services",
        title: "Comprehensive care from one trusted team",
        lead: "From everyday illness to long-term condition management - in person or by telehealth.",
        cards: [
          { icon: "stethoscope", title: "Everyday health needs", body: "Evaluation and treatment for respiratory illness, ear infections, sore throats, urinary symptoms, minor injuries, and other common concerns." },
          { icon: "activity", title: "Chronic condition management", body: "Coordinated care for high blood pressure, high cholesterol, type 2 diabetes, thyroid disorders, asthma, and COPD - with regular monitoring and adjustments." },
          { icon: "shield", title: "Preventive care & wellness exams", body: "Annual physicals, screenings, immunizations, and lifestyle guidance to help you stay ahead of illness." },
          { icon: "clipboard", title: "Diagnostic testing & lab coordination", body: "Blood panels, cholesterol, diabetes, thyroid, and hormone testing - ordered, interpreted, and explained in a clear plan." },
          { icon: "pill", title: "Prescription management", body: "Renewals, medication safety reviews, refill coordination, and adjustments as your needs change." },
        ],
      },
      program: {
        eyebrow: "Membership",
        title: "Primary care without the rush",
        price: "$99",
        cadence: "to start, then $39/month",
        body: "One simple membership for patients who want extended visits, same-day access, and a provider who knows them by name. No long-term contract.",
        bullets: [
          "Extended, unhurried visits",
          "Same-day & next-day appointments",
          "Direct provider messaging",
          "Chronic condition management",
          "Preventive care & wellness exams",
          "Lab coordination with discounted partner pricing",
        ],
        note: "Not ready to join? Office visits are $39, new patient visits $65, and follow-ups $59.",
      },
      integrated: {
        eyebrow: "Integrated Wellness",
        title: "More than primary care, under one roof",
        lead: "Because your health is connected, so is our care.",
        cards: [
          { icon: "scale", title: "Medical Weight Loss", body: "Physician-supervised programs with GLP-1 medications when appropriate, nutrition guidance, and ongoing monitoring.", href: "/medical-weight-loss/" },
          { icon: "drop", title: "IV Therapy & Injections", body: "Medically supervised infusions and vitamin injections - Beauty IV, Mayer Signature IV, and a weekly NAD+ protocol.", href: "/iv-therapy/" },
          { icon: "video", title: "Telemedicine", body: "Follow-ups, medication management, lab reviews, and chronic care from anywhere in Florida.", href: "/primary-care/telemedicine/" },
        ],
      },
      why: {
        eyebrow: "Why Integrated Care",
        title: "Coordinated care, not fragmented visits",
        lead: "When primary care is coordinated with rehabilitation and wellness services, your providers share one plan, one record, and one team.",
        features: [
          { icon: "link", title: "One coordinated team", body: "Primary care, chiropractic, and physical therapy working from a shared plan." },
          { icon: "car", title: "Free transportation", body: "Ride assistance to and from appointments for eligible patients across Tampa Bay." },
          { icon: "languages", title: "Bilingual, always", body: "Care in English and Spanish - no interpreter needed." },
        ],
        points: [
          "One medical record across services",
          "Referrals coordinated across Tampa Bay",
          "Medications and lab results reviewed together",
          "Physician-supervised care",
          "Extended visits that run on time",
          "Follow-up that actually follows up",
        ],
      },
      team: {
        eyebrow: "Meet Your Medical Team",
        title: "Licensed providers who know you by name",
        lead: "Physician-supervised care, delivered by a bilingual team.",
        members: [
          { name: "Leivys C. Marsall", cred: "PA, ACN - Board-Certified Physician Assistant", bio: "Specializes in primary care, preventive medicine, and medical weight loss. Fluent in English and Spanish." },
          { name: "Dr. Arnaldo V. Orellana-Molina", cred: "MD - Supervising Physician", bio: "Provides medical oversight that ensures safe, guideline-aligned care across every service." },
        ],
      },
      steps: {
        eyebrow: "How to Get Started",
        title: "Three simple steps",
        items: [
          { title: "Call or book online", body: `Call ${PHONE} or schedule online 24/7. Most insurance plans and Medicare are accepted.` },
          { title: "Your first visit", body: "A comprehensive health history review, evaluation, and a personalized care plan - about an hour with your provider." },
          { title: "Ongoing partnership", body: "Regular follow-ups, medication management, lab monitoring, and coordination with our rehabilitation team." },
        ],
      },
      faq: {
        eyebrow: "FAQ",
        title: "Frequently asked questions",
        items: [
          { q: "Do I need a referral to see a primary care provider?", a: "Often no referral is required. Some insurance and Medicare plans may request one from your existing provider - our team can verify your coverage and coordinate it." },
          { q: "What should I bring to my first appointment?", a: "A valid ID, your insurance card, a current medication list, and any relevant medical records. If you have recent labs or imaging, we can review them during your visit." },
          { q: "Do you accept my insurance?", a: `We accept most major insurance plans, including Medicare. Call ${PHONE} to verify your specific coverage before your visit.` },
          { q: "Can I see my provider by telemedicine?", a: "Yes - telemedicine visits are available throughout Florida for follow-ups, medication management, lab review, and chronic care monitoring." },
          { q: "How long are appointments?", a: "Initial primary care visits are typically 60 minutes and follow-ups 30-45 minutes, so your provider has time to listen and explain." },
          { q: "What if I need specialist care?", a: "Your provider coordinates referrals to trusted specialists across Tampa Bay and ensures continuity of care." },
        ],
      },
      area: {
        eyebrow: "Service Area",
        title: "Proudly serving Tampa and nearby communities",
        lead: "Centrally located on W Linebaugh Ave, minutes from across Hillsborough County.",
        places: ["Seminole Heights", "Forest Hills", "Carrollwood", "Town 'N' Country", "Temple Terrace", "Brandon", "Westchase", "University"],
        transportTitle: "Need a ride? We've got you covered.",
        transportBody: "Free transportation to and from appointments for eligible patients across the Tampa Bay area. Just ask when you call or book - we'll help coordinate your visit.",
        transportAlt: "Courtesy transportation vehicle for patients in Tampa Bay",
      },
      related: {
        title: "Related services",
        links: [
          { label: "Medical Weight Loss", href: "/medical-weight-loss/" },
          { label: "IV Therapy", href: "/iv-therapy/" },
          { label: "Physical Rehabilitation", href: "/physical-rehabilitation/" },
          { label: "Chiropractic Care", href: "/chiropractor/" },
          { label: "Slip and Fall Treatment", href: "/slip-and-fall-injury-treatment/" },
          { label: "Massage Therapy", href: "/massage-therapy/" },
        ],
      },
      cta: {
        title: "Take the first step toward feeling better.",
        lead: "Same-day and next-day appointments available. Most insurance accepted, Medicare included.",
      },
    },
    es: {
      hero: {
        eyebrow: "Atención Primaria",
        title: "Tu proveedor de atención primaria en Tampa",
        lead: "Consultas extendidas, manejo de enfermedades crónicas y atención preventiva - coordinadas con rehabilitación y bienestar, todo bajo un mismo techo en Tampa.",
        badges: ["Proveedores licenciados", "Bilingüe EN/ES", "Citas el mismo día"],
        note: "Aceptamos la mayoría de seguros · Medicare · Transporte gratis para pacientes elegibles",
        image: "/images/comprehensive-primary-care-that-works-with-your-body.webp",
        imageAlt: "Proveedor de atención primaria recibiendo a un paciente en Palm Wellness Center en Tampa",
      },
      intro: {
        heading: "Atención primaria que ve el panorama completo",
        paras: [
          "Palm Wellness Center ofrece atención primaria integrada que conecta tu salud diaria, la prevención y el manejo de enfermedades crónicas con rehabilitación y bienestar - para que nada quede sin atender.",
          "Las consultas son sin prisas. La primera cita suele durar una hora completa y los seguimientos entre 30 y 45 minutos, para que tu proveedor tenga tiempo de escucharte, explicarte y crear un plan contigo.",
        ],
      },
      services: {
        eyebrow: "Nuestros Servicios de Atención Primaria",
        title: "Atención integral de un solo equipo de confianza",
        lead: "Desde enfermedades comunes hasta el manejo de condiciones a largo plazo - en persona o por telemedicina.",
        cards: [
          { icon: "stethoscope", title: "Necesidades de salud diarias", body: "Evaluación y tratamiento de enfermedades respiratorias, infecciones de oído, dolor de garganta, síntomas urinarios, lesiones menores y otras molestias comunes." },
          { icon: "activity", title: "Manejo de enfermedades crónicas", body: "Atención coordinada para presión alta, colesterol alto, diabetes tipo 2, tiroides, asma y EPOC - con monitoreo y ajustes regulares." },
          { icon: "shield", title: "Atención preventiva y exámenes", body: "Chequeos anuales, pruebas de detección, vacunas y orientación de estilo de vida para mantenerte un paso adelante." },
          { icon: "clipboard", title: "Pruebas diagnósticas y laboratorios", body: "Paneles de sangre, colesterol, diabetes, tiroides y hormonas - ordenados, interpretados y explicados en un plan claro." },
          { icon: "pill", title: "Manejo de medicamentos y recetas", body: "Renovaciones, revisión de seguridad de medicamentos, coordinación de recetas y ajustes según tus necesidades." },
        ],
      },
      program: {
        eyebrow: "Membresía",
        title: "Atención primaria sin prisas",
        price: "$99",
        cadence: "para comenzar y luego $39/mes",
        body: "Una membresía simple para pacientes que quieren consultas extendidas, acceso el mismo día y un proveedor que los conoce por su nombre. Sin contrato a largo plazo.",
        bullets: [
          "Consultas extendidas y sin prisas",
          "Citas el mismo día y al día siguiente",
          "Mensajería directa con tu proveedor",
          "Manejo de enfermedades crónicas",
          "Atención preventiva y chequeos",
          "Coordinación de laboratorios con precios de socio",
        ],
        note: "¿Aún no quieres ser socio? Las consultas de oficina son $39, paciente nuevo $65 y seguimiento $59.",
      },
      integrated: {
        eyebrow: "Bienestar Integrado",
        title: "Más que atención primaria, bajo un mismo techo",
        lead: "Como tu salud está conectada, nuestra atención también lo está.",
        cards: [
          { icon: "scale", title: "Pérdida de Peso Médica", body: "Programas supervisados por médicos con medicamentos GLP-1 cuando corresponde, guía nutricional y seguimiento continuo.", href: "/es/perdida-de-peso-medica/" },
          { icon: "drop", title: "Terapia IV e Inyecciones", body: "Infusiones e inyecciones de vitaminas supervisadas médicamente - Beauty IV, Mayer Signature IV y NAD+ semanal.", href: "/es/terapia-iv/" },
          { icon: "video", title: "Telemedicina", body: "Seguimientos, manejo de medicamentos, revisión de laboratorios y cuidado crónico desde cualquier lugar de Florida.", href: "/es/atencion-primaria/telemedicina/" },
        ],
      },
      why: {
        eyebrow: "Por Qué la Atención Integrada",
        title: "Atención coordinada, no visitas aisladas",
        lead: "Cuando la atención primaria se coordina con rehabilitación y bienestar, tus proveedores comparten un plan, un expediente y un equipo.",
        features: [
          { icon: "link", title: "Un equipo coordinado", body: "Atención primaria, quiropráctica y fisioterapia trabajando desde un mismo plan." },
          { icon: "car", title: "Transporte gratis", body: "Ayuda de transporte de ida y vuelta a las citas para pacientes elegibles en Tampa Bay." },
          { icon: "languages", title: "Siempre bilingüe", body: "Atención en inglés y español - sin necesidad de intérprete." },
        ],
        points: [
          "Un expediente médico en todos los servicios",
          "Referidos coordinados en Tampa Bay",
          "Medicamentos y laboratorios revisados en conjunto",
          "Atención supervisada por médicos",
          "Consultas extendidas que empiezan a tiempo",
          "Seguimiento que de verdad da seguimiento",
        ],
      },
      team: {
        eyebrow: "Nuestro Equipo Médico",
        title: "Proveedores licenciados que te conocen por tu nombre",
        lead: "Atención supervisada por médicos, brindada por un equipo bilingüe.",
        members: [
          { name: "Leivys C. Marsall", cred: "PA, ACN - Asistente Médica Certificada", bio: "Especializada en atención primaria, medicina preventiva y pérdida de peso médica. Habla inglés y español." },
          { name: "Dr. Arnaldo V. Orellana-Molina", cred: "MD - Médico Supervisor", bio: "Brinda supervisión médica que garantiza una atención segura y alineada con las guías clínicas." },
        ],
      },
      steps: {
        eyebrow: "Cómo Comenzar",
        title: "Tres pasos simples",
        items: [
          { title: "Llama o reserva en línea", body: `Llama al ${PHONE} o agenda en línea 24/7. Aceptamos la mayoría de seguros y Medicare.` },
          { title: "Tu primera visita", body: "Revisión completa de tu historial de salud, evaluación y un plan personalizado - aproximadamente una hora con tu proveedor." },
          { title: "Acompañamiento continuo", body: "Seguimientos regulares, manejo de medicamentos, monitoreo de laboratorios y coordinación con nuestro equipo de rehabilitación." },
        ],
      },
      faq: {
        eyebrow: "Preguntas",
        title: "Preguntas frecuentes",
        items: [
          { q: "¿Necesito referido para ver a un proveedor de atención primaria?", a: "Por lo general no se requiere referido. Algunos seguros y planes de Medicare pueden pedir uno de tu proveedor actual - nuestro equipo puede verificar tu cobertura y coordinarlo." },
          { q: "¿Qué debo traer a mi primera cita?", a: "Una identificación válida, tu tarjeta del seguro, una lista actual de medicamentos y cualquier expediente médico relevante. Si tienes laboratorios o imágenes recientes, podemos revisarlos durante tu visita." },
          { q: "¿Aceptan mi seguro?", a: `Aceptamos la mayoría de los seguros principales, incluido Medicare. Llama al ${PHONE} para verificar tu cobertura antes de tu visita.` },
          { q: "¿Puedo ver a mi proveedor por telemedicina?", a: "Sí - las visitas de telemedicina están disponibles en toda Florida para seguimientos, manejo de medicamentos, revisión de laboratorios y control de enfermedades crónicas." },
          { q: "¿Cuánto duran las citas?", a: "Las primeras visitas de atención primaria suelen durar 60 minutos y los seguimientos de 30 a 45 minutos, para que tu proveedor tenga tiempo de escucharte y explicarte." },
          { q: "¿Qué pasa si necesito atención de especialista?", a: "Tu proveedor coordina referidos a especialistas de confianza en Tampa Bay y garantiza la continuidad de la atención." },
        ],
      },
      area: {
        eyebrow: "Área de Servicio",
        title: "Sirviendo con orgullo a Tampa y comunidades cercanas",
        lead: "Ubicados centralmente en W Linebaugh Ave, a minutos de todo el Condado de Hillsborough.",
        places: ["Seminole Heights", "Forest Hills", "Carrollwood", "Town 'N' Country", "Temple Terrace", "Brandon", "Westchase", "University"],
        transportTitle: "¿Necesitas transporte? Nosotros te llevamos.",
        transportBody: "Transporte gratis de ida y vuelta a las citas para pacientes elegibles en el área de Tampa Bay. Solo pídelo al llamar o reservar - te ayudamos a coordinar tu visita.",
        transportAlt: "Vehículo de transporte de cortesía para pacientes en Tampa Bay",
      },
      related: {
        title: "Servicios relacionados",
        links: [
          { label: "Pérdida de Peso Médica", href: "/es/perdida-de-peso-medica/" },
          { label: "Terapia IV", href: "/es/terapia-iv/" },
          { label: "Fisioterapia", href: "/es/fisioterapia/" },
          { label: "Quiropráctica", href: "/es/quiropractico/" },
          { label: "Resbalones y Caídas", href: "/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/" },
          { label: "Terapia de Masajes", href: "/es/terapia-de-masajes/" },
        ],
      },
      cta: {
        title: "Da el primer paso para sentirte mejor.",
        lead: "Citas el mismo día o al día siguiente. Aceptamos la mayoría de seguros, incluido Medicare.",
      },
    },
  },

  "medical-weight-loss": {
    en: {
      hero: {
        eyebrow: "Medical Weight Loss",
        title: "Medically supervised weight loss that works with your body.",
        lead: "Physician-supervised programs that address the medical causes of weight gain - with GLP-1 medications when appropriate, nutrition guidance, and ongoing monitoring.",
        badges: ["Physician-supervised", "GLP-1 options", "Bilingual EN/ES"],
        note: "Most insurance accepted for office visits · Medication costs are separate and billed by the pharmacy",
        image: "/images/medical-weight-loss-program.webp",
        imageAlt: "A medical weight loss consultation at Palm Wellness Center in Tampa",
      },
      intro: {
        heading: "Weight loss that starts with your health, not a crash diet",
        paras: [
          "Palm Wellness Center offers medically supervised weight loss that looks at the whole picture: your metabolism, hormones, medications, sleep, and lifestyle - not just calories.",
          "Your provider builds a plan with you and adjusts it over time, so progress is safe, sustainable, and measured with real data.",
        ],
      },
      services: {
        eyebrow: "Our Weight Loss Services",
        title: "A medical program, not a fad",
        lead: "Assessment, treatment, and monitoring - all handled by your care team.",
        cards: [
          { icon: "scale", title: "Complete medical weight management", body: "A detailed evaluation of your health history, metabolism, and lifestyle, followed by a personalized plan with realistic milestones." },
          { icon: "pill", title: "GLP-1 medication therapy", body: "When appropriate, medications such as semaglutide or tirzepatide may be prescribed and closely monitored as part of your program." },
          { icon: "clipboard", title: "Lab testing & health monitoring", body: "Labs to understand your metabolic and hormonal health, with progress tracked over time rather than guessed." },
          { icon: "shield", title: "Prescription management", body: "Careful review of interactions and side effects, with adjustments and refill coordination as your treatment evolves." },
        ],
      },
      program: {
        eyebrow: "The Program",
        title: "Medical Weight Loss Program",
        price: "$299",
        cadence: "60-minute medical visit",
        body: "A structured program for patients whose weight is affected by medical factors such as hormone imbalance, insulin resistance, thyroid conditions, or medication side effects.",
        bullets: [
          "Comprehensive medical evaluation",
          "Personalized nutrition & lifestyle plan",
          "GLP-1 evaluation when appropriate",
          "Lab work and metabolic monitoring",
          "Medication management & refills",
          "Regular follow-up visits",
          "Coordination with primary care",
        ],
        note: "Prescription medications, including GLP-1 options, are prescribed only when medically appropriate and are billed separately by the pharmacy.",
      },
      integrated: {
        eyebrow: "Integrated Wellness",
        title: "Support that goes beyond the scale",
        lead: "Weight health works best when the rest of your care is connected.",
        cards: [
          { icon: "stethoscope", title: "Primary Care", body: "Chronic disease management, preventive care, and everyday health from the same team.", href: "/primary-care/" },
          { icon: "activity", title: "Physical Rehabilitation", body: "Rehabilitation programs that support safe movement, joint protection, and an active lifestyle.", href: "/physical-rehabilitation/" },
          { icon: "spine", title: "Chiropractic Care", body: "Spine and joint care to reduce pain and keep you moving comfortably.", href: "/chiropractor/" },
          { icon: "drop", title: "IV Therapy & Injections", body: "Medically supervised infusions and vitamin injections, including lipotropic support.", href: "/iv-therapy/" },
        ],
      },
      why: {
        eyebrow: "Why Integrated Care",
        title: "Your weight plan, connected to your whole health",
        lead: "When weight loss is coordinated with primary care and rehabilitation, your providers work from one plan - and your progress is safer and easier to sustain.",
        features: [
          { icon: "link", title: "One coordinated team", body: "Medical care and rehabilitation working from a shared plan and record." },
          { icon: "clipboard", title: "Data, not guesses", body: "Labs and follow-ups track real changes over time." },
          { icon: "languages", title: "Bilingual, always", body: "Care in English and Spanish - no interpreter needed." },
        ],
        points: [
          "Programs built around your health, not a template",
          "GLP-1 medications only when medically appropriate",
          "Side effects monitored and managed",
          "Nutrition and lifestyle guidance you can keep",
          "Coordination with primary care and rehabilitation",
          "Ongoing follow-up, not a one-time visit",
        ],
      },
      team: {
        eyebrow: "Meet Your Medical Team",
        title: "Providers who supervise your progress",
        lead: "Physician-supervised care, delivered by a bilingual team.",
        members: [
          { name: "Leivys C. Marsall", cred: "PA, ACN - Board-Certified Physician Assistant", bio: "Leads medical weight loss and preventive care, with a focus on sustainable, medically sound programs. Fluent in English and Spanish." },
          { name: "Dr. Arnaldo V. Orellana-Molina", cred: "MD - Supervising Physician", bio: "Provides medical oversight that ensures your weight loss plan is safe and guideline-aligned." },
        ],
      },
      steps: {
        eyebrow: "How to Get Started",
        title: "Three simple steps",
        items: [
          { title: "Call or book online", body: `Call ${PHONE} or schedule online 24/7 to book your medical weight loss visit.` },
          { title: "Your medical evaluation", body: "A 60-minute visit covering your history, metabolism, labs, and goals - then a personalized plan." },
          { title: "Ongoing monitoring", body: "Regular follow-ups, medication management, and adjustments as your body responds." },
        ],
      },
      faq: {
        eyebrow: "FAQ",
        title: "Frequently asked questions",
        items: [
          { q: "Is this a diet program or a medical treatment?", a: "It is a medical program. Your provider evaluates the underlying causes of weight gain and treats them with a plan that may include medication, labs, nutrition, and lifestyle support." },
          { q: "Will I be prescribed a GLP-1 medication?", a: "Only if it is medically appropriate for you. Your provider reviews your history and labs, explains the benefits and risks, and monitors your response closely." },
          { q: "Are medications included in the program price?", a: "No. The $299 program covers the medical visit, evaluation, plan, and monitoring. Prescription medications are billed separately by the pharmacy." },
          { q: "What are the possible side effects?", a: "GLP-1 medications can cause nausea, vomiting, diarrhea, or constipation, especially when starting. Rare but serious effects are reviewed with you before treatment, and your provider monitors your response." },
          { q: "Do I need labs before starting?", a: "Usually yes. Labs help your provider understand your metabolic and hormonal health and set a safe starting point." },
          { q: "Can I combine this with primary care?", a: "Yes - and we recommend it. Your weight loss plan is strongest when it is coordinated with your primary care and rehabilitation services." },
        ],
      },
      area: {
        eyebrow: "Service Area",
        title: "Proudly serving Tampa and nearby communities",
        lead: "Centrally located on W Linebaugh Ave, minutes from across Hillsborough County.",
        places: ["Seminole Heights", "Forest Hills", "Carrollwood", "Town 'N' Country", "Temple Terrace", "Brandon", "Westchase", "University"],
        transportTitle: "Need a ride? We've got you covered.",
        transportBody: "Free transportation to and from appointments for eligible patients across the Tampa Bay area. Just ask when you call or book - we'll help coordinate your visit.",
        transportAlt: "Courtesy transportation vehicle for patients in Tampa Bay",
      },
      related: {
        title: "Related services",
        links: [
          { label: "Primary Care", href: "/primary-care/" },
          { label: "Physical Rehabilitation", href: "/physical-rehabilitation/" },
          { label: "Chiropractic Care", href: "/chiropractor/" },
          { label: "IV Therapy", href: "/iv-therapy/" },
          { label: "Massage Therapy", href: "/massage-therapy/" },
          { label: "Therapeutic Exercises", href: "/therapeutic-exercises/" },
        ],
      },
      cta: {
        title: "Ready for the next step in your weight loss plan?",
        lead: "Stay supported beyond the first visit with ongoing medical guidance, monitoring, and a team that knows your goals.",
      },
    },
    es: {
      hero: {
        eyebrow: "Pérdida de Peso Médica",
        title: "Pérdida de peso supervisada médicamente que trabaja con tu cuerpo.",
        lead: "Programas supervisados por médicos que abordan las causas médicas del aumento de peso - con medicamentos GLP-1 cuando corresponde, guía nutricional y seguimiento continuo.",
        badges: ["Supervisado por médicos", "Opciones GLP-1", "Bilingüe EN/ES"],
        note: "Aceptamos la mayoría de seguros para consultas · El costo de los medicamentos es aparte y lo cobra la farmacia",
        image: "/images/medical-weight-loss-program.webp",
        imageAlt: "Consulta de pérdida de peso médica en Palm Wellness Center en Tampa",
      },
      intro: {
        heading: "Bajar de peso empieza por tu salud, no por una dieta estricta",
        paras: [
          "Palm Wellness Center ofrece pérdida de peso supervisada médicamente que considera el panorama completo: tu metabolismo, hormonas, medicamentos, sueño y estilo de vida - no solo las calorías.",
          "Tu proveedor construye un plan contigo y lo ajusta con el tiempo, para que el progreso sea seguro, sostenible y medido con datos reales.",
        ],
      },
      services: {
        eyebrow: "Nuestros Servicios de Pérdida de Peso",
        title: "Un programa médico, no una moda",
        lead: "Evaluación, tratamiento y seguimiento - todo a cargo de tu equipo médico.",
        cards: [
          { icon: "scale", title: "Manejo médico completo del peso", body: "Una evaluación detallada de tu historial, metabolismo y estilo de vida, seguida de un plan personalizado con metas realistas." },
          { icon: "pill", title: "Terapia con medicamentos GLP-1", body: "Cuando corresponde, se pueden recetar medicamentos como semaglutida o tirzepatida, con seguimiento cercano dentro de tu programa." },
          { icon: "clipboard", title: "Laboratorios y monitoreo de salud", body: "Pruebas para entender tu salud metabólica y hormonal, con progreso medido en el tiempo y no adivinado." },
          { icon: "shield", title: "Manejo de medicamentos", body: "Revisión cuidadosa de interacciones y efectos secundarios, con ajustes y coordinación de recetas según evoluciona tu tratamiento." },
        ],
      },
      program: {
        eyebrow: "El Programa",
        title: "Programa de Pérdida de Peso Médica",
        price: "$299",
        cadence: "consulta médica de 60 minutos",
        body: "Un programa estructurado para pacientes cuyo peso se ve afectado por factores médicos como desequilibrio hormonal, resistencia a la insulina, problemas de tiroides o efectos de medicamentos.",
        bullets: [
          "Evaluación médica completa",
          "Plan personalizado de nutrición y estilo de vida",
          "Evaluación para GLP-1 cuando corresponde",
          "Laboratorios y monitoreo metabólico",
          "Manejo de medicamentos y recetas",
          "Visitas de seguimiento regulares",
          "Coordinación con atención primaria",
        ],
        note: "Los medicamentos recetados, incluidas las opciones GLP-1, se prescriben solo cuando es médicamente apropiado y los cobra la farmacia por separado.",
      },
      integrated: {
        eyebrow: "Bienestar Integrado",
        title: "Apoyo que va más allá de la balanza",
        lead: "La salud del peso funciona mejor cuando el resto de tu atención está conectada.",
        cards: [
          { icon: "stethoscope", title: "Atención Primaria", body: "Manejo de enfermedades crónicas, atención preventiva y salud diaria con el mismo equipo.", href: "/es/atencion-primaria/" },
          { icon: "activity", title: "Fisioterapia", body: "Programas de rehabilitación que apoyan el movimiento seguro, la protección articular y un estilo de vida activo.", href: "/es/fisioterapia/" },
          { icon: "spine", title: "Quiropráctica", body: "Cuidado de columna y articulaciones para reducir el dolor y mantenerte en movimiento cómodamente.", href: "/es/quiropractico/" },
          { icon: "drop", title: "Terapia IV e Inyecciones", body: "Infusiones e inyecciones de vitaminas supervisadas médicamente, incluido el apoyo lipotrópico.", href: "/es/terapia-iv/" },
        ],
      },
      why: {
        eyebrow: "Por Qué la Atención Integrada",
        title: "Tu plan de peso, conectado con toda tu salud",
        lead: "Cuando la pérdida de peso se coordina con atención primaria y rehabilitación, tus proveedores trabajan desde un mismo plan - y tu progreso es más seguro y sostenible.",
        features: [
          { icon: "link", title: "Un equipo coordinado", body: "Atención médica y rehabilitación trabajando desde un plan y un expediente compartidos." },
          { icon: "clipboard", title: "Datos, no suposiciones", body: "Los laboratorios y seguimientos registran cambios reales en el tiempo." },
          { icon: "languages", title: "Siempre bilingüe", body: "Atención en inglés y español - sin necesidad de intérprete." },
        ],
        points: [
          "Programas hechos para tu salud, no una plantilla",
          "Medicamentos GLP-1 solo cuando es médicamente apropiado",
          "Efectos secundarios monitoreados y manejados",
          "Guía de nutrición y estilo de vida que puedes mantener",
          "Coordinación con atención primaria y rehabilitación",
          "Seguimiento continuo, no una sola visita",
        ],
      },
      team: {
        eyebrow: "Nuestro Equipo Médico",
        title: "Proveedores que supervisan tu progreso",
        lead: "Atención supervisada por médicos, brindada por un equipo bilingüe.",
        members: [
          { name: "Leivys C. Marsall", cred: "PA, ACN - Asistente Médica Certificada", bio: "Lidera la pérdida de peso médica y la atención preventiva, con enfoque en programas sostenibles y médicamente sólidos. Habla inglés y español." },
          { name: "Dr. Arnaldo V. Orellana-Molina", cred: "MD - Médico Supervisor", bio: "Brinda supervisión médica que garantiza que tu plan de pérdida de peso sea seguro y alineado con las guías clínicas." },
        ],
      },
      steps: {
        eyebrow: "Cómo Comenzar",
        title: "Tres pasos simples",
        items: [
          { title: "Llama o reserva en línea", body: `Llama al ${PHONE} o agenda en línea 24/7 para tu consulta de pérdida de peso médica.` },
          { title: "Tu evaluación médica", body: "Una consulta de 60 minutos que cubre tu historial, metabolismo, laboratorios y metas - y luego un plan personalizado." },
          { title: "Monitoreo continuo", body: "Seguimientos regulares, manejo de medicamentos y ajustes según responde tu cuerpo." },
        ],
      },
      faq: {
        eyebrow: "Preguntas",
        title: "Preguntas frecuentes",
        items: [
          { q: "¿Es una dieta o un tratamiento médico?", a: "Es un programa médico. Tu proveedor evalúa las causas de fondo del aumento de peso y las trata con un plan que puede incluir medicamentos, laboratorios, nutrición y apoyo de estilo de vida." },
          { q: "¿Me recetarán un medicamento GLP-1?", a: "Solo si es médicamente apropiado para ti. Tu proveedor revisa tu historial y laboratorios, explica los beneficios y riesgos, y monitorea tu respuesta de cerca." },
          { q: "¿Los medicamentos están incluidos en el precio?", a: "No. El programa de $299 cubre la consulta médica, la evaluación, el plan y el monitoreo. Los medicamentos recetados los cobra la farmacia por separado." },
          { q: "¿Cuáles son los posibles efectos secundarios?", a: "Los medicamentos GLP-1 pueden causar náuseas, vómitos, diarrea o estreñimiento, sobre todo al inicio. Los efectos raros pero graves se revisan contigo antes del tratamiento y tu proveedor monitorea tu respuesta." },
          { q: "¿Necesito laboratorios antes de comenzar?", a: "Normalmente sí. Los laboratorios ayudan a tu proveedor a entender tu salud metabólica y hormonal y a definir un punto de partida seguro." },
          { q: "¿Puedo combinarlo con atención primaria?", a: "Sí - y lo recomendamos. Tu plan de pérdida de peso es más fuerte cuando se coordina con tu atención primaria y tus servicios de rehabilitación." },
        ],
      },
      area: {
        eyebrow: "Área de Servicio",
        title: "Sirviendo con orgullo a Tampa y comunidades cercanas",
        lead: "Ubicados centralmente en W Linebaugh Ave, a minutos de todo el Condado de Hillsborough.",
        places: ["Seminole Heights", "Forest Hills", "Carrollwood", "Town 'N' Country", "Temple Terrace", "Brandon", "Westchase", "University"],
        transportTitle: "¿Necesitas transporte? Nosotros te llevamos.",
        transportBody: "Transporte gratis de ida y vuelta a las citas para pacientes elegibles en el área de Tampa Bay. Solo pídelo al llamar o reservar - te ayudamos a coordinar tu visita.",
        transportAlt: "Vehículo de transporte de cortesía para pacientes en Tampa Bay",
      },
      related: {
        title: "Servicios relacionados",
        links: [
          { label: "Atención Primaria", href: "/es/atencion-primaria/" },
          { label: "Fisioterapia", href: "/es/fisioterapia/" },
          { label: "Quiropráctica", href: "/es/quiropractico/" },
          { label: "Terapia IV", href: "/es/terapia-iv/" },
          { label: "Terapia de Masajes", href: "/es/terapia-de-masajes/" },
          { label: "Ejercicios Terapéuticos", href: "/es/ejercicios-terapeuticos/" },
        ],
      },
      cta: {
        title: "¿Listo para el siguiente paso en tu plan de peso?",
        lead: "Sigue acompañado más allá de la primera visita con guía médica continua, monitoreo y un equipo que conoce tus metas.",
      },
    },
  },
};
