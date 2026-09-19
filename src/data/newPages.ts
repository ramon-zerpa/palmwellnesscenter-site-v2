export interface SimpleContent {
  title: string;
  desc: string;
  eyebrow: string;
  h1: string;
  lead: string;
  body: string;
  benefits: { icon: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
}

const consult = "Virtual visits anywhere in Florida";

export const newPages: Record<string, SimpleContent> = {
  /* ---------------- PRIMARY CARE ---------------- */
  "/primary-care/chronic-condition-management/": {
    title: "Chronic Condition Management in Tampa, FL | Palm Wellness Center",
    desc: "Ongoing management for high blood pressure, diabetes, cholesterol, thyroid, asthma and arthritis in Tampa. Extended visits and coordinated care. Call (813) 443-5370.",
    eyebrow: "Primary Care in Tampa",
    h1: "Chronic condition management that stays on track",
    lead: "Long-term support for the conditions that need regular attention - with extended visits and a plan you can actually follow.",
    body: "We manage high blood pressure, type 2 diabetes, high cholesterol, thyroid disorders, asthma, COPD, arthritis, and chronic joint pain. Your provider coordinates medication, labs, and lifestyle changes, and works with our rehabilitation team when movement is part of the plan.",
    benefits: [
      { icon: "stethoscope", title: "One provider who knows your history", body: "Continuity across visits, prescriptions, and lab reviews." },
      { icon: "check", title: "Medication and lab monitoring", body: "Regular checks so treatment is adjusted as you improve." },
      { icon: "person", title: "Coordinated with rehabilitation", body: "Medical and movement care share one plan, one record, one team." },
    ],
    faq: [
      { q: "Do you accept Medicare and major insurance?", a: "We accept most major insurance plans, including Medicare. Call (813) 443-5370 to verify your specific coverage." },
      { q: "How often will I be seen?", a: "Follow-ups are typically every 1-3 months depending on your condition and how well it is controlled." },
      { q: "Can I manage my condition by telemedicine?", a: "Yes - follow-ups, medication management, and lab reviews can be handled by telemedicine throughout Florida when clinically appropriate." },
    ],
  },
  "/es/atencion-primaria/manejo-enfermedades-cronicas/": {
    title: "Manejo de Enfermedades Crónicas en Tampa, FL | Palm Wellness Center",
    desc: "Manejo continuo de presión alta, diabetes, colesterol, tiroides, asma y artritis en Tampa. Consultas extendidas y atención coordinada. Llama al (813) 443-5370.",
    eyebrow: "Atención Primaria en Tampa",
    h1: "Manejo de enfermedades crónicas que no se pierde",
    lead: "Apoyo a largo plazo para las condiciones que requieren atención regular - con consultas extendidas y un plan que puedes seguir.",
    body: "Manejamos presión alta, diabetes tipo 2, colesterol alto, trastornos de tiroides, asma, EPOC, artritis y dolor articular crónico. Tu proveedor coordina medicamentos, laboratorios y cambios de estilo de vida, y trabaja con nuestro equipo de rehabilitación cuando el movimiento es parte del plan.",
    benefits: [
      { icon: "stethoscope", title: "Un proveedor que conoce tu historial", body: "Continuidad entre visitas, recetas y revisión de laboratorios." },
      { icon: "check", title: "Seguimiento de medicamentos y labs", body: "Controles regulares para ajustar el tratamiento según avanzas." },
      { icon: "person", title: "Coordinado con rehabilitación", body: "Atención médica y movimiento comparten un plan, un expediente y un equipo." },
    ],
    faq: [
      { q: "¿Aceptan Medicare y seguros principales?", a: "Aceptamos la mayoría de los seguros principales, incluido Medicare. Llama al (813) 443-5370 para verificar tu cobertura." },
      { q: "¿Cada cuánto me verán?", a: "Los seguimientos suelen ser cada 1 a 3 meses según tu condición y qué tan controlada esté." },
      { q: "¿Puedo manejar mi condición por telemedicina?", a: "Sí - seguimientos, manejo de medicamentos y revisión de laboratorios pueden hacerse por telemedicina en toda Florida cuando sea clínicamente apropiado." },
    ],
  },

  "/primary-care/preventive-care/": {
    title: "Preventive Care & Wellness Exams in Tampa, FL | Palm Wellness Center",
    desc: "Annual wellness visits, physicals, screenings, contraception counseling and hormone support in Tampa, FL. Same-day and next-day appointments. Call (813) 443-5370.",
    eyebrow: "Primary Care in Tampa",
    h1: "Preventive care that stays ahead of illness",
    lead: "Annual wellness visits, screenings, and personalized guidance to keep small issues from becoming big ones.",
    body: "We provide annual wellness visits, physicals, screenings, contraception counseling, and hormone support for men and women. Popular add-ons include an Annual Preventive Assessment with Basic Panel ($145), a Complete Hormonal Profile ($189), and a Comprehensive Metabolic Panel ($250).",
    benefits: [
      { icon: "stethoscope", title: "Annual wellness visits", body: "A complete look at your health, not just the reason you came in." },
      { icon: "check", title: "Screenings and hormone support", body: "Labs and testing reviewed with you during the visit." },
      { icon: "person", title: "Care that fits your life", body: "In person in Tampa or by telemedicine across Florida." },
    ],
    faq: [
      { q: "What does an annual wellness visit include?", a: "A review of your medical history, risk factors, medications, and goals, plus age-appropriate screenings and preventive recommendations." },
      { q: "Do I need to be sick to come in?", a: "No. Preventive visits are for staying well - catching issues early and keeping your care up to date." },
      { q: "Is telehealth available for preventive care?", a: "Some preventive follow-ups can be done by telemedicine. Your provider will recommend an in-person visit when it is clinically needed." },
    ],
  },
  "/es/atencion-primaria/atencion-preventiva/": {
    title: "Atención Preventiva y Exámenes de Bienestar en Tampa, FL | Palm Wellness Center",
    desc: "Visitas anuales de bienestar, físicos, exámenes, consejería de anticoncepción y apoyo hormonal en Tampa, FL. Citas el mismo día o al día siguiente. Llama al (813) 443-5370.",
    eyebrow: "Atención Primaria en Tampa",
    h1: "Atención preventiva que se adelanta a la enfermedad",
    lead: "Visitas anuales de bienestar, exámenes y orientación personalizada para que lo pequeño no se vuelva grande.",
    body: "Ofrecemos visitas anuales de bienestar, físicos, exámenes, consejería de anticoncepción y apoyo hormonal para hombres y mujeres. Complementos populares: Evaluación Preventiva Anual con Panel Básico ($145), Perfil Hormonal Completo ($189) y Panel Metabólico Completo ($250).",
    benefits: [
      { icon: "stethoscope", title: "Visitas anuales de bienestar", body: "Una mirada completa a tu salud, no solo el motivo de la consulta." },
      { icon: "check", title: "Exámenes y apoyo hormonal", body: "Laboratorios y pruebas revisados contigo durante la visita." },
      { icon: "person", title: "Atención que se adapta a tu vida", body: "En persona en Tampa o por telemedicina en toda Florida." },
    ],
    faq: [
      { q: "¿Qué incluye una visita anual de bienestar?", a: "Revisión de tu historial, factores de riesgo, medicamentos y metas, más exámenes apropiados según tu edad y recomendaciones preventivas." },
      { q: "¿Tengo que estar enfermo para ir?", a: "No. Las visitas preventivas son para mantenerte bien - detectar problemas a tiempo y mantener tu atención al día." },
      { q: "¿Hay telemedicina para atención preventiva?", a: "Algunos seguimientos preventivos pueden hacerse por telemedicina. Tu proveedor recomendará una visita presencial cuando sea necesario." },
    ],
  },

  "/primary-care/telemedicine/": {
    title: "Telemedicine Visits Across Florida | Palm Wellness Center",
    desc: "See your Palm Wellness provider online for follow-ups, medication management, lab reviews, and chronic care. Telemedicine available throughout Florida.",
    eyebrow: "Primary Care in Tampa",
    h1: "Telemedicine, wherever you are in Florida",
    lead: "Connect with your provider online for follow-ups, medications, and chronic care - no drive required.",
    body: "Telemedicine visits are available throughout Florida for follow-ups, medication management, lab review, chronic condition monitoring, and select minor illness evaluations. A Telehealth Medical Visit is $55 (45 min); a Telehealth Follow-up is $45 (30 min).",
    benefits: [
      { icon: "stethoscope", title: "Secure video visits", body: "Connect from home, work, or anywhere in Florida." },
      { icon: "check", title: "Prescriptions and lab reviews", body: "Refills handled and results explained during your visit." },
      { icon: "person", title: "Same team, same record", body: "Your telemedicine visit stays connected to your in-person care." },
    ],
    faq: [
      { q: "Is telemedicine available statewide?", a: "Yes - telemedicine visits are available throughout Florida for appropriate follow-ups and chronic care." },
      { q: "What can be handled by telemedicine?", a: "Medication management, lab review, chronic condition monitoring, follow-ups, and some minor illness evaluations." },
      { q: "When is an in-person visit required?", a: "When a physical exam or in-person test is necessary, your provider will let you know and help you schedule." },
    ],
  },
  "/es/atencion-primaria/telemedicina/": {
    title: "Telemedicina en Toda Florida | Palm Wellness Center",
    desc: "Consulta a tu proveedor de Palm Wellness en línea para seguimientos, manejo de medicamentos, revisión de laboratorios y enfermedades crónicas. Telemedicina en toda Florida.",
    eyebrow: "Atención Primaria en Tampa",
    h1: "Telemedicina, donde estés en Florida",
    lead: "Conéctate con tu proveedor en línea para seguimientos, medicamentos y atención crónica - sin conducir.",
    body: "Las visitas de telemedicina están disponibles en toda Florida para seguimientos, manejo de medicamentos, revisión de laboratorios, control de enfermedades crónicas y algunas evaluaciones de enfermedades menores. La visita médica por telemedicina cuesta $55 (45 min) y el seguimiento $45 (30 min).",
    benefits: [
      { icon: "stethoscope", title: "Videollamadas seguras", body: "Conéctate desde casa, el trabajo o donde estés en Florida." },
      { icon: "check", title: "Recetas y laboratorios", body: "Refills y resultados explicados durante tu visita." },
      { icon: "person", title: "El mismo equipo y expediente", body: "Tu visita por telemedicina sigue conectada a tu atención presencial." },
    ],
    faq: [
      { q: "¿La telemedicina está disponible en todo el estado?", a: "Sí - las visitas de telemedicina están disponibles en toda Florida para seguimientos y atención crónica apropiada." },
      { q: "¿Qué se puede manejar por telemedicina?", a: "Manejo de medicamentos, revisión de laboratorios, control de enfermedades crónicas, seguimientos y algunas enfermedades menores." },
      { q: "¿Cuándo se requiere visita presencial?", a: "Cuando se necesita un examen físico o una prueba presencial, tu proveedor te lo indicará y te ayudará a agendar." },
    ],
  },

  "/primary-care/membership/": {
    title: "Primary Care Membership in Tampa | Palm Wellness Center",
    desc: "Monthly Medical Membership: $99 initial + $39/month for extended primary care. Single visits from $39. Most insurance accepted.",
    eyebrow: "Membership",
    h1: "Primary care without the rush",
    lead: "One simple membership for consistent, unhurried primary care - $99 to start, then $39/month.",
    body: "The Monthly Medical Membership gives you extended visits and a provider who knows you. Prefer to pay as you go? Single visits start at $39 (Office Visit), with New Patient visits at $65. Telehealth visits are $55 (follow-up $45).",
    benefits: [
      { icon: "check", title: "Monthly Medical Membership", body: "$99 to start, then $39/month - simple and flexible, no long-term contract." },
      { icon: "check", title: "Extended, unhurried visits", body: "Time to listen, explain, and plan - not a rushed 10-minute appointment." },
      { icon: "check", title: "Same-day and next-day", body: "In person in Tampa or by telehealth across Florida, plus direct messaging." },
    ],
    faq: [
      { q: "How much does membership cost?", a: "The Monthly Medical Membership is $99 to start, then $39 per month." },
      { q: "Can I be seen without a membership?", a: "Yes - single visits start at $39 (Office Visit). A New Patient Medical Visit is $65; insurance billing is available when applicable." },
      { q: "Does membership replace insurance?", a: "Membership is not insurance. We still accept most major insurance plans for covered services." },
    ],
  },
  "/es/atencion-primaria/membresia/": {
    title: "Membresía de Atención Primaria en Tampa | Palm Wellness Center",
    desc: "Membresía médica mensual: $99 inicial + $39/mes para atención primaria extendida. Visitas desde $39. Aceptamos la mayoría de seguros.",
    eyebrow: "Membresía",
    h1: "Atención primaria sin prisas",
    lead: "Una membresía simple para atención primaria constante y sin prisas - $99 para comenzar y luego $39/mes.",
    body: "La Membresía Médica Mensual te da consultas extendidas y un proveedor que te conoce. ¿Prefieres pagar por visita? Las visitas comienzan en $39 (Office Visit) y la primera visita de paciente nuevo cuesta $65. La telemedicina cuesta $55 (seguimiento $45).",
    benefits: [
      { icon: "check", title: "Membresía Médica Mensual", body: "$99 para comenzar y luego $39/mes - simple y flexible, sin contrato a largo plazo." },
      { icon: "check", title: "Consultas extendidas, sin prisas", body: "Tiempo para escuchar, explicar y planificar, no una cita apresurada." },
      { icon: "check", title: "Mismo día o al día siguiente", body: "En persona en Tampa o por telemedicina en toda Florida, más mensajería directa." },
    ],
    faq: [
      { q: "¿Cuánto cuesta la membresía?", a: "La Membresía Médica Mensual cuesta $99 para comenzar y luego $39 al mes." },
      { q: "¿Puedo atenderme sin membresía?", a: "Sí - las visitas comienzan en $39 (Office Visit). La visita de paciente nuevo cuesta $65; la facturación al seguro está disponible cuando aplica." },
      { q: "¿La membresía reemplaza el seguro?", a: "La membresía no es un seguro. Seguimos aceptando la mayoría de seguros para servicios cubiertos." },
    ],
  },

  /* ---------------- IV THERAPY ---------------- */
  "/iv-therapy/": {
    title: "IV Therapy in Tampa | Beauty IV, Mayer Signature IV & NAD+ | Palm Wellness Center",
    desc: "Medically supervised IV therapy in Tampa: Beauty IV ($170), Mayer Signature IV ($170), and NAD+ Weekly Optimization Protocol ($199), plus lipotropic injections.",
    eyebrow: "IV Therapy",
    h1: "IV therapy and vitamin injections, medically supervised",
    lead: "Infusions and injectable nutrients for energy, immunity, skin, and recovery - evaluated within your full medical context.",
    body: "Our IV therapy is prescribed based on a clinical evaluation and integrated with your primary care. Options include Beauty IV and Mayer Signature IV ($170 each, 90 min) and a weekly NAD+ Optimization Protocol ($199), plus lipotropic fat-metabolism injections ($25).",
    benefits: [
      { icon: "drop", title: "Beauty IV - $170", body: "Antioxidant and nutrient support for healthy skin, hair, and overall wellness. 90 min." },
      { icon: "drop", title: "Mayer Signature IV - $170", body: "Our signature infusion blend. 90 min." },
      { icon: "check", title: "NAD+ Weekly Protocol - $199", body: "Weekly NAD+ with pre-start evaluation, tolerance monitoring, and clinical guidance." },
    ],
    faq: [
      { q: "How much does IV therapy cost?", a: "Beauty IV and Mayer Signature IV are $170 each (90 min). The NAD+ Weekly Optimization Protocol is $199. Lipotropic injections are $25." },
      { q: "Is IV therapy right for me?", a: "Your provider will review your history, medications, and goals to decide whether IV therapy is appropriate for you." },
      { q: "Do I need to be a member?", a: "No. IV therapy is available to members and non-members." },
    ],
  },
  "/es/terapia-iv/": {
    title: "Terapia IV en Tampa | Beauty IV, Mayer Signature IV y NAD+ | Palm Wellness Center",
    desc: "Terapia IV supervisada médicamente en Tampa: Beauty IV ($170), Mayer Signature IV ($170) y Protocolo NAD+ ($199), más inyecciones lipotrópicas.",
    eyebrow: "Terapia IV",
    h1: "Terapia IV e inyecciones de vitaminas, supervisadas por médicos",
    lead: "Infusiones y nutrientes inyectables para energía, inmunidad, piel y recuperación - evaluados dentro de tu contexto médico completo.",
    body: "Nuestra terapia IV se prescribe según una evaluación clínica y se integra con tu atención primaria. Las opciones incluyen Beauty IV y Mayer Signature IV ($170 cada una, 90 min) y un Protocolo de Optimización NAD+ semanal ($199), más inyecciones lipotrópicas ($25).",
    benefits: [
      { icon: "drop", title: "Beauty IV - $170", body: "Apoyo antioxidante y de nutrientes para piel, cabello y bienestar. 90 min." },
      { icon: "drop", title: "Mayer Signature IV - $170", body: "Nuestra fórmula de infusión insignia. 90 min." },
      { icon: "check", title: "Protocolo NAD+ - $199", body: "NAD+ semanal con evaluación previa, monitoreo de tolerancia y orientación clínica." },
    ],
    faq: [
      { q: "¿Cuánto cuesta la terapia IV?", a: "Beauty IV y Mayer Signature IV cuestan $170 cada una (90 min). El Protocolo NAD+ cuesta $199. Las inyecciones lipotrópicas cuestan $25." },
      { q: "¿La terapia IV es para mí?", a: "Tu proveedor revisará tu historial, medicamentos y metas para decidir si es apropiada para ti." },
      { q: "¿Necesito ser miembro?", a: "No. La terapia IV está disponible para miembros y no miembros." },
    ],
  },

  /* ---------------- LOCATIONS ---------------- */
  "/locations/": {
    title: "Location & Service Area in Tampa, FL | Palm Wellness Center",
    desc: "Palm Wellness Center is located at 1004 W Linebaugh Ave Ste A, Tampa, FL 33612, serving North Tampa, Carrollwood, Temple Terrace, Seminole Heights and more.",
    eyebrow: "Service Area",
    h1: "One clinic, serving all of Tampa",
    lead: "Centrally located on W Linebaugh Ave, minutes from across Hillsborough County - with free transportation for eligible patients.",
    body: "Palm Wellness Center is at 1004 W Linebaugh Ave Ste A, Tampa, FL 33612. We serve patients from Seminole Heights, Forest Hills, Carrollwood, Town 'N' Country, Temple Terrace, Brandon, Westchase, University, and across Tampa Bay.",
    benefits: [
      { icon: "map-pin", title: "Central Tampa location", body: "Easy to reach from across Hillsborough County." },
      { icon: "car", title: "Free transportation", body: "Ride assistance for eligible patients across Tampa Bay." },
      { icon: "clock", title: "Extended hours", body: "Monday-Friday 10 AM - 7 PM, Saturday by appointment." },
    ],
    faq: [
      { q: "Where are you located?", a: "1004 W Linebaugh Ave Ste A, Tampa, FL 33612." },
      { q: "Do you offer transportation?", a: "Yes - free transportation to and from appointments is available for eligible patients across the Tampa Bay area." },
      { q: "What are your hours?", a: "Monday-Friday 10 AM - 7 PM, and Saturday by appointment." },
    ],
  },
  "/es/ubicaciones/": {
    title: "Ubicación y Área de Servicio en Tampa, FL | Palm Wellness Center",
    desc: "Palm Wellness Center está en 1004 W Linebaugh Ave Ste A, Tampa, FL 33612, sirviendo a North Tampa, Carrollwood, Temple Terrace, Seminole Heights y más.",
    eyebrow: "Área de Servicio",
    h1: "Una clínica, al servicio de todo Tampa",
    lead: "Ubicados centralmente en W Linebaugh Ave, a minutos de todo el Condado de Hillsborough - con transporte gratis para pacientes elegibles.",
    body: "Palm Wellness Center está en 1004 W Linebaugh Ave Ste A, Tampa, FL 33612. Atendemos a pacientes de Seminole Heights, Forest Hills, Carrollwood, Town 'N' Country, Temple Terrace, Brandon, Westchase, University y toda el área de Tampa Bay.",
    benefits: [
      { icon: "map-pin", title: "Ubicación central en Tampa", body: "Fácil acceso desde todo el Condado de Hillsborough." },
      { icon: "car", title: "Transporte gratis", body: "Ayuda de transporte para pacientes elegibles en Tampa Bay." },
      { icon: "clock", title: "Horario extendido", body: "Lunes a viernes 10 AM - 7 PM, sábado con cita." },
    ],
    faq: [
      { q: "¿Dónde están ubicados?", a: "1004 W Linebaugh Ave Ste A, Tampa, FL 33612." },
      { q: "¿Ofrecen transporte?", a: "Sí - transporte gratis de ida y vuelta a las citas para pacientes elegibles en el área de Tampa Bay." },
      { q: "¿Cuál es su horario?", a: "Lunes a viernes 10 AM - 7 PM, y sábado con cita." },
    ],
  },

  "/locations/north-tampa/": {
    title: "Primary Care in North Tampa & USF Area | Palm Wellness Center",
    desc: "Primary care, medical weight loss, and rehabilitation for North Tampa, USF, Sulphur Springs, and Carrollwood at 1004 W Linebaugh Ave. Call (813) 443-5370.",
    eyebrow: "North Tampa",
    h1: "Primary care for North Tampa and the USF area",
    lead: "Minutes from USF, Sulphur Springs, and Carrollwood - integrated primary care, weight loss, and rehabilitation under one roof.",
    body: `Our clinic on W Linebaugh Ave is a short drive for patients in North Tampa, USF, Sulphur Springs, Carrollwood, and Temple Terrace. ${consult} is available when an in-person visit is not required.`,
    benefits: [
      { icon: "map-pin", title: "Minutes from USF", body: "Convenient for students, faculty, and North Tampa residents." },
      { icon: "stethoscope", title: "Primary care first", body: "Chronic care, prevention, and everyday health." },
      { icon: "car", title: "Free transportation", body: "Available for eligible patients in the area." },
    ],
    faq: [
      { q: "Do you serve North Tampa and USF?", a: "Yes - we serve North Tampa, the USF area, Sulphur Springs, Carrollwood, and Temple Terrace from our W Linebaugh Ave location." },
      { q: "Is there parking?", a: "Yes, on-site parking is available at our clinic." },
      { q: "Can students be seen?", a: "Yes - we welcome students and accept most major insurance plans. Call (813) 443-5370 to verify coverage." },
    ],
  },
  "/es/ubicaciones/north-tampa/": {
    title: "Atención Primaria en North Tampa y Área de USF | Palm Wellness Center",
    desc: "Atención primaria, pérdida de peso médica y rehabilitación para North Tampa, USF, Sulphur Springs y Carrollwood en 1004 W Linebaugh Ave. Llama al (813) 443-5370.",
    eyebrow: "North Tampa",
    h1: "Atención primaria para North Tampa y el área de USF",
    lead: "A minutos de USF, Sulphur Springs y Carrollwood - atención primaria integrada, pérdida de peso y rehabilitación bajo un mismo techo.",
    body: `Nuestra clínica en W Linebaugh Ave está a poca distancia para pacientes de North Tampa, USF, Sulphur Springs, Carrollwood y Temple Terrace. La telemedicina está disponible cuando no se requiere una visita presencial.`,
    benefits: [
      { icon: "map-pin", title: "A minutos de USF", body: "Conveniente para estudiantes, personal y residentes de North Tampa." },
      { icon: "stethoscope", title: "Atención primaria primero", body: "Enfermedades crónicas, prevención y salud diaria." },
      { icon: "car", title: "Transporte gratis", body: "Disponible para pacientes elegibles en el área." },
    ],
    faq: [
      { q: "¿Atienden North Tampa y USF?", a: "Sí - atendemos North Tampa, el área de USF, Sulphur Springs, Carrollwood y Temple Terrace desde nuestra ubicación en W Linebaugh Ave." },
      { q: "¿Hay estacionamiento?", a: "Sí, hay estacionamiento en el lugar en nuestra clínica." },
      { q: "¿Pueden atender estudiantes?", a: "Sí - recibimos estudiantes y aceptamos la mayoría de seguros principales. Llama al (813) 443-5370 para verificar cobertura." },
    ],
  },
};
