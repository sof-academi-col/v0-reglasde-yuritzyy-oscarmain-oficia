const commonRules = [
  "No me gusta que tengas más amigos aparte de los que ya algo he sabido. No más amigos ni amiguitos.",
  "No reaccionar a fotos de amig@s.",
  "No subir, etiquetar o mencionar a amig@s en publicaciones de cualquier red social.",
  "Si un amig@ que ya tiene tiempo sin comunicación vuelve a buscarnos, contarlo el uno al otro.",
  "Si alguien gusta o demuestra intenciones que no son, debemos decirlo y eliminarlo de nuestras vidas.",
  "No abrazar a nuestr@s amig@s.",
  "Decir si invitan a salir y no salir con amig@s; informar con quién estarás o qué harás.",
  "Nadie más puede tener nuestros celulares, solamente Yuritzy y Oscar. con la excepción de salo y yamis",
  "Si hay problemas o enojos, hay que hablar y solucionarlo el mismo día.",
  // Removed: "Compartir cuáles son nuestras redes sociales..." (old rule 10)
  "No compartir publicaciones, memes ni ningún tipo de contenido con amig@s.",
  "Cuando no nos agrade algún amig@, decir lo que sentimos y alejarnos de esa amistad.",
  "No se puede usar shorts o faldas en lugares públicos o donde estén demasiadas personas o para salir. Solo se podrá usar donde estén pocas personas o en un lugar X donde no estén demasiadas personas.",
  // Removed: "Prohibido publicar fotos nuestras en redes sociales..." (old rule 14)
  "Nada de apodos ni aceptar que amig@s nos digan apodos. Solo hablar por el nombre (sin diminutivos).",
  "Debes comer antes de cualquier actividad física (entrenamiento, box, gym), así como en desayuno, almuerzo y cena.",
  "Desayunar antes de ir a la universidad y cumplir con las demás comidas en su tiempo correspondiente.",
  "No chatear con amig@s.",
  "No se puede hacer ni recibir llamadas de amig@s en general, con excepción de familiares y Esme, hasta que hagamos llamada.",
  "Siempre avisar cuando lleguemos a casa o a cualquier lugar, para estar tranquil@s.",
  "Dedicar al menos un momento al día para hablar, aunque estemos ocupados.",
  "No dejar en visto ni ignorar mensajes; siempre responder aunque sea con algo breve.",
  "Avisar siempre si vamos a salir de viaje o a un lugar diferente del habitual.",
  "Cuando haya celos o incomodidad, hablarlo de inmediato sin ocultar nada.",
  "Priorizar tiempo juntos antes que tiempo con otras personas.",
  "No usar excusas para ocultar cosas, siempre hablar con sinceridad.",
  "No usar emojis con nadie ni registrar a nadie con emojis en el celular.",
  "No seguir a chic@s ni reaccionar a publicaciones de ninguna red social.",
  'No se puede hablar o hacer alusión a ningún ser femenino en caso de Oscar con excepción de "La familia de Salo y mi mamá y familia" y de ningún ser masculino en el caso de Yuritzy con excepción de "Su papá y sus primos y familia".',
]

// State
const currentRules = commonRules
const currentRuleIndex = 0

// DOM Elements
const mainContent = document.getElementById("main-content")
const ruleCount = document.getElementById("rule-count")
const rulesGrid = document.getElementById("rules-grid")

const ruleModal = document.getElementById("rule-modal")
const closeModalBtn = document.getElementById("close-modal")
const modalTitle = document.getElementById("modal-title")
const modalText = document.getElementById("modal-text")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  renderRules()
  if (ruleCount) {
    ruleCount.textContent = "27 Reglas de Amor"
  }
})

function setupEventListeners() {
  closeModalBtn.addEventListener("click", closeModal)

  ruleModal.addEventListener("click", (e) => {
    if (e.target === ruleModal) {
      closeModal()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !ruleModal.classList.contains("hidden")) {
      closeModal()
    }
  })
}

function renderRules() {
  rulesGrid.innerHTML = ""

  commonRules.forEach((rule, index) => {
    const card = document.createElement("div")
    card.className = "rule-card-item"
    card.style.animationDelay = `${index * 0.05}s`

    card.innerHTML = `
      <div class="card-number">#${index + 1}</div>
      <div class="card-content">
        <p>${rule}</p>
      </div>
      <div class="card-decoration"></div>
    `

    card.addEventListener("click", () => {
      openModal(rule, index)
    })

    rulesGrid.appendChild(card)
  })
}

function openModal(rule, index) {
  modalTitle.textContent = `Regla #${index + 1}`
  modalText.textContent = rule
  ruleModal.classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  ruleModal.classList.add("hidden")
  document.body.style.overflow = ""
}
