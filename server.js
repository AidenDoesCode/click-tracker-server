// Backend
const express = require('express');
const fs = require('fs'); // For file system storage (replace with a database in real app)
const cors = require('cors');
const app = express();

const allowedOrigins = [
    'https://aidendoescode.github.io', // Your frontend URL
    'https://www.aidendoescode.github.io', // Your frontend URL (with www)
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

let allClickData = []; // In-memory data storage (REPLACE WITH A DATABASE!)

app.get('/', (req, res) => {
    res.json(allClickData); // Send all data as JSON
});

app.post('/', (req, res) => {
    try {
        const newClickData = req.body;

        if (!newClickData || !Array.isArray(newClickData)) {
            return res.status(400).json({ message: "Invalid click data received. Expected an array." });
        }

        console.log("Received newClickData:", newClickData);

        allClickData.push(...newClickData); // Add new data to existing data

        const dataToSave = JSON.stringify(allClickData, null, 2); // Save all data (REPLACE WITH DATABASE)

        fs.writeFile('clickData.txt', dataToSave, 'utf8', (err) => { // (REPLACE WITH DATABASE)
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
