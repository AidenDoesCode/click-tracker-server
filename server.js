const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;  // Use Render's dynamic port or 3000 locally

app.use(cors());
app.use(express.json());

// POST endpoint for saving click data
app.post('/save-clicks', (req, res) => {
    const clickData = req.body; // Get the click data sent from frontend

    // Save to a file or database
    fs.appendFile('clicks.json', JSON.stringify(clickData) + '\n', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving data' });
        }
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

// Listen on the port Render gives us
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
