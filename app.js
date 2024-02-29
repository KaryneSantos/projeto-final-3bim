const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

// Pagina da Listagem de usuários
app.get('/', (req, res) => {
    res.render('listagem');
});


app.listen(port);
console.log('iniciou...');
