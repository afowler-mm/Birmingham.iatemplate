window.addEventListener('load', function () {
    processRequirementsTable();
    document.body.addEventListener('ia-writer-change', function () {
        processRequirementsTable();
        processTOCLinks();
    });
    processTOCLinks();
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

function processTOCLinks() {
    const links = document.querySelectorAll('.TOC > ul > li > a'); // Ensure we are only selecting top-level TOC links
    const pageHeight = 950; // Assuming 11 inches at 72 DPI

    links.forEach((link) => {
        // Avoid processing links without a valid href pointing to an anchor
        const targetId = link.getAttribute('href')?.substring(1);
        if (!targetId) return;

        // Ensure the target exists in the document
        const target = document.getElementById(targetId);
        if (!target) {
            console.warn(`No target found for link to ${targetId}`);
            return;
        }

        // Calculate the page number of the target
        const rect = target.getBoundingClientRect();
        const pageNumber = Math.floor(rect.top / pageHeight) + 1;

        // Check for an existing page number span and update if necessary
        let pageNumberElement = link.querySelector('.page-number');
        if (!pageNumberElement) {
            // Create a new span if it doesn't exist
            pageNumberElement = document.createElement('span');
            pageNumberElement.classList.add('page-number'); // Add a class for styling
            link.appendChild(pageNumberElement);
        }

        // Update the span's content to reflect the calculated page number
        pageNumberElement.textContent = `${pageNumber}`;
    });
}