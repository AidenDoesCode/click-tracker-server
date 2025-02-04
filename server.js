const express = require('express');
const fs = require('fs');  // Or a database!
const cors = require('cors');
const app = express();

const allowedOrigins = ['https://aidendoescode.github.io']; // *REPLACE WITH YOUR FRONTEND URL*

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json()); // Important: Parses JSON request bodies

app.post('/', (req, res) => {  // Make sure the path matches the fetch URL!
    const clickData = req.body; // Access the clickData array from req.body

    if (!clickData || !Array.isArray(clickData)) { // Validate data
        return res.status(400).json({ message: "Invalid click data received." });
    }

    const dataToSave = JSON.stringify(clickData, null, 2); // Format for saving

    fs.writeFile('clickData.txt', dataToSave, 'utf8', (err) => { // Use async fs.writeFile
        if (err) {
            console.error("Error saving data:", err);
            return res.status(500).json({ message: "Error saving data" });
        } else {
            console.log("Click data received and saved!");
            return res.json({ message: "Data saved successfully" });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));