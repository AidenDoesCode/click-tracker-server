const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import CORS package

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  // Enable CORS for all domains (you can also specify domains)

app.use(express.json());  // To parse incoming JSON data

// POST route for saving click data
app.post('/save-clicks', (req, res) => {
    const clickData = req.body;  // Get the data from the frontend

    // Save to a file (you can modify this to save in a database if preferred)
    fs.appendFile('clicks.json', JSON.stringify(clickData) + '\n', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving data' });
        }
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
