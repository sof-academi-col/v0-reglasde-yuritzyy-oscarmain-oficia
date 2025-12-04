const commonRules = [
  "No me gusta que tengas mas amigos aparte de los que ya algo he sabido. No mas amigos ni amiguitos.",
  "No reaccionar a fotos de amig@s.",
  "No subir, etiquetar o mencionar a amig@s en publicaciones de cualquier red social.",
  "Si un amig@ que ya tiene tiempo sin comunicacion vuelve a buscarnos, contarlo el uno al otro.",
  "Si alguien gusta o demuestra intenciones que no son, debemos decirlo y eliminarlo de nuestras vidas.",
  "No abrazar a nuestr@s amig@s.",
  "Decir si invitan a salir y no salir con amig@s; informar con quien estaras o que haras.",
  "Nadie mas puede tener nuestros celulares, solamente Yuritzy y Oscar. con la excepcion de salo y yamis",
  "Si hay problemas o enojos, hay que hablar y solucionarlo el mismo dia.",
  "No compartir publicaciones, memes ni ningun tipo de contenido con amig@s.",
  "Cuando no nos agrade algun amig@, decir lo que sentimos y alejarnos de esa amistad.",
  "No se puede usar shorts o faldas en lugares publicos o donde esten demasiadas personas o para salir. Solo se podra usar donde esten pocas personas o en un lugar X donde no esten demasiadas personas.",
  "Nada de apodos ni aceptar que amig@s nos digan apodos. Solo hablar por el nombre (sin diminutivos).",
  "Debes comer antes de cualquier actividad fisica (entrenamiento, box, gym), asi como en desayuno, almuerzo y cena.",
  "Desayunar antes de ir a la universidad y cumplir con las demas comidas en su tiempo correspondiente.",
  "No chatear con amig@s.",
  "No se puede hacer ni recibir llamadas de amig@s en general, con excepcion de familiares y Esme, hasta que hagamos llamada.",
  "Siempre avisar cuando lleguemos a casa o a cualquier lugar, para estar tranquil@s.",
  "Dedicar al menos un momento al dia para hablar, aunque estemos ocupados.",
  "No dejar en visto ni ignorar mensajes; siempre responder aunque sea con algo breve.",
  "Avisar siempre si vamos a salir de viaje o a un lugar diferente del habitual.",
  "Cuando haya celos o incomodidad, hablarlo de inmediato sin ocultar nada.",
  "Priorizar tiempo juntos antes que tiempo con otras personas.",
  "No usar excusas para ocultar cosas, siempre hablar con sinceridad.",
  "No usar emojis con nadie ni registrar a nadie con emojis en el celular.",
  "No seguir a chic@s ni reaccionar a publicaciones de ninguna red social.",
  'No se puede hablar o hacer alusion a ningun ser femenino en caso de Oscar con excepcion de "La familia de Salo y mi mama y familia" y de ningun ser masculino en el caso de Yuritzy con excepcion de "Su papa y sus primos y familia".',
]

let currentUser = null
const YURITZY_UNIFIED_KEY = "yuritzyUnified"

// DOM Elements
const userSelection = document.getElementById("user-selection")
const mainContent = document.getElementById("main-content")
const ruleCount = document.getElementById("rule-count")
const rulesGrid = document.getElementById("rules-grid")
const userNameDisplay = document.getElementById("user-name-display")
const backBtn = document.getElementById("back-btn")
const yuritzySpecialSection = document.getElementById("yuritzy-special-section")
const acceptAllRulesBtn = document.getElementById("accept-all-rules-btn")
const confirmModal = document.getElementById("confirm-modal")
const confirmYesBtn = document.getElementById("confirm-yes")
const confirmNoBtn = document.getElementById("confirm-no")

const ruleModal = document.getElementById("rule-modal")
const closeModalBtn = document.getElementById("close-modal")
const modalTitle = document.getElementById("modal-title")
const modalText = document.getElementById("modal-text")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  showUserSelection()
})

function showUserSelection() {
  userSelection.style.display = "flex"
  mainContent.style.display = "none"
  confirmModal.style.display = "none"
  ruleModal.style.display = "none"
}

function showMainContent() {
  userSelection.style.display = "none"
  mainContent.style.display = "flex"
}

function setupEventListeners() {
  // User selection buttons
  document.querySelectorAll(".user-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const user = btn.dataset.user
      selectUser(user)
    })
  })

  // Back button - return to user selection
  backBtn.addEventListener("click", () => {
    currentUser = null
    showUserSelection()
  })

  // Accept all rules button (Yuritzy)
  acceptAllRulesBtn.addEventListener("click", () => {
    confirmModal.style.display = "flex"
  })

  confirmYesBtn.addEventListener("click", () => {
    localStorage.setItem(YURITZY_UNIFIED_KEY, "true")
    confirmModal.style.display = "none"
    // Re-render with all rules now visible
    renderForUser("yuritzy")
  })

  confirmNoBtn.addEventListener("click", () => {
    confirmModal.style.display = "none"
  })

  // Close rule modal
  closeModalBtn.addEventListener("click", closeModal)

  ruleModal.addEventListener("click", (e) => {
    if (e.target === ruleModal) {
      closeModal()
    }
  })

  confirmModal.addEventListener("click", (e) => {
    if (e.target === confirmModal) {
      confirmModal.style.display = "none"
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (ruleModal.style.display !== "none") {
        closeModal()
      }
      if (confirmModal.style.display !== "none") {
        confirmModal.style.display = "none"
      }
    }
  })
}

function selectUser(user) {
  currentUser = user

  showMainContent()

  // Update header with user name
  if (user === "oscar") {
    userNameDisplay.textContent = "Oscar"
  } else {
    userNameDisplay.textContent = "Yuritzy"
  }

  renderForUser(user)
}

function renderForUser(user) {
  const yuritzyAccepted = localStorage.getItem(YURITZY_UNIFIED_KEY) === "true"

  if (user === "oscar" || yuritzyAccepted) {
    // Oscar sees all 27 rules, or Yuritzy after accepting
    yuritzySpecialSection.style.display = "none"
    rulesGrid.style.display = "grid"
    ruleCount.textContent = "27 Reglas de Amor"
    renderRules()
  } else {
    // Yuritzy before accepting - only sees golden rule + special button
    yuritzySpecialSection.style.display = "block"
    rulesGrid.style.display = "none"
    ruleCount.textContent = "1 Regla de Amor"
  }
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
  ruleModal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeModal() {
  ruleModal.style.display = "none"
  document.body.style.overflow = ""
}
