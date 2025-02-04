const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;  // Use Render's dynamic port or 3000 locally

app.use(cors());  // Enable CORS to allow requests from the frontend
app.use(express.json());  // Parse incoming JSON data

// POST route for saving click data
app.post('/save-clicks', (req, res) => {
    const clickData = req.body;  // Get the data sent from the frontend

    // Save the data to a file (you can modify this for a database)
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
