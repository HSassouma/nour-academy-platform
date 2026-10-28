import { RegistrationItemMaker } from "./components.js";
import { RegistrationsData } from "./seeds.js";

const STORAGE_KEY = "nourAcademyRegistrations";

// -------------- seeds data ---------------------
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(RegistrationsData));
}

let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

// -------------- table of content ---------------
const tableBody = document.getElementById("table-body");

function afficherInscriptions() {
  tableBody.innerHTML = "";
  for (const registration of data) {
    tableBody.innerHTML += RegistrationItemMaker(registration);
  }
}

afficherInscriptions();

// -------------- Filter the data ---------------
const searchFilter = document.getElementById("filter-search");
const levelFilter = document.getElementById("filter-level");
const statusFilter = document.getElementById("filter-status");

function filtrerInscriptions() {
  const texte = searchFilter.value.trim().toLowerCase();
  const niveau = levelFilter.value;
  const statut = statusFilter.value;

  const resultat = data.filter(
    (registration) =>
      (!texte  || registration.id.toLowerCase().startsWith(texte) || registration.parent.name.toLowerCase().startsWith(texte) || registration.parent.phone.startsWith(texte) || registration.student.name.toLowerCase().startsWith(texte)) &&
      (!niveau || registration.student.level === niveau) &&
      (!statut || (registration.status || "En attente") === statut),
  );

  tableBody.innerHTML = resultat.map(RegistrationItemMaker).join("");
}

searchFilter.addEventListener("input", filtrerInscriptions);
levelFilter.addEventListener("change", filtrerInscriptions);
statusFilter.addEventListener("change", filtrerInscriptions);

// -------------- Delet Item from local storage and front ---------------