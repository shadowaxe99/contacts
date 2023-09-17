const fs = require('fs');
const XLSX = require('xlsx');
const csv = require('csv-parser');

class FileReader {
  static readCSV(file) {
    const data = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => {
        console.log('CSV file successfully processed');
      });
    return data;
  }

  static readXLSX(file) {
    const workbook = XLSX.readFile(file);
    const sheet_name_list = workbook.SheetNames;
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  }
}

module.exports = FileReader;