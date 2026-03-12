const mongoose = require('mongoose');
const uri = "mongodb://clearfund_admin:cr16a3369@cluster0-shard-00-00.kg1o3qf.mongodb.net:27017,cluster0-shard-00-01.kg1o3qf.mongodb.net:27017,cluster0-shard-00-02.kg1o3qf.mongodb.net:27017/Clearfund?ssl=true&replicaSet=atlas-lhgbvs-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log("Testing connection to Atlas...");
console.log("Start time:", new Date().toLocaleTimeString());

mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 })
    .then(() => {
        console.log("SUCCESS: Database connection established!");
        process.exit(0);
    })
    .catch(err => {
        console.error("FAILURE:", err.message);
        if (err.reason) console.error("Reason:", JSON.stringify(err.reason, null, 2));
        process.exit(1);
    });
