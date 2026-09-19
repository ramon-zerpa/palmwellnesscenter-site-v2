// Palm Wellness Center — i18n dictionary & navigation.
// EN at root ("/..."), ES under "/es/..." with fully localized slugs.

export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

/* ---------------- Navigation (per language, with dropdowns) ---------------- */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const nav: Record<Lang, NavItem[]> = {
  en: [
    {
      label: "Primary Care",
      href: "/primary-care/",
      children: [
        { label: "Medical Weight Loss", href: "/medical-weight-loss/" },
        { label: "Chronic Condition Care", href: "/primary-care/chronic-condition-management/" },
        { label: "Preventive Care", href: "/primary-care/preventive-care/" },
        { label: "Telemedicine", href: "/primary-care/telemedicine/" },
        { label: "Membership", href: "/primary-care/membership/" },
      ],
    },
    { label: "IV Therapy", href: "/iv-therapy/" },
    {
      label: "Physical Rehabilitation",
      href: "/physical-rehabilitation/",
      children: [
        { label: "Auto Accident Rehabilitation", href: "/car-accident-rehabilitation/" },
        { label: "Slip and Fall Rehabilitation", href: "/slip-and-fall-injury-treatment/" },
        { label: "Massage Therapy", href: "/massage-therapy/" },
        { label: "Ultrasound Therapy", href: "/therapeutic-ultrasound-treatment/" },
        { label: "Therapeutic Exercises", href: "/therapeutic-exercises/" },
        { label: "Chiropractor", href: "/chiropractor/" },
      ],
    },
    { label: "About Us", href: "/about-us/" },
    { label: "Contact", href: "/contact/" },
    { label: "Blog", href: "/news-blog/" },
  ],
  es: [
    {
      label: "Atención Primaria",
      href: "/es/atencion-primaria/",
      children: [
        { label: "Pérdida de Peso Médica", href: "/es/perdida-de-peso-medica/" },
        { label: "Enfermedades Crónicas", href: "/es/atencion-primaria/manejo-enfermedades-cronicas/" },
        { label: "Atención Preventiva", href: "/es/atencion-primaria/atencion-preventiva/" },
        { label: "Telemedicina", href: "/es/atencion-primaria/telemedicina/" },
        { label: "Membresía", href: "/es/atencion-primaria/membresia/" },
      ],
    },
    { label: "Terapia IV", href: "/es/terapia-iv/" },
    {
      label: "Rehabilitación Física",
      href: "/es/fisioterapia/",
      children: [
        { label: "Rehabilitación de Accidentes de Auto", href: "/es/rehabilitacion-de-accidentes-automovilisticos/" },
        { label: "Rehabilitación de Resbalones y Caídas", href: "/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/" },
        { label: "Terapia de Masajes", href: "/es/terapia-de-masajes/" },
        { label: "Ultrasonido Terapéutico", href: "/es/tratamiento-de-ultrasonido-terapeutico/" },
        { label: "Ejercicios Terapéuticos", href: "/es/ejercicios-terapeuticos/" },
        { label: "Quiropráctico", href: "/es/quiropractico/" },
      ],
    },
    { label: "Acerca de Nosotros", href: "/es/acerca-de-nosotros/" },
    { label: "Contacto", href: "/es/contacto/" },
    { label: "Blog", href: "/es/blog-de-noticias/" },
  ],
};

/* ---------------- UI string dictionary ---------------- */

