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
const openFormButton = document.getElementById("open-registration-form");
const formOverlay = document.getElementById("registration-form-overlay");
const formContainer = document.getElementById("registration-form-container");
// const closeFormButton = document.getElementById("close-registration-form");
// const form = document.getElementById("registration-form");
// const dossierInput = document.getElementById("registration-id");
// const studentNameInput = document.getElementById("registration-student-name");
// const levelSelect = document.getElementById("registration-level");
// const courseSelect = document.getElementById("registration-course");
// const parentNameInput = document.getElementById("registration-parent-name");
// const parentPhoneInput = document.getElementById("registration-parent-phone");
// const statusSelect = document.getElementById("registration-status");
// const dateInput = document.getElementById("registration-date");
// const formError = document.getElementById("registration-form-error");
// const successMessage = document.getElementById("registration-success");
function afficherInscription() {
    formOverlay.classList.remove("hidden");
    formContainer.classList.remove("hidden");
}
openFormButton.addEventListener("click", afficherInscription);

