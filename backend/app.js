const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./src/routes/index');
const casRouter = require('./src/routes/cas');
const collectionRouter = require('./src/routes/collection');
const documentRouter = require('./src/routes/document');
const apiRouter = require('./src/routes/api');
const classesRouter = require('./src/routes/classes');

const app = express();

app.set('trust proxy', 1); // trust first proxy

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false, // Disable SRV lookup if needed
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Connected to MongoDB.'))
.catch(err => console.log('Error connecting to MongoDB: ', err));

// Session setup
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET || 'default',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions',
    }),
}));

// Route handlers
app.use('/api', apiRouter);
app.use('/', casRouter);
app.use('/', indexRouter);
app.use('/collections', collectionRouter);
app.use('/', documentRouter);
app.use('/classes', classesRouter);

// Error handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
