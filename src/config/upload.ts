import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');

      // pegando a extensão do arquivo
      // const [, extension] = file.originalname.split('.');

      // pegando id do user logado
      // const { id } = request.user;

      const fileName = `${fileHash}.${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
