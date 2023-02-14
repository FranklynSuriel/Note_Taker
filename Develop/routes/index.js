// packages and files needed for this application
const express = require('express');
const notesRouter = require('./notes');
const app = express();

// Import our modular router for /notes
app.use('/notes', notesRouter);

// Export the module
module.exports = app;