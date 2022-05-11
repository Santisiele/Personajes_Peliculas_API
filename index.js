import express from "express";
import cors from "cors";
import personajeRouter from "./src/controllers/personajeController.js";
import loginRouter from "./src/controllers/loginController.js";
import passport from "passport";
import jwtStrategy from "./src/common/jwt.js";
import moviesRouter from "./src/controllers/moviesController.js";


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/character", personajeRouter);
app.use("/auth", loginRouter);
app.use("/movies", moviesRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});