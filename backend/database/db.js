const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb+srv://ndeye:ndeyeIpssi@atlascluster.mp58qo5.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster");
        console.log("connexion reussi");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connect;
