/* =============== ahmed start ============ */

import { RegistrationItemMaker } from "./components.js";
import { RegistrationsData } from "./seeds.js";
import { FixedData, migrerNiveaux } from "../src/data.js";
import { nomValide, telephoneValide } from "../src/validation.js";

const STORAGE_KEY = "nourAcademyRegistrations";

// -------------- seeds data ---------------------
if (!localStorage.getItem(STORAGE_KEY) || (localStorage.getItem(STORAGE_KEY) && localStorage.getItem(STORAGE_KEY).length === 0)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(RegistrationsData));
}

let Data = JSON.parse(localStorage.getItem(STORAGE_KEY));

// -------------- migration des anciens niveaux (localStorage) --------------
// Seul "Bac" devient "2BAC". "Lycée", "Tous niveaux" et les valeurs inconnues
// sont conservés : sans information fiable, on ne devine pas le niveau.
// Aucune inscription n'est supprimée et les autres données restent intactes.
const nbNiveauxMigres = migrerNiveaux(Data);
if (nbNiveauxMigres > 0) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Data));
}

// -------------- migration de la date d'inscription (localStorage) --------------
// Une inscription sans date valide reçoit une date une seule fois : sa date
// d'origine si elle existe encore (ancien champ "date"), sinon la date du jour.
// Les dates déjà présentes ne sont jamais remplacées.
let nbDatesMigrees = 0;
for (const inscription of Data) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(inscription.dateInscription)) continue;
  inscription.dateInscription =
    inscription.date || new Date().toISOString().slice(0, 10);
  nbDatesMigrees += 1;
}
if (nbDatesMigrees > 0) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Data));
}

// -------------- table of content ---------------
const tableBody = document.getElementById("table-body");
const countElement = document.getElementById("count");

// -------------- Filter the data ---------------
const searchFilter = document.getElementById("search");
const statusFilter = document.getElementById("status");
const sortFilter = document.getElementById("sort");

function AfficherInscriptions() {
  const texte = searchFilter.value.trim().toLowerCase();
  const statut = statusFilter.value;

  const resultat = Data.filter(
    (registration) =>
      (!texte ||
        String(registration.id).includes(texte) ||
        registration.parent.name.toLowerCase().includes(texte) ||
        registration.parent.phone.toLowerCase().includes(texte) ||
        registration.student.name.toLowerCase().includes(texte)) &&
      (!statut || registration.status === statut),
  );

  resultat.sort((a, b) => {
    if (sortFilter.value === "date-asc") {
      const diff = new Date(a.dateInscription) - new Date(b.dateInscription);
      if (diff !== 0) return diff;
      return a.id - b.id;
    }
    if (sortFilter.value === "date-desc") {
      const diff = new Date(b.dateInscription) - new Date(a.dateInscription);
      if (diff !== 0) return diff;
      return b.id - a.id;
    }
    if (sortFilter.value === "name-asc") {
      const diff = a.student.name.localeCompare(b.student.name);
      if (diff !== 0) return diff;
      return a.id - b.id;
    }
    if (sortFilter.value === "name-desc") {
      const diff = b.student.name.localeCompare(a.student.name);
      if (diff !== 0) return diff;
      return b.id - a.id;
    }
    // Tri par défaut (valeur "id-asc") : ID croissant.
    return a.id - b.id;
  });

  if (countElement) {
    countElement.textContent = `${resultat.length} inscription${resultat.length > 1 ? "s" : ""} trouvée${resultat.length > 1 ? "s" : ""}`;
  }

  tableBody.innerHTML = resultat.map(RegistrationItemMaker).join("");
}

searchFilter.addEventListener("input", AfficherInscriptions);
statusFilter.addEventListener("change", AfficherInscriptions);
sortFilter.addEventListener("change", AfficherInscriptions);

AfficherInscriptions();

// -------------- Delet Item from local storage and front ---------------
tableBody.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="delete"]');
  if (!button) return;

  Data = Data.filter(
    (registration) => String(registration.id) !== button.dataset.id,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(Data));
  AfficherInscriptions();
});

/* =============== ahmed end ============ */

const CAPACITE_MAX_GROUPE = 15;
const STATUTS_INSCRIPTION = ["En attente", "Validée", "Payée"];

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
  remplirCoursParNiveau(courseSelect, this.value);
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

// Remplit un select de cours avec les cours du niveau choisi (4 par niveau).
function remplirCoursParNiveau(select, niveau) {
  select.innerHTML = '<option value="">Choisir un cours</option>';

  if (!niveau) return;

  for (const course of FixedData.filter((course) => course.level === niveau)) {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = `${course.subject} — ${course.level} — ${course.price} MAD/mois`;
    select.appendChild(option);
  }
}

