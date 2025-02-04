const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

// ✅ Allow requests from your frontend (Update this in production)
app.use(cors({
    origin: 'http://127.0.0.1:5500/food-choices.html', // Change to 'http://127.0.0.1:5500' for security in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post('https://click-tracker-server.onrender.com', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFileSync('clickData.txt', data, 'utf8'); // Save to file
    console.log("Click data received and saved!");
    res.json({ message: "Data saved successfully" });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
