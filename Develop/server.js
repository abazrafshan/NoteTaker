// call relevent node packages
var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

var app = express();
// set localhost port to 8080
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// when user navigates to /api/notes route the db.json file is read, parsed, and converted to JSON
app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json",(err, data) => {
      res.json(JSON.parse(data));
    });
  });
// user can post a request to api/notes route with request stored as variable newNote
app.post("/api/notes/", (req,res) =>{
    var newNote = req.body;
    // read db.json file, convert data to be pushed to array of saved notes
    fs.readFile("./db/db.json", (err, data) => {
        const parsed = JSON.parse(data);
        parsed.push(newNote);
        idArray = parsed.map((note, index) => {
            note.id = index +1;
        });
        // parsed array with added note is stringified and written to db.json file
        var string=JSON.stringify(parsed);
        fs.writeFile("./db/db.json",string, err =>{
            if (err) throw err;
        });
        res.json(parsed);
    });
});
// user can delete notes from application
app.delete("/api/notes/:id", function(req,res) {
  // create request index id
    const removeID = parseInt(req.params.id);
    // read db.json file and parse into object notation
    const dbNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    // filter out note of choice
    const filterID = dbNotes.filter(note => note.id !== removeID);
    // stringify filtered contents of db.json file
    const stringifiedNotes = JSON.stringify(filterID);
    // write db.json to reflect update
    fs.writeFile("./db/db.json", stringifiedNotes, (err, data) => {
        if (err) throw err;
    });
    res.json(filterID);
});

// /notes route takes user to notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  // default route takes user to index.html page
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  