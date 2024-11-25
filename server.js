require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.VITE_PORT || 4000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render("welcome");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post('/users', (req, res) => {
    const { name, password } = req.body;
    res.send(`Received the following data: <br> Name: ${name} <br> Password: ${password}`);
    console.log(`Name: ${name}, Password: ${password}`);
});

app.get('/users', (req, res) => {
    res.render("users");
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
