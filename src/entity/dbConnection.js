const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useCreateIndex: true, useNewUrlParser: true , useUnifiedTopology: true  }, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.') 
    }else{ 
        console.log('Error in DB connection : ' + err) 
    }
});
mongoose.Promise = global.Promise;