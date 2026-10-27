export function RegistrationItemMaker(item) {
    return `
        <tr class="border-b text-sm hover:bg-gray-50">
            <td class="px-4 py-3">${item.id}</td>
            <td class="px-4 py-3">${item.parent.name}</td>
            <td class="px-4 py-3">${item.parent.phone}</td>
            <td class="px-4 py-3">${item.student.name}</td>
            <td class="px-4 py-3">${item.student.level}</td>
            <td class="px-4 py-3">${item.totalMADPerMonth} MAD</td>
            <td class="px-4 py-3">
                <span class="rounded px-2 py-1 text-xs bg-red-100 text-red-700">
                    Unpaid
                </span>
            </td>
            <td class="px-4 py-3">
                <div class="flex gap-3">
                    <button type="button" title="Modify" class="text-blue-600 hover:text-blue-800">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button type="button" title="Delete" class="text-red-600 hover:text-red-800">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}