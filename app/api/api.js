const {Codec} = require("../libs/codec.js");
const codec = new Codec()

module.exports = async function (app) {
    app.get("/v1/", (req, res) => {
        res.send({
            owner:"meawmere",
            platform: "journey"
        })
    })
    
    app.post("/v1/player", app.jsonParser, async (req, res) => {
        const body = req.body
        
        let passwordEncode = codec.encode(body.password)
        let usernameEncode = codec.encode(body.username)
        
        app.db.get(`SELECT token FROM users WHERE password = "${passwordEncode}" AND username = "${usernameEncode}"`, (error,  result) => {
            res.send({valid: result != null})
        })
    })
}