// formulaire
function afficherInscription() {
  effacerToutesLesErreurs();

  const prochainId = Data.length
    ? Math.max(...Data.map((registration) => Number(registration.id))) + 1
    : 1;

  dossierInput.value = prochainId;
  remplirCoursParNiveau(courseSelect, levelSelect.value);
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
    errorCourse.textContent = niveau
      ? "Veuillez choisir un cours."
      : "Veuillez d'abord choisir un niveau.";
    errorCourse.classList.remove("hidden");
    formulaireValide = false;
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
  const inscriptionExiste = Data.some(
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
  const nombreDansGroupe = Data.filter(
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

  Data.push(nouvelleInscription);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(Data));

  
  form.reset();
  fermerInscription();
  
  successMessage.textContent = "L'inscription a été ajoutée avec succès !";
  successMessage.classList.remove("hidden");
  
  AfficherInscriptions();
});

// -------------- edit registration popup ---------------
const editOverlay = document.getElementById("edit-registration-overlay");
const editContainer = document.getElementById("edit-registration-container");
const editCloseButton = document.getElementById("close-edit-registration");
const editCancelButton = document.getElementById("cancel-edit-registration");
const editForm = document.getElementById("edit-registration-form");
const editIdInput = document.getElementById("edit-registration-id");
const editStudentNameInput = document.getElementById("edit-student-name");
const editLevelSelect = document.getElementById("edit-level");
const editCourseSelect = document.getElementById("edit-course");
const editParentNameInput = document.getElementById("edit-parent-name");
const editParentPhoneInput = document.getElementById("edit-parent-phone");
const editStatusSelect = document.getElementById("edit-status");

// Per-field error elements for edit popup
const editErrorStudentName = document.getElementById("edit-error-student-name");
const editErrorLevel = document.getElementById("edit-error-level");
const editErrorCourse = document.getElementById("edit-error-course");
const editErrorParentName = document.getElementById("edit-error-parent-name");
const editErrorPhone = document.getElementById("edit-error-phone");
const editErrorStatus = document.getElementById("edit-error-status");
const editFormError = document.getElementById("edit-form-error");

// Live error clearing on user input / change (edit popup)
editStudentNameInput.addEventListener("input", function () {
  editErrorStudentName.textContent = "";
  editErrorStudentName.classList.add("hidden");
});
editLevelSelect.addEventListener("change", function () {
  editErrorLevel.textContent = "";
  editErrorLevel.classList.add("hidden");
  remplirCoursParNiveau(editCourseSelect, this.value);
  editErrorCourse.textContent = "";
  editErrorCourse.classList.add("hidden");
});
editCourseSelect.addEventListener("change", function () {
  editErrorCourse.textContent = "";
  editErrorCourse.classList.add("hidden");
});
editParentNameInput.addEventListener("input", function () {
  editErrorParentName.textContent = "";
  editErrorParentName.classList.add("hidden");
});
editParentPhoneInput.addEventListener("input", function () {
  editErrorPhone.textContent = "";
  editErrorPhone.classList.add("hidden");
});
editStatusSelect.addEventListener("change", function () {
  editErrorStatus.textContent = "";
  editErrorStatus.classList.add("hidden");
});

function effacerErreursEdit() {
  editErrorStudentName.textContent = "";
  editErrorStudentName.classList.add("hidden");
  editErrorLevel.textContent = "";
  editErrorLevel.classList.add("hidden");
  editErrorCourse.textContent = "";
  editErrorCourse.classList.add("hidden");
  editErrorParentName.textContent = "";
  editErrorParentName.classList.add("hidden");
  editErrorPhone.textContent = "";
  editErrorPhone.classList.add("hidden");
  editErrorStatus.textContent = "";
  editErrorStatus.classList.add("hidden");
  editFormError.textContent = "";
  editFormError.classList.add("hidden");
}

// 1. Afficher le popup de modification
function afficherPopupModification(id) {
  Data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const inscription = Data.find(
    (registration) => Number(registration.id) === Number(id),
  );

  if (!inscription) {
    console.error(
      `Impossible de modifier : inscription avec l'ID ${id} introuvable.`,
    );
    return;
  }

  effacerErreursEdit();

  editIdInput.value = inscription.id;
  editStudentNameInput.value = inscription.student.name;
  editLevelSelect.value = inscription.student.level;

  remplirCoursParNiveau(editCourseSelect, inscription.student.level);

  // Ne présélectionne le cours que s'il existe encore dans le catalogue actuel :
  // une ancienne inscription peut référencer un cours qui n'existe plus.
  const coursEnregistre = inscription.courses && inscription.courses[0];
  if (coursEnregistre) {
    const coursCatalogue = FixedData.find(
      (course) => String(course.id) === String(coursEnregistre.id),
    );
    if (
      coursCatalogue &&
      String(coursEnregistre.title).startsWith(coursCatalogue.subject)
    ) {
      editCourseSelect.value = coursCatalogue.id;
    }
  }

  editParentNameInput.value = inscription.parent.name;
  editParentPhoneInput.value = inscription.parent.phone;
  editStatusSelect.value =
    typeof inscription.status === "string" && inscription.status.trim() !== ""
      ? inscription.status
      : "En attente";

  editOverlay.classList.remove("hidden");
  editContainer.classList.remove("hidden");
}

// 2. Fermer le popup de modification
function fermerPopupModification() {
  editOverlay.classList.add("hidden");
  editContainer.classList.add("hidden");
  effacerErreursEdit();
}

