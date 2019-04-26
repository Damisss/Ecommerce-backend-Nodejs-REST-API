const mongoose = require('mongoose')

mongoose.Promise = global.Promise
try {
    mongoose.connect('mongodb://localhost:27017/DatabaseName')
} catch (error) {
    mongoose.createConnection('mongodb://localhost:27017/DatabaseName')
}

mongoose.connection
.once('open', ()=>console.log('mongooose is running'))
.on('error', (error)=>{
    throw error
})