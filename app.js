require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PROD_PORT || 3403
const router = require('./routes/route');


app.use(express.static('static'));
app.engine('html', require('ejs').__express);
app.set("views", "./views");
app.set('view engine', 'html');

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`)
})