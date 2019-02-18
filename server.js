const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const fotos = require("./app/fotos");
const users = require("./app/users");
const config =  require("./config");

const port = 3333;
const app = express();

mongoose.connect(config.db.url + '/' + config.db.name, {useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

db.once('open', () => {
    app.use('/fotos', fotos);
    app.use('/users', users());
    app.listen(port, () => console.log(`Server started on ${port}`));
});