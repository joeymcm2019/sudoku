const express = require("express");
//require("dotenv").config();

const app = express();
app.use(express.static("public"));

if (process.env.NODE_ENV === 'production'){
    console.log('production mode yo');
    app.use(express.static("client/build"));
}
//console.log(process.env.NODE_ENV);
app.listen(process.env.PORT || 3000, () => console.log("server running: " + process.env.PORT));

app.get('/favicon.ico', function(req, res){
    res.send();
});
