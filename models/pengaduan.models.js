const mongose = require('mongoose')

const pengaduan = mongose.Schema({
    name : {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    reported : {
        type : String,
        require : true
    },
    work_unit : {
        type : String,
        require : true
    },
    deed : {
        type : String,
        require : true
    },
    incident_photo : {
        type : String,
        require : true
    },
    seeByadmin : {
        type : Boolean,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("pengaduan", pengaduan)