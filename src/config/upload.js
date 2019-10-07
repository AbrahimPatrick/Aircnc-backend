const multer = require('multer');
const path = require('path');
module.exports = {
  storage: multer.diskStorage({
    // __dirname => Variavel global com o diretorio do arquivo atual
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      
      callback(null, `${name}-${Date.now()}${ext}`);
    }
  }),
};