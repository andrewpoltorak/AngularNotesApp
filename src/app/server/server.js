var bodyParser = require('body-parser');

var session = require('express-session');

var path = require('path');

var express = require('express');

var Db = require('mongodb').Db;

var Server = require('mongodb').Server;

var db = new Db('tutor',
    new Server("localhost", 27017, { safe: true }, { auto_reconnect: true }, {}));

db.open(function (err) {
    db.collection('notes', function (error, notes) {
        db.notes = notes;
    });
    if (err) console.log(err);
    else console.log("mongo db is opened!");
});

db.collection('sections', function (error, sections) {
    db.sections = sections;
});

var ObjectID = require('mongodb').ObjectID;

var app = express();

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname,
    '../../../dist/notes-app')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/sections", function (req, res) {
    db.sections.find(req.query).toArray(function (err, items) {
        res.send(items);
    });
});

var notes_init = [
    { text: "1 note" },
    { text: "2 note" },
    { text: "3 note" }
];

app.get("/notes", function (req, res) {
    db.notes.find(req.query).toArray(function (err, items) {
        if (err) res.sendStatus(500);
        else res.send(items);
    });
});

app.post("/notes", function (req, res) {
    db.notes.insert(req.body).then(function () {
        res.end();
    })
});

app.get("/notes", function (req, res) {
    console.log("reading notes", req.session.notes);
    if (!req.session.notes) {
        req.session.notes = notes_init
    }
    res.send(req.session.notes);
});

app.post("/notes", function (req, res) {
    var note = req.body;
    console.log("adding note", req.session.notes);
    req.session.notes.push(note);
    res.end();
});

app.delete("/notes", function (req, res) {
    var id = new ObjectID(req.query.id);
    db.notes.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.send({ ok: false });
        } else {
            res.send({ ok: true });
        }
    });
});

app.post("/sections/replace", function (req, resp) {
    // do not clear the list
    if (req.body.length == 0) {
        resp.end();
    }
    db.sections.remove({}, function (err, res) {
        if (err) console.log(err);
        db.sections.insert(req.body, function (err, res) {
            if (err) console.log("err after insert", err);
            resp.end();
        });
    });
});

app.get("/checkUserUnique", function (req, res) {
    res.send(req.query.user.length > 2);
})

db.collection('users', function(error, users) {
    db.users = users;
})

app.post("/users", function (req, res) {
    db.users.insert(req.body, function (resp) {
        req.session.userName = req.body.name;
        res.end();
    })
})

app.get("*", function (req, res, next) {
    res.sendFile('index.html', { root: '../../../dist/notes-app' });
});

app.listen(8081);