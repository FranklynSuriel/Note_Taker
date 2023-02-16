// packages and files needed for this application
const express = require('express');
const path = require('path');
const api = require('./routes/index')

// Helper method for generating unique ids
const { v4: uuidv4 } = require('uuid');

// Server port
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for Note page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a notes page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
)

// Logs a message when the server is listening on the port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);