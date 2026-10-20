const container = document.getElementById("container-cards");

const data = await fetch("/src/assets/data.json");
console.log(data)
const cardsData = await data.json();


function cardMaker(course) {
    return `<article class="flex w-full flex-col gap-3 rounded-xl border border-b-black bg-white p-4 shadow-sm">
    <div class="flex items-start justify-between gap-3">
        <h3 class="text-2xl font-semibold">${course.subject}</h3>
        <span class="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-medium text-primary-600">
            ${course.level}
        </span>
    </div>

    <p class="text-text-muted">
        ${course.days.join(" et ")} · ${course.startTime} – ${course.endTime}
    </p>

    <p class="text-text-muted">
        ${course.teacher} · ${course.room} · ${course.minAge} – ${course.maxAge} ans
    </p>

    <p class="text-sm">${course.availablePlaces} places restantes</p>

    <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-xl font-semibold">
            ${course.price} ${course.currency}
            <span class="text-sm font-normal text-text-muted">
                / ${course.billingPeriod}
            </span>
        </p>

        <div class="flex gap-2">
            <button
                type="button"
                class="rounded-lg bg-primary-600/10 px-4 py-2 text-primary-600">
                Plus de détails
            </button>

            <button
                type="button"
                class="rounded-lg bg-primary-600 px-4 py-2 text-white">
                S'inscrire
            </button>
        </div>
    </div>
</article>`;
}

console.log(container.childNodes);
for (let v of cardsData) {
    const div = document.createElement("div");
    div.innerHTML = cardMaker(v);
    container.appendChild(div);
}