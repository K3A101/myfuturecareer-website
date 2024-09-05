require("dotenv").config();
const express = require('express');
const app = express();
let PORT;
process.env.STATUS === 'production'
    ? (PORT = process.env.PROD_PORT)
    : (PORT = process.env.DEV_PORT);
const router = require('./routes/route');


app.use(express.static('static'));
app.engine('html', require('ejs').__express);
app.set("views", "./views");
app.set('view engine', 'html');

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server in ${process.env.STATUS} listening in http://localhost:${PORT}`)
})