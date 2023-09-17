const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const XLSX = require('xlsx');

const ContactExtractor = require('../utils/ContactExtractor');
const ContactDeduplicator = require('../utils/ContactDeduplicator');
const ContactEnricher = require('../utils/ContactEnricher');
const ContactCategorizer = require('../utils/ContactCategorizer');
const ContactOrganizer = require('../utils/ContactOrganizer');

const ContactController = {
  processContacts: (directory) => {
    const contacts = [];

    fs.readdirSync(directory).forEach((file) => {
      const filePath = path.join(directory, file);
      if (path.extname(file) === '.csv') {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
            contacts.push(row);
          })
          .on('end', () => {
            console.log('CSV file successfully processed');
          });
      } else if (['.xls', '.xlsx'].includes(path.extname(file))) {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        contacts.push(...sheetData);
      }
    });

    const deduplicatedContacts = ContactDeduplicator.deduplicateContacts(contacts);

    deduplicatedContacts.forEach(async (contact) => {
      await ContactEnricher.enrichContact(contact);
    });

    const categorizedContacts = ContactCategorizer.categorizeContacts(deduplicatedContacts);

    ContactOrganizer.organizeContacts(categorizedContacts);
    ContactOrganizer.saveContacts(categorizedContacts, '../contacts.json');
  },
};

module.exports = ContactController;