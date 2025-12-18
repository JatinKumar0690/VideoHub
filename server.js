require("dotenv").config();
const app = require("./src/app.js")
const connectedDB = require("./src/config/db.js");


const PORT = process.env.PORT || 5050;


connectedDB();

app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`);
})


