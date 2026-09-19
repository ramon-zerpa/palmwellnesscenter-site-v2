import { APPOINTMENT_URL, PHONE_TEL } from "../i18n/utils";

type PageLang = "en" | "es";
type SectionStyle = {
  bg: string;
  align: string;
  imgSide: string;
  hc?: string;
  pair?: string;
  layout?: string;
};

const normalizeHeading = (heading: string) =>
  heading.toLowerCase().replace(/[^a-z0-9]/g, "");

const buildStyles = (entries: Array<[string, SectionStyle]>) =>
  Object.fromEntries(entries.map(([heading, style]) => [normalizeHeading(heading), style]));

const actionButtons = (lang: PageLang) => [
  {
    label: lang === "es" ? "Solicitar una Cita" : "Request Appointment",
    href: APPOINTMENT_URL,
    kind: "primary",
  },
  {
    label: "(813) 443-5370",
    href: PHONE_TEL,
    kind: "phone",
  },
];

const divider = (lang: PageLang, color: "green" | "blue", title: string, copy: string) => ({
  t: "band",
  color,
  lines: [title, copy],
  buttons: actionButtons(lang),
});

const englishPage = {
  slug: "physical-rehabilitation",
  path: "/physical-rehabilitation/",
  lang: "en" as const,
  title: "Physical Rehabilitation in Tampa, FL | Palm Wellness Center",
  description:
    "Recover from injury, pain, or limited mobility with personalized physical rehabilitation in Tampa. Explore treatment options and request an evaluation.",
  ogImage: "/images/top-physical-rehabilitation-clinic-in-tampa-bay-min.jpg",
  blocks: [
    { t: "h1", text: "Physical Rehabilitation in Tampa" },
    { t: "p", html: "<strong>Helping You Recover, Move Better, and Get Back to Living</strong>" },
    {
      t: "p",
      html: "Whether you’re recovering from an injury, managing chronic pain, or looking to improve your mobility, Palm Wellness Center provides personalized physical rehabilitation designed around your needs and recovery goals.",
    },
    {
      t: "badges",
      items: [
        "Back or neck pain",
        "Joint pain or stiffness",
        "Limited mobility",
        "Recovery after an auto accident or slip and fall",
        "Muscle strains or soft tissue injuries",
        "Difficulty returning to normal daily activities",
      ],
    },
    { t: "cta", buttons: actionButtons("en") },

    { t: "h2", text: "Find Your Rehabilitation Path" },
    { t: "h3", text: "Recovering After a Car Accident?" },
    {
      t: "p",
      html: "Start with <a href=\"/car-accident-rehabilitation/\">Auto Accident Rehabilitation</a>.",
    },
    { t: "h3", text: "Hurt After a Slip and Fall?" },
    {
      t: "p",
      html: "Explore <a href=\"/slip-and-fall-injury-treatment/\">Slip and Fall Rehabilitation</a>.",
    },
    { t: "h3", text: "Dealing With Pain, Stiffness, or Limited Mobility?" },
    {
      t: "p",
      html: "<a href=\"/contact/\">Schedule a physical rehabilitation evaluation</a>.",
    },
    { t: "h3", text: "Need a Specific Treatment?" },
    {
      t: "p",
      html: "Learn about <a href=\"/chiropractor/\">Chiropractic Care</a>, <a href=\"/therapeutic-exercises/\">Therapeutic Exercises</a>, <a href=\"/massage-therapy/\">Massage Therapy</a>, or <a href=\"/therapeutic-ultrasound-treatment/\">Therapeutic Ultrasound</a>.",
    },

    { t: "h2", text: "What Is Physical Rehabilitation?" },
    {
      t: "img",
      src: "/images/what-is-physical-therapy-benefits-and-types.webp",
      alt: "Physical rehabilitation provider helping a patient improve mobility",
    },
    {
      t: "p",
      html: "Physical rehabilitation is a coordinated recovery program designed to help patients improve movement, strength, flexibility, balance, and daily function after an injury, accident, surgery, or mobility-related condition.",
    },
    {
      t: "p",
      html: "It is not one single treatment. Instead, rehabilitation may combine different services based on your symptoms, recovery goals, and how your body responds to care.",
    },
    {
      t: "p",
      html: "For some patients, rehabilitation may focus on guided movement and strengthening. For others, care may include chiropractic treatment, massage therapy, ultrasound therapy, mobility work, and medical follow-up.",
    },
    {
      t: "p",
      html: "The goal is to help you move better, feel more confident, and return to everyday activities safely.",
    },

    { t: "h2", text: "Rehabilitation That Looks at the Whole Picture" },
    {
      t: "img",
      src: "/images/who-we-help-injury-recovery-surgery-rehab-and-more.webp",
      alt: "Personalized rehabilitation care supporting a patient’s full recovery",
    },
    { t: "p", html: "Pain can affect more than one part of your life." },
    {
      t: "p",
      html: "An injury may make it harder to work, sleep, drive, exercise, lift groceries, care for family, or enjoy your normal routine. Even small movements can start to feel more tiring when your body is not moving the way it should.",
    },
    {
      t: "p",
      html: "At Palm Wellness Center, rehabilitation looks at how your muscles, joints, movement patterns, and overall health work together. Instead of focusing only on where it hurts today, we build a plan that supports your recovery over time.",
    },
    {
      t: "p",
      html: "Whether your symptoms started after an accident, a fall, surgery, repetitive strain, or everyday wear and tear, our goal is to help you move more comfortably and confidently.",
    },

    divider(
      "en",
      "green",
      "A Rehabilitation Plan Built Around You",
      "Talk with our team about your symptoms, goals, and the right place to begin.",
    ),

    { t: "h2", text: "Choose Your Rehabilitation Path" },
    {
      t: "p",
      html: "Physical rehabilitation is the hub for several recovery-focused services at Palm Wellness Center. Some patients need a structured injury recovery program. Others need a specific treatment service as part of a larger care plan.",
    },
    { t: "p", html: "Use this page to find the starting point that best fits your needs." },

    { t: "h2", text: "Rehabilitation Programs" },
    { t: "h3", text: "Auto Accident Rehabilitation" },
    {
      t: "p",
      html: "Car accidents can cause pain, stiffness, soft tissue injuries, whiplash, headaches, back pain, neck pain, and movement problems that may not fully show up right away.<br><br>Our <a href=\"/car-accident-rehabilitation/\">auto accident rehabilitation</a> program helps patients recover after a crash with care focused on mobility, range of motion, strength, comfort, and daily function.",
    },
    { t: "h3", text: "Slip and Fall Rehabilitation" },
    {
      t: "p",
      html: "A fall can lead to joint pain, muscle strain, stiffness, balance issues, or reduced confidence with movement.<br><br>Our <a href=\"/slip-and-fall-injury-treatment/\">slip and fall rehabilitation</a> services help patients restore mobility, improve comfort, rebuild strength, and return to daily activities after a fall-related injury.",
    },
    {
      t: "p",
      html: "If you were recently in a crash and need an initial evaluation, visit our <a href=\"/car-accident-treatment/\">car accident treatment in Tampa</a> page.",
    },

    { t: "h2", text: "Treatments Used During Rehabilitation" },
    {
      t: "p",
      html: "Your provider may recommend one or more treatment services depending on your symptoms, condition, and progress.",
    },
    { t: "h3", text: "Chiropractic Care" },
    {
      t: "p",
      html: "<a href=\"/chiropractor/\">Tampa chiropractic care</a> may help improve joint function, reduce stiffness, and support better movement through gentle spinal and extremity adjustments.<br><br>Chiropractic care is often used as one part of a broader rehabilitation plan.",
    },
    { t: "h3", text: "Therapeutic Exercises" },
    {
      t: "p",
      html: "<a href=\"/therapeutic-exercises/\">Therapeutic exercises</a> are guided movements designed to improve strength, flexibility, balance, coordination, and range of motion.<br><br>Your exercise plan may change as your body gets stronger and your movement improves.",
    },
    { t: "h3", text: "Massage Therapy" },
    {
      t: "p",
      html: "<a href=\"/massage-therapy/\">Massage therapy</a> may help reduce muscle tension, improve circulation, and support soft tissue comfort during recovery.<br><br>It is often combined with other rehabilitation services to help patients move more comfortably.",
    },
    { t: "h3", text: "Therapeutic Ultrasound" },
    {
      t: "p",
      html: "<a href=\"/therapeutic-ultrasound-treatment/\">Therapeutic ultrasound</a> uses sound waves to deliver gentle heat into deeper tissues.<br><br>When appropriate, it may help support circulation, reduce stiffness, and assist soft tissue recovery as part of a personalized rehabilitation plan.",
    },

    { t: "h2", text: "Is Physical Rehabilitation Right for You?" },
    {
      t: "img",
      src: "/images/conditions-we-treat-at-our-tampa-rehabilitation-clinic.webp",
      alt: "Conditions treated through physical rehabilitation in Tampa",
    },
    { t: "p", html: "Physical rehabilitation may be appropriate if you are dealing with:" },
    {
      t: "ul",
      items: [
        "Back or neck pain",
        "Joint pain or stiffness",
        "Muscle strains or soft tissue injuries",
        "Limited flexibility or mobility",
        "Pain after an auto accident",
        "Injuries from a slip and fall",
        "Reduced range of motion",
        "Weakness after an injury",
        "Trouble walking, bending, lifting, driving, or working comfortably",
        "Difficulty returning to normal daily activities",
        "Recurring pain that keeps interfering with work, exercise, hobbies, or sleep",
      ],
    },
    {
      t: "p",
      html: "Every patient is different, so your care begins with an evaluation instead of a one-size-fits-all plan.",
    },

    divider(
      "en",
      "blue",
      "Ready to Understand Your Rehabilitation Options?",
      "Request an evaluation and get a care plan based on your condition, movement, and goals.",
    ),

    { t: "h2", text: "How Rehabilitation Works at Palm Wellness Center" },
    { t: "p", html: "Your rehabilitation plan is built around your needs, not a preset list of treatments." },
    { t: "h3", text: "1. Evaluation" },
    {
      t: "p",
      html: "Your provider reviews your symptoms, health history, previous injuries, mobility concerns, and recovery goals.",
    },
    { t: "h3", text: "2. Functional Assessment" },
    {
      t: "p",
      html: "We look at how your condition affects movement, strength, flexibility, balance, range of motion, and daily activities.",
    },
    { t: "h3", text: "3. Personalized Plan" },
    {
      t: "p",
      html: "Your provider recommends a care plan that may include one or more rehabilitation services based on your needs.",
    },
    { t: "h3", text: "4. Guided Treatment" },
    {
      t: "p",
      html: "Your care may include chiropractic care, therapeutic exercises, massage therapy, therapeutic ultrasound, mobility work, or medical coordination when appropriate.",
    },
    { t: "h3", text: "5. Progress Monitoring" },
    {
      t: "p",
      html: "As you improve, your provider may adjust your plan so care continues to match your progress.",
    },
    { t: "h3", text: "6. Return-to-Activity Support" },
    {
      t: "p",
      html: "The goal is to help you return to daily activities with better movement, more confidence, and less discomfort.",
    },

    { t: "h2", text: "Why Patients Choose Palm Wellness Center" },
    {
      t: "p",
      html: "Patients choose Palm Wellness Center because rehabilitation here is designed around the person, not just the injury.",
    },
    { t: "h3", text: "Coordinated Care Under One Roof" },
    {
      t: "p",
      html: "Palm Wellness Center brings rehabilitation, chiropractic care, therapeutic exercises, massage therapy, therapeutic ultrasound, and medical support together in one clinic.",
    },
    { t: "h3", text: "Personalized Treatment Plans" },
    {
      t: "p",
      html: "Your plan is based on your symptoms, condition, lifestyle, progress, and recovery goals.",
    },
    { t: "h3", text: "Focus on Movement and Function" },
    {
      t: "p",
      html: "Our goal is not only to reduce discomfort. We also focus on helping you move better, rebuild strength, improve mobility, and return to daily life.",
    },
    { t: "h3", text: "Bilingual Care" },
    { t: "p", html: "Our team proudly supports patients in English and Spanish." },
    { t: "h3", text: "Transportation Assistance" },
    {
      t: "p",
      html: "Transportation may be available for eligible patients who need help getting to and from appointments.",
    },
    { t: "h3", text: "Convenient Tampa Location" },
    {
      t: "p",
      html: "Palm Wellness Center serves Tampa and nearby communities from our clinic at <strong>1004 W Linebaugh Ave Ste A, Tampa, FL 33612</strong>.",
    },

    { t: "h2", text: "Experienced Medical and Rehabilitation Team" },
    {
      t: "img",
      src: "/images/integrated-wellness-services-chiropractor.webp",
      alt: "Experienced medical and rehabilitation team at Palm Wellness Center",
    },
    {
      t: "p",
      html: "Physical rehabilitation at Palm Wellness Center is supported by licensed medical and rehabilitation providers focused on safe, coordinated care.",
    },
    {
      t: "p",
      html: "Our team works with patients recovering from injuries, managing pain, rebuilding mobility, or trying to return to daily activities with more confidence.",
    },
    {
      t: "p",
      html: "Your plan may include rehabilitation services, chiropractic care, therapeutic exercises, soft tissue support, ultrasound therapy, and medical coordination when appropriate.",
    },
    {
      t: "p",
      html: "This team-based approach helps make Palm Wellness Center a trusted wellness center in Tampa for patients who need more than a single treatment option. <a href=\"/about-us/\">Learn more about Palm Wellness Center</a>.",
    },

    { t: "h2", text: "How to Get Started with Physical Rehabilitation" },
    { t: "h3", text: "Call to Schedule" },
    {
      t: "p",
      html: "Call <a href=\"tel:8134435370\">(813) 443-5370</a> or request an appointment. Our team will help schedule your physical rehabilitation evaluation.",
    },
    { t: "h3", text: "Complete Your First Visit" },
    {
      t: "p",
      html: "Your provider will review your symptoms, health history, movement, strength, flexibility, and recovery goals.",
    },
    { t: "h3", text: "Start Your Care Plan" },
    {
      t: "p",
      html: "Your rehabilitation plan may include one or more treatment services depending on your condition and progress.",
    },
    { t: "h3", text: "Adjust Care as You Improve" },
    {
      t: "p",
      html: "Your provider will continue monitoring your progress and updating your plan as your body responds to care.",
    },

    divider(
      "en",
      "green",
      "Start Your Rehabilitation Plan Today",
      "Call Palm Wellness Center or request an appointment to schedule your first evaluation.",
    ),

    { t: "h2", text: "Professional and Compassionate Care You Can Trust" },
    {
      t: "p",
      html: "Palm Wellness Center is committed to promoting health and wellness in the Tampa community through personalized rehabilitation, coordinated care, and clear communication.",
    },
    { t: "p", html: "Patients are seen in person at our Tampa clinic:" },
    {
      t: "p",
      html: "<strong>Palm Wellness Center</strong><br>1004 W Linebaugh Ave Ste A<br>Tampa, FL 33612<br>Phone: <a href=\"tel:8134435370\">(813) 443-5370</a>",
    },
    { t: "h3", text: "Hours of Operation" },
    {
      t: "p",
      html: "<strong>Monday–Friday:</strong> 10 AM–7 PM<br><strong>Saturday:</strong> By appointment<br><strong>Sunday:</strong> Closed",
    },
    {
      t: "p",
      html: "Palm Wellness Center provides holistic health services in Tampa for patients seeking recovery support, rehabilitation care, and wellness-focused treatment in one location.",
    },

    { t: "h2", text: "Transportation Assistance" },
    {
      t: "img",
      src: "/images/palm-wellness-center-transportation-available.webp",
      alt: "Transportation assistance for rehabilitation patients in Tampa",
    },
    { t: "p", html: "<strong>Need a ride? We’ve got you covered.</strong>" },
    {
      t: "p",
      html: "Palm Wellness Center offers transportation assistance for eligible patients across the Tampa Bay area. If transportation is a concern, let our team know when you call or request an appointment.",
    },
    {
      t: "p",
      html: "We will help you understand whether transportation support is available for your visit.",
    },

    { t: "h2", text: "Proudly Serving Tampa and Surrounding Neighborhoods" },
    {
      t: "p",
      html: "Palm Wellness Center is located in Tampa, FL, and serves patients from across the surrounding area.",
    },
    { t: "p", html: "We regularly support patients from:" },
    {
      t: "ul",
      items: ["Seminole Heights", "Forest Hills", "Carrollwood", "North Tampa", "Tampa Bay area communities"],
    },
    {
      t: "p",
      html: "Need directions or transportation support? Call <a href=\"tel:8134435370\">(813) 443-5370</a>.",
    },

    { t: "h2", text: "Explore Our Rehabilitation Services" },
    {
      t: "p",
      html: "Physical rehabilitation is the hub for several recovery-focused services at Palm Wellness Center.",
    },
    { t: "p", html: "Explore the service that best fits your needs:" },
    {
      t: "ul",
      items: [
        "<a href=\"/car-accident-rehabilitation/\">Auto Accident Rehabilitation</a>",
        "<a href=\"/slip-and-fall-injury-treatment/\">Slip and Fall Rehabilitation</a>",
        "<a href=\"/chiropractor/\">Tampa Chiropractic Care</a>",
        "<a href=\"/therapeutic-exercises/\">Therapeutic Exercises</a>",
        "<a href=\"/massage-therapy/\">Massage Therapy</a>",
        "<a href=\"/therapeutic-ultrasound-treatment/\">Therapeutic Ultrasound</a>",
      ],
    },

    { t: "h2", text: "Frequently Asked Questions" },
    {
      t: "faq",
      items: [
        {
          q: "What is physical rehabilitation?",
          a_html:
            "Physical rehabilitation is a coordinated recovery program focused on improving movement, reducing pain, rebuilding strength, restoring mobility, and helping patients return to daily activities after an injury, accident, surgery, or mobility-related condition.",
        },
        {
          q: "Is physical rehabilitation the same as physical therapy?",
          a_html:
            "Physical therapy may be part of rehabilitation, but physical rehabilitation is broader. At Palm Wellness Center, rehabilitation may include therapeutic exercises, chiropractic care, massage therapy, therapeutic ultrasound, mobility work, and coordinated medical support depending on the patient’s needs.",
        },
        {
          q: "What treatments may be included in physical rehabilitation?",
          a_html:
            "Your plan may include chiropractic care, therapeutic exercises, massage therapy, therapeutic ultrasound, mobility training, strength work, flexibility training, and medical coordination when appropriate.",
        },
        {
          q: "Do I need a referral for physical rehabilitation?",
          a_html:
            "Referral requirements depend on your insurance plan and the type of care you need. Our team can help you understand whether a referral is needed before your appointment.",
        },
        {
          q: "How long does physical rehabilitation take?",
          a_html:
            "Every recovery is different. Your provider will recommend a treatment plan based on your condition, symptoms, goals, and progress during care.",
        },
        {
          q: "Can physical rehabilitation help after an auto accident?",
          a_html:
            "Yes. Physical rehabilitation may help after an auto accident by improving mobility, reducing stiffness, rebuilding strength, and supporting recovery from accident-related injuries. If you were recently in a crash and need an initial evaluation, visit our <a href=\"/car-accident-treatment/\">car accident treatment in Tampa</a> page.",
        },
        {
          q: "Can physical rehabilitation help after a slip and fall?",
          a_html:
            "Yes. Rehabilitation may help patients recover from fall-related pain, stiffness, balance problems, joint injuries, soft tissue injuries, and reduced mobility.",
        },
        {
          q: "Will my treatment plan change as I improve?",
          a_html:
            "Yes. Your rehabilitation plan may be adjusted as your pain, strength, mobility, flexibility, and daily function improve.",
        },
      ],
    },

    { t: "h2", text: "Start Physical Rehabilitation in Tampa" },
    {
      t: "p",
      html: "Pain, stiffness, weakness, or limited mobility can make everyday life harder than it needs to be. Palm Wellness Center can help you understand your options and start a rehabilitation plan built around your needs.",
    },
    {
      t: "p",
      html: "Call <a href=\"tel:8134435370\">(813) 443-5370</a> or request an appointment with Palm Wellness Center at <strong>1004 W Linebaugh Ave Ste A, Tampa, FL 33612</strong>.",
    },
    { t: "p", html: "<strong>Book your Tampa wellness appointment today.</strong>" },
    { t: "cta", buttons: actionButtons("en") },
  ],
  styles: buildStyles([
    ["Find Your Rehabilitation Path", { bg: "alt", align: "center", imgSide: "none", hc: "green", layout: "cards" }],
    ["What Is Physical Rehabilitation?", { bg: "white", align: "left", imgSide: "left", hc: "blue" }],
    ["Rehabilitation That Looks at the Whole Picture", { bg: "white", align: "left", imgSide: "right", hc: "blue" }],
    ["Choose Your Rehabilitation Path", { bg: "alt", align: "center", imgSide: "none", hc: "green" }],
    ["Rehabilitation Programs", { bg: "white", align: "left", imgSide: "none", hc: "green", layout: "cards" }],
    ["Treatments Used During Rehabilitation", { bg: "alt", align: "left", imgSide: "none", hc: "blue", layout: "cards" }],
    ["Is Physical Rehabilitation Right for You?", { bg: "white", align: "left", imgSide: "right", hc: "blue" }],
    ["How Rehabilitation Works at Palm Wellness Center", { bg: "white", align: "left", imgSide: "none", hc: "blue" }],
    ["Why Patients Choose Palm Wellness Center", { bg: "alt", align: "center", imgSide: "none", hc: "green", layout: "cards" }],
    ["Experienced Medical and Rehabilitation Team", { bg: "white", align: "left", imgSide: "left", hc: "blue" }],
    ["How to Get Started with Physical Rehabilitation", { bg: "alt", align: "left", imgSide: "none", hc: "green", layout: "cards" }],
    ["Professional and Compassionate Care You Can Trust", { bg: "white", align: "left", imgSide: "none", hc: "blue", pair: "left" }],
    ["Transportation Assistance", { bg: "white", align: "left", imgSide: "right", hc: "blue", pair: "right" }],
    ["Proudly Serving Tampa and Surrounding Neighborhoods", { bg: "alt", align: "left", imgSide: "none", hc: "blue", pair: "left" }],
    ["Explore Our Rehabilitation Services", { bg: "alt", align: "left", imgSide: "none", hc: "blue", pair: "right" }],
    ["Frequently Asked Questions", { bg: "white", align: "left", imgSide: "none", hc: "blue" }],
    ["Start Physical Rehabilitation in Tampa", { bg: "alt", align: "center", imgSide: "none", hc: "green" }],
  ]),
};

