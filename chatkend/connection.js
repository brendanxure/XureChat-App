const mongoose = require('mongoose')
require('dotenv').config()

const DBConnect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected Successfully")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = DBConnect