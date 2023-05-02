const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/HandShake', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("established connection to the db"))
.catch((err) => console.log("Something went wrong when connecting to the DB", err));