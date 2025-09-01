const mongoose  = require('mongoose');

const Database = ()=>{
    mongoose.connect(process.env.MONGOURL || 'mongodb://127.0.0.1:27017/TaskTracker')
    .then(()=>{
        console.log('Database connected!')
    })
    .catch((err)=>{
        console.log('Something went Wrong : '+ err);
    })
}

module.exports = Database;
