export function RegistrationItemMaker(item) {
    return `
        <tr class="divide-x divide-gray-300 transition hover:bg-gray-50">
            <td class="px-4 py-3 font-medium text-gray-900">${item.id}</td>
            <td class="px-4 py-3">${item.parent.name}</td>
            <td class="whitespace-nowrap px-4 py-3">${item.parent.phone}</td>
            <td class="px-4 py-3">${item.student.name}</td>
            <td class="px-4 py-3">
                <span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    ${item.student.level}
                </span>
            </td>
            <td class="whitespace-nowrap px-4 py-3 text-left font-medium">
                ${item.totalMADPerMonth} MAD
            </td>
            <td class="px-4 py-3">
                <span class="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                    Impayé
                </span>
            </td>
            <td class="px-4 py-3">
                <div class="flex justify-center gap-1">
                    <button type="button" data-action="edit" data-id="${item.id}" title="Modifier"
                        class="rounded-md p-2 text-blue-600 transition hover:bg-blue-50 cursor-pointer">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button type="button" data-action="delete" data-id="${item.id}" title="Supprimer"
                        class="rounded-md p-2 text-red-600 transition hover:bg-red-50 hover:cursor-pointer">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}