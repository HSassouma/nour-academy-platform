export function CardMaker(course) {
    return `<article class="flex flex-1 h-fit flex-col gap-4 rounded-xl border border-b-black bg-white p-6 shadow-sm lg:min-w-[45%]">
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

    <p class="text-sm text-text-subtle">${course.availablePlaces > 0 ? `${course.availablePlaces} places restantes` : "Complet"}</p>

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
                ${course.availablePlaces === 0 ? "disabled" : ""}
                class="rounded-lg bg-primary-600 px-4 py-2 text-white transition hover:bg-primary-700 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
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
export function CheckoutModalMaker() {
    return `<div id="checkout-overlay" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 p-2 sm:p-4">
    <div class="relative max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:max-h-[90vh] sm:p-6 md:p-8">
        <button id="checkout-close" type="button" aria-label="Fermer"
            class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <form id="checkout-form" class="flex flex-col gap-3">
            <div class="flex flex-col gap-1 pr-12">
                <h2 class="text-xl font-semibold text-text sm:text-2xl">Inscription</h2>
                <p class="text-sm text-text-muted">Étape 1/2</p>
            </div>
            <div class="flex items-center gap-2">
                <div class="progress-bar h-2 flex-1 rounded-full bg-primary-600"></div>
                <div class="progress-bar h-2 flex-1 rounded-full bg-gray-200"></div>
            </div>

            <input id="checkout-parent" type="text" placeholder="Nom du parent" minlength="2" maxlength="60" required class="rounded-lg border border-black px-3 py-2" />
            <input id="checkout-email" type="email" placeholder="Email" pattern="[^\s@]+@[^\s@]+\.[^\s@]+" minlength="5" maxlength="254" required class="rounded-lg border border-black px-3 py-2" />
            <input id="checkout-phone" type="tel" placeholder="06XXXXXXXX ou +2126XXXXXXX" pattern="([+]212[67][0-9]{8}|0[67][0-9]{8})" minlength="10" maxlength="13" required class="rounded-lg border border-black px-3 py-2" />
            <input id="checkout-student" type="text" placeholder="Prénom de l'élève" minlength="2" maxlength="60" required class="rounded-lg border border-black px-3 py-2" />
            <select id="checkout-level" required class="rounded-lg border border-black px-3 py-2">
                <option value="">Niveau de l'élève</option>
                <option value="Primaire">Primaire</option>
                <option value="Collège">Collège</option>
                <option value="Lycée">Lycée</option>
                <option value="Bac">Bac</option>
            </select>
            <input id="checkout-password" type="password" placeholder="Mot de passe" pattern="(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,64}" minlength="8" maxlength="64" required class="rounded-lg border border-black px-3 py-2" />
            <input id="checkout-confirm" type="password" placeholder="Confirmation" minlength="8" maxlength="64" required class="rounded-lg border border-black px-3 py-2" />

            <label class="flex items-start gap-2 text-sm text-text">
                <input id="checkout-consent" type="checkbox" required class="mt-1" />
                <span>J'accepte le consentement</span>
            </label>

            <p id="checkout-error" class="hidden text-sm text-red-600"></p>

            <button type="submit" class="rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Suivant</button>
        </form>

        <div id="checkout-recap" class="hidden flex-col gap-4"></div>
    </div>
</div>`;
}

export function CheckoutRecapMaker(data) {
    const courses = data.courses.map(c => `<li class="text-sm text-text-muted">${c.subject} - ${c.price} MAD</li>`).join("");
    return `<div class="flex flex-col gap-3">
    <div class="flex flex-col gap-1 pr-12">
        <h2 class="text-xl font-semibold text-text sm:text-2xl">Récapitulatif</h2>
        <p class="text-sm text-text-muted">Étape 2/2</p>
    </div>
    <div class="flex items-center gap-2">
        <div class="progress-bar h-2 flex-1 rounded-full bg-green-500"></div>
        <div class="progress-bar h-2 flex-1 rounded-full bg-primary-600"></div>
    </div>
    <p class="text-sm">Dossier: <b>${data.dossier}</b></p>
    <p class="text-sm">Parent: ${data.parent}</p>
    <p class="text-sm">Email: ${data.email}</p>
    <p class="text-sm">Élève: ${data.student} (${data.level})</p>
    <ul class="flex flex-col gap-1">${courses}</ul>
    <p class="font-bold">Total: ${data.total} MAD</p>
    <button id="checkout-done" type="button" class="rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Terminer</button>
</div>`;
}
