import { Router } from 'express';
import { moviesServices } from '../services/moviesServices.js';
import { Authenticate } from "../common/jwt.js";

const router = Router();
const moviesSer = new moviesServices()

router.get('/', Authenticate, async(req, res) => {
    let titulo = req.query.titulo;

    const movies = await moviesSer.getMovies(titulo);

    return res.status(200).json(movies);
});

router.get('/:id', Authenticate, async(req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);

    const movieElegida = await moviesSer.getMovieById(req.params.id);

    return res.status(200).json(movieElegida);
});

router.post('', Authenticate, async(req, res) => {
    console.log(`This is a post operation`);

    const peliSerieCreada = await moviesSer.createMovie(req.body);

    return res.status(201).json(peliSerieCreada);
});

router.put('/:id',Authenticate, async(req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);

    const PeliSerieEditada = await moviesSer.updateMovieById(req.params.id, req.body);

    return res.status(200).json(PeliSerieEditada);
});

router.delete('/:id',Authenticate, async(req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);

    const PeliSerieEliminada = await moviesSer.deleteMovieById(req.params.id);

    return res.status(200).json(PeliSerieEliminada);
});

export default router;