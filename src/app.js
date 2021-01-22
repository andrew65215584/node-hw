const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const rateLimit = require('express-rate-limit');
const app = express();

const { HttpCode } = require('./helpers/constants');
const routerContacts = require('./routers/contacts/index');
const routerUsers = require('./routers/users/index');

const multer = require('multer');
const jimp = require('jimp');

const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
const IMG_DIR = path.join(__dirname, 'public', 'images');


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/', apiLimiter);
app.use('/api/contacts', routerContacts);
app.use('/api/users', routerUsers);



app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`,
    data: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

module.exports = app;
