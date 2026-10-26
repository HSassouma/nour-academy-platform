import { CardMaker, PanierItemMaker, ModalCourseMaker, CheckoutModalMaker, CheckoutRecapMaker } from "./components.js";
import { FixedData } from "./data.js";

const registrationsStorageKey = "nourAcademyRegistrations";

// ----------- Filter the courses --------------
const container = document.getElementById("container-cards");
const nivaux = document.getElementById("filter-niveau");
const matier = document.getElementById("filter-matiere");
const search = document.getElementById("filter-search");

let state = {
    nivaux: "",
    matier: "",
    recherche: "",
};

[nivaux, matier].forEach(el => el.addEventListener("change", () => {
    state.nivaux = nivaux.value;
    state.matier = matier.value;
    setCources(state);
}));

search.addEventListener("input", () => {
    state.recherche = search.value.trim().toLowerCase();
    setCources(state);
});

const dataFixed = FixedData;

function setCources(state) {
    let cardsData = dataFixed;
    container.innerHTML = "";

    if (state.nivaux) cardsData = cardsData.filter(card => state.nivaux === card.level);
    if (state.matier) cardsData = cardsData.filter(card => state.matier === card.category);
    if (state.recherche) cardsData = cardsData.filter(card => card.subject.toLowerCase().startsWith(state.recherche));

    for (let v of cardsData) {
        const div = document.createElement("div");
        div.innerHTML = CardMaker(v);
        const card = div.firstElementChild;

        card.querySelector(`#button-plus-details-${v.id}`).addEventListener("click", () => openModal(v));
        card.querySelector(`#button-add-to-panier-${v.id}`).addEventListener("click", () => addToPanier(v));

        container.appendChild(card);
    }

    if (cardsData.length <= 0) {
        const p = document.createElement("p");
        p.textContent = "Aucun cours ne correspond.";
        container.appendChild(p);
    }
}

setCources(state);

// ----------- Panier --------------
const panierContainer = document.getElementById("container-panier");
const panierCount = document.getElementById("panier-count");
const panierTotal = document.getElementById("panier-total");
const panierEmpty = document.getElementById("panier-empty");
const panierPanel = document.getElementById("panier");
const panierOverlay = document.getElementById("panier-overlay");
const panierToggle = document.getElementById("panier-toggle");
const panierToggleCount = document.getElementById("panier-toggle-count");
const panierClose = document.getElementById("panier-close");
const panierCheckOut = document.getElementById("panier-checkout");

const panier = [];

function updatePanierSummary() {
    panierCount.textContent = panier.length;
    panierToggleCount.textContent = panier.length;
    panierToggleCount.classList.toggle("hidden", panier.length === 0);
    panierEmpty.classList.toggle("hidden", panier.length > 0);
    const total = panier.reduce((sum, c) => sum + Number(c.price), 0);
    panierTotal.textContent = `${total} MAD`;
}

function openPanier() {
    panierPanel.classList.remove("hidden");
    panierOverlay.classList.remove("hidden");
}

function closePanier() {
    panierPanel.classList.add("hidden");
    panierOverlay.classList.add("hidden");
}

