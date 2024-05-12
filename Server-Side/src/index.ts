import { Request, Response } from "express";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import astrologerRouter from "./routes/astrologerRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://mdabdulq62:nadim123@cluster0.mjympox.mongodb.net/astrologer?retryWrites=true&w=majority`
    );
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};



app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Welcome to the Astrologer API!");
});

app.use(bodyParser.json());
app.use("/api/astrologers", astrologerRouter);
app.listen(4000, () => {
  connect();
  console.log(`server runing on http://localhost:4000`);
});
