import { RegistrationItemMaker } from "./components.js";
import { RegistrationsData } from "./seeds.js";

// seeds data
if (!localStorage.getItem("nourAcademyRegistrations")) localStorage.setItem("nourAcademyRegistrations", JSON.stringify(RegistrationsData))

let data = localStorage.getItem("nourAcademyRegistrations");
data = await JSON.parse(data);

// -------------- table of content ---------------
const tableBody = document.getElementById("table-body");

for (let registration of data) {
    tableBody.innerHTML += RegistrationItemMaker(registration);
}