// ----------- Checkout --------------
function openCheckout() {
    const div = document.createElement("div");
    div.innerHTML = CheckoutModalMaker();
    const overlay = div.firstElementChild;
    document.body.append(overlay);
    document.body.classList.add("overflow-hidden");
    closePanier();

    const form = overlay.querySelector("#checkout-form");
    const recap = overlay.querySelector("#checkout-recap");
    const error = overlay.querySelector("#checkout-error");
    const bars = overlay.querySelectorAll(".progress-bar");

    const closeCheckout = () => {
        overlay.remove();
        document.body.classList.remove("overflow-hidden");
    };

    overlay.addEventListener("click", e => {
        if (e.target === overlay) closeCheckout();
    });
    overlay.querySelector("#checkout-close").addEventListener("click", closeCheckout);

    form.addEventListener("submit", e => {
        e.preventDefault();
        error.classList.add("hidden");
        error.textContent = "";

        if (panier.length === 0) {
            error.textContent = "Panier vide.";
            error.classList.remove("hidden");
            return;
        }

        const parent = overlay.querySelector("#checkout-parent").value.trim();
        const email = overlay.querySelector("#checkout-email").value.trim();
        const phone = overlay.querySelector("#checkout-phone").value.replace(/\s/g, "");
        const student = overlay.querySelector("#checkout-student").value.trim();
        const level = overlay.querySelector("#checkout-level").value;
        const pass = overlay.querySelector("#checkout-password").value;
        const confirm = overlay.querySelector("#checkout-confirm").value;
        const consent = overlay.querySelector("#checkout-consent").checked;

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const phoneOk = /^(?:\+212[67]\d{8}|0[67]\d{8})$/.test(phone);
        const passOk = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/.test(pass);

        if (parent.length < 2 || parent.length > 60) return showErr("Le nom du parent doit contenir entre 2 et 60 caractères.");
        if (email.length < 5 || email.length > 254) return showErr("L'email doit contenir entre 5 et 254 caractères.");
        if (!emailOk) return showErr("Email invalide.");
        if (phone.length < 10 || phone.length > 13) return showErr("Le téléphone doit contenir entre 10 et 13 caractères.");
        if (!phoneOk) return showErr("Téléphone marocain invalide : utilisez 06/07XXXXXXXX ou +2126/7XXXXXXXX.");
        if (student.length < 2 || student.length > 60) return showErr("Le prénom de l'élève doit contenir entre 2 et 60 caractères.");
        if (!level) return showErr("Niveau de l'élève requis.");
        if (!passOk) return showErr("Mot de passe: 8+ car., 1 maj, 1 chiffre, 1 spécial.");
        if (confirm.length < 8 || confirm.length > 64) return showErr("La confirmation doit contenir entre 8 et 64 caractères.");
        if (pass !== confirm) return showErr("Confirmation différente.");
        if (!consent) return showErr("Consentement requis.");

        function showErr(msg) {
            error.textContent = msg;
            error.classList.remove("hidden");
        }

        const total = panier.reduce((s, c) => s + Number(c.price), 0);
        const registrations = JSON.parse(localStorage.getItem(registrationsStorageKey) || "[]");
        const dossier = registrations.length + 1;
        const savedCourses = panier.map(course => ({
            id: course.id,
            title: course.subject,
            priceMADPerMonth: Number(course.price),
        }));
        recap.innerHTML = CheckoutRecapMaker({ dossier, parent, email, student, level, courses: [...panier], total });
        form.classList.add("hidden");
        recap.classList.remove("hidden");
        recap.classList.add("flex");
        if (bars[0]) bars[0].classList.replace("bg-gray-200", "bg-green-500");
        if (bars[1]) bars[1].classList.replace("bg-gray-200", "bg-primary-600");

        recap.querySelector("#checkout-done").addEventListener("click", () => {
            registrations.push({
                id: dossier,
                parent: { name: parent, email, phone },
                student: { name: student, level },
                courses: savedCourses,
                totalMADPerMonth: total,
            });

            localStorage.setItem(registrationsStorageKey, JSON.stringify(registrations));
            closeCheckout();
        });
        form.reset();
        panier.length = 0;
        panierContainer.innerHTML = "";
        updatePanierSummary();
    });
}

panierCheckOut.addEventListener("click", () => {
    if (panier.length > 0) openCheckout();
});

panierToggle.addEventListener("click", openPanier);
panierClose.addEventListener("click", closePanier);
panierOverlay.addEventListener("click", closePanier);

function addToPanier(course) {
    if (panier.some(item => item.id === course.id) || course.availablePlaces === 0) return;

    panier.push(course);
    course.availablePlaces -= 1;
    setCources(state);

    let div = document.createElement("div");
    div.innerHTML = PanierItemMaker(course)
    const panierItem = div.firstElementChild;
    panierContainer.append(panierItem);

    const deleteButton = panierItem.querySelector(`#delete-button-${course.id}`);
    deleteButton.addEventListener("click", () => {
        const index = panier.findIndex(item => item.id === course.id);
        if (index !== -1) {
            panier.splice(index, 1);
            course.availablePlaces += 1;
            setCources(state);
        }
        panierItem.remove();
        updatePanierSummary();
    });

    updatePanierSummary();
}

updatePanierSummary();

// ----------- More details modal --------------
function openModal(course) {
    const div = document.createElement("div");
    div.innerHTML = ModalCourseMaker(course);
    const overlay = div.firstElementChild;
    document.body.append(overlay);
    document.body.classList.add("overflow-hidden");

    const closeModal = () => {
        overlay.remove();
        document.body.classList.remove("overflow-hidden");
        document.removeEventListener("keydown", onKeyDown);
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    overlay.querySelector("#modal-close").addEventListener("click", closeModal);
}