export const translations = {
  en: {
    "skip.toContent": "Skip to content",
    "lang.switch": "ES",
    "lang.switchAria": "Ver esta página en español",

    // Top bar
    "top.address": "1004 W Linebaugh Ave Ste A, Tampa, FL 33612",
    "top.hours": "Mon - Fri, 10 AM - 7 PM. Saturday by appointment",
    "top.licenses": "Licenses HCCA10302 & MM28422",
    "top.follow": "Follow Us",

    // Header / CTA
    "cta.phone": "(813) 443-5370",
    "cta.contact": "Contact Us",
    "cta.appointment": "Make Appointment",
    "cta.request": "Request Appointment",
    "cta.schedule": "Schedule Medical Appointment",
    "cta.learnMore": "Learn More",
    "nav.menu": "Menu",
    "nav.close": "Close menu",

    // Footer
    "footer.tagline": "Your first choice in rehabilitation treatments and general medicine in Tampa, Florida.",
    "footer.transportTitle": "Transportation Available",
    "footer.transportText": "If you need a ride to our facility for a treatment or consultation, or back home after your visit, let us know and we will cover your transportation.",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.hours": "Monday - Friday 10 AM - 7 PM\nSaturday by Appointment",
    "footer.licensesLabel": "Licenses",
    "footer.licenses": "HCCA10302 & MM28422",
    "footer.followUs": "Follow Us",
    "footer.fax": "(813) 443-5604",
    "footer.copyright": "Palm Wellness Center LLC. All Rights Reserved",
    "footer.hipaa": "HIPAA Policy",
    "footer.privacy": "Privacy Policy",

    // Contact form
    "form.title": "Request an Appointment",
    "form.name": "Name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.message": "Message",
    "form.submit": "Send Message",
    "form.requiredNote": "Fields marked with * are required.",
    "form.sending": "Sending…",
    "form.success": "Thank you — we received your message and will reply within one business day.",
    "form.errorGeneric": "Something went wrong. Please try again.",
    "form.errorNetwork": "Network error. Please try again.",

    // Contact page
    "contact.h1": "Contact",
    "contact.lead": "Get in touch with our team",
    "contact.infoTitle": "Contact Information",
    "contact.infoIntro": "Have a question or want to schedule a visit? Reach our team using the details below, or send us a message and we'll get back to you.",
    "contact.formTitle": "Contact Form",
    "contact.locationTitle": "Our Location",
    "contact.businessProfiles": "Business Profiles",
    "contact.fName": "Your Name",
    "contact.fEmail": "Your Email",
    "contact.fMessage": "Your Message",

    // Blog
    "blog.title": "News & Blog",
    "blog.readMore": "Read More",
    "blog.backToBlog": "Back to Blog",
    "blog.related": "Related Articles",
    "blog.allArticles": "All Articles",
    "blog.published": "Published",
  },
  es: {
    "skip.toContent": "Saltar al contenido",
    "lang.switch": "EN",
    "lang.switchAria": "View this page in English",

    "top.address": "1004 W Linebaugh Ave Ste A, Tampa, FL 33612",
    "top.hours": "Lun - Vie, 10 AM - 7 PM. Sábado con cita previa",
    "top.licenses": "Licencias HCCA10302 & MM28422",
    "top.follow": "Síguenos",

    "cta.phone": "(813) 443-5370",
    "cta.contact": "Contáctanos",
    "cta.appointment": "Solicitar Cita",
    "cta.request": "Solicitar Cita",
    "cta.schedule": "Agendar Cita Médica",
    "cta.learnMore": "Más Información",
    "nav.menu": "Menú",
    "nav.close": "Cerrar menú",

    "footer.tagline": "Su primera opción en tratamientos de rehabilitación en Tampa, Florida.",
    "footer.transportTitle": "Transporte Disponible",
    "footer.transportText": "Si necesitas transporte a nuestras instalaciones para un tratamiento o consulta, o de regreso a casa después de tu visita, avísanos y cubriremos tu transporte.",
    "footer.services": "Servicios",
    "footer.contact": "Contacto",
    "footer.hours": "Lunes - Viernes 10 AM - 7 PM\nSábado con cita previa",
    "footer.licensesLabel": "Licencias",
    "footer.licenses": "HCCA10302 & MM28422",
    "footer.followUs": "Síguenos",
    "footer.fax": "(813) 443-5604",
    "footer.copyright": "Palm Wellness Center LLC. Todos los derechos reservados",
    "footer.hipaa": "Política de HIPAA",
    "footer.privacy": "Política de Privacidad",

    "form.title": "Solicita una Cita",
    "form.name": "Nombre",
    "form.email": "Correo electrónico",
    "form.phone": "Teléfono",
    "form.message": "Mensaje",
    "form.submit": "Enviar Mensaje",
    "form.requiredNote": "Los campos marcados con * son obligatorios.",
    "form.sending": "Enviando…",
    "form.success": "Gracias — recibimos tu mensaje y responderemos en un día hábil.",
    "form.errorGeneric": "Algo salió mal. Inténtalo de nuevo.",
    "form.errorNetwork": "Error de red. Inténtalo de nuevo.",

    // Contact page
    "contact.h1": "Contacto",
    "contact.lead": "Ponte en contacto con nuestro equipo",
    "contact.infoTitle": "Información del contacto",
    "contact.infoIntro": "¿Tienes una pregunta o quieres agendar una visita? Comunícate con nuestro equipo usando los datos a continuación, o envíanos un mensaje y te responderemos.",
    "contact.formTitle": "Formulario de contacto",
    "contact.locationTitle": "Nuestra Ubicación",
    "contact.businessProfiles": "Perfiles de Negocio",
    "contact.fName": "Su Nombre",
    "contact.fEmail": "Su Email",
    "contact.fMessage": "Su Mensaje",

    "blog.title": "Noticias y Blog",
    "blog.readMore": "Leer Más",
    "blog.backToBlog": "Volver al Blog",
    "blog.related": "Artículos Relacionados",
    "blog.allArticles": "Todos los Artículos",
    "blog.published": "Publicado",
  },
} as const;
