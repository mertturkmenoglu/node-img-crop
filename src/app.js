const express = require('express');
const path = require('path');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const appRoutes = require('./routes/appRoutes');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images');
  },
  filename: (req, file, cb) => {
    const orig = file.originalname;

    if (!orig.endsWith(".png") && !orig.endsWith(".jpg") && !orig.endsWith(".jpeg")) {
      const mt = file.mimetype.split("/")[1];
      cb(null, uuidv4() + '_' + file.originalname + "." + mt);
    } else {
      cb(null, uuidv4() + '_' + file.originalname);
    }
  }
});

const fileFilter = (req, file, cb) => {
  const mt = file.mimetype;
  if (mt === 'image/jpeg' || mt === 'image/jpg' || 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(helmet());
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'));
app.use(appRoutes);


app.listen(3000, () => {
  console.log('Server started listening on port 3000');
});