const express = require('express');
const path = require('path');
const api = require('./routes/index')
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);
app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a notes page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);