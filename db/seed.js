const mongoose = require('mongoose');
const User = require('../server/models/Users'); 

const mongoURI = process.env.MONGOURL || 'mongodb://127.0.0.1:27017/TaskTracker';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

async function seed() {
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create sample users
    const users = await User.insertMany([
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'John' },
    ]);

    

    console.log('Database seeded!');
    mongoose.connection.close();
}

seed();
