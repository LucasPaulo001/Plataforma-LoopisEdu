import mongoose from "mongoose";

const dbConnection = async (app) => {
    try {
        // mongoose.connect(<url de conexão>);
        // console.log("Conectado ao mongoose...");
    } catch (error) {
        console.log(error);
    }
};

export default dbConnection;
