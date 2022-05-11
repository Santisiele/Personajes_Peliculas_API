import express from "express";
import cors from "cors";
import personajeRouter from "./src/controllers/personajeController.js";
import passport from "passport";
import jwtStrategy from "./src/common/jwt.js";


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/character", personajeRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});