const fs = require('fs');
const path = require('path');

class FileScanner {
  static scanFiles(directory, fileTypes = ['.csv', '.xls', '.xlsx']) {
    let files = [];
    fs.readdirSync(directory).forEach(file => {
      const fullPath = path.join(directory, file);
      if (fs.statSync(fullPath).isDirectory()) {
        files = files.concat(this.scanFiles(fullPath, fileTypes));
      } else if (fileTypes.includes(path.extname(file))) {
        files.push(fullPath);
      }
    });
    return files;
  }
}

module.exports = FileScanner;