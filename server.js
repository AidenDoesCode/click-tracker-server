const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Allow requests from your frontend (update if needed)
app.use(cors({
    origin: 'http://localhost:3000', // Allow all origins (Change this to your frontend domain in production)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post('/save-clicks', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFileSync('clickData.txt', data, 'utf8'); // Save to file
    console.log("Click data received and saved!");
    res.json({ message: "Data saved successfully" });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
