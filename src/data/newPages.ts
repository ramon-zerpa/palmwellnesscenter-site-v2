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
  "/membership/": {
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
  "/es/membresia/": {
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

};
