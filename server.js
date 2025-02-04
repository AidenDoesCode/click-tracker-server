const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const allowedOrigins = [
    'https://aidendoescode.github.io',
    'https://www.aidendoescode.github.io',
    'http://127.0.0.1:5500' // For local development
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.some(allowedOrigin => origin && origin.startsWith(allowedOrigin))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

let allClickData = [];

// Load data from file at server startup
fs.readFile('clickData.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading data from file (likely file doesn't exist):", err);
    } else {
        try {
            allClickData = JSON.parse(data);
            console.log("Data loaded from file at startup:", allClickData.length);
        } catch (parseError) {
            console.error("Error parsing data from file:", parseError);
        }
    }
});

app.get('/', (req, res) => {
    res.json(allClickData);
});

app.post('/', (req, res) => {
    try {
        const newClickData = req.body;

        if (!newClickData || !Array.isArray(newClickData)) {
            return res.status(400).json({ message: "Invalid click data received. Expected an array." });
        }

        allClickData.push(...newClickData); // Add new data

        const dataToSave = JSON.stringify(allClickData, null, 2);

        fs.writeFile('clickData.txt', dataToSave, 'utf8', (err) => {
            if (err) {
                console.error("Error saving data:", err);
                return res.status(500).json({ message: "Error saving data" });
            }
        });

        res.status(200).json({ message: "Data saved and updated successfully", allData: allClickData });

    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));