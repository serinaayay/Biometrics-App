const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT  =  5001;


mongoose.connect("mongodb+srv://minjugattokim123:5yugYeJ9i7X09ZL9@cluster0.gdkazez.mongodb.net/biometrics?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
