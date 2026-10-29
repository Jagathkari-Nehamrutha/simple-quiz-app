const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: 1
    },
    {
        question: "Which language is used to add interactivity to a web page?",
        options: [
            "CSS",
            "HTML",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },
    {
        question: "Which runtime is used to run JavaScript outside the browser?",
        options: [
            "Node.js",
            "MySQL",
            "HTML",
            "CSS"
        ],
        answer: 0
    },
    {
        question: "Which command is used to initialize a Node.js project?",
        options: [
            "node start",
            "npm init",
            "npm create",
            "node init"
        ],
        answer: 1
    }
];

app.get("/api/questions", (req, res) => {
    res.json(questions);
});

app.listen(PORT, () => {
    console.log(`Quiz App running at http://localhost:${PORT}`);
});