document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// The rest of your previous functions like openModal, closeModal, generatePrescription, etc.

function openModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    const modal = document.getElementById('uploadModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('audioFile').value = '';
        document.getElementById('generateBtn').style.display = 'none';
        document.getElementById('pdfViewer').style.display = 'none';
    }, 300);
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('uploadText').style.display = 'none';
        document.getElementById('fileInfo').style.display = 'block';
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('generateBtn').style.display = 'block';
    }
}

function removeFile(event) {
    event.stopPropagation();
    document.getElementById('audioFile').value = '';
    document.getElementById('uploadText').style.display = 'block';
    document.getElementById('fileInfo').style.display = 'none';
    document.getElementById('generateBtn').style.display = 'none';
}

function generatePrescription() {
    try {
        // Show loading state
        const loadingTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        margin: 0;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        max-width: 100%;
                        box-sizing: border-box;
                        background: white;
                    }
                    .loading-container {
                        max-width: 800px;
                        margin: 0 auto;
                        text-align: center;
                        padding: 40px 20px;
                    }
                    .loading-spinner {
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #3498db;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                        margin: 20px auto;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </head>
            <body>
                <div class="loading-container">
                    <img src="logo.png" alt="MediScribe Logo" style="max-width: 200px; margin-bottom: 20px;">
                    <div class="loading-spinner"></div>
                    <h2>Generating Prescription...</h2>
                    <p>Please wait while we process your prescription</p>
                </div>
            </body>
            </html>
        `;

        // Show loading state first
        const loadingBlob = new Blob([loadingTemplate], { type: 'text/html;charset=utf-8' });
        const loadingUrl = URL.createObjectURL(loadingBlob);
        const newWindow = window.open(loadingUrl, '_blank');

        if (newWindow === null) {
            throw new Error('Pop-up blocked or failed to open document');
        }

        // After 10 seconds, redirect to the prescription image URL
        setTimeout(() => {
            newWindow.location.href = 'https://shorturl.at/TjgAv';

            // Clean up the loading URL
            URL.revokeObjectURL(loadingUrl);
        }, 10000);

        // Close modal after starting the generation process
        closeModal();
    } catch (error) {
        console.error('Failed to generate document:', error);
        alert('Failed to generate document. Please check if pop-ups are allowed and try again.');
    }
}
