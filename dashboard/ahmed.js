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

