const mongoose = require('mongoose')
const moment = require('moment-timezone')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME });
        console.log("Database connection success.")

    } catch(err) {
        console.log("Database connection failed.")
    }
}

const response = (res, code, message, data=null) => {
    let dataJson = {
        statusCode : code,
        message : message
    }

    if(data !== null) {
        dataJson["data"] = data
    }

    return res.json(dataJson)
}

const curentTime = async () => {
    return await moment().tz("Asia/Jakarta").utc(true)
}

module.exports = {
    dbConnection,
    response,
    curentTime
}