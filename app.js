const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');
const port = process.env.PORT || 4000;

const routes = require('./routes/routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

app.use(express.static(path.join(__dirname, 'public/static')));
app.use(compression());
app.use(routes);

app.listen(port, () => console.log(`Progressive Web App running on port ${port}.`));
