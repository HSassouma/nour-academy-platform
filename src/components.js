export function CardMaker(course) {
    return `<article class="flex flex-1 flex-col gap-4 rounded-xl border border-b-black bg-white p-6 shadow-sm lg:min-w-[45%]">
    <div class="flex items-start justify-between gap-4">
        <h3 class="text-2xl font-semibold text-text">${course.subject}</h3>
        <span class="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
${course.level}
        </span>
    </div>

    <p class="text-text-muted">
${course.days.join(" et ")} · ${course.startTime} – ${course.endTime}
    </p>

    <p class="text-text-muted">
${course.teacher} · ${course.room} · ${course.minAge} – ${course.maxAge} ans
    </p>

    <p class="text-sm text-text-subtle">${course.availablePlaces} places restantes</p>

    <div class="flex flex-wrap items-center justify-between gap-4">
        <p class="text-xl font-semibold text-text">
${course.price} ${course.currency}
            <span class="text-sm font-normal text-text-muted">
                / ${course.billingPeriod}
            </span>
        </p>

        <div class="flex gap-3">
            <button
                type="button"
                class="rounded-lg bg-primary-100 px-4 py-2 text-primary-700 transition hover:bg-primary-200 hover:cursor-pointer">
                Plus de détails
            </button>

            <button
                id="button-add-to-panier"
                type="button"
                value="${course.id}"
                class="rounded-lg bg-primary-600 px-4 py-2 text-white transition hover:bg-primary-700 hover:cursor-pointer">
                S'inscrire
            </button>
        </div>
    </div>
</article>`;
}

export function PanierItemMaker(course) {
    return `<div class="flex w-full items-start justify-between gap-3 rounded-lg border border-border bg-surface p-3">
    <div class="flex flex-col gap-1">
        <h3 class="font-semibold text-text">${course.subject + ", "+ course.teacher}</h3>
        <p class="text-sm text-text-muted">${course.level} , ${course.days.join(" et ")}</p>
        <p class="text-sm font-semibold text-text">${course.price} ${course.currency}</p>
    </div>
    <button type="button" data-remove="${course.id}" class="text-text-subtle transition hover:text-red-600 hover:cursor-pointer">
        <i class="fa-solid fa-trash"></i>
    </button>
</div>`;
}