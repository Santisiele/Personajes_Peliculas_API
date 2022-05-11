import { Router } from 'express';
import { moviesServices } from '../services/moviesServices.js';
import { Authenticate } from "../common/jwt.js";

const router = Router();
const moviesSer = new moviesServices()

router.get('/', Authenticate, async(req, res) => {
    const token = await moviesSer.getMovies();

    return res.status(200).json(token);
});

router.get('/:id', Authenticate, async(req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);

    const movieElegida = await moviesSer.getMovieById(req.params.id);

    return res.status(200).json(movieElegida);
});

export default router;