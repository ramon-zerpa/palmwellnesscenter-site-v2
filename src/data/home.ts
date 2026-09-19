import { APPOINTMENT_URL, PHONE_TEL } from "../i18n/utils";
import type { Lang } from "../i18n/ui";

export interface ServiceItem { title: string; body: string; icon: string; href?: string; linkLabel?: string; }
export interface HomeContent {
  hero: { heading: string; badges: string[]; requestLabel: string; ctaContact: string; ctaContactHref: string; ctaPhone: string; tagline: string; image: string; imageAlt: string; };
  intro: { h1: string; body: string; cta: string; scheduleLabel: string; image: string; imageAlt: string; };
  services: { h2: string; items: ServiceItem[]; image: string; imageAlt: string; };
  rehab: { h2: string; body: string; items: ServiceItem[]; };
  step: { h2: string; body: string; requestLabel: string; phoneLabel: string; };
  serving: { h2: string; intro: string; col1: string[]; col2: string[]; outro: string; };
  transport: { h2: string; lead: string; body: string; image: string; imageAlt: string; };
  professional: { h2: string; body: string; image: string; imageAlt: string; };
  why: { h2: string; intro: string; items: { label: string; text: string }[]; linkLabel: string; linkHref: string; };
}

const IMG = {
  hero: "/images/chiropractor-tampa-expert-pain-relief-wellness-care.webp",
  intro: "/images/our-primary-care-services.webp",
  services: "/images/regular-therapy-sessions.webp",
  transport: "/images/car-transportation-assistance.webp",
  professional: "/images/does-insurance-cover-chiropractic-in-florida.webp",
};

