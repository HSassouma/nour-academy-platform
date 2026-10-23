import { CardMaker, PanierItemMaker, ModalCourseMaker } from "./components.js";

// ----------- Filter the courses --------------
const container = document.getElementById("container-cards");
const nivaux = document.getElementById("filter-niveau");
const matier = document.getElementById("filter-matiere");
const search = document.getElementById("filter-search");

let state = {
    nivaux: "",
    matier: "",
    recherche: "",
}

nivaux.addEventListener("change", () => {
    state.nivaux = nivaux.value;
    SetCources(state);
});

matier.addEventListener("change", () => {
    state.matier = matier.value;
    SetCources(state);
});

search.addEventListener("input", () => {
    state.recherche = search.value.trim().toLowerCase();
    SetCources(state);
});

const data = await fetch("/src/assets/data.json");
const dataFixed = await data.json();

function SetCources(state) {
    let cardsData = dataFixed;
    container.innerHTML = "";
    
    if (state.nivaux) {
        cardsData = cardsData.filter(card => state.nivaux === card.level);
    }
    
    if (state.matier) {
        cardsData = cardsData.filter(card => state.matier === card.category);
    }
    
    if (state.recherche) {
        cardsData = cardsData.filter(card => card.subject.toLowerCase().startsWith(state.recherche));
    }
    
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

SetCources(state);

// ----------- Panier controll --------------
const panierContainer = document.getElementById("container-panier");
const panierCount = document.getElementById("panier-count");
const panierTotal = document.getElementById("panier-total");
const panierEmpty = document.getElementById("panier-empty");
const panierPanel = document.getElementById("panier");
const panierOverlay = document.getElementById("panier-overlay");
const panierToggle = document.getElementById("panier-toggle");
const panierToggleCount = document.getElementById("panier-toggle-count");
const panierClose = document.getElementById("panier-close");

const panier = [];

function updatePanierSummary() {
    panierCount.textContent = panier.length;
    panierToggleCount.textContent = panier.length;
    panierToggleCount.classList.toggle("hidden", panier.length === 0);
    panierEmpty.classList.toggle("hidden", panier.length > 0);
    const total = panier.reduce((sum, course) => sum + Number(course.price), 0);
    const currency = "MAD";
    panierTotal.textContent = `${total} ${currency}`;
}

function openPanier() {
    panierPanel.classList.remove("hidden");
    panierOverlay.classList.remove("hidden");
}

function closePanier() {
    panierPanel.classList.add("hidden");
    panierOverlay.classList.add("hidden");
}

panierToggle.addEventListener("click", openPanier);
panierClose.addEventListener("click", closePanier);
panierOverlay.addEventListener("click", closePanier);

function addToPanier(course) {
    if (panier.some(item => item.id === course.id)) return;

    panier.push(course);

    let div = document.createElement("div");
    div.innerHTML = PanierItemMaker(course)
    const panierItem = div.firstElementChild;
    panierContainer.append(panierItem);

    const deleteButton = panierItem.querySelector(`#delete-button-${course.id}`);
    deleteButton.addEventListener("click", () => {
        const index = panier.findIndex(item => item.id === course.id);
        if (index !== -1) panier.splice(index, 1);
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

// ----------- Forms modals --------------
