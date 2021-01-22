const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const jimp = require('jimp');

router.post('/upload', upload.single('avatar'), async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  if (req.file) {
    const { file } = req;
    const img = await jimp.read(file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(file.path);
    await fs.rename(file.path, path.join(IMG_DIR, file.originalname));
  }
  res.redirect('/');
});

module.exports = router;
