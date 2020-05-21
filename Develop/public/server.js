var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

var app = express();
var PORT = process.env.PORT || 8080;
const readFileSync = util.promisify(fs.readFile);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api/notes", function(req,res){
    fs.readFile("db.json", "utf-8", (err,data) => {
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req,res) =>{
    var newNote = req.body;
    fs.appendFile("db.json", newNote, "utf8");
    res.json(newNote);
})

// app.


app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"notes.html"));
});

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  