export const home: Record<Lang, HomeContent> = {
  en: {
    hero: {
      heading: "Recover Faster, Move Better, Feel Stronger",
      badges: ["Licensed physicians & physical therapist", "Bilingual care (English/Spanish)", "Free transportation available", "Same-day appointments"],
      requestLabel: "Request Appointment",
      ctaContact: "Contact Us", ctaContactHref: "/contact/",
      ctaPhone: "(813) 443-5370",
      tagline: "Integrated rehabilitation, primary care, and medical weight loss—all under one roof.",
      image: IMG.hero, imageAlt: "Recover Faster, Move Better, Feel Stronger",
    },
    intro: {
      h1: "Expert Injury Recovery & Wellness Care in Tampa, FL",
      body: "Palm Wellness Center provides coordinated, non-surgical care for injury recovery and long-term wellness. Our licensed physicians, physical therapist, and chiropractor work together to restore range of motion, improve body mechanics, and support your body's natural ability to heal—from auto accident rehabilitation to medical weight loss and primary care.",
      cta: "Make Appointment", scheduleLabel: "Schedule Medical Appointment",
      image: IMG.intro, imageAlt: "Expert Injury Recovery & Wellness Care in Tampa, FL",
    },
    services: {
      h2: "Our Services",
      image: IMG.services, imageAlt: "Physical Therapy in Tampa",
      items: [
        { title: "Primary Care in Tampa", icon: "stethoscope", href: "/primary-care/", linkLabel: "Learn More About Primary Care", body: "Comprehensive medical care for chronic disease management, preventive health, and injury support. Treat blood pressure, diabetes, hormone imbalance, and inflammation—with in-clinic and telehealth visits available." },
        { title: "Chiropractic Care in Tampa", icon: "spine", href: "/chiropractor/", linkLabel: "Learn More About Chiropractic Care", body: "Spinal adjustments and manual therapy to restore proper alignment and improve joint mobility. Supports natural healing from auto accidents, falls, sports injuries, headaches, and chronic back or neck discomfort." },
        { title: "Physical Therapy in Tampa", icon: "activity", href: "/physical-rehabilitation/", linkLabel: "Learn More About Physical Therapy", body: "Restore movement, strength, and balance after injury through manual therapy and therapeutic exercise. Helps your body heal naturally and reduces the risk of re-injury." },
        { title: "Medical Weight Loss in Tampa", icon: "scale", href: "/medical-weight-loss/", linkLabel: "Explore Medical Weight Loss", body: "Physician-supervised weight loss personalized to your medical history, metabolism, and goals. Treatment includes FDA-approved medications (semaglutide, tirzepatide), nutrition counseling, and monitoring." },
        { title: "IV Therapy and Vitamin Injections in Tampa - Coming Soon", icon: "drop", body: "Medically supervised IV vitamin therapy and injections to support hydration, immune health, energy, and recovery. Complements physical therapy, weight loss, and chronic disease care." },
      ],
    },
    rehab: {
      h2: "Injury Rehabilitation and Recovery",
      body: "Early rehabilitation is key after an injury. Coordinated chiropractic and physical therapy care helps reduce pain, restore movement, and support long-term function.",
      items: [
        { title: "Auto Accident Care", icon: "car", href: "/car-accident-rehabilitation/", linkLabel: "Learn more about Auto Accident Rehabilitation", body: "Personalized rehabilitation focused on restoring mobility, correcting post-injury mechanics, and supporting natural healing." },
        { title: "Slip and Fall Injuries", icon: "person", href: "/slip-and-fall-injury-treatment/", linkLabel: "Learn more about Slip and Fall Treatment", body: "Targeted care to restore balance, improve joint stability, and address soft-tissue strain through therapeutic exercise and manual therapy." },
      ],
    },
    step: {
      h2: "Take the First Step Toward Feeling Better",
      body: "Our goal is help you feel better, move easier, and enjoy everyday life again. With affordable options and transportation support, Palm Wellness Center is here for you.",
      requestLabel: "Request Appointment",
      phoneLabel: "(813) 443-5370",
    },
    serving: {
      h2: "Proudly Serving Tampa and Surrounding Neighborhoods",
      intro: "Located in the heart of Tampa at 1004 W Linebaugh Ave, Palm Wellness Center serves patients from across Hillsborough County and surrounding communities, including:",
      col1: ["Seminole Heights", "Forest Hills", "Carrollwood"],
      col2: ["Town 'N' Country", "Temple Terrace", "Brandon", "Westchase"],
      outro: "Free transportation is available for eligible patients throughout Tampa Bay, making our centrally located clinic easy to reach—whether you're recovering from an injury, managing chronic pain, or starting a medical weight loss program. No matter where you live in the region, quality care is within reach.",
    },
    transport: {
      h2: "Transportation Assistance",
      lead: "Need a Ride? We've Got You Covered.",
      body: "Palm Wellness Center offers free transportation to and from appointments for eligible patients across the Tampa Bay area. If transportation is a concern, let our team know and we'll help coordinate your visit. Just ask when you call or request an appointment.",
      image: IMG.transport, imageAlt: "Transportation Assistance",
    },
    professional: {
      h2: "Professional and Compassionate Care You Can Trust",
      body: "Palm Wellness Center is led by licensed medical and rehabilitation providers who are committed to safe, patient-centered primary care. Our team follows established clinical standards and prioritizes clear communication, thoughtful treatment planning, and continuity of care. Patients can be seen in person or through secure telehealth visits for select primary care and follow-up appointments. Palm Wellness Center proudly serves Tampa and nearby communities from our location at 1004 W Linebaugh Ave Ste A, Tampa, FL 33612.",
      image: IMG.professional, imageAlt: "Professional and Compassionate Care You Can Trust",
    },
    why: {
      h2: "Why Patients Choose Palm Wellness Center",
      intro: "Palm Wellness Center provides experienced, coordinated, and compassionate care that addresses the root cause of dysfunction—not just symptoms. Our integrated approach combines physical therapy, chiropractic care, and primary care to restore movement, improve body mechanics, and support your body's natural healing capacity.",
      items: [
        { label: "Expert Care Team", text: "Licensed physicians, physical therapist, and chiropractor" },
        { label: "Integrated Services", text: "Coordinated physical therapy, chiropractic care, and primary care" },
        { label: "Natural Healing Approach", text: "Non-surgical, drug-free injury recovery" },
        { label: "Complete Wellness Options", text: "Medical weight loss, IV therapy, and telehealth visits" },
        { label: "Bilingual Support", text: "English and Spanish-speaking care team" },
        { label: "Free Transportation", text: "Available for eligible patients across Tampa Bay" },
        { label: "Flexible Scheduling", text: "Same-day appointments available" },
      ],
      linkLabel: "Meet Our Care Team",
      linkHref: "/about-us/",
    },
  },
  es: {
    hero: {
      heading: "Recupérate Más Rápido, Muévete Mejor, Siéntete Más Fuerte",
      badges: ["Médicos y fisioterapeuta licenciados", "Atención bilingüe (inglés/español)", "Transporte gratuito disponible", "Citas el mismo día"],
      requestLabel: "Solicitar Cita",
      ctaContact: "Contáctanos", ctaContactHref: "/es/contacto/",
      ctaPhone: "(813) 443-5370",
      tagline: "Rehabilitación integrada, atención primaria y pérdida de peso médica, todo bajo un mismo techo.",
      image: IMG.hero, imageAlt: "Recupérate Más Rápido, Muévete Mejor, Siéntete Más Fuerte",
    },
    intro: {
      h1: "Recuperación de Lesiones y Atención de Bienestar en Tampa, FL",
      body: "Palm Wellness Center ofrece atención coordinada y no quirúrgica para la recuperación de lesiones y el bienestar a largo plazo. Nuestros médicos, fisioterapeuta y quiropráctico licenciados trabajan juntos para restaurar el rango de movimiento, mejorar la mecánica corporal y apoyar la capacidad natural de curación de tu cuerpo, desde la rehabilitación por accidentes de auto hasta la pérdida de peso médica y la atención primaria.",
      cta: "Solicitar Cita", scheduleLabel: "Agendar Cita Médica",
      image: IMG.intro, imageAlt: "Recuperación de Lesiones y Atención de Bienestar en Tampa, FL",
    },
    services: {
      h2: "Nuestros Servicios",
      image: IMG.services, imageAlt: "Fisioterapia en Tampa",
      items: [
        { title: "Atención Primaria en Tampa", icon: "stethoscope", href: "/es/atencion-primaria/", linkLabel: "Más Información Sobre Atención Primaria", body: "Atención médica integral para el manejo de enfermedades crónicas, salud preventiva y apoyo en lesiones. Trata presión arterial, diabetes, desequilibrio hormonal e inflamación, con visitas en clínica y por telesalud disponibles." },
        { title: "Atención Quiropráctica en Tampa", icon: "spine", href: "/es/quiropractico/", linkLabel: "Más Información Sobre Atención Quiropráctica", body: "Ajustes de columna y terapia manual para restaurar la alineación adecuada y mejorar la movilidad articular. Apoya la curación natural de accidentes de auto, caídas, lesiones deportivas, dolores de cabeza y malestar crónico de espalda o cuello." },
        { title: "Fisioterapia en Tampa", icon: "activity", href: "/es/fisioterapia/", linkLabel: "Más Información Sobre Fisioterapia", body: "Recupera el movimiento, la fuerza y el equilibrio tras una lesión mediante terapia manual y ejercicios terapéuticos. Ayuda a tu cuerpo a sanar de forma natural y reduce el riesgo de recaída." },
        { title: "Pérdida de Peso Médica en Tampa", icon: "scale", href: "/es/perdida-de-peso-medica/", linkLabel: "Explorar Pérdida de Peso Médica", body: "Pérdida de peso supervisada por médico, personalizada según tu historial médico, metabolismo y objetivos. El tratamiento incluye medicamentos aprobados por la FDA (semaglutida, tirzepatida), asesoramiento nutricional y monitoreo." },
        { title: "Terapia IV e Inyecciones de Vitaminas en Tampa - Próximamente", icon: "drop", body: "Terapia de vitaminas IV e inyecciones supervisadas médicamente para apoyar la hidratación, la salud inmunológica, la energía y la recuperación. Complementa la fisioterapia, la pérdida de peso y el cuidado de enfermedades crónicas." },
      ],
    },
    rehab: {
      h2: "Rehabilitación y Recuperación de Lesiones",
      body: "La rehabilitación temprana es fundamental después de una lesión. La atención coordinada de quiropráctica y fisioterapia ayuda a reducir el dolor, recuperar la movilidad y favorecer la funcionalidad a largo plazo.",
      items: [
        { title: "Atención por Accidente de Auto", icon: "car", href: "/es/rehabilitacion-de-accidentes-automovilisticos/", linkLabel: "Más información sobre Rehabilitación de Accidentes de Auto", body: "Rehabilitación personalizada enfocada en restaurar la movilidad, corregir la mecánica post-lesión y apoyar la curación natural." },
        { title: "Lesiones por Caídas", icon: "person", href: "/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/", linkLabel: "Más información sobre Tratamiento de Resbalones y Caídas", body: "Atención específica para restaurar el equilibrio, mejorar la estabilidad articular y tratar la tensión de tejidos blandos mediante ejercicio terapéutico y terapia manual." },
      ],
    },
    step: {
      h2: "Da el Primer Paso Para Sentirte Mejor",
      body: "Nuestro objetivo es ayudarte a sentirte mejor, moverte con más facilidad y volver a disfrutar tu vida diaria. Con opciones accesibles y apoyo de transporte, Palm Wellness Center está aquí para ayudarte.",
      requestLabel: "Solicitar Cita",
      phoneLabel: "(813) 443-5370",
    },
    serving: {
      h2: "Sirviendo con Orgullo a Tampa y sus Vecindarios Aledaños",
      intro: "Ubicado en el corazón de Tampa en 1004 W Linebaugh Ave, Palm Wellness Center atiende pacientes de todo el condado de Hillsborough y comunidades aledañas, incluyendo:",
      col1: ["Seminole Heights", "Forest Hills", "Carrollwood"],
      col2: ["Town 'N' Country", "Temple Terrace", "Brandon", "Westchase"],
      outro: "El transporte gratuito está disponible para pacientes elegibles en toda el área de Tampa Bay, lo que hace que nuestra clínica, ubicada de forma central, sea fácil de alcanzar, ya sea que estés recuperándote de una lesión, manejando dolor crónico o iniciando un programa de pérdida de peso médica. Sin importar dónde vivas en la región, la atención de calidad está a tu alcance.",
    },
    transport: {
      h2: "Asistencia de Transporte",
      lead: "¿Necesitas transporte? Nosotros te ayudamos.",
      body: "Palm Wellness Center ofrece transporte gratuito de ida y vuelta a las citas para pacientes elegibles en toda el área de Tampa Bay. Si tiene dificultades con el transporte, comuníquese con nuestro equipo y le ayudaremos a coordinar su visita. Solo tienes que preguntar cuando llames o solicites una cita.",
      image: IMG.transport, imageAlt: "Asistencia de Transporte",
    },
    professional: {
      h2: "Atención Profesional y Compasiva en la Que Puedes Confiar",
      body: "Palm Wellness Center está dirigido por profesionales médicos y de rehabilitación con licencia, comprometidos con una atención primaria segura y centrada en el paciente. Nuestro equipo sigue estándares clínicos establecidos y prioriza la comunicación clara, la planificación cuidadosa del tratamiento y la continuidad de la atención. Los pacientes pueden ser atendidos en persona o mediante telemedicina segura para ciertas citas de atención primaria y seguimiento. Palm Wellness Center se enorgullece de servir a Tampa y las comunidades cercanas desde nuestra ubicación en 1004 W Linebaugh Ave Ste A, Tampa, FL 33612.",
      image: IMG.professional, imageAlt: "Atención Profesional y Compasiva en la Que Puedes Confiar",
    },
    why: {
      h2: "Por Qué los Pacientes Eligen Palm Wellness Center",
      intro: "Palm Wellness Center ofrece atención experimentada, coordinada y compasiva que aborda la causa raíz de la disfunción, no solo los síntomas. Nuestro enfoque integrado combina fisioterapia, quiropráctica y atención primaria para restaurar el movimiento, mejorar la mecánica corporal y apoyar la capacidad natural de curación de tu cuerpo.",
      items: [
        { label: "Equipo de Atención Experto", text: "Médicos, fisioterapeuta y quiropráctico licenciados" },
        { label: "Servicios Integrados", text: "Fisioterapia, quiropráctica y atención primaria coordinadas" },
        { label: "Enfoque de Curación Natural", text: "Recuperación de lesiones sin cirugía ni medicamentos" },
        { label: "Opciones Completas de Bienestar", text: "Pérdida de peso médica, terapia IV y citas de telesalud" },
        { label: "Apoyo Bilingüe", text: "Equipo de atención en inglés y español" },
        { label: "Transporte Gratuito", text: "Disponible para pacientes elegibles en toda el área de Tampa Bay" },
        { label: "Horarios Flexibles", text: "Citas el mismo día disponibles" },
      ],
      linkLabel: "Conoce Nuestro Equipo",
      linkHref: "/es/acerca-de-nosotros/",
    },
  },
};

export { APPOINTMENT_URL, PHONE_TEL };
