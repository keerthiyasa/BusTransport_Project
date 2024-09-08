const cds = require('@sap/cds');
const XLSX = require('xlsx');
module.exports = cds.service.impl(async function () {
    
        this.before('CREATE', 'Files', req => {
            console.log('Create called')
            console.log(JSON.stringify(req.data))
            req.data.url = `/odata/v4/attachments/Files(${req.data.ID})/content`
        });
        this.before('READ', 'Files', req => {
            //check content-type
            console.log('content-type: ', req.headers['content-type'])
        })
        this.on('upload', async (req) => {
            const file = req.data.file;  // Access the file data
            // Handle the file (save to storage, update database, etc.)
         });
    
  this.on('fileUpload', async (req) => {
    const { mimeType, fileName, fileContent, fileExtension } = req.data;

    if (mimeType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return req.error('Unsupported file type. Please upload an Excel file.');
    }

    try {
        const fileBuffer = Buffer.from(fileContent, 'base64');
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        const tx = cds.transaction(req);
        for (const row of data) {
            await tx.run(INSERT.into('transport_bus').entries({
              id:row['id'],
                busno: row['busno'],
                bustype: row['bustype'],
                busstops: row['busstops'],
                busroutes: row['busroutes'],
                buscap: row['buscap'],
                busop: row['busop']
            }));
        }
        return { success: true };

    } catch (error) {
        console.error('File upload failed:', error);
        return req.error('Failed to process the file. Please try again.');
    }
    });
});
