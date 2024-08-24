const 
    express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    sessions = require('express-session'),
    jsonParser = bodyParser.json(),
    {Codec} = require('./libs/codec'),
    codec = new Codec();
    sqlite3 = require('sqlite3').verbose();

    routes = [
        "/",
        "/register",
        "/login",
        "/v1/"
    ]


let db = new sqlite3.Database('./db.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});
app.jsonParser = jsonParser
app.db = db
app.db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, jru INTEGER, token TEXT)")
// app.db.run(`INSERT INTO users VALUES (?, ?, ?, ?)`, [codec.encode("meawmere"), codec.encode("10103333"), 1000, "1sa"])


require("./api/api.js")(app)

app.set('view engine', 'hbs');
app.use("/public", express.static('public'))

app.get("/", (req, res) => require("./req/get/index")(req, res))
app.get("/register", (req, res) => {
    res.render("register/index.hbs")
})
app.get("/login", (req, res) => {
    res.render("login/index.hbs")
})
app.get("/doc/:name", (req, res) => {
    
})
app.use((req, res, next) => {
    res.status(404).render("404.hbs")
})

app.listen(5001, () => {
    for (let route of routes) {
        console.log(`http://localhost:5001${route}`)
    }
})