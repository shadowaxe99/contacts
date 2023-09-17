const FileScanner = require('./FileScanner');
const FileReader = require('./FileReader');
const ContactExtractor = require('./ContactExtractor');
const ContactDeduplicator = require('./ContactDeduplicator');
const ContactEnricher = require('./ContactEnricher');
const ContactCategorizer = require('./ContactCategorizer');
const ContactOrganizer = require('./ContactOrganizer');

const directory = process.argv[2];

const files = FileScanner.scanFiles(directory);

let contacts = [];

files.forEach(file => {
  const data = FileReader.readFile(file);
  const extractedContacts = ContactExtractor.extractContacts(data);
  contacts = contacts.concat(extractedContacts);
});

contacts = ContactDeduplicator.deduplicateContacts(contacts);

contacts.forEach(contact => {
  ContactEnricher.enrichContact(contact);
});

const categorizedContacts = ContactCategorizer.categorizeContacts(contacts);

ContactOrganizer.organizeContacts(categorizedContacts);
ContactOrganizer.saveContacts(categorizedContacts, '../contacts.json');