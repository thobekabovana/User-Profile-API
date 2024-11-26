require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.VITE_PORT || 4000;
const dataFilePath = path.join(__dirname, './data/users.json');



async function readUsersFromFile() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
}




const writeUsersToFile = async (users) => {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));
    } catch (err) {
        throw err;
    }
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("welcome");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post('/users', async (req, res) => {
    const { name, password } = req.body;

    try {
        const users = await readUsersFromFile();
        
        users.push({ name, password });

        await writeUsersToFile(users);

    } catch (err) {
        console.error('Error writing to user.json:', err);
        res.status(500).send('Server error');
    }
});

app.get('/users', async (req, res) => {
    const users = await readUsersFromFile();
    res.render('users', { users }); 
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
