const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/route');


app.use(express.static('static'));
app.engine('html', require('ejs').__express);
app.set("views", "./views");
app.set('view engine', 'html');

app.use('/', router);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
// app.get('/diensten', (req, res) => {
//     res.send('Dienst')
// })

app.listen(port, () => {
    console.log(` http://localhost:${port}`)
})