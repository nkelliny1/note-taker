// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 7000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// =============================================================
let rawdata = fs.readFileSync('./db/db.json');
let notes = JSON.parse(rawdata);

app.use(express.static(path.join(__dirname, 'public')));


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all characters
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// Displays a single character, or returns false
app.get("/api/notes/:note", function(req, res) {
  var chosen = req.params.note;

  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    if (chosen === notes[i].title) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

// Starts the server to begin listening
// =============================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
