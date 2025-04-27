import "dotenv/config";
import express from "express";
import routes from "../src/routes/index.mjs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
    cors({
        origin: "lavish-flexibility-production-92a7.up.railway.app",
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(routes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
