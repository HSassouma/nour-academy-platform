import { RegistrationItemMaker } from "./components.js";
import { RegistrationsData } from "./seeds.js";
import { FixedData } from "../src/data.js";
import { nomValide, telephoneValide } from "../src/validation.js";

const STORAGE_KEY = "nourAcademyRegistrations";
const CAPACITE_MAX_GROUPE = 15;
const STATUTS_INSCRIPTION = ["En attente", "Validée", "Payée"];

// seeds data
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(RegistrationsData));
}

let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

// -------------- table of content ---------------
const tableBody = document.getElementById("table-body");
const count = document.getElementById("count");

function afficherInscriptions() {
  tableBody.innerHTML = "";
  for (const registration of data) {
    tableBody.innerHTML += RegistrationItemMaker(registration);
  }

  count.textContent = `${data.length} ${data.length === 1 ? "inscription" : "inscriptions"}`;
}

afficherInscriptions();

// -------------- add registration form ---------------
const successMessage = document.getElementById("registration-success");
const formError = document.getElementById("registration-form-error");
const openFormButton = document.getElementById("open-registration-form");
const formOverlay = document.getElementById("registration-form-overlay");
const formContainer = document.getElementById("registration-form-container");
const closeFormButton = document.getElementById("close-registration-form");
const form = document.getElementById("registration-form");
const dossierInput = document.getElementById("registration-id");
const studentNameInput = document.getElementById("registration-student-name");
const levelSelect = document.getElementById("registration-level");
const courseSelect = document.getElementById("registration-course");
const parentNameInput = document.getElementById("registration-parent-name");
const parentPhoneInput = document.getElementById("registration-parent-phone");
const statusSelect = document.getElementById("registration-status");
const cancelform = document.querySelector("#cancel-registration-form");

// Per-field error elements
const errorStudentName = document.getElementById("error-student-name");
const errorLevel = document.getElementById("error-level");
const errorCourse = document.getElementById("error-course");
const errorParentName = document.getElementById("error-parent-name");
const errorPhone = document.getElementById("error-phone");
const errorStatus = document.getElementById("error-status");

function effacerToutesLesErreurs() {
  errorStudentName.textContent = "";
  errorStudentName.classList.add("hidden");
  errorLevel.textContent = "";
  errorLevel.classList.add("hidden");
  errorCourse.textContent = "";
  errorCourse.classList.add("hidden");
  errorParentName.textContent = "";
  errorParentName.classList.add("hidden");
  errorPhone.textContent = "";
  errorPhone.classList.add("hidden");
  errorStatus.textContent = "";
  errorStatus.classList.add("hidden");
  formError.textContent = "";
  formError.classList.add("hidden");
  successMessage.textContent = "";
  successMessage.classList.add("hidden");
}

// Efface les erreurs au fur et à mesure que l'utilisateur corrige les champs
studentNameInput.addEventListener("input", function () {
  errorStudentName.textContent = "";
  errorStudentName.classList.add("hidden");
});

levelSelect.addEventListener("change", function () {
  errorLevel.textContent = "";
  errorLevel.classList.add("hidden");
  remplirCoursParNiveau(this.value);
  // Efface aussi l'erreur du cours si le niveau change
  errorCourse.textContent = "";
  errorCourse.classList.add("hidden");
});

courseSelect.addEventListener("change", function () {
  errorCourse.textContent = "";
  errorCourse.classList.add("hidden");
});

parentNameInput.addEventListener("input", function () {
  errorParentName.textContent = "";
  errorParentName.classList.add("hidden");
});

parentPhoneInput.addEventListener("input", function () {
  errorPhone.textContent = "";
  errorPhone.classList.add("hidden");
});

statusSelect.addEventListener("change", function () {
  errorStatus.textContent = "";
  errorStatus.classList.add("hidden");
});

function remplirCoursParNiveau(niveau) {
  courseSelect.innerHTML = '<option value="">Choisir un cours</option>';

  if (!niveau) return;

  // Pour Primaire : aucun cours dans FixedData
  if (niveau === "Primaire") {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Aucun cours disponible pour ce niveau";
    option.disabled = true;
    courseSelect.appendChild(option);
    return;
  }

  // Pour Bac : seuls les cours "Tous niveaux" sont disponibles
  const coursFiltres = FixedData.filter(
    (course) => course.level === niveau || course.level === "Tous niveaux",
  );

  if (coursFiltres.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Aucun cours disponible pour ce niveau";
    option.disabled = true;
    courseSelect.appendChild(option);
    return;
  }

  for (const course of coursFiltres) {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = `${course.subject} — ${course.level} — ${course.price} MAD/mois`;
    courseSelect.appendChild(option);
  }
}

// formulaire
function afficherInscription() {
  effacerToutesLesErreurs();

  const prochainId = data.length
    ? Math.max(...data.map((registration) => Number(registration.id))) + 1
    : 1;

  dossierInput.value = prochainId;
  remplirCoursParNiveau(levelSelect.value);
  formOverlay.classList.remove("hidden");
  formContainer.classList.remove("hidden");
}
openFormButton.addEventListener("click", afficherInscription);

