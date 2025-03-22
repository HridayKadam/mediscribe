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
        // Create an HTML template with responsive design
        const template = `
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
                    .prescription-container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                        display: block;
                        margin: 0 auto;
                    }
                    h2 {
                        color: #333;
                        margin: 20px 0;
                    }
                    p {
                        color: #666;
                        margin: 10px 0;
                    }
                    @media print {
                        body {
                            padding: 0;
                            background: white;
                        }
                        .prescription-container {
                            box-shadow: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="prescription-container">
                    <img src="logo.png" alt="MediScribe Logo" style="max-width: 200px; margin-bottom: 20px;">
                    <img src="https://industrious-tan-wallaby.glitch.me/imagesnew/20.png" alt="Prescription Image" style="width: 100%;">
                </div>
            </body>
            </html>
        `;

        // Convert HTML to Blob
        const htmlBlob = new Blob([template], { type: 'text/html;charset=utf-8' });
        
        // Create URL for the HTML
        const pdfUrl = URL.createObjectURL(htmlBlob);
        
        // Try to open in new tab
        const newWindow = window.open(pdfUrl, '_blank');
        
        if (newWindow === null) {
            throw new Error('Pop-up blocked or failed to open document');
        }
        
        // Clean up
        setTimeout(() => {
            URL.revokeObjectURL(pdfUrl);
        }, 1000);
        
        // Close modal after opening document
        closeModal();
    } catch (error) {
        console.error('Failed to generate document:', error);
        alert('Failed to generate document. Please check if pop-ups are allowed and try again.');
    }
}