editCloseButton.addEventListener("click", fermerPopupModification);
editCancelButton.addEventListener("click", fermerPopupModification);
editOverlay.addEventListener("click", function (event) {
  if (event.target === editOverlay) {
    fermerPopupModification();
  }
});

// 3. Modifier l'inscription (soumission du formulaire d'édition)
function modifierInscription(event) {
  event.preventDefault();
  effacerErreursEdit();

  const id = Number(editIdInput.value);
  const nomEleve = editStudentNameInput.value.trim();
  const niveau = editLevelSelect.value;
  const nomParent = editParentNameInput.value.trim();
  const telephoneParent = editParentPhoneInput.value.trim();
  const statut = editStatusSelect.value;

  const coursChoisi = FixedData.find(
    (course) => String(course.id) === editCourseSelect.value,
  );

  let formulaireValide = true;

  // Validation du nom de l'élève
  if (!nomEleve) {
    editErrorStudentName.textContent =
      "Le nom et prénom de l'élève est obligatoire.";
    editErrorStudentName.classList.remove("hidden");
    formulaireValide = false;
  } else if (!nomValide(nomEleve)) {
    editErrorStudentName.textContent =
      "Le nom doit contenir entre 2 et 60 caractères.";
    editErrorStudentName.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du niveau
  if (!niveau) {
    editErrorLevel.textContent = "Veuillez choisir un niveau.";
    editErrorLevel.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du cours
  if (!editCourseSelect.value) {
    editErrorCourse.textContent = niveau
      ? "Veuillez choisir un cours."
      : "Veuillez d'abord choisir un niveau.";
    editErrorCourse.classList.remove("hidden");
    formulaireValide = false;
  } else if (!coursChoisi) {
    editErrorCourse.textContent = "Le cours sélectionné n'existe pas.";
    editErrorCourse.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du nom du parent
  if (!nomParent) {
    editErrorParentName.textContent =
      "Le nom et prénom du parent est obligatoire.";
    editErrorParentName.classList.remove("hidden");
    formulaireValide = false;
  } else if (!nomValide(nomParent)) {
    editErrorParentName.textContent =
      "Le nom doit contenir entre 2 et 60 caractères.";
    editErrorParentName.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du téléphone
  if (!telephoneParent) {
    editErrorPhone.textContent = "Le numéro de téléphone est obligatoire.";
    editErrorPhone.classList.remove("hidden");
    formulaireValide = false;
  } else if (!telephoneValide(telephoneParent)) {
    editErrorPhone.textContent =
      "Le numéro de téléphone doit être au format 06XXXXXXXX ou +2126XXXXXXXX.";
    editErrorPhone.classList.remove("hidden");
    formulaireValide = false;
  }

  // Validation du statut
  if (!statut) {
    editErrorStatus.textContent = "Veuillez choisir un statut.";
    editErrorStatus.classList.remove("hidden");
    formulaireValide = false;
  } else if (!STATUTS_INSCRIPTION.includes(statut)) {
    editErrorStatus.textContent =
      "Veuillez choisir un statut valide (En attente, Validée ou Payée).";
    editErrorStatus.classList.remove("hidden");
    formulaireValide = false;
  }

  if (!formulaireValide) return;

  // Contrôle des doublons (exclut l'inscription en cours de modification)
  const inscriptionExiste = Data.some(
    (registration) =>
      Number(registration.id) !== id &&
      registration.student.name.toLowerCase() === nomEleve.toLowerCase() &&
      registration.courses.some(
        (course) => String(course.id) === String(coursChoisi.id),
      ),
  );

  if (inscriptionExiste) {
    editFormError.textContent = "Cet élève est déjà inscrit à ce cours.";
    editFormError.classList.remove("hidden");
    return;
  }

  // Contrôle de la capacité maximale (exclut l'inscription modifiée)
  const nombreDansGroupe = Data.filter(
    (registration) =>
      Number(registration.id) !== id &&
      String(registration.student.level) === String(niveau) &&
      registration.courses.some(
        (course) => String(course.id) === String(coursChoisi.id),
      ),
  ).length;

  if (nombreDansGroupe >= CAPACITE_MAX_GROUPE) {
    editFormError.textContent =
      "Ce groupe a atteint sa capacité maximale de 15 élèves.";
    editFormError.classList.remove("hidden");
    return;
  }

  // Mise à jour de l'inscription existante
  const index = Data.findIndex(
    (registration) => Number(registration.id) === id,
  );

  if (index === -1) return;

  Data[index] = {
    ...Data[index],
    parent: {
      ...Data[index].parent,
      name: nomParent,
      phone: telephoneParent,
    },
    student: {
      ...Data[index].student,
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
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(Data));

  AfficherInscriptions();
  fermerPopupModification();

  successMessage.textContent = "L'inscription a été modifiée avec succès !";
  successMessage.classList.remove("hidden");
}

editForm.addEventListener("submit", modifierInscription);


// Event delegation : clic sur "Modifier" dans le tableau
tableBody.addEventListener("click", function (event) {
  const editButton = event.target.closest("[data-action='edit']");
  if (editButton) {
    afficherPopupModification(editButton.getAttribute("data-id"));
  }
});