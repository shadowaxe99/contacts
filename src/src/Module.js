const ContactController = require('./Controller/ContactController');

function run() {
  const directory = process.argv[2];
  ContactController.processContacts(directory);
}

run();