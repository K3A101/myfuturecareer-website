require("dotenv").config();
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend'); 

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const express = require('express');
const app = express();
const hostname = "127.0.0.1"
const PORT = process.env.PORT || 3043;
const router = require('./routes/route');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));
app.engine('html', require('ejs').__express);
app.set("views", "./views");
app.set('view engine', 'html');

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`)
})

