// packages and files needed for this application
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// Destructuring assignment for the items in fsUtils
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');


// Get Route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post route for a new Note
notes.post('/', (req, res) => {
    console.log(req.body);
    // Destructuring assignment for the items in req.body   
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // New variable for the objet we will save
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        // Append new note on db.json
        readAndAppend(newNote, './db/db.json');

        // Respond to the post request
        res.json('note addes successfully!!');

    } else {
        res.error('Error in adding note');
    }
});

// Delete route for a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);
            // Respond to the DELETE request
            res.json(`Item ${noteId} has been deleted`)
        });
});

// Export the module
module.exports = notes;