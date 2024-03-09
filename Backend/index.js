// MODULES IMPORT
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Database } from "./config/database.js";
import { USERMODEL } from "./model/userModel.js";

// CONFIG
dotenv.config();

// CONSTANTS
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// INTIALIZING EXPRESS
const app = express();

// DATABASE

const database = new Database(MONGODB_URI);
database.connect();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TEST ROUTE
app.use("/api/test", (req, res) => {
  res.send("Server is running ✅");
});

//ROUTES
app.get("/api/username", async (req, res) => {
  try {
    const query = req.query.number ? { number: req.query.number } : {};
    const user = await USERMODEL.findOne(query);

    if (user.length === 0) {
      return res.status(404).send("User not found");
    }
    return res.send(user);
  } catch (err) {
    return res.status(404).send("User not found");
  }
});

app.post("/api/username", async (req, res) => {
  const user = new USERMODEL({
    username: req.body.username,
    number: req.body.number,
  });

  await user.save();
  return res.send(user);
});

// DATABASE DISCONNECTION
process.on("SIGINT", () => {
  database
    .disconnect()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});

// LISTEN
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
