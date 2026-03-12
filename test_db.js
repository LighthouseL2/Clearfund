const mongoose = require('mongoose');
const uri = "mongodb+srv://phweb3connect:cr16a3369@cluster0.kg1o3qf.mongodb.net/?appName=Cluster0";

console.log("Testing connection to Atlas...");
mongoose.connect(uri)
    .then(() => {
        console.log("SUCCESS: Database connection established!");
        process.exit(0);
    })
    .catch(err => {
        console.error("FAILURE: Connection error occurred:");
        console.error(err.message);
        process.exit(1);
    });
