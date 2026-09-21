import { APPOINTMENT_URL } from "../i18n/utils";

const appointmentUrl = APPOINTMENT_URL;
const p = (html: string) => ({ t: "p", html });
const h2 = (text: string) => ({ t: "h2", text });
const h3 = (text: string) => ({ t: "h3", text });
const pairBlocks = (pairs: [string, string][]) => pairs.flatMap(([title, copy]) => [h3(title), p(copy)]);
const buttons = (label: string) => ({
  t: "cta",
  buttons: [
    { label, href: appointmentUrl, kind: "appt" },
    { label: "Call (813) 443-5370", href: "tel:8134435370", kind: "phone" },
  ],
});

const therapeuticExercises = {
  slug: "therapeutic-exercises",
  path: "/therapeutic-exercises/",
  lang: "en",
  title: "Therapeutic Exercise in Tampa for Strength, Balance, and Mobility",
  description: "Provider-guided therapeutic exercises in Tampa for strength, balance, mobility, range of motion, and injury recovery. Call Palm Wellness Center today.",
  socialDescription: "Guided therapeutic exercises in Tampa for strength, mobility, balance, and safer daily movement after injury.",
  ogImage: "/images/therapeutic-exercises-session.webp",
  blocks: [
    p("Trouble Moving After an Injury? Therapeutic Exercises May Help"),
    { t: "badges", items: ["Guided therapeutic exercises in Tampa", "Personalized movement plans based on your symptoms and goals", "Support for strength, balance, mobility, and range of motion", "Focused on walking, bending, lifting, driving, working, and daily activity"] },
    buttons("Start Your Recovery Today"),
    p("Our provider-guided care helps patients move more safely and return to daily activities with more confidence."),

    { t: "h1", text: "Therapeutic Exercises in Tampa for Strength, Balance, and Mobility" },
    p("Pain, stiffness, weakness, or limited mobility can make everyday movement harder than it should be. At Palm Wellness Center, therapeutic exercises are part of coordinated rehabilitation care focused on safer movement and daily function."),
    p("Your exercise plan is based on your symptoms, movement limits, health history, and recovery goals. This care may be included in your <a href=\"/physical-rehabilitation/\">physical rehabilitation in Tampa</a> plan when appropriate."),
    p("This care may help patients who are dealing with weakness after an injury, stiffness or limited range of motion, balance concerns, or trouble with daily activities like walking, bending, lifting, driving, or working."),
    buttons("Request Appointment"),

    h2("Why Patients Choose Palm Wellness Center for Therapeutic Exercises"),
    p("Patients choose Palm Wellness Center because care is guided by a rehabilitation team and built around recovery, not generic workouts."),
    { t: "badges", items: ["Personalized movement plans based on symptoms and goals", "Provider-guided exercises for safer form and progression", "Support for strength, balance, mobility, range of motion, and daily function", "Care that may coordinate with chiropractic, massage, ultrasound, and rehabilitation services", "Bilingual support in English and Spanish", "Transportation assistance for eligible patients"] },

    h2("What Are Therapeutic Exercises?"),
    p("Therapeutic exercises are guided movements selected for a specific recovery goal, such as improving strength, flexibility, balance, coordination, or range of motion."),
    p("The goal is not to push through pain or follow a one-size-fits-all workout. Your movements should match your condition, comfort level, and stage of healing."),

    h2("When Therapeutic Exercises May Help"),
    p("Guided exercise care may be appropriate when pain, weakness, stiffness, or limited mobility affects daily function."),
    p("You may benefit from guided therapeutic exercises if you are dealing with:"),
    { t: "badges", items: ["Back or neck pain", "Shoulder, hip, knee, or joint stiffness", "Soft tissue injuries", "Reduced range of motion", "Weakness after an injury", "Poor balance or coordination", "Difficulty walking, bending, lifting, driving, working, or completing daily tasks", "Pain after a car accident", "Injury after a slip and fall", "Movement changes caused by compensation or guarding"] },
    p("Care begins with an evaluation, so your plan can be matched to your symptoms, movement limits, and goals."),

    h2("What You Feel vs. What May Be Affecting Movement"),
    p("A guided movement plan can help address these challenges by improving control, support, and everyday movement."),
    { t: "table", rows: [["What you may feel", "What may be affecting movement"], ["Stiffness", "Limited range of motion, muscle guarding, or joint restriction"], ["Weakness", "Reduced muscle support after injury or limited use"], ["Poor balance", "Reduced coordination, stability, or confidence with movement"], ["Pain with daily tasks", "Compensation patterns or soft tissue irritation"], ["Trouble bending, lifting, or walking", "Strength, mobility, or movement-control limitations"]] },

    h2("How Therapeutic Exercises Support Rehabilitation"),
    p("Your provider may recommend one or more types of movement based on your evaluation and recovery goals."),
    ...pairBlocks([
      ["Range of Motion", "Range-of-motion exercises help improve how freely your joints and muscles move. These may be used when stiffness, pain, swelling, or injury limits your ability to bend, reach, turn, lift, or walk comfortably."],
      ["Strength and Stability", "Strengthening exercises help rebuild muscle support around injured or weakened areas. Better strength may help improve posture, joint stability, balance, and everyday movement."],
      ["Balance and Coordination", "Balance and coordination exercises help improve control during movement. These may be helpful if you feel unsteady, have trouble changing positions, or need support returning to normal activity after an injury."],
      ["Flexibility and Mobility", "Flexibility and mobility exercises help reduce stiffness and support smoother movement during daily tasks such as walking, driving, sitting, standing, bending, or reaching."],
      ["Endurance for Daily Activity", "Some patients need help rebuilding stamina for everyday tasks like walking, climbing stairs, working, shopping, or caring for family."],
      ["Body Mechanics and Joint Protection", "Your provider may also help you improve how you move during daily tasks. Better body mechanics can reduce unnecessary strain and help protect injured or sensitive areas during recovery."],
    ]),

    h2("Therapeutic Exercises After Accidents and Falls"),
    p("Guided exercises may support recovery after accidents and falls when they are matched to your injury, symptoms, and stage of healing."),
    ...pairBlocks([
      ["After a Car Accident", "After a crash, patients may experience neck pain, back pain, stiffness, headaches, soft tissue injuries, reduced mobility, or trouble returning to normal activity.<br><br>Guided exercises may be used as part of <a href=\"/car-accident-rehabilitation/\">auto accident rehabilitation</a> to help restore movement, rebuild strength, and support daily function.<br><br>If you were recently in a crash and need an initial evaluation, visit our <a href=\"/car-accident-rehabilitation/\">car accident treatment in Tampa</a> page."],
      ["After a Slip and Fall", "A fall can lead to joint pain, muscle strain, stiffness, balance concerns, or reduced confidence with movement.<br><br>Provider-guided exercises may be included in <a href=\"/slip-and-fall-injury-treatment/\">slip and fall injury treatment</a> to help improve stability, mobility, and function during recovery."],
    ]),

    h2("What to Expect During Therapeutic Exercise Care"),
    p("Your care plan is based on your evaluation, symptoms, movement limitations, and recovery goals."),
    ...pairBlocks([
      ["1. Evaluation", "Your provider reviews your health history, symptoms, injury history, pain level, mobility concerns, and daily activity limitations."],
      ["2. Movement Assessment", "Your provider looks at strength, flexibility, balance, coordination, posture, range of motion, and how your body moves during basic activities."],
      ["3. Guided Exercise Plan", "Your care team creates a plan with exercises selected for your condition and comfort level. These may include range-of-motion work, strengthening, balance training, stretching, mobility work, or functional movement practice."],
      ["4. Progress Monitoring", "Your provider monitors your form, comfort, endurance, and progress. Your plan may be adjusted as your movement improves or your goals change."],
      ["5. Home Guidance When Appropriate", "When appropriate, your provider may recommend simple exercises or movement habits to support your progress between visits. These should be followed as directed so you do not overdo it or aggravate your symptoms."],
    ]),

    h2("Therapeutic Exercises Combined With Other Treatments"),
    p("Exercise care may be used alone or combined with other treatment services based on your care plan."),
    ...pairBlocks([
      ["Chiropractic Care", "<a href=\"/chiropractor/\">Tampa chiropractic care</a> may help improve joint function, reduce stiffness, and support better movement patterns."],
      ["Massage Therapy", "<a href=\"/massage-therapy/\">Massage therapy</a> may help reduce muscle tension and soft tissue discomfort, which can make guided movement more comfortable."],
      ["Therapeutic Ultrasound", "<a href=\"/therapeutic-ultrasound-treatment/\">Therapeutic ultrasound treatment</a> may be used when appropriate to support soft tissue comfort, circulation, and stiffness reduction."],
      ["Physical Rehabilitation", "<a href=\"/physical-rehabilitation/\">Physical rehabilitation in Tampa</a> may include guided exercises and other services to support recovery after injury, pain, weakness, or mobility changes."],
    ]),

    h2("When Recovery Takes Longer Than Expected"),
    p("Recovery is not always a straight line. Some patients feel better quickly, while others need more time to rebuild strength, improve mobility, and restore confidence with movement."),
    p("Recovery may take longer when pain has been present for a while, when an injury affects multiple areas, or when the body has started compensating for limited movement. Stiffness, weakness, poor balance, and reduced range of motion can also slow progress if they are not addressed."),
    p("At Palm Wellness Center, your provider can adjust your plan as your body changes, keeping care aligned with your symptoms, progress, and daily activity goals."),

    { t: "band", color: "blue", lines: ["Ready to Move With More Strength and Confidence?", "If pain, stiffness, weakness, or balance problems are making daily movement more difficult, guided exercise care may help support your recovery.<br><br>Palm Wellness Center provides therapeutic exercises in Tampa as part of coordinated rehabilitation care focused on movement, function, and safer daily activity."], buttons: [{ label: "Start Your Recovery Today", href: appointmentUrl, kind: "appt" }, { label: "Call (813) 443-5370", href: "tel:8134435370", kind: "phone" }] },

    h2("Experienced Medical and Rehabilitation Team"),
    p("Your care at Palm Wellness Center is supported by a licensed medical and rehabilitation team experienced in helping patients recover from pain, soft tissue injuries, and movement limitations."),
    ...pairBlocks([
      ["Dr. Arnaldo Victor Orellana-Molina, MD", "Supervising physician providing medical oversight and clinical guidance to support safe, appropriate, and patient-centered care."],
      ["Leivys C. Marsall, PA-C, ACN", "Board-certified Physician Assistant providing medical evaluations, primary care support, follow-up care, and guidance when medical concerns affect a patient's rehabilitation plan. Fluent in English and Spanish."],
      ["Michel Reyes, LMT", "Founder and clinic administrator overseeing patient care operations and rehabilitation services focused on structured recovery and mobility support."],
    ]),
    p("Your care is supported by a collaborative team focused on recovery, movement, and long-term function."),
    { t: "cta", buttons: [{ label: "More About Us", href: "/about-us/", kind: "primary" }] },

    h2("Professional and Compassionate Care You Can Trust"),
    p("Palm Wellness Center provides patient-centered rehabilitation focused on safe, coordinated care and long-term recovery support. Our team prioritizes clear communication, thoughtful treatment planning, and continuity of care throughout the rehabilitation process."),
    p("As a wellness center in Tampa, Palm Wellness Center is dedicated to helping the Tampa community access coordinated rehabilitation care and holistic health services in Tampa."),
    p("Palm Wellness Center proudly serves Tampa and nearby communities from our location at:"),
    p("1004 W Linebaugh Ave Ste A, Tampa, FL 33612"),
    h3("Hours of Operation"),
    p("Monday-Friday: 10AM - 7PM<br>Saturday: 10AM - 12PM by appointment<br>Sunday: Closed"),
    { t: "embed", embed: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.501369693417!2d-82.4690776!3d28.039712199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c130ecb8c325%3A0x5608f24210c20133!2sPalm%20Wellness%20Center!5e0!3m2!1sen!2sus!4v1773338853434!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>" },

    h2("Transportation Assistance"),
    h3("Need a ride? We've got you covered."),
    p("Palm Wellness Center offers transportation assistance for eligible patients throughout the Tampa Bay area. If transportation is a concern, let our team know when scheduling your appointment."),

    h2("Proudly Serving Tampa and Surrounding Neighborhoods"),
    p("Palm Wellness Center is located in Tampa, FL, but our patients come from across the surrounding area. We regularly help patients improve mobility, reduce discomfort, and recover from injury through coordinated rehabilitation services."),
    p("We commonly serve patients from:"),
    { t: "badges", items: ["Seminole Heights", "Forest Hills", "Carrollwood", "And surrounding areas"] },
    p("Need directions or transportation assistance? Call (813) 443-5370 and our team will help you plan your visit."),

    h2("Frequently Asked Questions"),
    { t: "faq", items: [
      { q: "What are therapeutic exercises?", a_html: "Therapeutic exercises are guided movements used to help improve strength, flexibility, balance, coordination, range of motion, and daily function. They are selected based on your condition, symptoms, and recovery goals." },
      { q: "Are therapeutic exercises the same as regular exercise?", a_html: "No. Regular exercise is usually focused on general fitness. Therapeutic exercises are selected to support recovery and address specific movement limitations." },
      { q: "Can therapeutic exercises help after a car accident?", a_html: "Guided exercises may be included in an auto accident rehabilitation plan when appropriate to help rebuild strength, improve mobility, and reduce stiffness." },
      { q: "Can therapeutic exercises help after a slip and fall?", a_html: "Yes. Therapeutic exercises may be included in slip and fall rehabilitation when pain, stiffness, weakness, balance problems, or reduced mobility are affecting movement after a fall." },
      { q: "Can therapeutic exercises help with balance and coordination?", a_html: "Yes. Balance and coordination exercises may help patients improve stability, movement control, and confidence during daily activities. Your provider will recommend exercises based on your evaluation." },
      { q: "Will I receive exercises to do at home?", a_html: "Your provider may recommend home guidance when appropriate. It is important to follow your care plan as directed so you do not overdo it or worsen your symptoms." },
      { q: "How long will I need therapeutic exercises?", a_html: "Every recovery is different. Your provider will recommend a plan based on your symptoms, condition, goals, and progress during care." },
      { q: "Can therapeutic exercises be combined with other treatments?", a_html: "Yes. Exercise care may be combined with chiropractic care, massage therapy, therapeutic ultrasound, physical rehabilitation, or other services based on your condition and treatment plan." },
    ] },

    h2("Start Therapeutic Exercises in Tampa"),
    p("If pain, stiffness, weakness, balance problems, or reduced mobility are making daily life harder, guided care may help you rebuild movement and function safely."),
    p("Palm Wellness Center provides guided therapeutic exercises at 1004 W Linebaugh Ave Ste A, Tampa, FL 33612."),
    p("Call (813) 443-5370 or request an appointment today."),
    buttons("Book Your Appointment"),
  ],
  styles: {
    therapeuticexercisesintampaforstrengthbalanceandmobility: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    whypatientschoosepalmwellnesscenterfortherapeuticexercises: { bg: "alt", align: "left", imgSide: "none", hc: "green" },
    whataretherapeuticexercises: { bg: "white", align: "left", imgSide: "none", hc: "green" },
    whentherapeuticexercisesmayhelp: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    whatyoufeelvswhatmaybeaffectingmovement: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    howtherapeuticexercisessupportrehabilitation: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    therapeuticexercisesafteraccidentsandfalls: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    whattoexpectduringtherapeuticexercisecare: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    therapeuticexercisescombinedwithothertreatments: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    whenrecoverytakeslongerthanexpected: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    experiencedmedicalandrehabilitationteam: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    professionalandcompassionatecareyoucantrust: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    transportationassistance: { bg: "white", align: "left", imgSide: "none", hc: "green" },
    proudlyservingtampaandsurroundingneighborhoods: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    frequentlyaskedquestions: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    starttherapeuticexercisesintampa: { bg: "alt", align: "left", imgSide: "none", hc: "green" },
  },
};

export const therapeuticExercisesSpanish = {
  slug: "es__ejercicios-terapeuticos",
  path: "/es/ejercicios-terapeuticos/",
  lang: "es",
  title: "Ejercicios terapéuticos en Tampa para fuerza, equilibrio y movilidad",
  description: "Ejercicios terapéuticos guiados por proveedores en Tampa para mejorar la fuerza, el equilibrio, la movilidad, el rango de movimiento y la recuperación después de una lesión.",
  socialDescription: "Ejercicios terapéuticos guiados en Tampa para mejorar la fuerza, la movilidad, el equilibrio y el movimiento diario después de una lesión.",
  ogImage: "/images/therapeutic-exercises-session.webp",
  blocks: [
    p("¿Tiene dificultad para moverse después de una lesión? Los ejercicios terapéuticos pueden ayudar"),
    { t: "badges", items: ["Ejercicios terapéuticos guiados en Tampa", "Planes de movimiento personalizados según sus síntomas y objetivos", "Apoyo para la fuerza, el equilibrio, la movilidad y el rango de movimiento", "Enfocados en caminar, agacharse, levantar, conducir, trabajar y realizar actividades diarias"] },
    { t: "cta", buttons: [{ label: "Comience su recuperación hoy", href: appointmentUrl, kind: "appt" }, { label: "Llamar al (813) 443-5370", href: "tel:8134435370", kind: "phone" }] },
    p("La atención guiada por nuestros proveedores ayuda a los pacientes a moverse con mayor seguridad y regresar a sus actividades diarias con más confianza."),

    { t: "h1", text: "Ejercicios terapéuticos en Tampa para fuerza, equilibrio y movilidad" },
    p("El dolor, la rigidez, la debilidad o la movilidad limitada pueden hacer que el movimiento cotidiano sea más difícil de lo que debería ser. En Palm Wellness Center, los ejercicios terapéuticos forman parte de una atención de rehabilitación coordinada enfocada en un movimiento más seguro y la función diaria."),
    p("Su plan de ejercicios se basa en sus síntomas, limitaciones de movimiento, historial de salud y objetivos de recuperación. Esta atención puede incluirse en su <a href=\"/es/fisioterapia/\">plan de rehabilitación física en Tampa</a> cuando sea apropiado."),
    p("Esta atención puede ayudar a pacientes con debilidad después de una lesión, rigidez o rango de movimiento limitado, problemas de equilibrio o dificultades con actividades diarias como caminar, agacharse, levantar, conducir o trabajar."),
    { t: "cta", buttons: [{ label: "Solicitar cita", href: appointmentUrl, kind: "appt" }, { label: "Llamar al (813) 443-5370", href: "tel:8134435370", kind: "phone" }] },

    h2("Por qué los pacientes eligen Palm Wellness Center para ejercicios terapéuticos"),
    p("Los pacientes eligen Palm Wellness Center porque la atención es guiada por un equipo de rehabilitación y se basa en la recuperación, no en rutinas de ejercicio genéricas."),
    { t: "badges", items: ["Planes de movimiento personalizados según los síntomas y objetivos", "Ejercicios guiados por proveedores para una forma y progresión más seguras", "Apoyo para la fuerza, el equilibrio, la movilidad, el rango de movimiento y la función diaria", "Atención que puede coordinarse con servicios quiroprácticos, masajes, ultrasonido y rehabilitación", "Apoyo bilingüe en inglés y español", "Asistencia de transporte para pacientes elegibles"] },

    h2("¿Qué son los ejercicios terapéuticos?"),
    p("Los ejercicios terapéuticos son movimientos guiados seleccionados para un objetivo específico de recuperación, como mejorar la fuerza, la flexibilidad, el equilibrio, la coordinación o el rango de movimiento."),
    p("El objetivo no es esforzarse a través del dolor ni seguir una rutina igual para todos. Sus movimientos deben adaptarse a su condición, nivel de comodidad y etapa de recuperación."),

    h2("Cuándo pueden ayudar los ejercicios terapéuticos"),
    p("La atención con ejercicios guiados puede ser apropiada cuando el dolor, la debilidad, la rigidez o la movilidad limitada afectan la función diaria."),
    p("Puede beneficiarse de ejercicios terapéuticos guiados si presenta:"),
    { t: "badges", items: ["Dolor de espalda o cuello", "Rigidez en el hombro, la cadera, la rodilla u otras articulaciones", "Lesiones de tejidos blandos", "Rango de movimiento reducido", "Debilidad después de una lesión", "Problemas de equilibrio o coordinación", "Dificultad para caminar, agacharse, levantar, conducir, trabajar o completar tareas diarias", "Dolor después de un accidente de auto", "Lesión después de un resbalón o una caída", "Cambios de movimiento causados por compensación o protección"] },
    p("La atención comienza con una evaluación para que su plan pueda ajustarse a sus síntomas, limitaciones de movimiento y objetivos."),

    h2("Lo que siente vs. lo que puede estar afectando el movimiento"),
    p("Un plan de movimiento guiado puede ayudar a abordar estos desafíos al mejorar el control, el apoyo y el movimiento cotidiano."),
    { t: "table", rows: [["Lo que puede sentir", "Lo que puede estar afectando el movimiento"], ["Rigidez", "Rango de movimiento limitado, protección muscular o restricción articular"], ["Debilidad", "Menor apoyo muscular después de una lesión o uso limitado"], ["Mala estabilidad", "Coordinación, estabilidad o confianza reducidas al moverse"], ["Dolor durante tareas diarias", "Patrones de compensación o irritación de tejidos blandos"], ["Dificultad para agacharse, levantar o caminar", "Limitaciones de fuerza, movilidad o control del movimiento"]] },

    h2("Cómo los ejercicios terapéuticos apoyan la rehabilitación"),
    p("Su proveedor puede recomendar uno o más tipos de movimiento según su evaluación y objetivos de recuperación."),
    ...pairBlocks([
      ["Rango de movimiento", "Los ejercicios de rango de movimiento ayudan a mejorar la libertad con la que se mueven sus articulaciones y músculos. Pueden usarse cuando la rigidez, el dolor, la inflamación o una lesión limitan su capacidad para agacharse, alcanzar, girar, levantar o caminar cómodamente."],
      ["Fuerza y estabilidad", "Los ejercicios de fortalecimiento ayudan a reconstruir el apoyo muscular alrededor de áreas lesionadas o debilitadas. Una mayor fuerza puede ayudar a mejorar la postura, la estabilidad articular, el equilibrio y el movimiento diario."],
      ["Equilibrio y coordinación", "Los ejercicios de equilibrio y coordinación ayudan a mejorar el control durante el movimiento. Pueden ser útiles si se siente inestable, tiene dificultad para cambiar de posición o necesita apoyo para regresar a su actividad normal después de una lesión."],
      ["Flexibilidad y movilidad", "Los ejercicios de flexibilidad y movilidad ayudan a reducir la rigidez y favorecen movimientos más fluidos durante tareas diarias como caminar, conducir, sentarse, ponerse de pie, agacharse o alcanzar objetos."],
      ["Resistencia para la actividad diaria", "Algunos pacientes necesitan ayuda para recuperar la resistencia necesaria para tareas cotidianas como caminar, subir escaleras, trabajar, hacer compras o cuidar de su familia."],
      ["Mecánica corporal y protección articular", "Su proveedor también puede ayudarle a mejorar la forma en que se mueve durante las tareas diarias. Una mejor mecánica corporal puede reducir el esfuerzo innecesario y ayudar a proteger las áreas lesionadas o sensibles durante la recuperación."],
    ]),

    h2("Ejercicios terapéuticos después de accidentes y caídas"),
    p("Los ejercicios guiados pueden apoyar la recuperación después de accidentes y caídas cuando se adaptan a su lesión, síntomas y etapa de recuperación."),
    ...pairBlocks([
      ["Después de un accidente de auto", "Después de un choque, los pacientes pueden presentar dolor de cuello o espalda, rigidez, dolores de cabeza, lesiones de tejidos blandos, movilidad reducida o dificultad para regresar a sus actividades normales.<br><br>Los ejercicios guiados pueden utilizarse como parte de la <a href=\"/es/rehabilitacion-de-accidentes-automovilisticos/\">rehabilitación después de un accidente de auto</a> para ayudar a restaurar el movimiento, reconstruir la fuerza y apoyar la función diaria.<br><br>Si tuvo un accidente recientemente y necesita una evaluación inicial, visite nuestra página de <a href=\"/es/tratamiento-de-accidentes-de-auto/\">tratamiento de accidentes de auto en Tampa</a>."],
      ["Después de un resbalón o una caída", "Una caída puede causar dolor articular, distensión muscular, rigidez, problemas de equilibrio o menor confianza al moverse.<br><br>Los ejercicios guiados por proveedores pueden incluirse en el <a href=\"/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/\">tratamiento de lesiones por resbalones y caídas</a> para ayudar a mejorar la estabilidad, la movilidad y la función durante la recuperación."],
    ]),

    h2("Qué esperar durante la atención con ejercicios terapéuticos"),
    p("Su plan de atención se basa en su evaluación, síntomas, limitaciones de movimiento y objetivos de recuperación."),
    ...pairBlocks([
      ["1. Evaluación", "Su proveedor revisa su historial de salud, síntomas, antecedentes de lesiones, nivel de dolor, problemas de movilidad y limitaciones en las actividades diarias."],
      ["2. Evaluación del movimiento", "Su proveedor observa la fuerza, la flexibilidad, el equilibrio, la coordinación, la postura, el rango de movimiento y la forma en que su cuerpo se mueve durante actividades básicas."],
      ["3. Plan de ejercicios guiados", "Su equipo de atención crea un plan con ejercicios seleccionados para su condición y nivel de comodidad. Estos pueden incluir trabajo de rango de movimiento, fortalecimiento, entrenamiento de equilibrio, estiramientos, movilidad o práctica de movimientos funcionales."],
      ["4. Seguimiento del progreso", "Su proveedor controla su forma, comodidad, resistencia y progreso. Su plan puede ajustarse a medida que mejora su movimiento o cambian sus objetivos."],
      ["5. Guía para el hogar cuando sea apropiado", "Cuando sea apropiado, su proveedor puede recomendar ejercicios sencillos o hábitos de movimiento para apoyar su progreso entre visitas. Deben seguirse según las indicaciones para evitar excederse o agravar sus síntomas."],
    ]),

    h2("Ejercicios terapéuticos combinados con otros tratamientos"),
    p("La atención con ejercicios puede utilizarse por sí sola o combinarse con otros servicios de tratamiento según su plan de atención."),
    ...pairBlocks([
      ["Atención quiropráctica", "La <a href=\"/es/quiropractico/\">atención quiropráctica en Tampa</a> puede ayudar a mejorar la función articular, reducir la rigidez y favorecer mejores patrones de movimiento."],
      ["Terapia de masajes", "La <a href=\"/es/terapia-de-masajes/\">terapia de masajes</a> puede ayudar a reducir la tensión muscular y las molestias de los tejidos blandos, lo que puede hacer que el movimiento guiado sea más cómodo."],
      ["Ultrasonido terapéutico", "El <a href=\"/es/tratamiento-de-ultrasonido-terapeutico/\">tratamiento con ultrasonido terapéutico</a> puede utilizarse cuando sea apropiado para favorecer la comodidad de los tejidos blandos, la circulación y la reducción de la rigidez."],
      ["Rehabilitación física", "La <a href=\"/es/fisioterapia/\">rehabilitación física en Tampa</a> puede incluir ejercicios guiados y otros servicios para apoyar la recuperación después de una lesión, dolor, debilidad o cambios en la movilidad."],
    ]),

    h2("Cuando la recuperación tarda más de lo esperado"),
    p("La recuperación no siempre sigue una línea recta. Algunos pacientes se sienten mejor rápidamente, mientras que otros necesitan más tiempo para recuperar la fuerza, mejorar la movilidad y restaurar la confianza al moverse."),
    p("La recuperación puede tardar más cuando el dolor ha estado presente durante un tiempo, cuando una lesión afecta varias áreas o cuando el cuerpo ha comenzado a compensar una movilidad limitada. La rigidez, la debilidad, el mal equilibrio y el rango de movimiento reducido también pueden retrasar el progreso si no se abordan."),
    p("En Palm Wellness Center, su proveedor puede ajustar su plan a medida que cambia su cuerpo, manteniendo la atención alineada con sus síntomas, progreso y objetivos de actividad diaria."),

    { t: "band", color: "blue", lines: ["¿Listo para moverse con más fuerza y confianza?", "Si el dolor, la rigidez, la debilidad o los problemas de equilibrio hacen que el movimiento diario sea más difícil, la atención con ejercicios guiados puede ayudar a apoyar su recuperación.<br><br>Palm Wellness Center ofrece ejercicios terapéuticos en Tampa como parte de una atención de rehabilitación coordinada enfocada en el movimiento, la función y una actividad diaria más segura."], buttons: [{ label: "Comience su recuperación hoy", href: appointmentUrl, kind: "appt" }, { label: "Llamar al (813) 443-5370", href: "tel:8134435370", kind: "phone" }] },

    h2("Equipo médico y de rehabilitación con experiencia"),
    p("Su atención en Palm Wellness Center cuenta con el apoyo de un equipo médico y de rehabilitación con licencia y experiencia en ayudar a pacientes a recuperarse del dolor, lesiones de tejidos blandos y limitaciones de movimiento."),
    ...pairBlocks([
      ["Dr. Arnaldo Victor Orellana-Molina, MD", "Médico supervisor que brinda supervisión médica y orientación clínica para apoyar una atención segura, apropiada y centrada en el paciente."],
      ["Leivys C. Marsall, PA-C, ACN", "Asistente médico certificada que brinda evaluaciones médicas, apoyo de atención primaria, atención de seguimiento y orientación cuando las preocupaciones médicas afectan el plan de rehabilitación de un paciente. Habla inglés y español."],
      ["Michel Reyes, LMT", "Fundador y administrador de la clínica que supervisa las operaciones de atención al paciente y los servicios de rehabilitación enfocados en una recuperación estructurada y el apoyo a la movilidad."],
    ]),
    p("Su atención cuenta con el apoyo de un equipo colaborativo enfocado en la recuperación, el movimiento y la función a largo plazo."),
    { t: "cta", buttons: [{ label: "Más sobre nosotros", href: "/es/acerca-de-nosotros/", kind: "primary" }] },

    h2("Atención profesional y compasiva en la que puede confiar"),
    p("Palm Wellness Center ofrece rehabilitación centrada en el paciente, enfocada en una atención segura, coordinada y apoyo para la recuperación a largo plazo. Nuestro equipo prioriza la comunicación clara, la planificación cuidadosa del tratamiento y la continuidad de la atención durante todo el proceso de rehabilitación."),
    p("Como centro de bienestar en Tampa, Palm Wellness Center se dedica a ayudar a la comunidad de Tampa a acceder a atención de rehabilitación coordinada y servicios de salud integral en Tampa."),
    p("Palm Wellness Center se enorgullece de servir a Tampa y comunidades cercanas desde nuestra ubicación en:"),
    p("1004 W Linebaugh Ave Ste A, Tampa, FL 33612"),
    h3("Horario de atención"),
    p("Lunes a viernes: 10AM - 7PM<br>Sábado: 10AM - 12PM con cita previa<br>Domingo: Cerrado"),
    { t: "embed", embed: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.501369693417!2d-82.4690776!3d28.039712199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c130ecb8c325%3A0x5608f24210c20133!2sPalm%20Wellness%20Center!5e0!3m2!1sen!2sus!4v1773338853434!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>" },

    h2("Asistencia de transporte"),
    h3("¿Necesita transporte? Estamos para ayudarle."),
    p("Palm Wellness Center ofrece asistencia de transporte para pacientes elegibles en toda el área de Tampa Bay. Si el transporte es una preocupación, informe a nuestro equipo al programar su cita."),

    h2("Sirviendo con orgullo a Tampa y vecindarios cercanos"),
    p("Palm Wellness Center se encuentra en Tampa, FL, pero nuestros pacientes vienen de toda el área circundante. Ayudamos regularmente a pacientes a mejorar la movilidad, reducir las molestias y recuperarse de lesiones mediante servicios de rehabilitación coordinados."),
    p("Atendemos con frecuencia a pacientes de:"),
    { t: "badges", items: ["Seminole Heights", "Forest Hills", "Carrollwood", "Y áreas cercanas"] },
    p("¿Necesita indicaciones o asistencia de transporte? Llame al (813) 443-5370 y nuestro equipo le ayudará a planificar su visita."),

    h2("Preguntas frecuentes"),
    { t: "faq", items: [
      { q: "¿Qué son los ejercicios terapéuticos?", a_html: "Los ejercicios terapéuticos son movimientos guiados que se utilizan para ayudar a mejorar la fuerza, flexibilidad, equilibrio, coordinación, rango de movimiento y función diaria. Se seleccionan según su condición, síntomas y objetivos de recuperación." },
      { q: "¿Los ejercicios terapéuticos son lo mismo que el ejercicio regular?", a_html: "No. El ejercicio regular suele enfocarse en la condición física general. Los ejercicios terapéuticos se seleccionan para apoyar la recuperación y abordar limitaciones específicas de movimiento." },
      { q: "¿Pueden ayudar los ejercicios terapéuticos después de un accidente de auto?", a_html: "Los ejercicios guiados pueden incluirse en un plan de rehabilitación después de un accidente de auto cuando sea apropiado para ayudar a recuperar la fuerza, mejorar la movilidad y reducir la rigidez." },
      { q: "¿Pueden ayudar los ejercicios terapéuticos después de un resbalón o una caída?", a_html: "Sí. Los ejercicios terapéuticos pueden incluirse en la rehabilitación después de un resbalón o una caída cuando el dolor, la rigidez, la debilidad, los problemas de equilibrio o la movilidad reducida afectan el movimiento." },
      { q: "¿Pueden ayudar los ejercicios terapéuticos con el equilibrio y la coordinación?", a_html: "Sí. Los ejercicios de equilibrio y coordinación pueden ayudar a mejorar la estabilidad, el control del movimiento y la confianza durante las actividades diarias. Su proveedor recomendará ejercicios según su evaluación." },
      { q: "¿Recibiré ejercicios para hacer en casa?", a_html: "Su proveedor puede recomendar guía para el hogar cuando sea apropiado. Es importante seguir su plan de atención según las indicaciones para no excederse ni empeorar sus síntomas." },
      { q: "¿Cuánto tiempo necesitaré ejercicios terapéuticos?", a_html: "Cada recuperación es diferente. Su proveedor recomendará un plan según sus síntomas, condición, objetivos y progreso durante la atención." },
      { q: "¿Pueden combinarse los ejercicios terapéuticos con otros tratamientos?", a_html: "Sí. La atención con ejercicios puede combinarse con atención quiropráctica, terapia de masajes, ultrasonido terapéutico, rehabilitación física u otros servicios según su condición y plan de tratamiento." },
    ] },

    h2("Comience ejercicios terapéuticos en Tampa"),
    p("Si el dolor, la rigidez, la debilidad, los problemas de equilibrio o la movilidad reducida hacen que la vida diaria sea más difícil, la atención guiada puede ayudarle a recuperar el movimiento y la función de manera segura."),
    p("Palm Wellness Center ofrece ejercicios terapéuticos guiados en 1004 W Linebaugh Ave Ste A, Tampa, FL 33612."),
    p("Llame al (813) 443-5370 o solicite una cita hoy."),
    { t: "cta", buttons: [{ label: "Reserve su cita", href: appointmentUrl, kind: "appt" }, { label: "Llamar al (813) 443-5370", href: "tel:8134435370", kind: "phone" }] },
  ],
  styles: {
    ejerciciosterapeuticosentampaparafuerzaequilibrioymovilidad: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    porquelospacienteseligenpalmwellnesscenterparaejerciciosterapeuticos: { bg: "alt", align: "left", imgSide: "none", hc: "green" },
    quesonlosejerciciosterapeuticos: { bg: "white", align: "left", imgSide: "none", hc: "green" },
    cuandopuedenayudarlosejerciciosterapeuticos: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    loquesientevsloquepuedeestarafectandoelmovimiento: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    comolosejerciciosterapeuticosapoyanlarehabilitacion: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    ejerciciosterapeuticosdespuesdeaccidentesycaidas: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    queesperardurantelaatencionconejerciciosterapeuticos: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    ejerciciosterapeuticoscombinadosconotrostratamientos: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    cuandolarecuperaciontardamasdeloesperado: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    equipomedicoyderehabilitacionconexperiencia: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    atencionprofesionalycompasivaenlaquepuedeconfiar: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    asistenciadetransporte: { bg: "white", align: "left", imgSide: "none", hc: "green" },
    sirviendoconorgulloatampayvecindarioscercanos: { bg: "alt", align: "left", imgSide: "none", hc: "blue" },
    preguntasfrecuentes: { bg: "white", align: "left", imgSide: "none", hc: "blue" },
    comienceejerciciosterapeuticosentampa: { bg: "alt", align: "left", imgSide: "none", hc: "green" },
  },
};

export default therapeuticExercises;
