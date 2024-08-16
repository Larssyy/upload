const fs = require('fs');
const path = require('path');

// Define a list of keywords or patterns to look for
const illegalPatterns = [
    /child\s*pornography/i, // Example pattern; use appropriate patterns and terms
    /illegal\s*content/i,
    // Add more patterns as needed
];

// Define allowed file extensions
const allowedExtensions = [
    '.txt', '.pdf', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', // Image formats
    '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', // Office documents
    '.zip', '.tar', '.gz', '.rar', '.7z', // Compressed files
    '.html', '.css', '.js', // Web files
    '.csv', '.json', '.xml', // Data files
    '.mp3', '.wav', '.ogg', // Audio files
    '.mp4', '.mkv', '.avi', '.mov', '.wmv', // Video files
];

const scanFile = async (filePath) => {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Check for illegal content patterns
        for (const pattern of illegalPatterns) {
            if (pattern.test(fileContent)) {
                return 'File contains illegal content.';
            }
        }

        // Basic file extension check
        const extname = path.extname(filePath).toLowerCase();
        if (!allowedExtensions.includes(extname)) {
            return 'File type is not allowed.';
        }

        return 'File is clean.';
    } catch (err) {
        console.error('Error reading file:', err);
        return 'Error scanning file.';
    }
};

module.exports = { scanFile };