function fermerInscription() {
  formOverlay.classList.add("hidden");
  formContainer.classList.add("hidden");
}
closeFormButton.addEventListener("click", fermerInscription);
cancelform.addEventListener("click", fermerInscription);
formOverlay.addEventListener("click", fermerInscription);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  effacerToutesLesErreurs();

  const nomEleve = studentNameInput.value.trim();
  const niveau = levelSelect.value;
  const nomParent = parentNameInput.value.trim();
  const telephoneParent = parentPhoneInput.value.trim();
  const statut = statusSelect.value;

  const coursChoisi = FixedData.find(
    (course) => String(course.id) === courseSelect.value,
  );

  let formulaireValide = true;

  // Validation du nom de l'élève
  if (!nomEleve) {
    errorStudentName.textContent = "Le nom et prénom de l'élève est obligatoire.";
    errorStudentName.classList.remove("hidden");
    formulaireValide = false;
  } else if (!nomValide(nomEleve)) {
    errorStudentName.textContent = "Le nom doit contenir entre 2 et 60 caractères.";
    errorStudentName.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du niveau
  if (!niveau) {
    errorLevel.textContent = "Veuillez choisir un niveau.";
    errorLevel.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du cours
  if (!courseSelect.value) {
    if (niveau && niveau !== "Primaire" && niveau !== "Bac") {
      // Pour les niveaux avec des cours, c'est un vrai choix obligatoire
      const coursDisponibles = FixedData.filter(
        (course) => course.level === niveau || course.level === "Tous niveaux",
      );
      if (coursDisponibles.length > 0) {
        errorCourse.textContent = "Veuillez choisir un cours.";
        errorCourse.classList.remove("hidden");
        formulaireValide = false;
      }
    } else if (niveau === "Primaire") {
      errorCourse.textContent = "Aucun cours disponible pour le niveau Primaire.";
      errorCourse.classList.remove("hidden");
      formulaireValide = false;
    } else if (niveau === "Bac") {
      const coursDisponibles = FixedData.filter(
        (course) => course.level === "Tous niveaux",
      );
      if (coursDisponibles.length > 0) {
        errorCourse.textContent = "Veuillez choisir un cours.";
        errorCourse.classList.remove("hidden");
        formulaireValide = false;
      }
    }
  } else if (!coursChoisi) {
    errorCourse.textContent = "Le cours sélectionné n'existe pas.";
    errorCourse.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du nom du parent
  if (!nomParent) {
    errorParentName.textContent = "Le nom et prénom du parent est obligatoire.";
    errorParentName.classList.remove("hidden");
    formulaireValide = false;
  } else if (!nomValide(nomParent)) {
    errorParentName.textContent = "Le nom doit contenir entre 2 et 60 caractères.";
    errorParentName.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du téléphone
  if (!telephoneParent) {
    errorPhone.textContent = "Le numéro de téléphone est obligatoire.";
    errorPhone.classList.remove("hidden");
    formulaireValide = false;
  } else if (!telephoneValide(telephoneParent)) {
    errorPhone.textContent = "Le numéro de téléphone doit être au format 06XXXXXXXX ou +2126XXXXXXXX.";
    errorPhone.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du statut
  if (!statut) {
    errorStatus.textContent = "Veuillez choisir un statut.";
    errorStatus.classList.remove("hidden");
    formulaireValide = false;
  } else if (!STATUTS_INSCRIPTION.includes(statut)) {
    errorStatus.textContent = "Veuillez choisir un statut valide (En attente, Validée ou Payée).";
    errorStatus.classList.remove("hidden");
    formulaireValide = false;
  }

  if (!formulaireValide) return;

  // Contrôle des doublons
  const inscriptionExiste = data.some(
    (registration) =>
      registration.student.name.toLowerCase() === nomEleve.toLowerCase() &&
      registration.courses.some(
        (course) => String(course.id) === String(coursChoisi.id),
      ),
  );

  if (inscriptionExiste) {
    formError.textContent =
      "Cet élève est déjà inscrit à ce cours.";
    formError.classList.remove("hidden");
    return;
  }

  // Contrôle de la capacité maximale du groupe
  const nombreDansGroupe = data.filter(
    (registration) =>
      String(registration.student.level) === String(niveau) &&
      registration.courses.some(
        (course) => String(course.id) === String(coursChoisi.id),
      ),
  ).length;

  if (nombreDansGroupe >= CAPACITE_MAX_GROUPE) {
    formError.textContent =
      "Ce groupe a atteint sa capacité maximale de 15 élèves.";
    formError.classList.remove("hidden");
    return;
  }

  const nouvelleInscription = {
    id: Number(dossierInput.value),
    parent: {
      name: nomParent,
      phone: telephoneParent,
    },
    student: {
      name: nomEleve,
      level: niveau,
    },
    courses: [
      {
        id: coursChoisi.id,
        title: `${coursChoisi.subject} - ${coursChoisi.level}`,
        priceMADPerMonth: Number(coursChoisi.price),
      },
    ],
    totalMADPerMonth: Number(coursChoisi.price),
    status: statut,
    dateInscription: new Date().toISOString().slice(0, 10),
  };

  data.push(nouvelleInscription);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  afficherInscriptions();

  form.reset();
  fermerInscription();

  successMessage.textContent = "L'inscription a été ajoutée avec succès !";
  successMessage.classList.remove("hidden");
});