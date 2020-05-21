var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

var app = express();
var PORT = process.env.PORT || 8080;
// var i = 0;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json",(err, data) => {
      res.json(JSON.parse(data));
    });
  });

app.post("/api/notes/", (req,res) =>{
    var newNote = req.body;
    // i++;
    // this.i = i;
    // this.index = index;
    fs.readFile("./db/db.json", (err, data) => {
        const parsed = JSON.parse(data);
        parsed.push(newNote);
        idArray = parsed.map((note, index) => {
            note.id = index;
        });
        var string=JSON.stringify(parsed);
        fs.writeFile("./db/db.json",string, err =>{
            if (err) throw err;
        });
        res.json(parsed);
    });
});

app.delete("/api/notes/:id", function(req,res) {
    const removeID = parseInt(req.params.id);

    const dbNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    const filterID = dbNotes.filter(note => note.id !== removeID);
    const stringifiedNotes = JSON.stringify(filterID);
    fs.writeFile("./db/db.json", stringifiedNotes, (err, data) => {
        if (err) throw err;
    });
    res.json(filterID);
});


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  