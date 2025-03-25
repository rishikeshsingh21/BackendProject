import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    //console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
    const connectionInstant = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    //console.log(connectionInstant);
    //console.log(mongoose.connection)
    console.log(
      `\nMOngodb connected !! DB HOST : ${connectionInstant.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error;", error);
    process.exit(1);
  }
};

export default connectDB;
