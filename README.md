# Contact Sorter

This project is a contact sorter that reads contacts from a CSV file, validates emails, formats phone numbers, and creates Contact objects. The contacts are then stored in an array for further processing. This application is built using Node.js and makes use of the csv-parser library for parsing CSV files.

## Installation

1. Clone the repository: `git clone https://github.com/shadowaxe99/contacts.git`
2. Navigate to the project directory: `cd contacts`
3. Install the dependencies: `npm install`

## Usage

Run the application: `node src/index.js`

This will process the contacts in the `data/contacts.csv` file and output the results to the console.

## File Breakdown

- `src/Controller/ContactController.js`: Contains the logic for processing contacts from a CSV file. It reads the CSV file, validates and formats the contact data, and creates Contact objects.
- `src/Model/Contact.js`: Defines the Contact class. Each Contact object represents a single contact and has properties for name, email, and phone number.
- `src/Utils/ContactUtils.js`: Contains utility functions for validating emails and formatting phone numbers. These functions are used by the ContactController to process the contact data.
- `src/index.js`: The entry point of the application. It calls the ContactController's processContacts method to start the contact processing.
- `data/contacts.csv`: The CSV file containing the contacts to be processed. Each row represents a contact and should have columns for name, email, and phone number.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please adhere to the existing coding style and conventions.

Please make sure to update tests as appropriate and ensure that all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
