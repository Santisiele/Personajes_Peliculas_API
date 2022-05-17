import { Router } from 'express';
import { moviesServices } from '../services/moviesServices.js';
import { Authenticate } from "../common/jwt.js";

const router = Router();
const moviesSer = new moviesServices()

router.get('/', Authenticate, async(req, res) => {
    let titulo = req.query.titulo;
    let orden = req.query.order;

    try{
        const movies = await moviesSer.getMovies(titulo, orden);
    return res.status(200).json(movies);
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
});

router.get('/:id', Authenticate, async(req, res) => {
    try{
        const movieElegida = await moviesSer.getMovieById(req.params.id);
    return res.status(200).json(movieElegida);
    }catch(error){
        return res.status(500).json(error);
    }  
});

router.post('', Authenticate, async(req, res) => {
    try{
    if((req.body.calificaion>5) || (req.body.calificaion<1)){
        res.status(400)("La calificaion debe estar entre 1 y 5")
    }else{
        const peliSerieCreada = await moviesSer.createMovie(req.body);
        return res.status(201).json(peliSerieCreada);
    }
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
});

router.put('/:id',Authenticate, async(req, res) => {
    try{
    const PeliSerieEditada = await moviesSer.updateMovieById(req.params.id, req.body);
    return res.status(200).json(PeliSerieEditada);
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
});

router.delete('/:id',Authenticate, async(req, res) => {
    try{
    const PeliSerieEliminada = await moviesSer.deleteMovieById(req.params.id);
    return res.status(200).json(PeliSerieEliminada);
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
});

export default router;