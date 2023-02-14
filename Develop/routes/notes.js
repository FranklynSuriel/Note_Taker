const notes = require('express').Router();
const uuid = require('../helpers/uuid');

const {readFromFile, writeToFile, readAndAppend} = require('../helpers/fsUtils');


// Get Route for retrieving all notes
notes.get('/', (req, res) =>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);    
    const {title, text} = req.body;
    
    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        
        readAndAppend(newNote , './db/db.json');
        res.json( 'note addes successfully!!');
    }else{
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req,res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', result);

            res.json( `Item ${noteId} has been deleted`)
        });
});

module.exports = notes;