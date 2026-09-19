export interface PriceRow { name: string; meta?: string; price: string; }
export interface PriceGroup { title: string; rows: PriceRow[]; }
export interface PricingContent {
  title: string; desc: string; eyebrow: string; h1: string; lead: string; note: string;
  groups: PriceGroup[];
}

export const pricing: Record<"en" | "es", PricingContent> = {
  en: {
    title: "Services & Pricing in Tampa | Palm Wellness Center",
    desc: "Transparent pricing for primary care visits, telehealth, labs, medical weight loss, and IV therapy in Tampa, FL. Membership $99 initial + $39/month.",
    eyebrow: "Services & Pricing",
    h1: "Transparent pricing, no surprises",
    lead: "Clear prices for visits, labs, procedures, and IV therapy - membership starts at $99 initial + $39/month.",
    note: "Most major insurance plans are accepted for covered services, and insurance billing is available when applicable.",
    groups: [
      { title: "Primary Care Visits", rows: [
        { name: "Monthly Medical Membership", meta: "Membership", price: "$99 initial + $39/mo" },
        { name: "Office Visit", meta: "45 min", price: "$39" },
        { name: "New Patient Medical Visit", meta: "45 min", price: "$65" },
        { name: "Follow-up Medical Visit", meta: "30 min", price: "$59" },
        { name: "Telehealth Medical Visit", meta: "45 min", price: "$55" },
        { name: "Telehealth Follow-up Visit", meta: "30 min", price: "$45" },
      ] },
      { title: "Labs & Testing", rows: [
        { name: "Annual Preventive Assessment with Basic Panel", meta: "30 min", price: "$145" },
        { name: "Complete Hormonal Profile", meta: "30 min", price: "$189" },
        { name: "Comprehensive Metabolic Panel", meta: "30 min", price: "$250" },
      ] },
      { title: "Weight Loss & Procedures", rows: [
        { name: "Medical Weight Loss Program", meta: "60 min", price: "$299" },
        { name: "Lipotropic Fat Metabolism Injection", meta: "30 min", price: "$25" },
      ] },
      { title: "IV Therapy", rows: [
        { name: "Beauty IV", meta: "90 min", price: "$170" },
        { name: "Mayer Signature IV", meta: "90 min", price: "$170" },
        { name: "NAD+ Weekly Optimization Protocol", meta: "30 min", price: "$199" },
      ] },
    ],
  },
  es: {
    title: "Servicios y Precios en Tampa | Palm Wellness Center",
    desc: "Precios transparentes para consultas de atención primaria, telemedicina, laboratorios, pérdida de peso y terapia IV en Tampa, FL. Membresía $99 inicial + $39/mes.",
    eyebrow: "Servicios y Precios",
    h1: "Precios transparentes, sin sorpresas",
    lead: "Precios claros para consultas, laboratorios, procedimientos y terapia IV - la membresía comienza en $99 inicial + $39/mes.",
    note: "Aceptamos la mayoría de seguros para servicios cubiertos, y la facturación al seguro está disponible cuando aplica.",
    groups: [
      { title: "Consultas de Atención Primaria", rows: [
        { name: "Membresía Médica Mensual", meta: "Membresía", price: "$99 inicial + $39/mes" },
        { name: "Consulta de Oficina (Office Visit)", meta: "45 min", price: "$39" },
        { name: "Visita de Paciente Nuevo", meta: "45 min", price: "$65" },
        { name: "Consulta de Seguimiento", meta: "30 min", price: "$59" },
        { name: "Consulta Médica por Telemedicina", meta: "45 min", price: "$55" },
        { name: "Seguimiento por Telemedicina", meta: "30 min", price: "$45" },
      ] },
      { title: "Laboratorios y Pruebas", rows: [
        { name: "Evaluación Preventiva Anual con Panel Básico", meta: "30 min", price: "$145" },
        { name: "Perfil Hormonal Completo", meta: "30 min", price: "$189" },
        { name: "Panel Metabólico Completo", meta: "30 min", price: "$250" },
      ] },
      { title: "Pérdida de Peso y Procedimientos", rows: [
        { name: "Programa de Pérdida de Peso Médica", meta: "60 min", price: "$299" },
        { name: "Inyección Lipotrópica (Metabolismo de Grasas)", meta: "30 min", price: "$25" },
      ] },
      { title: "Terapia IV", rows: [
        { name: "Beauty IV", meta: "90 min", price: "$170" },
        { name: "Mayer Signature IV", meta: "90 min", price: "$170" },
        { name: "Protocolo de Optimización NAD+", meta: "30 min", price: "$199" },
      ] },
    ],
  },
};
