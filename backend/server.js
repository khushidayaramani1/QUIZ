const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

 
app.use(cors());
app.use(express.json());
  
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'quiz_app'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

 
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the MCQ API' });
});

app.get('/mcqs', (req, res) => {
    const query = 'SELECT * FROM mcq';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching MCQs:', err);
            res.status(500).json({ error: 'Error fetching MCQs' });
            return;
        }
        res.json(results);
    });
});

app.post('/mcqs', (req, res) => {
    const { question, option1, option2, option3, option4, correct_answer, difficulty, category } = req.body;
    
    const query = 'INSERT INTO mcq (question, option1, option2, option3, option4, correct_answer, difficulty, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    connection.query(
        query,
        [question, option1, option2, option3, option4, correct_answer, difficulty, category],
        (err, results) => {
            if (err) {
                console.error('Error adding MCQ:', err);
                res.status(500).json({ error: 'Error adding MCQ' });
                return;
            }
            res.json({ message: 'MCQ added successfully', id: results.insertId });
        }
    );
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});