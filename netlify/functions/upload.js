const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');
const { scanFile } = require('./scan'); // Custom function to scan files

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const form = new IncomingForm();
    form.uploadDir = path.join(__dirname, 'tmp');
    form.keepExtensions = true;

    return new Promise((resolve, reject) => {
        form.parse(event.body, async (err, fields, files) => {
            if (err) {
                return resolve({
                    statusCode: 500,
                    body: JSON.stringify({ message: 'File parsing error' }),
                });
            }

            try {
                const file = files.file[0];
                const scanResult = await scanFile(file.filepath);
                fs.unlinkSync(file.filepath); // Clean up the file

                return resolve({
                    statusCode: 200,
                    body: JSON.stringify({ message: scanResult }),
                });
            } catch (e) {
                return resolve({
                    statusCode: 500,
                    body: JSON.stringify({ message: 'Scan error' }),
                });
            }
        });
    });
};