const spanishPage = {
  slug: "es__fisioterapia",
  path: "/es/fisioterapia/",
  lang: "es" as const,
  title: "Rehabilitación Física en Tampa, FL | Palm Wellness Center",
  description:
    "Recupérese de lesiones, dolor o movilidad limitada con rehabilitación física personalizada en Tampa. Explore tratamientos y solicite una evaluación.",
  ogImage: "/images/top-physical-rehabilitation-clinic-in-tampa-bay-min.jpg",
  blocks: [
    { t: "h1", text: "Rehabilitación Física en Tampa" },
    { t: "p", html: "<strong>Le Ayudamos a Recuperarse, Moverse Mejor y Retomar su Vida</strong>" },
    {
      t: "p",
      html: "Ya sea que se esté recuperando de una lesión, controlando el dolor crónico o buscando mejorar su movilidad, Palm Wellness Center ofrece rehabilitación física personalizada según sus necesidades y objetivos de recuperación.",
    },
    {
      t: "badges",
      items: [
        "Dolor de espalda o cuello",
        "Dolor o rigidez en las articulaciones",
        "Movilidad limitada",
        "Recuperación después de un accidente de auto, un resbalón o una caída",
        "Distensiones musculares o lesiones de tejidos blandos",
        "Dificultad para retomar las actividades cotidianas",
      ],
    },
    { t: "cta", buttons: actionButtons("es") },

    { t: "h2", text: "Encuentre su Camino de Rehabilitación" },
    { t: "h3", text: "¿Se Está Recuperando de un Accidente de Auto?" },
    {
      t: "p",
      html: "Comience con la <a href=\"/es/rehabilitacion-de-accidentes-automovilisticos/\">Rehabilitación por Accidentes de Auto</a>.",
    },
    { t: "h3", text: "¿Sufrió una Lesión por un Resbalón o una Caída?" },
    {
      t: "p",
      html: "Explore la <a href=\"/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/\">Rehabilitación por Resbalones y Caídas</a>.",
    },
    { t: "h3", text: "¿Tiene Dolor, Rigidez o Movilidad Limitada?" },
    {
      t: "p",
      html: "<a href=\"/es/contacto/\">Programe una evaluación de rehabilitación física</a>.",
    },
    { t: "h3", text: "¿Necesita un Tratamiento Específico?" },
    {
      t: "p",
      html: "Conozca la <a href=\"/es/quiropractico/\">Atención Quiropráctica</a>, los <a href=\"/es/ejercicios-terapeuticos/\">Ejercicios Terapéuticos</a>, la <a href=\"/es/terapia-de-masajes/\">Terapia de Masajes</a> o el <a href=\"/es/tratamiento-de-ultrasonido-terapeutico/\">Ultrasonido Terapéutico</a>.",
    },

    { t: "h2", text: "¿Qué Es la Rehabilitación Física?" },
    {
      t: "img",
      src: "/images/what-is-physical-therapy-benefits-and-types.webp",
      alt: "Profesional de rehabilitación física ayudando a un paciente a mejorar su movilidad",
    },
    {
      t: "p",
      html: "La rehabilitación física es un programa coordinado de recuperación diseñado para ayudar a mejorar el movimiento, la fuerza, la flexibilidad, el equilibrio y la función diaria después de una lesión, un accidente, una cirugía o una afección relacionada con la movilidad.",
    },
    {
      t: "p",
      html: "No se trata de un solo tratamiento. La rehabilitación puede combinar distintos servicios según sus síntomas, objetivos de recuperación y la manera en que su cuerpo responde a la atención.",
    },
    {
      t: "p",
      html: "Para algunos pacientes, la rehabilitación puede centrarse en movimientos guiados y fortalecimiento. Para otros, la atención puede incluir tratamiento quiropráctico, terapia de masajes, ultrasonido terapéutico, ejercicios de movilidad y seguimiento médico.",
    },
    {
      t: "p",
      html: "El objetivo es ayudarle a moverse mejor, ganar confianza al moverse y retomar sus actividades cotidianas de manera segura.",
    },

    { t: "h2", text: "Rehabilitación que Considera el Panorama Completo" },
    {
      t: "img",
      src: "/images/who-we-help-injury-recovery-surgery-rehab-and-more.webp",
      alt: "Atención de rehabilitación personalizada que apoya la recuperación integral del paciente",
    },
    { t: "p", html: "El dolor puede afectar más de un aspecto de su vida." },
    {
      t: "p",
      html: "Una lesión puede dificultar trabajar, dormir, conducir, hacer ejercicio, cargar las compras, cuidar de la familia o disfrutar de su rutina habitual. Incluso los movimientos pequeños pueden resultar más agotadores cuando el cuerpo no se mueve como debería.",
    },
    {
      t: "p",
      html: "En Palm Wellness Center, la rehabilitación considera cómo trabajan en conjunto sus músculos, articulaciones, patrones de movimiento y salud general. En lugar de enfocarnos únicamente en dónde siente dolor hoy, desarrollamos un plan que respalda su recuperación con el paso del tiempo.",
    },
    {
      t: "p",
      html: "Ya sea que sus síntomas hayan comenzado después de un accidente, una caída, una cirugía, una lesión por esfuerzo repetitivo o el desgaste cotidiano, nuestro objetivo es ayudarle a moverse con mayor comodidad y confianza.",
    },

    divider(
      "es",
      "green",
      "Un Plan de Rehabilitación Diseñado para Usted",
      "Hable con nuestro equipo sobre sus síntomas, objetivos y el mejor punto de partida.",
    ),

    { t: "h2", text: "Elija su Camino de Rehabilitación" },
    {
      t: "p",
      html: "La rehabilitación física es el eje de varios servicios de recuperación en Palm Wellness Center. Algunos pacientes necesitan un programa estructurado de recuperación de lesiones. Otros requieren un tratamiento específico como parte de un plan de atención más amplio.",
    },
    { t: "p", html: "Use esta página para encontrar el punto de partida que mejor se ajuste a sus necesidades." },

    { t: "h2", text: "Programas de Rehabilitación" },
    { t: "h3", text: "Rehabilitación por Accidentes de Auto" },
    {
      t: "p",
      html: "Los accidentes de auto pueden causar dolor, rigidez, lesiones de tejidos blandos, latigazo cervical, dolores de cabeza, dolor de espalda, dolor de cuello y problemas de movimiento que quizá no se manifiesten por completo de inmediato.<br><br>Nuestro programa de <a href=\"/es/rehabilitacion-de-accidentes-automovilisticos/\">rehabilitación por accidentes de auto</a> ayuda a los pacientes a recuperarse después de un choque con atención enfocada en la movilidad, el rango de movimiento, la fuerza, la comodidad y la función diaria.",
    },
    { t: "h3", text: "Rehabilitación por Resbalones y Caídas" },
    {
      t: "p",
      html: "Una caída puede provocar dolor articular, distensión muscular, rigidez, problemas de equilibrio o menor confianza al moverse.<br><br>Nuestros servicios de <a href=\"/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/\">rehabilitación por resbalones y caídas</a> ayudan a restaurar la movilidad, aliviar las molestias, recuperar la fuerza y retomar las actividades cotidianas después de una lesión causada por una caída.",
    },
    {
      t: "p",
      html: "Si sufrió un choque recientemente y necesita una evaluación inicial, visite nuestra página de <a href=\"/es/tratamiento-de-accidentes-de-auto/\">tratamiento de accidentes de auto en Tampa</a>.",
    },

    { t: "h2", text: "Tratamientos Utilizados Durante la Rehabilitación" },
    {
      t: "p",
      html: "Su proveedor puede recomendar uno o más tratamientos según sus síntomas, condición y progreso.",
    },
    { t: "h3", text: "Atención Quiropráctica" },
    {
      t: "p",
      html: "La <a href=\"/es/quiropractico/\">atención quiropráctica en Tampa</a> puede ayudar a mejorar la función articular, reducir la rigidez y favorecer un mejor movimiento mediante ajustes suaves de la columna y las extremidades.<br><br>La atención quiropráctica suele utilizarse como parte de un plan de rehabilitación más amplio.",
    },
    { t: "h3", text: "Ejercicios Terapéuticos" },
    {
      t: "p",
      html: "Los <a href=\"/es/ejercicios-terapeuticos/\">ejercicios terapéuticos</a> son movimientos guiados diseñados para mejorar la fuerza, la flexibilidad, el equilibrio, la coordinación y el rango de movimiento.<br><br>Su programa de ejercicios puede cambiar a medida que gane fuerza y mejore su movilidad.",
    },
    { t: "h3", text: "Terapia de Masajes" },
    {
      t: "p",
      html: "La <a href=\"/es/terapia-de-masajes/\">terapia de masajes</a> puede ayudar a reducir la tensión muscular, mejorar la circulación y aliviar las molestias en los tejidos blandos durante la recuperación.<br><br>Suele combinarse con otros servicios de rehabilitación para ayudar a los pacientes a moverse con mayor comodidad.",
    },
    { t: "h3", text: "Ultrasonido Terapéutico" },
    {
      t: "p",
      html: "El <a href=\"/es/tratamiento-de-ultrasonido-terapeutico/\">ultrasonido terapéutico</a> utiliza ondas sonoras para aplicar calor suave en los tejidos profundos.<br><br>Cuando está indicado, puede favorecer la circulación, reducir la rigidez y apoyar la recuperación de los tejidos blandos como parte de un plan de rehabilitación personalizado.",
    },

    { t: "h2", text: "¿Es la Rehabilitación Física Adecuada para Usted?" },
    {
      t: "img",
      src: "/images/conditions-we-treat-at-our-tampa-rehabilitation-clinic.webp",
      alt: "Afecciones tratadas mediante rehabilitación física en Tampa",
    },
    { t: "p", html: "La rehabilitación física puede ser adecuada si presenta:" },
    {
      t: "ul",
      items: [
        "Dolor de espalda o cuello",
        "Dolor o rigidez en las articulaciones",
        "Distensiones musculares o lesiones de tejidos blandos",
        "Flexibilidad o movilidad limitada",
        "Dolor después de un accidente de auto",
        "Lesiones causadas por un resbalón o una caída",
        "Rango de movimiento reducido",
        "Debilidad después de una lesión",
        "Dificultad para caminar, agacharse, levantar objetos, conducir o trabajar cómodamente",
        "Dificultad para retomar las actividades cotidianas",
        "Dolor recurrente que continúa interfiriendo con el trabajo, el ejercicio, los pasatiempos o el descanso",
      ],
    },
    {
      t: "p",
      html: "Cada paciente es diferente, por lo que su atención comienza con una evaluación y no con un plan generalizado.",
    },

    divider(
      "es",
      "blue",
      "¿Listo para Conocer sus Opciones de Rehabilitación?",
      "Solicite una evaluación y reciba un plan de atención basado en su condición, movimiento y objetivos.",
    ),

    { t: "h2", text: "Cómo Funciona la Rehabilitación en Palm Wellness Center" },
    { t: "p", html: "Su plan de rehabilitación se diseña según sus necesidades, no a partir de una lista predeterminada de tratamientos." },
    { t: "h3", text: "1. Evaluación" },
    {
      t: "p",
      html: "Su proveedor revisa sus síntomas, antecedentes de salud, lesiones previas, dificultades de movilidad y objetivos de recuperación.",
    },
    { t: "h3", text: "2. Evaluación Funcional" },
    {
      t: "p",
      html: "Analizamos cómo su condición afecta el movimiento, la fuerza, la flexibilidad, el equilibrio, el rango de movimiento y las actividades cotidianas.",
    },
    { t: "h3", text: "3. Plan Personalizado" },
    {
      t: "p",
      html: "Su proveedor recomienda un plan de atención que puede incluir uno o más servicios de rehabilitación según sus necesidades.",
    },
    { t: "h3", text: "4. Tratamiento Guiado" },
    {
      t: "p",
      html: "Su atención puede incluir tratamiento quiropráctico, ejercicios terapéuticos, terapia de masajes, ultrasonido terapéutico, ejercicios de movilidad o coordinación médica cuando corresponda.",
    },
    { t: "h3", text: "5. Seguimiento del Progreso" },
    {
      t: "p",
      html: "A medida que mejora, su proveedor puede ajustar el plan para que la atención continúe adaptándose a su progreso.",
    },
    { t: "h3", text: "6. Apoyo para Retomar sus Actividades" },
    {
      t: "p",
      html: "El objetivo es ayudarle a retomar sus actividades cotidianas con mayor facilidad de movimiento, más confianza y menos molestias.",
    },

    { t: "h2", text: "Por Qué los Pacientes Eligen Palm Wellness Center" },
    {
      t: "p",
      html: "Los pacientes eligen Palm Wellness Center porque aquí la rehabilitación se diseña en torno a la persona, no solo a la lesión.",
    },
    { t: "h3", text: "Atención Coordinada en un Solo Lugar" },
    {
      t: "p",
      html: "Palm Wellness Center reúne rehabilitación, atención quiropráctica, ejercicios terapéuticos, terapia de masajes, ultrasonido terapéutico y apoyo médico en una sola clínica.",
    },
    { t: "h3", text: "Planes de Tratamiento Personalizados" },
    {
      t: "p",
      html: "Su plan se basa en sus síntomas, condición, estilo de vida, progreso y objetivos de recuperación.",
    },
    { t: "h3", text: "Enfoque en el Movimiento y la Función" },
    {
      t: "p",
      html: "Nuestro objetivo no es únicamente reducir las molestias. También nos enfocamos en ayudarle a moverse mejor, recuperar la fuerza, mejorar la movilidad y retomar su vida cotidiana.",
    },
    { t: "h3", text: "Atención Bilingüe" },
    { t: "p", html: "Nuestro equipo atiende con orgullo a pacientes en inglés y español." },
    { t: "h3", text: "Asistencia de Transporte" },
    {
      t: "p",
      html: "El transporte puede estar disponible para pacientes elegibles que necesiten ayuda para ir y volver de sus citas.",
    },
    { t: "h3", text: "Ubicación Conveniente en Tampa" },
    {
      t: "p",
      html: "Palm Wellness Center atiende a pacientes de Tampa y comunidades cercanas desde nuestra clínica en <strong>1004 W Linebaugh Ave Ste A, Tampa, FL 33612</strong>.",
    },

    { t: "h2", text: "Equipo Médico y de Rehabilitación con Experiencia" },
    {
      t: "img",
      src: "/images/integrated-wellness-services-chiropractor.webp",
      alt: "Equipo médico y de rehabilitación con experiencia en Palm Wellness Center",
    },
    {
      t: "p",
      html: "La rehabilitación física en Palm Wellness Center cuenta con el apoyo de proveedores médicos y de rehabilitación con licencia, enfocados en brindar una atención segura y coordinada.",
    },
    {
      t: "p",
      html: "Nuestro equipo trabaja con pacientes que se recuperan de lesiones, controlan el dolor, recuperan la movilidad o buscan retomar sus actividades cotidianas con mayor confianza.",
    },
    {
      t: "p",
      html: "Su plan puede incluir servicios de rehabilitación, atención quiropráctica, ejercicios terapéuticos, tratamientos para los tejidos blandos, ultrasonido terapéutico y coordinación médica cuando corresponda.",
    },
    {
      t: "p",
      html: "Este trabajo en equipo ayuda a que Palm Wellness Center sea un centro de bienestar de confianza en Tampa para pacientes que necesitan más de una opción de tratamiento. <a href=\"/es/acerca-de-nosotros/\">Conozca más sobre Palm Wellness Center</a>.",
    },

    { t: "h2", text: "Cómo Comenzar la Rehabilitación Física" },
    { t: "h3", text: "Llame para Programar" },
    {
      t: "p",
      html: "Llame al <a href=\"tel:8134435370\">(813) 443-5370</a> o solicite una cita. Nuestro equipo le ayudará a programar su evaluación de rehabilitación física.",
    },
    { t: "h3", text: "Asista a su Primera Consulta" },
    {
      t: "p",
      html: "Su proveedor revisará sus síntomas, antecedentes de salud, movimiento, fuerza, flexibilidad y objetivos de recuperación.",
    },
    { t: "h3", text: "Comience su Plan de Atención" },
    {
      t: "p",
      html: "Su plan de rehabilitación puede incluir uno o más tratamientos según su condición y progreso.",
    },
    { t: "h3", text: "Ajustamos su Plan a Medida que Mejora" },
    {
      t: "p",
      html: "Su proveedor continuará supervisando su progreso y actualizando el plan según responda su cuerpo al tratamiento.",
    },

    divider(
      "es",
      "green",
      "Comience Hoy su Plan de Rehabilitación",
      "Llame a Palm Wellness Center o solicite una cita para programar su primera evaluación.",
    ),

    { t: "h2", text: "Atención Profesional y Compasiva en la que Puede Confiar" },
    {
      t: "p",
      html: "Palm Wellness Center se compromete a promover la salud y el bienestar en la comunidad de Tampa mediante rehabilitación personalizada, atención coordinada y comunicación clara.",
    },
    { t: "p", html: "Los pacientes reciben atención en persona en nuestra clínica de Tampa:" },
    {
      t: "p",
      html: "<strong>Palm Wellness Center</strong><br>1004 W Linebaugh Ave Ste A<br>Tampa, FL 33612<br>Teléfono: <a href=\"tel:8134435370\">(813) 443-5370</a>",
    },
    { t: "h3", text: "Horario de Atención" },
    {
      t: "p",
      html: "<strong>Lunes–Viernes:</strong> 10 AM–7 PM<br><strong>Sábado:</strong> Con cita previa<br><strong>Domingo:</strong> Cerrado",
    },
    {
      t: "p",
      html: "Palm Wellness Center ofrece servicios integrales de salud en Tampa para pacientes que buscan apoyo para la recuperación, atención de rehabilitación y tratamientos enfocados en el bienestar en un solo lugar.",
    },

    { t: "h2", text: "Asistencia de Transporte" },
    {
      t: "img",
      src: "/images/palm-wellness-center-transportation-available.webp",
      alt: "Asistencia de transporte para pacientes de rehabilitación en Tampa",
    },
    { t: "p", html: "<strong>¿Necesita transporte? Nosotros podemos ayudarle.</strong>" },
    {
      t: "p",
      html: "Palm Wellness Center ofrece asistencia de transporte para pacientes elegibles en el área de Tampa Bay. Si tiene dificultades para trasladarse, infórmeselo a nuestro equipo cuando llame o solicite una cita.",
    },
    {
      t: "p",
      html: "Le ayudaremos a confirmar si hay asistencia de transporte disponible para su visita.",
    },

    { t: "h2", text: "Sirviendo con Orgullo a Tampa y Vecindarios Cercanos" },
    {
      t: "p",
      html: "Palm Wellness Center está ubicado en Tampa, FL, y atiende a pacientes de las zonas cercanas.",
    },
    { t: "p", html: "Atendemos regularmente a pacientes de:" },
    {
      t: "ul",
      items: ["Seminole Heights", "Forest Hills", "Carrollwood", "North Tampa", "Comunidades del área de Tampa Bay"],
    },
    {
      t: "p",
      html: "¿Necesita indicaciones o asistencia de transporte? Llame al <a href=\"tel:8134435370\">(813) 443-5370</a>.",
    },

    { t: "h2", text: "Explore Nuestros Servicios de Rehabilitación" },
    {
      t: "p",
      html: "La rehabilitación física es el eje de varios servicios enfocados en la recuperación en Palm Wellness Center.",
    },
    { t: "p", html: "Explore el servicio que mejor se ajuste a sus necesidades:" },
    {
      t: "ul",
      items: [
        "<a href=\"/es/rehabilitacion-de-accidentes-automovilisticos/\">Rehabilitación por Accidentes de Auto</a>",
        "<a href=\"/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/\">Rehabilitación por Resbalones y Caídas</a>",
        "<a href=\"/es/quiropractico/\">Atención Quiropráctica en Tampa</a>",
        "<a href=\"/es/ejercicios-terapeuticos/\">Ejercicios Terapéuticos</a>",
        "<a href=\"/es/terapia-de-masajes/\">Terapia de Masajes</a>",
        "<a href=\"/es/tratamiento-de-ultrasonido-terapeutico/\">Ultrasonido Terapéutico</a>",
      ],
    },

    { t: "h2", text: "Preguntas Frecuentes" },
    {
      t: "faq",
      items: [
        {
          q: "¿Qué es la rehabilitación física?",
          a_html:
            "La rehabilitación física es un programa coordinado de recuperación enfocado en mejorar el movimiento, reducir el dolor, recuperar la fuerza, restaurar la movilidad y ayudar a los pacientes a retomar sus actividades cotidianas después de una lesión, un accidente, una cirugía o una afección relacionada con la movilidad.",
        },
        {
          q: "¿La rehabilitación física es lo mismo que la fisioterapia?",
          a_html:
            "La fisioterapia puede formar parte de la rehabilitación, pero la rehabilitación física es más amplia. En Palm Wellness Center, puede incluir ejercicios terapéuticos, atención quiropráctica, terapia de masajes, ultrasonido terapéutico, ejercicios de movilidad y apoyo médico coordinado según las necesidades del paciente.",
        },
        {
          q: "¿Qué tratamientos pueden incluirse en la rehabilitación física?",
          a_html:
            "Su plan puede incluir atención quiropráctica, ejercicios terapéuticos, terapia de masajes, ultrasonido terapéutico, entrenamiento de movilidad, fortalecimiento, trabajo de flexibilidad y coordinación médica cuando corresponda.",
        },
        {
          q: "¿Necesito una remisión para la rehabilitación física?",
          a_html:
            "Los requisitos de remisión dependen de su plan de seguro y del tipo de atención que necesite. Nuestro equipo puede ayudarle a entender si necesita una remisión antes de su cita.",
        },
        {
          q: "¿Cuánto tiempo dura la rehabilitación física?",
          a_html:
            "Cada recuperación es diferente. Su proveedor recomendará un plan de tratamiento basado en su condición, síntomas, objetivos y progreso durante la atención.",
        },
        {
          q: "¿Puede ayudar la rehabilitación física después de un accidente de auto?",
          a_html:
            "Sí. La rehabilitación física puede ayudar después de un accidente de auto al mejorar la movilidad, reducir la rigidez, recuperar la fuerza y apoyar la recuperación de lesiones relacionadas con el accidente. Si sufrió un choque recientemente y necesita una evaluación inicial, visite nuestra página de <a href=\"/es/tratamiento-de-accidentes-de-auto/\">tratamiento de accidentes de auto en Tampa</a>.",
        },
        {
          q: "¿Puede ayudar la rehabilitación física después de un resbalón o una caída?",
          a_html:
            "Sí. La rehabilitación puede ayudar a recuperarse de síntomas y lesiones relacionados con una caída, como dolor, rigidez, problemas de equilibrio, lesiones articulares o de tejidos blandos y movilidad reducida.",
        },
        {
          q: "¿Cambiará mi plan de tratamiento a medida que mejore?",
          a_html:
            "Sí. Su plan de rehabilitación puede ajustarse a medida que mejoran el dolor, la fuerza, la movilidad, la flexibilidad y la función diaria.",
        },
      ],
    },

    { t: "h2", text: "Comience la Rehabilitación Física en Tampa" },
    {
      t: "p",
      html: "El dolor, la rigidez, la debilidad o la movilidad limitada pueden dificultar la vida cotidiana más de lo necesario. Palm Wellness Center puede ayudarle a conocer sus opciones y comenzar un plan de rehabilitación diseñado según sus necesidades.",
    },
    {
      t: "p",
      html: "Llame al <a href=\"tel:8134435370\">(813) 443-5370</a> o solicite una cita con Palm Wellness Center en <strong>1004 W Linebaugh Ave Ste A, Tampa, FL 33612</strong>.",
    },
    { t: "p", html: "<strong>Reserve hoy su cita de bienestar en Tampa.</strong>" },
    { t: "cta", buttons: actionButtons("es") },
  ],
  styles: buildStyles([
    ["Encuentre su Camino de Rehabilitación", { bg: "alt", align: "center", imgSide: "none", hc: "green", layout: "cards" }],
    ["¿Qué Es la Rehabilitación Física?", { bg: "white", align: "left", imgSide: "left", hc: "blue" }],
    ["Rehabilitación que Considera el Panorama Completo", { bg: "white", align: "left", imgSide: "right", hc: "blue" }],
    ["Elija su Camino de Rehabilitación", { bg: "alt", align: "center", imgSide: "none", hc: "green" }],
    ["Programas de Rehabilitación", { bg: "white", align: "left", imgSide: "none", hc: "green", layout: "cards" }],
    ["Tratamientos Utilizados Durante la Rehabilitación", { bg: "alt", align: "left", imgSide: "none", hc: "blue", layout: "cards" }],
    ["¿Es la Rehabilitación Física Adecuada para Usted?", { bg: "white", align: "left", imgSide: "right", hc: "blue" }],
    ["Cómo Funciona la Rehabilitación en Palm Wellness Center", { bg: "white", align: "left", imgSide: "none", hc: "blue" }],
    ["Por Qué los Pacientes Eligen Palm Wellness Center", { bg: "alt", align: "center", imgSide: "none", hc: "green", layout: "cards" }],
    ["Equipo Médico y de Rehabilitación con Experiencia", { bg: "white", align: "left", imgSide: "left", hc: "blue" }],
    ["Cómo Comenzar la Rehabilitación Física", { bg: "alt", align: "left", imgSide: "none", hc: "green", layout: "cards" }],
    ["Atención Profesional y Compasiva en la que Puede Confiar", { bg: "white", align: "left", imgSide: "none", hc: "blue", pair: "left" }],
    ["Asistencia de Transporte", { bg: "white", align: "left", imgSide: "right", hc: "blue", pair: "right" }],
    ["Sirviendo con Orgullo a Tampa y Vecindarios Cercanos", { bg: "alt", align: "left", imgSide: "none", hc: "blue", pair: "left" }],
    ["Explore Nuestros Servicios de Rehabilitación", { bg: "alt", align: "left", imgSide: "none", hc: "blue", pair: "right" }],
    ["Preguntas Frecuentes", { bg: "white", align: "left", imgSide: "none", hc: "blue" }],
    ["Comience la Rehabilitación Física en Tampa", { bg: "alt", align: "center", imgSide: "none", hc: "green" }],
  ]),
};

export default [englishPage, spanishPage];
