const AdmZip = require('adm-zip');

// Create a new instance of AdmZip
const zip = new AdmZip();

const resultDir = './zipReport';
      const fs = require('fs');
      if (!fs.existsSync(resultDir)) {
        console.log(`Directory ${resultDir} does not exist. Creating...`);
        fs.mkdirSync(resultDir, { recursive: true });
      } 
// Specify the folder you want to zip and the output ZIP file
const folderToZip = './allure-report';
const outputZip = './zipReport/allure-report.zip';

// Add the folder contents to the zip file
zip.addLocalFolder(folderToZip);

// Write the zip file to disk
zip.writeZip(outputZip);

console.log('Folder has been zipped successfully!');
