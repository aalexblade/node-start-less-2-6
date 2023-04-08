const multer = require('multer');
const uuid = require('uuid').v4;
const fse = require('fs-extra');
const sharp = require('sharp');
const path = require('path');

const { AppError } = require('../utils');

class ImageService {
  static upload(name) {
    const multerStorege = multer.memoryStorage();

    const multerFilter = (req, file, callbackFn) => {
      if (file.mimetype.startsWith('image')) {
        callbackFn(null, true);
      } else {
        callbackFn(new AppError(400, 'Upload images only...'), false);
      }
    };

    return multer({
      storage: multerStorege,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {
    const fileName = `${uuid()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), 'statics', ...pathSegments);

    await fse.ensureDir(fullFilePath);
    await sharp(file.buffer)
      .resize(options || { height: 500, width: 500 })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;
