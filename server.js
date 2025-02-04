const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const allowedOrigins = [
    'https://aidendoescode.github.io',
    'https://www.aidendoescode.github.io',
    'http://127.0.0.1:5500'
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

app.get('/', (req, res) => {
    res.send("Welcome to the click data server. Send POST requests to / to submit data."); // Or just remove this if you don't need a GET route
});


app.post('/', (req, res) => {
    try {
        const clickData = req.body;

        if (!clickData || !Array.isArray(clickData)) {
            console.error("Invalid click data received:", clickData);
            return res.status(400).json({ message: "Invalid click data received. Expected an array." });
        }

        console.log("Received clickData:", clickData);

        const dataToSave = JSON.stringify(clickData, null, 2);

        fs.writeFile('clickData.txt', dataToSave, 'utf8', (err) => {
            if (err) {
                console.error("Error saving data:", err);
                return res.status(500).json({ message: "Error saving data" });
            } else {
                console.log("Click data saved successfully!");
                return res.status(200).json({ message: "Data saved successfully" });
            }
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));