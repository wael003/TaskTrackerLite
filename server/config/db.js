const mongoose  = require('mongoose');

const Database = ()=>{
    mongoose.connect(process.env.MONGOURL)
    .then(()=>{
        console.log('Database connected!')
    })
    .catch((err)=>{
        console.log('Something went Wrong : '+ err);
    })
}

module.exports = Database;