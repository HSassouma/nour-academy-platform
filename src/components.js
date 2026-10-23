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
                id="button-plus-details-${course.id}"
                type="button"
                class="rounded-lg bg-primary-100 px-4 py-2 text-primary-700 transition hover:bg-primary-200 hover:cursor-pointer">
                Plus de détails
            </button>

            <button
                id="button-add-to-panier-${course.id}"
                type="button"
                class="rounded-lg bg-primary-600 px-4 py-2 text-white transition hover:bg-primary-700 hover:cursor-pointer">
                Ajouter au panier
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
    <button id="delete-button-${course.id}" type="button" class="text-text-subtle transition hover:text-red-600 hover:cursor-pointer">
        <i class="fa-solid fa-trash"></i>
    </button>
</div>`;
}

export function ModalCourseMaker(course) {
    return `<div id="modal-overlay" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 p-4">
    <div id="modal-panel" class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8">
        <button id="modal-close" type="button" aria-label="Fermer"
            class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 transition hover:bg-primary-200 hover:cursor-pointer">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>

        <div class="flex flex-col gap-2 pr-12">
            <h2 class="text-2xl font-semibold text-text md:text-3xl">${course.subject}</h2>
            <div class="flex flex-wrap items-center gap-2 text-sm">
                <span class="rounded-full bg-primary-100 px-3 py-1 font-medium text-primary-700">${course.level}</span>
                <span class="rounded-full bg-primary-100 px-3 py-1 font-medium text-primary-700">${course.category}</span>
            </div>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div class="rounded-lg border border-gray-200 p-4">
                <p class="text-sm text-text-subtle">Horaires</p>
                <p class="font-medium text-text">${course.days.join(" et ")} · ${course.startTime} – ${course.endTime}</p>
            </div>
            <div class="rounded-lg border border-gray-200 p-4">
                <p class="text-sm text-text-subtle">Enseignant</p>
                <p class="font-medium text-text">${course.teacher}</p>
            </div>
            <div class="rounded-lg border border-gray-200 p-4">
                <p class="text-sm text-text-subtle">Salle</p>
                <p class="font-medium text-text">${course.room}</p>
            </div>
            <div class="rounded-lg border border-gray-200 p-4">
                <p class="text-sm text-text-subtle">Âge</p>
                <p class="font-medium text-text">${course.minAge} – ${course.maxAge} ans</p>
            </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4">
            <p class="text-xl font-semibold text-text">
                ${course.price} ${course.currency}
                <span class="text-sm font-normal text-text-muted">/ ${course.billingPeriod}</span>
            </p>
            <p class="text-sm text-text-subtle">${course.availablePlaces} places restantes</p>
        </div>
    </div>
</div>`;
}