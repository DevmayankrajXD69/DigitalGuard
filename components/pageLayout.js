import { createHeader } from './header.js';
import { createFooter } from './footer.js';

export function createPageLayout(title, content, pageClass = '') {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} - DigitalGuard</title>
            <link rel="stylesheet" href="assets/css/style.css">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        </head>
        <body class="${pageClass}">
            ${createHeader()}
            
            <main class="main-content">
                ${content}
            </main>
            
            ${createFooter()}
            
            <script type="module" src="assets/js/main.js"></script>
        </body>
        </html>
    `;
}