window.addEventListener('load', function() {
    processRequirementsTable();
    document.body.addEventListener('ia-writer-change', function() {
        processRequirementsTable();
    });
});

function processRequirementsTable() {
    const tables = document.querySelectorAll('table');
    tables.forEach((table) => {
        const headers = table.querySelectorAll('thead th');

        // which column has a question mark in the header? that's the one that needs decorating
        let questionMarkColumnIndex = -1;
        headers.forEach((header, index) => {
            if (header.textContent.includes('?')) {
                questionMarkColumnIndex = index;
            }
        });
        console.log(questionMarkColumnIndex);

        // if we find a question mark column, decorate the cells in that column based on their contents
        if (questionMarkColumnIndex !== -1) {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach((row) => {
                const cells = row.querySelectorAll('td');
                const cell = cells[questionMarkColumnIndex];
                if (cell) {
                    const content = cell.textContent.trim();
                    switch (true) {
                        case content.startsWith('Yes'):
                            cell.setAttribute('data-requirement', 'yes');
                            break;
                        case content.startsWith('Custom'):
                            cell.setAttribute('data-requirement', 'custom');
                            break;
                        case content.startsWith('Standard'):
                            cell.setAttribute('data-requirement', 'standard');
                            break;
                        case content.startsWith('Covered'):
                            cell.setAttribute('data-requirement', 'covered');
                            break;
                        case content.startsWith('No'):
                            cell.setAttribute('data-requirement', 'no');
                            break;
                    }
                }
            });
        }

    });
}