const mongose = require('mongoose')

const user = mongose.Schema({
    name : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("user", user)