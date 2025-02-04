const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allows requests from your frontend

// Endpoint to save click data
app.post('/save-clicks', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFileSync('clickData.txt', data, 'utf8'); // Save to file
    console.log("Click data received and saved!");
    res.json({ message: "Data saved successfully" });
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
