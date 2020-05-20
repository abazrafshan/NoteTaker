var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

var app = express();
var PORT = 3000;
const readFileSync = util.promisify(fs.readFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"notes.html"));
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));
});


function readnotes(){
    return readFileSync("db.json","utf8");
}

function getnotes(){
    console.log("getnotes");
    return readnotes().then(notes => {
        var n = "";
        console.log(notes);
        try{
            console.log("tryblock");
        n = JSON.parse(notes);
    }
    catch(err){
        console.log("error");
        console.log(err);
    }
        return n;
    })
}
app.get("/api/notes", (req, res) => {
    return getnotes();
    // fs.readFile("../db/db.json", (err, data)=>{
    //     return data;
    // });
    // var test = ;
    // console.log(test);
    // return readFileSync("../db/db.json");
});

// app.post("api/notes", (req,res) => {
//     var newNote = req.body;
// });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  