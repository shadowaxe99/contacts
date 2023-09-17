const csv = require('csv-parser');
const fs = require('fs');
const Contact = require('../Model/Contact');
const ContactUtils = require('../Utils/ContactUtils');

class ContactController {
  static processContacts(directory) {
    const contacts = [];
    fs.createReadStream(directory)
      .pipe(csv())
      .on('data', (row) => {
        const name = row.name;
        const email = ContactUtils.validateEmail(row.email) ? row.email : 'Invalid email';
        const phone = ContactUtils.formatPhone(row.phone);
        contacts.push(new Contact(name, email, phone));
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });
  }
}

module.exports = ContactController;
