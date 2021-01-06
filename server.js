const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

 
// MONGODB_URI = mongodb+srv://root:root@cluster.rvqka.mongodb.net/workouttracker?retryWrites=true&w=majority
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workouttracker',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT,function(){ 
    console.log(`Listening on PORT: ${PORT}`);
});