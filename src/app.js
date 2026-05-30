require("dotenv").config();
require("./config/db"); 

const express = require("express");
const cors = require("cors");
const githubRoutes = require("./routes/githubRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/github",githubRoutes);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "GitHub Profile Analyzer API Running"
    });
});


const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});