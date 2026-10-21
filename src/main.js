import { CardMaker, PanierItemMaker } from "./components.js";

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
        container.appendChild(div.firstElementChild);
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
const buttonsAddToPanier = document.querySelectorAll("#button-add-to-panier");

let coursesObj = {};
for (let course of dataFixed) {
    coursesObj[course.id] = course;
}

for (let btn of buttonsAddToPanier) {
    btn.addEventListener("click", (e) => {
        addToPanier(coursesObj[e.currentTarget.value]);
    });
}

function addToPanier(course) {
    let div = document.createElement("div");
    div.innerHTML = PanierItemMaker(course)
    panierContainer.append(div.firstElementChild);
}

// -----------  --------------